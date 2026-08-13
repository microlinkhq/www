import React from 'react'

import PdfLang, { LangHead } from 'components/pages/pdf/lang'
import php from 'components/pages/pdf/lang/config/php'

const PdfPhp = () => <PdfLang config={php} />

export const Head = () => <LangHead config={php} />

export default PdfPhp
