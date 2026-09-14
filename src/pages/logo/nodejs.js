import React from 'react'

import LogoLang, { LangHead } from 'components/pages/logo/lang'
import nodejs from 'components/pages/logo/lang/config/nodejs'

const LogoNodejs = () => <LogoLang config={nodejs} />

export const Head = () => <LangHead config={nodejs} />

export default LogoNodejs
