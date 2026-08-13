import React from 'react'

import PdfLang, { LangHead } from 'components/pages/pdf/lang'
import python from 'components/pages/pdf/lang/config/python'

const PdfPython = () => <PdfLang config={python} />

export const Head = () => <LangHead config={python} />

export default PdfPython
