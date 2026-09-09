import React from 'react'

import PdfLang, { LangHead } from 'components/pages/pdf/lang'
import go from 'components/pages/pdf/lang/config/go'

const PdfGo = () => <PdfLang config={go} />

export const Head = () => <LangHead config={go} />

export default PdfGo
