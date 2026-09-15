import React from 'react'

import MetadataLang, { LangHead } from 'components/pages/metadata/lang'
import nodejs from 'components/pages/metadata/lang/config/nodejs'

const MetadataNodejs = () => <MetadataLang config={nodejs} />

export const Head = () => <LangHead config={nodejs} />

export default MetadataNodejs
