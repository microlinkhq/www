import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Odysee',
  slug: 'odysee',
  color: '#CA004B',
  exampleUrl: 'https://odysee.com/@Odysee:8/FutureofOdyseeVideo:0',
  metaTitle: 'Odysee Embed Code Generator — Embed Videos & Channels',
  metaDescription:
    'Free Odysee embed code generator. Paste any odysee.com URL — get a ready-to-paste iframe player for videos and channels on the LBRY network. No signup.',
  keywords: [
    'embed odysee',
    'odysee embed code',
    'odysee embed code generator',
    'embed odysee video',
    'odysee iframe code',
    'odysee video player embed',
    'embed odysee channel'
  ],
  heroTitle: 'Odysee Embed Code Generator',
  heroSubtitle:
    'Paste any Odysee URL — get a ready-to-paste iframe player for videos and channels on the decentralized LBRY network.',
  howItWorksHeading: 'How to embed an Odysee video',
  howItWorksSteps: [
    {
      title: 'Paste an Odysee link',
      description:
        'Copy any odysee.com URL — a video at odysee.com/@channel/video or a channel page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Odysee video and generates the matching $/embed iframe HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Odysee embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the $/embed URL by hand. Paste any Odysee link and get working embed HTML.'
    },
    {
      title: 'Videos and channels',
      description:
        'Works with individual videos and channel URLs — the tool handles the odysee.com link format.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Odysee embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Odysee player',
      description:
        'Get the real Odysee video player with playback controls, served from the LBRY network.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embed scales to fit your layout so the video looks right on desktop and mobile.'
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
      href: '/tools/embed-url/rumble',
      label: 'Rumble'
    },
    {
      href: '/tools/embed-url/dtube',
      label: 'DTube'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Odysee video on my website?',
      answer:
        'Paste any Odysee video URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'What Odysee content can I embed?',
      answer:
        'Individual videos work best. You can also paste channel URLs, and the tool will generate the matching embed.'
    },
    {
      question: 'What if a video cannot be embedded natively?',
      answer:
        'If native embedding is restricted, switch to Card mode to get a styled preview card with the title and thumbnail instead.'
    },
    {
      question: 'Is Odysee decentralized?',
      answer:
        'Yes. Odysee is built on the LBRY blockchain and serves content from a decentralized network. The embed loads the standard Odysee player.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const OdyseePage = () => <ProviderSubtool {...data} />

export default OdyseePage
