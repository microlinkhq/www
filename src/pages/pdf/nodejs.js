import React from 'react'

import PdfLang, { LangHead } from 'components/pages/pdf/lang'
import nodejs from 'components/pages/pdf/lang/config/nodejs'

const PdfNodejs = () => <PdfLang config={nodejs} />

export const Head = () => <LangHead config={nodejs} />

export default PdfNodejs
