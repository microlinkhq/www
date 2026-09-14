// Single source of truth for the /markdown/<lang> landing pages.
//
// Add an entry here when a new language landing ships and it automatically
// slots into the footer and into the "Also available for" nav on every
// sibling landing — keeping every spoke internally linked rather than
// orphaned. Order is the display order.
export const LANG_LANDINGS = [
  { lang: 'nodejs', label: 'Node.js', href: '/markdown/nodejs' },
  { lang: 'python', label: 'Python', href: '/markdown/python' },
  { lang: 'php', label: 'PHP', href: '/markdown/php' },
  { lang: 'ruby', label: 'Ruby', href: '/markdown/ruby' },
  { lang: 'go', label: 'Go', href: '/markdown/go' }
]

export default LANG_LANDINGS
