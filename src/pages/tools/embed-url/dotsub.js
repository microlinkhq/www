import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dotsub',
  slug: 'dotsub',
  color: '#425CCF',
  exampleUrl: 'https://dotsub.com/view/4ac48fd2-e5e1-4257-908c-31449ec4c8bf',
  metaTitle: 'Dotsub Embed Code Generator — Embed Subtitled Videos',
  metaDescription:
    'Free Dotsub embed code generator. Paste a Dotsub video URL — get a ready-to-paste player with multilingual subtitles and captions for your site. No signup.',
  keywords: [
    'embed dotsub',
    'dotsub embed code',
    'dotsub embed code generator',
    'embed dotsub video',
    'dotsub iframe code',
    'dotsub subtitled video embed',
    'embed dotsub player'
  ],
  heroTitle: 'Dotsub Embed Code Generator',
  heroSubtitle:
    'Paste a Dotsub video URL — get a ready-to-paste player with multilingual subtitles and captions.',
  howItWorksHeading: 'How to embed a Dotsub video',
  howItWorksSteps: [
    {
      title: 'Paste a Dotsub link',
      description:
        'Copy a dotsub.com video URL — typically a dotsub.com/view link to a subtitled video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right embed HTML for the captioned player.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Dotsub embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Dotsub embed options. Paste a link and get working embed HTML.'
    },
    {
      title: 'Keeps subtitles and captions',
      description:
        'The embedded player carries the video together with its multilingual subtitles and captions.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Dotsub embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Subtitled video player',
      description:
        'Get the Dotsub player with the video and its on-screen subtitles and captions.'
    },
    {
      title: 'Multilingual captions',
      description:
        'Viewers can pick from the languages your Dotsub video has been subtitled into.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Dotsub video on my website?',
      answer:
        'Paste your Dotsub video URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Do the subtitles and captions come through in the embed?',
      answer:
        'Yes. The embedded Dotsub player includes the video together with its subtitles and captions.'
    },
    {
      question: 'Can viewers switch subtitle languages in the embed?',
      answer:
        'If the video has been subtitled into multiple languages on Dotsub, viewers can choose their language from the player.'
    },
    {
      question: 'What if a Dotsub video cannot be embedded?',
      answer:
        'If native embedding is restricted, switch to Card mode to generate a styled preview card with the title and image instead.'
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
