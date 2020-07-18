import { withAnalytics, withLink } from 'helpers/hoc'
import solid from './solid'
import base from './base'

export const LinkSolid = withLink(withAnalytics(solid))
export const Link = withLink(withAnalytics(base))

LinkSolid.External = withLink.External(LinkSolid)
Link.External = withLink.External(Link)
