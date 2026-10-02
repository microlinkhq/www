import { layout } from 'theme'

import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'

export const STORY_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}

export const NARROW_MAX_WIDTH = [
  layout.small,
  layout.small,
  layout.normal,
  layout.normal
]

export const CENTERED_TO_LEFT = ['center', 'center', 'center', 'left']

export const CENTERED_TO_START = ['center', 'center', 'center', 'flex-start']

export { Heading, Subhead, Caption }
