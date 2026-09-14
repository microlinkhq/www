import React from 'react'

import MarkdownLang, { LangHead } from 'components/pages/markdown/lang'
import php from 'components/pages/markdown/lang/config/php'

const MarkdownPHP = () => <MarkdownLang config={php} />

export const Head = () => <LangHead config={php} />

export default MarkdownPHP
