import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Animoto',
  slug: 'animoto',
  color: '#2BA8CB',
  exampleUrl: 'https://animoto.com/play/cWFQVN9hCqGv7Tbb9Nn0DA',
  metaTitle: 'Animoto Embed Code Generator — Embed Slideshow Videos',
  metaDescription:
    'Free Animoto embed code generator. Paste an Animoto video URL — get a ready-to-paste iframe player for your slideshows and marketing videos. No signup.',
  keywords: [
    'embed animoto',
    'animoto embed code',
    'animoto embed code generator',
    'embed animoto video',
    'animoto iframe code',
    'animoto video embed',
    'embed animoto slideshow'
  ],
  heroTitle: 'Animoto Embed Code Generator',
  heroSubtitle:
    'Paste an Animoto video URL — get a ready-to-paste iframe player for your slideshows and marketing videos.',
  howItWorksHeading: 'How to embed an Animoto video',
  howItWorksSteps: [
    {
      title: 'Paste an Animoto link',
      description:
        'Copy any animoto.com/play link from your video Share page and paste it in.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the Animoto video and generates the right embed HTML automatically.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Animoto embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu. Paste any Animoto link and get working embed HTML.'
    },
    {
      title: 'Built for video',
      description:
        'Works with Animoto slideshow and marketing videos so they play right where you embed them.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Animoto embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Animoto player',
      description:
        'Get the real Animoto video player with playback controls right inside your page.'
    },
    {
      title: 'Responsive embed',
      description:
        'The video player scales to fit your layout on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/animatron',
      label: 'Animatron'
    },
    {
      href: '/tools/embed-url/wavevideo',
      label: 'Wave.video'
    },
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Animoto video on my website?',
      answer:
        'Paste your animoto.com/play URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Where do I find my Animoto video link?',
      answer:
        'Open your video in Animoto, click Share beneath the player, and copy the link. It looks like animoto.com/play/your-video-id.'
    },
    {
      question: 'Is the embedded video responsive?',
      answer:
        'Yes. The Animoto player scales to fit your container so it looks right on desktop and mobile.'
    },
    {
      question: 'What if the video cannot be embedded natively?',
      answer:
        'Switch to Card mode and the tool generates a styled preview card with the title and thumbnail instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const AnimotoPage = () => <ProviderSubtool {...data} />

export default AnimotoPage
