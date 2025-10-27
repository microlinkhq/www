'use strict'

/**
 * Migrate External Images Script
 *
 * Automatically downloads external images (http/https) from markdown files
 * and saves them to the static/images/ directory, replacing the URLs with
 * local paths.
 *
 * Features:
 * - Processes frontmatter image field
 * - Processes markdown image syntax: ![alt](url)
 * - Preserves original filenames when possible
 * - Handles redirects automatically
 *
 * Usage:
 *   node scripts/static-assets.js <file1.md> <file2.md> ...
 *
 * Git Hook:
 *   Configured via nano-staged to run automatically on markdown files
 *   before committing. See package.json "nano-staged" section.
 */

const { mkdir, readFile, writeFile } = require('fs/promises')
const https = require('https')
const http = require('http')
const path = require('path')
const fs = require('fs')

const isHttpUrl = input => /^https?:\/\//.test(input)

const mkdirp = filepath => mkdir(filepath, { recursive: true }).catch(() => {})

const getExtension = url => {
  const pathname = new URL(url).pathname
  const ext = path.extname(pathname)
  return ext || '.png'
}

const downloadFile = (url, outputPath) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http

    client
      .get(url, response => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadFile(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject)
        }

        if (response.statusCode !== 200) {
          return reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          )
        }

        const fileStream = fs.createWriteStream(outputPath)
        response.pipe(fileStream)

        fileStream.on('finish', () => {
          fileStream.close()
          console.log(`✓ Downloaded ${path.basename(outputPath)}`)
          resolve()
        })

        fileStream.on('error', reject)
      })
      .on('error', reject)
  })
}

const generateFilename = (url, index) => {
  const urlObj = new URL(url)
  const basename = path.basename(urlObj.pathname, path.extname(urlObj.pathname))
  const ext = getExtension(url)

  // Use existing filename if it looks like an imgur-style hash
  if (basename && basename.length > 3) {
    return `${basename}${ext}`
  }

  // Otherwise generate a name
  return `image-${index}${ext}`
}

const processFrontmatterImage = async (data, imagesFolder) => {
  if (data.image && isHttpUrl(data.image)) {
    console.log(`Processing frontmatter image: ${data.image}`)
    const filename = generateFilename(data.image, 0)
    const outputPath = path.join(imagesFolder, filename)

    try {
      await downloadFile(data.image, outputPath)
      data.image = `/images/${filename}`
      return true
    } catch (err) {
      console.error(`Failed to download frontmatter image: ${err.message}`)
      return false
    }
  }
  return false
}

const processMarkdownImages = async (content, imagesFolder) => {
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g
  const matches = []
  let match

  while ((match = regex.exec(content)) !== null) {
    matches.push({ alt: match[1], url: match[2] })
  }

  let index = 1
  for (const { url } of matches) {
    if (isHttpUrl(url)) {
      console.log(`Processing markdown image: ${url}`)
      const filename = generateFilename(url, index++)
      const outputPath = path.join(imagesFolder, filename)

      try {
        await downloadFile(url, outputPath)
        const newPath = `/images/${filename}`
        content = content.replace(url, newPath)
      } catch (err) {
        console.error(`Failed to download ${url}: ${err.message}`)
      }
    }
  }

  return content
}

const parseFrontmatter = fileContent => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = fileContent.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: fileContent }
  }

  const frontmatter = match[1]
  const content = match[2]
  const data = {}

  // Simple YAML parsing for common fields
  const lines = frontmatter.split('\n')
  for (const line of lines) {
    const keyValue = line.match(/^(\w+):\s*['"]?([^'"]+)['"]?$/)
    if (keyValue) {
      data[keyValue[1]] = keyValue[2].replace(/^['"]|['"]$/g, '')
    }
  }

  return { data, content, frontmatter }
}

const stringifyFrontmatter = (data, content) => {
  const lines = Object.entries(data).map(([key, value]) => {
    // Keep quotes for values that had them or contain special chars
    if (value.includes(':') || value.includes('#') || value.startsWith('/')) {
      return `${key}: '${value}'`
    }
    return `${key}: '${value}'`
  })

  return `---\n${lines.join('\n')}\n---\n${content}`
}

const processFile = async filepath => {
  console.log(`\nProcessing: ${filepath}`)

  const fileContent = await readFile(filepath, 'utf-8')
  const { data, content, frontmatter } = parseFrontmatter(fileContent)

  const imagesFolder = path.resolve(__dirname, '../static/images')
  await mkdirp(imagesFolder)

  let modified = false
  let newContent = content

  // Process frontmatter image
  if (await processFrontmatterImage(data, imagesFolder, content)) {
    modified = true
  }

  // Process markdown images
  const updatedContent = await processMarkdownImages(content, imagesFolder)
  if (updatedContent !== content) {
    newContent = updatedContent
    modified = true
  }

  if (modified) {
    const finalContent = frontmatter
      ? stringifyFrontmatter(data, newContent)
      : newContent
    await writeFile(filepath, finalContent, 'utf-8')
    console.log(`✓ Updated ${filepath}`)
  } else {
    console.log('→ No external images found')
  }
}

const main = async () => {
  const files = process.argv.slice(2)

  if (files.length === 0) {
    console.log('No files provided')
    process.exit(0)
  }

  for (const filepath of files) {
    try {
      await processFile(filepath)
    } catch (err) {
      console.error(`Error processing ${filepath}:`, err.message)
      process.exit(1)
    }
  }

  console.log('\n✓ Migration complete!')
}

main()
