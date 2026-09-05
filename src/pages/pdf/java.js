import React from 'react'

import PdfLang, { LangHead } from 'components/pages/pdf/lang'
import java from 'components/pages/pdf/lang/config/java'

const PdfJava = () => <PdfLang config={java} />

export const Head = () => <LangHead config={java} />

export default PdfJava
