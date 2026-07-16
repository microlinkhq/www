import { colors } from 'theme'
import React from 'react'

import OpenSourcePattern from 'components/patterns/OpenSource'

const OpenSource = () => (
  <OpenSourcePattern
    repos={['metascraper', 'browserless', 'unavatar']}
    accent={colors.link}
    caption='Microlink is committed to the principles of open source development: we all succeed when engineers work together and share their solutions. Here are some of the projects we maintain in the open.'
    ctaHref='/oss'
    ctaLabel='Explore our open source'
  />
)

export default OpenSource
