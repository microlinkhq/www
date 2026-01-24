/**
 * Optimized index maps for demoLinks lookups
 * Using Map for O(1) lookups instead of O(n) array.find()
 */
import demoLinks from '../../data/demo-links'

// Build index maps once at module load time
const demoLinksById = new Map(demoLinks.map(item => [item.id, item]))
const demoLinksByUrl = new Map(demoLinks.map(item => [item.data.url, item]))

/**
 * Find demo link by ID - O(1) lookup
 * @param {string} id - The demo link ID
 * @returns {Object|undefined} The demo link object or undefined
 */
export const findDemoLinkById = id => demoLinksById.get(id)

/**
 * Find demo link by URL - O(1) lookup
 * @param {string} url - The URL to find
 * @returns {Object|undefined} The demo link object or undefined
 */
export const findDemoLinkByUrl = url => demoLinksByUrl.get(url)

/**
 * Find demo link by URL variations - O(n) where n is variations length
 * @param {string[]} variations - Array of URL variations to check
 * @returns {Object|undefined} The demo link object or undefined
 */
export const findDemoLinkByVariations = variations => {
  for (const url of variations) {
    const found = demoLinksByUrl.get(url)
    if (found) return found
  }
  return undefined
}

// Re-export the original array for cases where iteration is needed
export { demoLinks }
