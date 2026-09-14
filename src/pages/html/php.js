import React from 'react'

import HtmlLang, { LangHead } from 'components/pages/html/lang'
import php from 'components/pages/html/lang/config/php'

const HtmlPhp = () => <HtmlLang config={php} />

export const Head = () => <LangHead config={php} />

export default HtmlPhp
