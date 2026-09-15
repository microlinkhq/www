import React from 'react'

import MarkdownLang, { LangHead } from 'components/pages/markdown/lang'
import ruby from 'components/pages/markdown/lang/config/ruby'

const MarkdownRuby = () => <MarkdownLang config={ruby} />

export const Head = () => <LangHead config={ruby} />

export default MarkdownRuby
