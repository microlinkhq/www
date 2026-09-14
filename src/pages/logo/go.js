import React from 'react'

import LogoLang, { LangHead } from 'components/pages/logo/lang'
import go from 'components/pages/logo/lang/config/go'

const LogoGo = () => <LogoLang config={go} />

export const Head = () => <LangHead config={go} />

export default LogoGo
