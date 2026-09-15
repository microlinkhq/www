import React from 'react'

import MetadataLang, { LangHead } from 'components/pages/metadata/lang'
import php from 'components/pages/metadata/lang/config/php'

const MetadataPhp = () => <MetadataLang config={php} />

export const Head = () => <LangHead config={php} />

export default MetadataPhp
