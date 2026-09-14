import React from 'react'

import LogoLang, { LangHead } from 'components/pages/logo/lang'
import ruby from 'components/pages/logo/lang/config/ruby'

const LogoRuby = () => <LogoLang config={ruby} />

export const Head = () => <LangHead config={ruby} />

export default LogoRuby
