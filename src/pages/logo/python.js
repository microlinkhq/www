import React from 'react'

import LogoLang, { LangHead } from 'components/pages/logo/lang'
import python from 'components/pages/logo/lang/config/python'

const LogoPython = () => <LogoLang config={python} />

export const Head = () => <LangHead config={python} />

export default LogoPython
