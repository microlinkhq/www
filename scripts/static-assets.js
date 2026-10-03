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
const { createHash } = require('node:crypto')
const { styleText } = require('node:util')
const { default: mime } = require('mime')
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

const SUPPORTED_EXTENSIONS = new Set([
  'avif',
  'bmp',
  'gif',
  'heic',
  'jpg',
  'jxl',
  'png',
  'svg',
  'webp'
])

const GENERIC_MEDIA_TYPES = new Set(['', 'application/octet-stream'])

const urlMediaType = url => mime.getType(new URL(url).pathname)

const isImageUrl = input => {
  if (!isHttpUrl(input)) return false

  try {
    return SUPPORTED_EXTENSIONS.has(mime.getExtension(urlMediaType(input)))
  } catch (_) {
    return false
  }
}

const resolveExtension = ({ url, contentType }) => {
  const servedType = (contentType ?? '').split(';')[0].trim().toLowerCase()
  const mediaType = GENERIC_MEDIA_TYPES.has(servedType)
    ? urlMediaType(url)
    : servedType
  const extension = mime.getExtension(mediaType)
  if (SUPPORTED_EXTENSIONS.has(extension)) return `.${extension}`

  throw new Error(
    `${url} is not a supported image (content-type: ${servedType || 'none'})`
  )
}

const URL_HASH_LENGTH = 8

const urlHash = url =>
  createHash('sha1').update(url).digest('hex').slice(0, URL_HASH_LENGTH)

const generateFilename = (url, extension) => {
  const { pathname } = new URL(url)
  const basename = path.basename(pathname, path.extname(pathname))
  const name = basename.length > 3 ? basename : 'image'
  return `${name}-${urlHash(url)}${extension}`
}

const downloadImage = async (url, imagesFolder) => {
  const response = await fetch(url)
  if (response.status !== 200) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const extension = resolveExtension({
    url: response.url,
    contentType: response.headers.get('content-type')
  })
  const filename = generateFilename(url, extension)
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

const migrateImage = async (url, imagesFolder) => {
  const { filename, outputPath } = await downloadImage(url, imagesFolder)
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
      data.image = await migrateImage(url, imagesFolder)
      return true
    } catch (err) {
      console.error(red(`Failed to download frontmatter image: ${err.message}`))
      return false
    }
  }
  return false
}

const CODE_FENCE_MARKER = /^ {0,3}(`{3,}|~{3,})/
const BARE_CODE_FENCE = /^ {0,3}(`{3,}|~{3,}) *\r?\n?$/

const splitByCodeFences = content => {
  const segments = []
  let fence = null
  let buffer = ''

  for (const line of content.split(/(?<=\n)/)) {
    const marker = line.match(CODE_FENCE_MARKER)?.[1]

    if (!fence && marker) {
      segments.push({ isCode: false, text: buffer })
      buffer = line
      fence = marker
      continue
    }

    buffer += line
    const closesFence =
      fence &&
      BARE_CODE_FENCE.test(line) &&
      marker[0] === fence[0] &&
      marker.length >= fence.length
    if (closesFence) {
      segments.push({ isCode: true, text: buffer })
      buffer = ''
      fence = null
    }
  }

  segments.push({ isCode: fence !== null, text: buffer })
  return segments
}

const outsideCodeFences = content =>
  splitByCodeFences(content)
    .filter(segment => !segment.isCode)
    .map(segment => segment.text)
    .join('')

const replaceOutsideCodeFences = (content, url, localPath) =>
  splitByCodeFences(content)
    .map(segment =>
      segment.isCode ? segment.text : segment.text.replaceAll(url, localPath)
    )
    .join('')

const MARKDOWN_IMAGE = /!\[[^\]]*\]\(([^)]+)\)/g
const JSX_OBJECT_SRC = /src\s*:\s*['"]([^'"]+)['"]/g
const JSX_ATTRIBUTE_SRC = /\bsrc\s*=\s*['"]([^'"]+)['"]/g

const firstCaptures = (text, regex) =>
  Array.from(text.matchAll(regex), match => match[1])

const markdownImageUrls = prose =>
  firstCaptures(prose, MARKDOWN_IMAGE).filter(isHttpUrl)

const jsxImageUrls = prose =>
  [
    ...firstCaptures(prose, JSX_OBJECT_SRC),
    ...firstCaptures(prose, JSX_ATTRIBUTE_SRC)
  ].filter(isImageUrl)

const migrateImageUrls = async ({
  content,
  imagesFolder,
  collectUrls,
  kind
}) => {
  const urls = [...new Set(collectUrls(outsideCodeFences(content)))]

  for (const url of urls) {
    if (urlToLocalPath.has(url)) {
      console.log(`Reusing cached ${kind}: ${url}`)
      content = replaceOutsideCodeFences(content, url, urlToLocalPath.get(url))
      continue
    }

    console.log(`Processing ${kind}: ${url}`)

    try {
      const localPath = await migrateImage(url, imagesFolder)
      content = replaceOutsideCodeFences(content, url, localPath)
    } catch (err) {
      console.error(`Failed to download ${url}: ${err.message}`)
    }
  }

  return content
}

const processMarkdownImages = (content, imagesFolder) =>
  migrateImageUrls({
    content,
    imagesFolder,
    collectUrls: markdownImageUrls,
    kind: 'markdown image'
  })

const processJsxImageSources = (content, imagesFolder) =>
  migrateImageUrls({
    content,
    imagesFolder,
    collectUrls: jsxImageUrls,
    kind: 'JSX image source'
  })

const countExternalImageCandidates = content => {
  const prose = outsideCodeFences(content)
  return markdownImageUrls(prose).length + jsxImageUrls(prose).length
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

  const externalCandidates = countExternalImageCandidates(content)
  const frontmatterChanged = await processFrontmatterImage(data, imagesFolder)
  const markdownMigrated = await processMarkdownImages(content, imagesFolder)
  const newContent = await processJsxImageSources(
    markdownMigrated,
    imagesFolder
  )

  if (frontmatterChanged || newContent !== content) {
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
  countExternalImageCandidates,
  outsideCodeFences,
  replaceOutsideCodeFences,
  downloadImage,
  generateFilename,
  isImageUrl,
  resolveExtension
}
