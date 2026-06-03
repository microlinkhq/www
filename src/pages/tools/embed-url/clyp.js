import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Clyp',
  slug: 'clyp',
  color: '#3DBEB3',
  exampleUrl: 'https://clyp.it/n14skqcv',
  metaTitle: 'Clyp Embed Code Generator — Embed Audio Clips',
  metaDescription:
    'Free Clyp embed code generator. Paste any clyp.it link — get a ready-to-paste audio player for recordings, songs, and voice clips. No signup.',
  keywords: [
    'embed clyp',
    'clyp embed code',
    'clyp embed code generator',
    'embed clyp audio',
    'clyp iframe code',
    'clyp player embed',
    'embed clyp.it audio'
  ],
  heroTitle: 'Clyp Embed Code Generator',
  heroSubtitle:
    'Paste any clyp.it link — get a ready-to-paste audio player for recordings, songs, and voice clips.',
  howItWorksHeading: 'How to embed Clyp audio',
  howItWorksSteps: [
    {
      title: 'Paste a Clyp link',
      description:
        'Copy any clyp.it audio link — recordings, songs, podcasts, and voice clips.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Clyp audio and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Clyp embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual /widget URL trick. Paste any Clyp link and get working embed HTML.'
    },
    {
      title: 'Any public Clyp',
      description:
        'Works with any public clyp.it audio link — the tool handles the URL formatting for you.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Clyp embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Clyp player',
      description:
        'Get the real Clyp audio player with waveform, playback controls, and the clip title.'
    },
    {
      title: 'Responsive audio embed',
      description:
        'The player fills its container width, so it stays readable on desktop and mobile alike.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/mixcloud',
      label: 'Mixcloud'
    },
    {
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Clyp audio clip on my website?',
      answer:
        'Paste any clyp.it link into the tool and click Generate. You will get a ready-to-paste audio player.'
    },
    {
      question: 'What kind of audio can I embed from Clyp?',
      answer:
        'Any public Clyp works — voice recordings, songs, podcasts, and other audio clips.'
    },
    {
      question: 'Can I embed a private Clyp?',
      answer:
        'No. Clyp disables the embed player for private clips, so only public clips can be embedded.'
    },
    {
      question: 'What if the Clyp player cannot be embedded?',
      answer:
        'Switch to Card mode and the tool generates a styled preview card with the title and image instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const ClypPage = () => <ProviderSubtool {...data} />

export default ClypPage
