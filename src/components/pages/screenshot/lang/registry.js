// Single source of truth for the /screenshot/<lang> landing pages.
//
// Add an entry here when a new language landing ships (python, go, php, …) and
// it automatically slots into the footer and into the "Also available for"
// nav on every sibling landing — keeping every spoke internally linked rather
// than orphaned. Order is the display order.
export const LANG_LANDINGS = [
  { lang: 'nodejs', label: 'Node.js', href: '/screenshot/nodejs' },
  { lang: 'python', label: 'Python', href: '/screenshot/python' },
  { lang: 'php', label: 'PHP', href: '/screenshot/php' }
]

export default LANG_LANDINGS
