import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'LottieFiles',
  slug: 'lottiefiles',
  color: '#00DDB3',
  exampleUrl:
    'https://lottiefiles.com/free-animation/animated-play-button-Dd3YRSY70M',
  metaTitle: 'LottieFiles Embed Code Generator — Embed Lottie Animations',
  metaDescription:
    'Free LottieFiles embed code generator. Paste any LottieFiles animation URL — get ready-to-paste HTML to embed lightweight, scalable Lottie motion graphics. No signup.',
  keywords: [
    'embed lottiefiles',
    'lottiefiles embed code',
    'lottiefiles embed code generator',
    'embed lottie animation',
    'lottie animation embed code',
    'embed lottiefiles animation',
    'lottiefiles iframe code'
  ],
  heroTitle: 'LottieFiles Embed Code Generator',
  heroSubtitle:
    'Paste any LottieFiles animation URL — get ready-to-paste HTML to embed lightweight, scalable Lottie motion graphics on your site.',
  howItWorksHeading: 'How to embed a LottieFiles animation',
  howItWorksSteps: [
    {
      title: 'Paste a LottieFiles link',
      description:
        'Copy a public animation URL from lottiefiles.com — free-animation pages and shared animation links both work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the animation and generates the right embed HTML so the motion graphic plays inline.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our LottieFiles embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the script tags and player config. Paste any LottieFiles link and get working embed HTML.'
    },
    {
      title: 'Lightweight motion graphics',
      description:
        'Lottie animations are vector-based and scalable, so they stay crisp at any size without heavy video files.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 LottieFiles embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Lottie playback',
      description:
        'Get the real animation playing inline with autoplay and loop, just like on LottieFiles.'
    },
    {
      title: 'Scales to any layout',
      description:
        'Vector Lottie animations render sharp on any screen and adapt responsively to your container.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    },
    {
      href: '/tools/embed-url/giphy',
      label: 'Giphy'
    },
    {
      href: '/tools/embed-url/framer',
      label: 'Framer'
    }
  ],
  faq: [
    {
      question: 'How do I embed a LottieFiles animation on my website?',
      answer:
        'Paste a public LottieFiles animation URL into the tool and click Generate. You will get a ready-to-paste embed you can drop into any page.'
    },
    {
      question: 'What kind of content can I embed from LottieFiles?',
      answer:
        'Lottie animations — the lightweight, vector-based motion graphics used for icons, loaders, illustrations, and UI effects on web and apps.'
    },
    {
      question: 'Can I embed a private animation?',
      answer:
        'No. The animation must be public or shared via a public link. Private animations are not accessible to the tool.'
    },
    {
      question: 'What if the animation cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the animation title and a thumbnail image so you still get a clean result to paste.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const LottieFilesPage = () => <ProviderSubtool {...data} />

export default LottieFilesPage
