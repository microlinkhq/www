import React from 'react'

import MarkdownLang, { LangHead } from 'components/pages/markdown/lang'
import go from 'components/pages/markdown/lang/config/go'

const MarkdownGo = () => <MarkdownLang config={go} />

export const Head = () => <LangHead config={go} />

export default MarkdownGo
