import { Grid } from 'react-feather'

import {
  GoogleIcon,
  XIcon,
  SlackIcon,
  FacebookIcon,
  LinkedInIcon,
  DiscordIcon,
  WhatsAppIcon,
  TelegramIcon
} from './icons'

import { GooglePreview } from './google'
import { XPreview } from './x'
import { FacebookPreview } from './facebook'
import { LinkedInPreview } from './linkedin'
import { SlackPreview } from './slack'
import { WhatsAppPreview } from './whatsapp'
import { TelegramPreview } from './telegram'
import { DiscordPreview } from './discord'

export const PREVIEWS = {
  all: { name: 'All', component: null, icon: Grid },
  whatsapp: {
    name: 'WhatsApp',
    component: WhatsAppPreview,
    icon: WhatsAppIcon
  },
  facebook: {
    name: 'Facebook',
    component: FacebookPreview,
    icon: FacebookIcon
  },
  google: { name: 'Google', component: GooglePreview, icon: GoogleIcon },
  telegram: {
    name: 'Telegram',
    component: TelegramPreview,
    icon: TelegramIcon
  },
  linkedin: {
    name: 'LinkedIn',
    component: LinkedInPreview,
    icon: LinkedInIcon
  },
  x: { name: 'X (Twitter)', component: XPreview, icon: XIcon },
  discord: { name: 'Discord', component: DiscordPreview, icon: DiscordIcon },
  slack: { name: 'Slack', component: SlackPreview, icon: SlackIcon }
}
