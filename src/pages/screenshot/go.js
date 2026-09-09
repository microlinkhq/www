import React from 'react'

import ScreenshotLang, { LangHead } from 'components/pages/screenshot/lang'
import go from 'components/pages/screenshot/lang/config/go'

const ScreenshotGo = () => <ScreenshotLang config={go} />

export const Head = () => <LangHead config={go} />

export default ScreenshotGo
