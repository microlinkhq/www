import { colors } from 'theme'
import React from 'react'

import OpenSourcePattern, { OSS_STATS } from 'components/patterns/OpenSource'

const OpenSource = () => (
  <OpenSourcePattern
    repos={['metascraper', 'browserless', 'unavatar']}
    accent={colors.link}
    caption="Open source isn't just something we use; It's something we build. Many of the technologies behind Microlink are developed in public and available for everyone."
    ctaHref='/oss'
    ctaLabel={`Explore our +${
      Math.round(OSS_STATS.repos / 10) * 10
    } open source projects`}
  />
)

export default OpenSource
