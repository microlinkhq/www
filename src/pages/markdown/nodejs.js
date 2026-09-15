import React from 'react'

import MarkdownLang, { LangHead } from 'components/pages/markdown/lang'
import nodejs from 'components/pages/markdown/lang/config/nodejs'

const MarkdownNodejs = () => <MarkdownLang config={nodejs} />

export const Head = () => <LangHead config={nodejs} />

export default MarkdownNodejs
