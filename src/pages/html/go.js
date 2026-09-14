import React from 'react'

import HtmlLang, { LangHead } from 'components/pages/html/lang'
import go from 'components/pages/html/lang/config/go'

const HtmlGo = () => <HtmlLang config={go} />

export const Head = () => <LangHead config={go} />

export default HtmlGo
