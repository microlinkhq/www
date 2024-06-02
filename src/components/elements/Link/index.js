import { withAnalytics, withLink } from 'helpers/hoc'

import solid from './solid'
import base from './base'

export const LinkSolid = withAnalytics(withLink(solid))
export const Link = withAnalytics(withLink(base))
