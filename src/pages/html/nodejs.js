import React from 'react'

import HtmlLang, { LangHead } from 'components/pages/html/lang'
import nodejs from 'components/pages/html/lang/config/nodejs'

const HtmlNodejs = () => <HtmlLang config={nodejs} />

export const Head = () => <LangHead config={nodejs} />

export default HtmlNodejs
