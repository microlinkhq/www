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
  return languageColors[mappedLang]?.[themeKey]
}

// Language-specific CSS custom properties for sugar-high tokens
const languageColors = {
  bash: {
    light: `
      --sh-class: var(--gray9);
      --sh-identifier: var(--gray9);
      --sh-sign: var(--gray9);
      --sh-property: var(--gray9);
      --sh-entity: var(--gray9);
      --sh-jsxliterals: var(--gray9);
      --sh-string: var(--gray9);
      --sh-keyword: var(--gray9);
      --sh-comment: var(--gray9);
       .sh__token--identifier:first-of-type {
         color: var(--link) !important;
       }
    `,
    dark: ''
  },
  json: {
    light: `
      --sh-class: var(--gray9);
      --sh-identifier: var(--gray9);
      --sh-sign: var(--gray);
      --sh-property: var(--gray9);
      --sh-entity: var(--gray9);
      --sh-jsxliterals: var(--gray9);
      --sh-string: var(--gray9);
      --sh-keyword: var(--gray9);
      --sh-comment: var(--gray9);
    `,
    dark: ''
  }
}

languageColors.headers = languageColors.json
languageColors.cli = languageColors.bash
