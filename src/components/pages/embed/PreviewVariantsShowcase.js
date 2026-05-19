import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

import Box from 'components/elements/Box'

import {
  HeroCard,
  OneLineCard,
  TelegramCard,
  TwitterCard,
  NotificationCard,
  ChatBubbleCard,
  TweetCard,
  STRIPE_DEMO_DATA
} from './PreviewCards'

const PREVIEW_INTERVAL_MS = 3000
const PREVIEW_FADE_MS = 560

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

const PreviewStage = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme({ minHeight: ['320px', '360px', '400px', '400px'] })};
`

const PreviewLayer = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: opacity ${PREVIEW_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    transform ${PREVIEW_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    filter ${PREVIEW_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(0.96)')};
  filter: ${({ $active }) => ($active ? 'blur(0)' : 'blur(6px)')};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    filter: none;
    transition: opacity ${PREVIEW_FADE_MS}ms ease;
  }
`

export const PreviewVariantsShowcase = ({ data = STRIPE_DEMO_DATA }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % PREVIEW_VARIANTS.length)
    }, PREVIEW_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <PreviewStage>
      {PREVIEW_VARIANTS.map(({ component: Variant, name }, i) => (
        <PreviewLayer key={i} $active={i === index} aria-hidden={i !== index}>
          <h3
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)'
            }}
          >
            {name}
          </h3>
          <Variant data={data} />
        </PreviewLayer>
      ))}
    </PreviewStage>
  )
}
