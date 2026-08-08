// Single source of truth for the /screenshot/<lang> landing pages.
//
// Add an entry here when a new language landing ships (python, go, php, …) and
// it automatically slots into the "Use it in your language" block on the
// /screenshot product page — keeping every spoke internally linked rather than
// orphaned. Order is the display order.
export const LANG_LANDINGS = [
  {
    lang: 'nodejs',
    label: 'Node.js',
    href: '/screenshot/nodejs',
    tagline:
      'Three lines with @microlink/mql — no Puppeteer, no Chromium to bundle.'
  },
  {
    lang: 'python',
    label: 'Python',
    href: '/screenshot/python',
    tagline: 'One HTTP request with requests or urllib — no Selenium to drive.'
  },
  {
    lang: 'php',
    label: 'PHP',
    href: '/screenshot/php',
    tagline:
      'cURL or file_get_contents — no Composer package, no extensions to compile.'
  }
]

export default LANG_LANDINGS
