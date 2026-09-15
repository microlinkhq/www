import React from 'react'

import MetadataLang, { LangHead } from 'components/pages/metadata/lang'
import ruby from 'components/pages/metadata/lang/config/ruby'

const MetadataRuby = () => <MetadataLang config={ruby} />

export const Head = () => <LangHead config={ruby} />

export default MetadataRuby
