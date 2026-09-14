import React from 'react'

import ScreenshotLang, { LangHead } from 'components/pages/screenshot/lang'
import ruby from 'components/pages/screenshot/lang/config/ruby'

const ScreenshotRuby = () => <ScreenshotLang config={ruby} />

export const Head = () => <LangHead config={ruby} />

export default ScreenshotRuby
