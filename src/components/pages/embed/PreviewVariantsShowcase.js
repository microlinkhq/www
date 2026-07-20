import {
  HeroCard,
  OneLineCard,
  TelegramCard,
  TwitterCard,
  NotificationCard,
  ChatBubbleCard,
  TweetCard
} from './PreviewCards'

export const PREVIEW_VARIANTS = [
  { id: 'hero', component: HeroCard, name: 'Standard Rich Card Preview' },
  { id: 'oneline', component: OneLineCard, name: 'Compact Inline Preview' },
  { id: 'telegram', component: TelegramCard, name: 'Telegram Style Link Card' },
  { id: 'twitter', component: TwitterCard, name: 'Twitter / X Summary Card' },
  {
    id: 'notification',
    component: NotificationCard,
    name: 'iOS Style Notification Card'
  },
  { id: 'chat', component: ChatBubbleCard, name: 'WhatsApp Style Chat Bubble' },
  { id: 'tweet', component: TweetCard, name: 'Embedded Tweet Widget' }
]
