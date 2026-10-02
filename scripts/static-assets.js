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
 * - Deduplicates URLs (same URL = same local file)
 * - Automatically stages downloaded assets with git add
 *
 * Usage:
 *   node scripts/static-assets.js <file1.md> <file2.md> ...
 *
 * Git Hook:
 *   Configured via nano-staged to run automatically on markdown files
 *   before committing. See package.json "nano-staged" section.
 */

const { mkdir, readFile, writeFile } = require('fs/promises')
const { styleText } = require('node:util')
const optimo = require('optimo')
const path = require('path')

const git = require('../src/helpers/git')

const red = str => styleText('red', str)

// Track all downloaded assets for git staging
const downloadedAssets = new Set()

// Cache URL -> local path mappings for deduplication
const urlToLocalPath = new Map()

const isHttpUrl = input => /^https?:\/\//.test(input)

const mkdirp = filepath => mkdir(filepath, { recursive: true }).catch(() => {})

const EXTENSION_BY_MEDIA_TYPE = {
  'image/avif': '.avif',
  'image/bmp': '.bmp',
  'image/gif': '.gif',
  'image/heic': '.heic',
  'image/jpeg': '.jpg',
  'image/jxl': '.jxl',
  'image/png': '.png',
  'image/svg+xml': '.svg',
  'image/webp': '.webp'
}

const IMAGE_EXTENSIONS = new Set([
  ...Object.values(EXTENSION_BY_MEDIA_TYPE),
  '.jpeg'
])

const GENERIC_MEDIA_TYPES = new Set(['', 'application/octet-stream'])

const urlExtension = url => path.extname(new URL(url).pathname).toLowerCase()

const isImageUrl = input => {
  if (!isHttpUrl(input)) return false

  try {
    return IMAGE_EXTENSIONS.has(urlExtension(input))
  } catch (_) {
    return false
  }
}

const resolveExtension = ({ url, contentType = '' }) => {
  const mediaType = contentType.split(';')[0].trim().toLowerCase()
  if (EXTENSION_BY_MEDIA_TYPE[mediaType]) { return EXTENSION_BY_MEDIA_TYPE[mediaType] }

  const extension = urlExtension(url)
  if (GENERIC_MEDIA_TYPES.has(mediaType) && IMAGE_EXTENSIONS.has(extension)) {
    return extension
  }

  throw new Error(
    `${url} is not a supported image (content-type: ${mediaType || 'none'})`
  )
}

const generateFilename = (url, index, extension) => {
  const { pathname } = new URL(url)
  const basename = path.basename(pathname, path.extname(pathname))
  return basename.length > 3
    ? `${basename}${extension}`
    : `image-${index}${extension}`
}

const downloadImage = async (url, imagesFolder, index) => {
  const response = await fetch(url, { redirect: 'follow' })
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const extension = resolveExtension({
    url,
    contentType: response.headers.get('content-type') ?? ''
  })
  const filename = generateFilename(url, index, extension)
  const outputPath = path.join(imagesFolder, filename)
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()))
  console.log(`✓ Downloaded ${filename}`)
  return { filename, outputPath }
}

const optimizeImage = async outputPath => {
  await optimo.file(outputPath, {
    resize: 'w1280'
  })
  console.log(`✓ Optimized ${path.basename(outputPath)}`)
}

const migrateImage = async (url, imagesFolder, index) => {
  const { filename, outputPath } = await downloadImage(url, imagesFolder, index)
  await optimizeImage(outputPath)
  downloadedAssets.add(outputPath)
  const localPath = `/images/${filename}`
  urlToLocalPath.set(url, localPath)
  return localPath
}

const processFrontmatterImage = async (data, imagesFolder) => {
  if (data.image && isHttpUrl(data.image)) {
    const url = data.image

    // Check if this URL was already processed (deduplication)
    if (urlToLocalPath.has(url)) {
      console.log(`Reusing cached image for frontmatter: ${url}`)
      data.image = urlToLocalPath.get(url)
      return true
    }

    console.log(`Processing frontmatter image: ${url}`)

    try {
      data.image = await migrateImage(url, imagesFolder, 0)
      return true
    } catch (err) {
      console.error(red(`Failed to download frontmatter image: ${err.message}`))
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

  // Collect unique HTTP URLs for processing
  const httpUrls = [...new Set(matches.map(m => m.url).filter(isHttpUrl))]

  let index = 1
  for (const url of httpUrls) {
    // Check if this URL was already processed (deduplication)
    if (urlToLocalPath.has(url)) {
      console.log(`Reusing cached image: ${url}`)
      const localPath = urlToLocalPath.get(url)
      // Replace ALL occurrences of this URL
      content = content.replaceAll(url, localPath)
      continue
    }

    console.log(`Processing markdown image: ${url}`)

    try {
      const localPath = await migrateImage(url, imagesFolder, index++)
      // Replace ALL occurrences of this URL
      content = content.replaceAll(url, localPath)
    } catch (err) {
      console.error(`Failed to download ${url}: ${err.message}`)
    }
  }

  return content
}

const processJsxImageSources = async (content, imagesFolder) => {
  const matches = []

  // Match object-style props: src: 'https://...'
  const objectSrcRegex = /src\s*:\s*['"]([^'"]+)['"]/g
  let objectMatch
  while ((objectMatch = objectSrcRegex.exec(content)) !== null) {
    matches.push(objectMatch[1])
  }

  // Match JSX attribute style: src="https://..."
  const attrSrcRegex = /\bsrc\s*=\s*['"]([^'"]+)['"]/g
  let attrMatch
  while ((attrMatch = attrSrcRegex.exec(content)) !== null) {
    matches.push(attrMatch[1])
  }

  // Only process unique external image URLs
  const httpUrls = [...new Set(matches.filter(isImageUrl))]

  let index = 1
  for (const url of httpUrls) {
    if (urlToLocalPath.has(url)) {
      console.log(`Reusing cached JSX image: ${url}`)
      content = content.replaceAll(url, urlToLocalPath.get(url))
      continue
    }

    console.log(`Processing JSX image source: ${url}`)

    try {
      const localPath = await migrateImage(url, imagesFolder, index++)
      content = content.replaceAll(url, localPath)
    } catch (err) {
      console.error(`Failed to download ${url}: ${err.message}`)
    }
  }

  return content
}

const countExternalImageCandidates = content => {
  let total = 0

  // Markdown image syntax
  const markdownRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let markdownMatch
  while ((markdownMatch = markdownRegex.exec(content)) !== null) {
    if (isHttpUrl(markdownMatch[2])) total++
  }

  // JSX object-style src: 'https://...'
  const objectSrcRegex = /src\s*:\s*['"]([^'"]+)['"]/g
  let objectMatch
  while ((objectMatch = objectSrcRegex.exec(content)) !== null) {
    if (isImageUrl(objectMatch[1])) total++
  }

  // JSX attribute style src="https://..."
  const attrSrcRegex = /\bsrc\s*=\s*['"]([^'"]+)['"]/g
  let attrMatch
  while ((attrMatch = attrSrcRegex.exec(content)) !== null) {
    if (isImageUrl(attrMatch[1])) total++
  }

  return total
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
  const externalCandidates = countExternalImageCandidates(content)

  // Process frontmatter image
  if (await processFrontmatterImage(data, imagesFolder, content)) {
    modified = true
  }

  // Process markdown images
  const updatedContent = await processMarkdownImages(content, imagesFolder)
  if (updatedContent !== newContent) {
    newContent = updatedContent
    modified = true
  }

  // Process external image URLs used inside JSX component props (e.g. SliderCompare src fields)
  const updatedJsxContent = await processJsxImageSources(
    newContent,
    imagesFolder
  )
  if (updatedJsxContent !== newContent) {
    newContent = updatedJsxContent
    modified = true
  }

  if (modified) {
    const finalContent = frontmatter
      ? stringifyFrontmatter(data, newContent)
      : newContent
    await writeFile(filepath, finalContent, 'utf-8')
    console.log(`✓ Updated ${filepath}`)
  } else if (externalCandidates > 0) {
    console.log(
      `→ Found ${externalCandidates} external image reference(s), but none were migrated (download failures or inaccessible hosts)`
    )
  } else {
    console.log('→ No external images found')
  }
}

const gitAddAssets = async () => {
  if (downloadedAssets.size === 0) {
    return
  }

  console.log(`\nStaging ${downloadedAssets.size} downloaded asset(s)...`)

  for (const assetPath of downloadedAssets) {
    try {
      const relativeAssetPath = path.relative(process.cwd(), assetPath)
      await git.add(relativeAssetPath)
      console.log(`✓ Staged ${path.basename(assetPath)}`)
    } catch (err) {
      const stderr = err?.stderr ? `\n${err.stderr}` : ''
      console.error(`Failed to stage ${assetPath}: ${err.message}${stderr}`)
    }
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
      console.error()
      console.error(red(`Error processing ${filepath}`))
      console.error(red(err.message))
      process.exit(1)
    }
  }

  // Stage all downloaded assets with git
  await gitAddAssets()

  console.log('\n✓ Migration complete!')
}

if (require.main === module) main()

module.exports = {
  downloadImage,
  generateFilename,
  isImageUrl,
  resolveExtension
}
