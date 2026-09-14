import React from 'react'

import PdfLang, { LangHead } from 'components/pages/pdf/lang'
import ruby from 'components/pages/pdf/lang/config/ruby'

const PdfRuby = () => <PdfLang config={ruby} />

export const Head = () => <LangHead config={ruby} />

export default PdfRuby
