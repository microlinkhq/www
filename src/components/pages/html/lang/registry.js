// Single source of truth for the /html/<lang> landing pages.
//
// Add an entry here when a new language landing ships and it automatically
// slots into the footer and into the "Also available for" nav on every
// sibling landing — keeping every spoke internally linked rather than
// orphaned. Order is the display order.
export const LANG_LANDINGS = [
  { lang: 'nodejs', label: 'Node.js', href: '/html/nodejs' },
  { lang: 'python', label: 'Python', href: '/html/python' },
  { lang: 'php', label: 'PHP', href: '/html/php' },
  { lang: 'ruby', label: 'Ruby', href: '/html/ruby' },
  { lang: 'go', label: 'Go', href: '/html/go' }
]

export default LANG_LANDINGS
