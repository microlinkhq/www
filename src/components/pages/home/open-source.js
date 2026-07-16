import { colors } from 'theme'
import React from 'react'

import OpenSourcePattern, { OSS_STATS } from 'components/patterns/OpenSource'

const OpenSource = () => (
  <OpenSourcePattern
    repos={['metascraper', 'browserless', 'unavatar']}
    accent={colors.link}
    caption={`Microlink is built in the open. Our ${OSS_STATS.repos} repositories have earned ${OSS_STATS.stars} GitHub stars. Read the source, contribute, or run the stack yourself.`}
    ctaHref='/oss'
    ctaLabel='Explore our open source'
  />
)

export default OpenSource
