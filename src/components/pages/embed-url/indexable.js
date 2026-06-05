// Source of truth for which embed-url provider pages are exposed to search
// engines. Pages NOT in this list render `noindex, follow` and are excluded
// from the sitemap, so we avoid flooding Google with ~300 near-identical
// templated pages at once.
//
// Rollout plan: this is the page-1 batch (the first 40 providers shown in the
// grid on /embed/providers, in the same order). Once a batch proves it earns
// impressions in Search Console, append the next 40 slugs here — robots tags
// and the sitemap update automatically.
//
// CommonJS so both the ESM page code and gatsby-config.js (Node) share one list.

const EMBED_INDEXABLE = [
  'youtube',
  'instagram',
  'twitter-or-x',
  'tiktok',
  'figma',
  'replit',
  'facebook',
  'loom',
  'vimeo',
  'canva',
  'codesandbox',
  'pinterest',
  'spotify',
  'reddit',
  'giphy',
  'soundcloud',
  'behance',
  'kickstarter',
  'hubspot',
  'miro',
  'microsoft',
  'flickr',
  'framer',
  'elevenlabs',
  'new-york-times',
  'apple-music',
  'wordpress-com',
  'tumblr',
  'dailymotion',
  'getty-images',
  'ted',
  'bluesky',
  'wistia',
  'codepen',
  'slideshare',
  'scribd',
  'deviantart-com',
  'prezi',
  'issuu',
  'rumble'
]

const EMBED_INDEXABLE_SET = new Set(EMBED_INDEXABLE)

const isEmbedIndexable = slug => EMBED_INDEXABLE_SET.has(slug)

const embedRobots = slug =>
  isEmbedIndexable(slug) ? 'index, follow' : 'noindex, follow'

module.exports = { EMBED_INDEXABLE, isEmbedIndexable, embedRobots }
