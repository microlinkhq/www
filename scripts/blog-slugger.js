'use strict'

const { readFile, rename } = require('fs/promises')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

/**
 * Parse frontmatter from markdown file content
 */
const parseFrontmatter = fileContent => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/
  const match = fileContent.match(frontmatterRegex)

  if (!match) {
    return {}
  }

  const frontmatter = match[1]
  const data = {}

  const lines = frontmatter.split('\n')
  for (const line of lines) {
    const keyValue = line.match(/^(\w+):\s*['"]?([^'"]+)['"]?$/)
    if (keyValue) {
      data[keyValue[1]] = keyValue[2].replace(/^['"]|['"]$/g, '')
    }
  }

  return data
}

/**
 * Main function
 */
const main = async () => {
  const { slug } = await import('github-slugger')
  const files = process.argv.slice(2)

  for (const filepath of files) {
    // Only process files in src/content/blog/
    if (!filepath.includes('src/content/blog/')) continue

    try {
      if (!fs.existsSync(filepath)) continue

      const fileContent = await readFile(filepath, 'utf-8')
      const { title } = parseFrontmatter(fileContent)

      if (title) {
        // Remove content in parentheses before generating slug
        const titleWithoutParentheses = title
          .replace(/\([^()]*\)/g, '') // Remove parentheses and their content
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim()
        const newFilename = `${slug(titleWithoutParentheses)}.md`
        const dirname = path.dirname(filepath)
        const newPath = path.join(dirname, newFilename)

        // Only rename if the slug is different from current filename
        if (path.resolve(filepath) !== path.resolve(newPath)) {
          if (fs.existsSync(newPath)) {
            console.warn(`Skipping: ${newPath} already exists`)
            continue
          }

          try {
            // Try using git mv for better integration with git
            execSync(`git mv "${filepath}" "${newPath}"`, { stdio: 'ignore' })
            console.log(`${filepath} -> ${newPath} (git)`)
          } catch (e) {
            // Fallback to regular rename if not in git or other error
            await rename(filepath, newPath)
            console.log(`${filepath} -> ${newPath}`)
          }
        }
      }
    } catch (err) {
      console.error(`Error processing ${filepath}: ${err.message}`)
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
