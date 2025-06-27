// Function to get CSS custom properties for specific language
export const getLanguageTheme = (language, themeKey) => {
  const normalizedLang = language?.toLowerCase()

  // Map language aliases to main language keys
  const languageMap = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'javascript',
    tsx: 'javascript',
    'node.js': 'javascript',
    shell: 'bash',
    sh: 'bash',
    curl: 'bash'
  }

  const mappedLang = languageMap[normalizedLang] || normalizedLang

  console.log(mappedLang)

  return languageColors[mappedLang]?.[themeKey]
}

// Language-specific CSS custom properties for sugar-high tokens
const languageColors = {
  json: {
    light: `
      --sh-class: var(--black);
      --sh-identifier: var(--black);
      --sh-sign: var(--black50);
      --sh-property: var(--black);
      --sh-entity: var(--black);
      --sh-jsxliterals: var(--black);
      --sh-string: var(--black);
      --sh-keyword: var(--black);
      --sh-comment: var(--black);
    `,
    dark: `
      --sh-class: var(--black);
      --sh-identifier: var(--black);
      --sh-sign: var(--black50);
      --sh-property: var(--black);
      --sh-entity: var(--black);
      --sh-jsxliterals: var(--black);
      --sh-string: var(--black);
      --sh-keyword: var(--black);
      --sh-comment: var(--black);
    `
  }
}
