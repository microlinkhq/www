import React from 'react'

import LogoLang, { LangHead } from 'components/pages/logo/lang'
import php from 'components/pages/logo/lang/config/php'

const LogoPhp = () => <LogoLang config={php} />

export const Head = () => <LangHead config={php} />

export default LogoPhp
