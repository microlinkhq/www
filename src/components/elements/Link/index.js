import { withAnalytics, withLink } from 'helpers/hoc'
import solid from './solid'
import base from './base'

export const LinkSolid = withLink(withAnalytics(solid))
export const Link = withLink(withAnalytics(base))
