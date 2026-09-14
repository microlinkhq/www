import React from 'react'

import MarkdownLang, { LangHead } from 'components/pages/markdown/lang'
import python from 'components/pages/markdown/lang/config/python'

const MarkdownPython = () => <MarkdownLang config={python} />

export const Head = () => <LangHead config={python} />

export default MarkdownPython
