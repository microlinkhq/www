import { humanList } from 'helpers/human-list'
import styled from 'styled-components'
import React from 'react'

import { LANGUAGE_MAP } from './language-map'

const SeoContent = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: auto;
  overflow: visible;
`

const SEOParagraph = ({ url, mqlOpts, languages }) => {
  let message = 'The following examples show how to use the Microlink API'
  if (languages.length > 0) {
    message += ` with ${humanList(languages)}`
  }

  if (url) {
    message += `, targeting '${url}' URL`
  }

  const mqlOptsKeys = Object.keys(mqlOpts || {})
  if (mqlOptsKeys.length > 0) {
    message += ` with ${humanList(
      mqlOptsKeys.map(param => `'${param}'`)
    )} API parameter${mqlOptsKeys.length > 1 ? 's' : ''}`
  }

  return `${message}:`
}

const SeoCodeSnippets = React.memo(({ codeSnippets, url, mqlOpts }) => {
  const languages = Object.keys(codeSnippets)
  return (
    <SeoContent>
      <p>{SEOParagraph({ url, mqlOpts, languages })}</p>
      {languages.map(lang => {
        const langClass = LANGUAGE_MAP[lang] || 'javascript'

        return (
          <section
            key={lang}
            itemScope
            itemType='https://schema.org/SoftwareSourceCode'
          >
            <h3>{lang} Microlink API example</h3>
            <meta itemProp='programmingLanguage' content={lang} />
            <pre>
              <code itemProp='text' className={`language-${langClass}`}>
                {codeSnippets[lang]}
              </code>
            </pre>
          </section>
        )
      })}
    </SeoContent>
  )
})

SeoCodeSnippets.displayName = 'SeoCodeSnippets'

export default SeoCodeSnippets
