import React from 'react'

import HtmlLang, { LangHead } from 'components/pages/html/lang'
import ruby from 'components/pages/html/lang/config/ruby'

const HtmlRuby = () => <HtmlLang config={ruby} />

export const Head = () => <LangHead config={ruby} />

export default HtmlRuby
