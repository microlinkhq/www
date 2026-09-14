import React from 'react'

import MetadataLang, { LangHead } from 'components/pages/metadata/lang'
import go from 'components/pages/metadata/lang/config/go'

const MetadataGo = () => <MetadataLang config={go} />

export const Head = () => <LangHead config={go} />

export default MetadataGo
