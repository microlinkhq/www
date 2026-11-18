import React from 'react'
import { theme } from 'theme'

import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import { AlternativeHero } from 'components/patterns/ProductStory'

import { HERO } from './shared'

const CODE_LABEL = 'Microlink Search example'

export const Hero = () => (
  <AlternativeHero {...HERO}>
    <CodeEditor
      language='javascript'
      title='search.js'
      autoHeight
      showFade={false}
      aria-label={CODE_LABEL}
      css={theme({ width: '100%', maxWidth: '100%', boxShadow: 4 })}
    >
      {HERO.code}
    </CodeEditor>
  </AlternativeHero>
)
