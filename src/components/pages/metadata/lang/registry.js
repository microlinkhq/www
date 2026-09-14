// Single source of truth for the /metadata/<lang> landing pages.
//
// Add an entry here when a new language landing ships and it automatically
// slots into the footer and into the "Also available for" nav on every
// sibling landing — keeping every spoke internally linked rather than
// orphaned. Order is the display order.
export const LANG_LANDINGS = [
  { lang: 'nodejs', label: 'Node.js', href: '/metadata/nodejs' },
  { lang: 'python', label: 'Python', href: '/metadata/python' },
  { lang: 'php', label: 'PHP', href: '/metadata/php' },
  { lang: 'ruby', label: 'Ruby', href: '/metadata/ruby' },
  { lang: 'go', label: 'Go', href: '/metadata/go' }
]

export default LANG_LANDINGS
