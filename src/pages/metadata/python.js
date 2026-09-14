import React from 'react'

import MetadataLang, { LangHead } from 'components/pages/metadata/lang'
import python from 'components/pages/metadata/lang/config/python'

const MetadataPython = () => <MetadataLang config={python} />

export const Head = () => <LangHead config={python} />

export default MetadataPython
