import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'EventLive',
  slug: 'eventlive',
  color: '#3f5b7a',
  exampleUrl: 'https://evt.live/tkshotz/chace-and-olivia-s-wedding',
  metaTitle: 'EventLive Embed Code Generator — Embed Live Event Streams',
  metaDescription:
    'Free EventLive embed code generator. Paste an EventLive link to embed a live wedding, funeral, or memorial stream, or get a preview card. No signup.',
  keywords: [
    'embed eventlive',
    'eventlive embed code',
    'embed eventlive stream',
    'eventlive embed generator',
    'embed eventlive wedding livestream',
    'embed eventlive funeral stream',
    'eventlive player embed',
    'embed live event stream'
  ],
  heroTitle: 'EventLive Embed Code Generator',
  heroSubtitle:
    'Paste an EventLive event link to get ready-to-paste embed code for the live stream, or a styled preview card.',
  howItWorksHeading: 'How to embed an EventLive stream',
  howItWorksSteps: [
    {
      title: 'Paste an EventLive link',
      description:
        'Copy your event link from evt.live or eventlive.pro — the unique link to a wedding, funeral, memorial, or other live event.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the EventLive event and generates the right embed HTML for its live stream player.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our EventLive embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste an EventLive event link and get working embed HTML — no need to copy iframe tags by hand.'
    },
    {
      title: 'Built for live events',
      description:
        'Embed streams and replays of weddings, funerals, memorials, graduations, and other events on your own page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 EventLive embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native player embed',
      description:
        'Get the real EventLive player so visitors can watch the live stream right on your page when embedding is available.'
    },
    {
      title: 'Streams and replays',
      description:
        'Works with live event links as well as replays available after the broadcast ends.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/ustream', label: 'Ustream' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed an EventLive stream on my website?',
      answer:
        'Paste your EventLive event link (from evt.live or eventlive.pro) into the tool and click Generate. You get embed HTML you can paste into any page.'
    },
    {
      question: 'Can I embed a live wedding or funeral stream?',
      answer:
        'Yes. EventLive is built for live events like weddings, funerals, and memorials, and the tool embeds the player for the event link you paste.'
    },
    {
      question: 'Does the embed work for replays too?',
      answer:
        'Yes. Once a broadcast ends, the same event link plays the replay, so the embed keeps working after the live stream.'
    },
    {
      question: 'What if the EventLive event is private?',
      answer:
        'EventLive event links are private by default, so if native embedding is restricted the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
