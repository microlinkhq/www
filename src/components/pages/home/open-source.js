import React from 'react'

import OpenSourcePattern, { OSS_STATS } from 'components/patterns/OpenSource'

const OpenSource = () => (
  <OpenSourcePattern
    repos={['metascraper', 'browserless', 'unavatar']}
    accent='gradient'
    caption="Open source isn't just something we use: It's something we build. Many of the technologies behind Microlink are developed in public and available for everyone."
    ctaHref='/open-source'
    ctaLabel={`Explore our +${Math.floor(OSS_STATS.repos / 10) * 10} projects`}
  />
)

export default OpenSource
