import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hippo Video',
  slug: 'hippovideo',
  color: '#FF5900',
  exampleUrl:
    'https://www.hippovideo.io/video/play/KQf5MPDupD2qFi4U_LYoo436nEf7gilJIW0I_Pn1Ia8',
  metaTitle:
    'Hippo Video Embed Code Generator — Embed Sales & Marketing Videos',
  metaDescription:
    'Free Hippo Video embed code generator. Paste a Hippo Video URL — get a ready-to-paste player for screen and camera recordings, sales videos, and video hubs. No signup.',
  keywords: [
    'embed hippo video',
    'hippo video embed code',
    'hippo video embed code generator',
    'embed hippo video player',
    'hippo video iframe code',
    'hippo video sales video embed',
    'embed hippo video recording'
  ],
  heroTitle: 'Hippo Video Embed Code Generator',
  heroSubtitle:
    'Paste a Hippo Video URL — get a ready-to-paste player for screen and camera recordings, sales videos, and video hubs.',
  howItWorksHeading: 'How to embed a Hippo Video video',
  howItWorksSteps: [
    {
      title: 'Paste a Hippo Video link',
      description:
        'Copy a hippovideo.io play or share URL for any screen, camera, or sales video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right embed HTML for the player.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Hippo Video embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Hippo Video share menus. Paste any link and get working embed HTML.'
    },
    {
      title: 'Built for sales & marketing videos',
      description:
        'Works with Hippo Video screen recordings, webcam videos, and prospecting videos.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Hippo Video embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Hippo Video player',
      description:
        'Get the real Hippo Video player with playback controls and the video thumbnail.'
    },
    {
      title: 'Responsive embed',
      description:
        'The player adapts to your layout so screen and camera recordings look right on any device.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/loom', label: 'Loom' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' }
  ],
  faq: [
    {
      question: 'How do I embed a Hippo Video video on my website?',
      answer:
        'Paste a Hippo Video play or share URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'What kind of Hippo Video content can I embed?',
      answer:
        'Hippo Video screen recordings, webcam videos, sales and prospecting videos, and video hubs all work.'
    },
    {
      question: 'Will the embed be responsive?',
      answer:
        'Yes. The Hippo Video player scales to fit its container, so it looks right on desktop and mobile.'
    },
    {
      question: 'What if the Hippo Video is private or unlisted?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card built from the available metadata.'
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
