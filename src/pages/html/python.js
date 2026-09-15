import React from 'react'

import HtmlLang, { LangHead } from 'components/pages/html/lang'
import python from 'components/pages/html/lang/config/python'

const HtmlPython = () => <HtmlLang config={python} />

export const Head = () => <LangHead config={python} />

export default HtmlPython
