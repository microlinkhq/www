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

export const getLanguageTheme = language => {
  const mappedLang =
    languageMap[language?.toLowerCase()] || language?.toLowerCase()
  return languageColors[mappedLang]
}

const languageColors = {
  bash: `
    --sh-class: var(--gray9);
    --sh-identifier: var(--gray9);
    --sh-sign: var(--gray9);
    --sh-property: var(--gray9);
    --sh-entity: var(--gray9);
    --sh-jsxliterals: var(--gray9);
    --sh-string: var(--gray9);
    --sh-keyword: var(--gray9);
    --sh-comment: var(--gray9);

    .sh__token--bash-command {
      --sh-identifier: var(--link);
    }

    .sh__token--bash-comment * {
      color: var(--gray6) !important;
    }
  `,
  json: `
    --sh-class: var(--gray9);
    --sh-identifier: var(--gray9);
    --sh-sign: var(--gray);
    --sh-property: var(--gray9);
    --sh-entity: var(--gray9);
    --sh-jsxliterals: var(--gray9);
    --sh-string: var(--gray9);
    --sh-keyword: var(--gray9);
    --sh-comment: var(--gray5);
  `
}

languageColors.html = `
  ${languageColors.json}
  .sh__token--html-comment * {
    color: var(--gray5) !important;
  }
`

languageColors.text = `
  --sh-class: var(--gray9);
  --sh-identifier: var(--gray9);
  --sh-sign: var(--gray9);
  --sh-property: var(--gray9);
  --sh-entity: var(--gray9);
  --sh-jsxliterals: var(--gray9);
  --sh-string: var(--gray9);
  --sh-keyword: var(--gray9);
  --sh-comment: var(--gray6);
`

languageColors.markdown = languageColors.text
languageColors.headers = languageColors.json
languageColors.cli = languageColors.bash
