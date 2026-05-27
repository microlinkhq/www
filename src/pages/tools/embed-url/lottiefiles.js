import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'LottieFiles',
  slug: 'lottiefiles',
  color: '#00DDB3',
  exampleUrl: 'https://lottiefiles.com',
  metaTitle: 'LottieFiles Embed Code Generator — Embed Lottie animations',
  metaDescription:
    'Free LottieFiles embed code generator. Paste any LottieFiles URL — get a ready-to-paste embed for Lottie animations. No signup.',
  keywords: [
    'embed lottiefiles',
    'lottiefiles embed code',
    'lottie animation embed'
  ],
  heroTitle: 'LottieFiles Embed Code Generator',
  heroSubtitle:
    'Paste any LottieFiles URL — get a ready-to-paste embed for Lottie animations.',
  howItWorksHeading: 'How to embed LottieFiles content',
  howItWorksSteps: [
    {
      title: 'Paste a LottieFiles link',
      description: 'Copy any lottiefiles.com URL — Lottie animations.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content type and generates the right embed HTML.'
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
        'Skip the manual URL conversion. Paste any LottieFiles link and get working embed HTML.'
    },
    {
      title: 'All LottieFiles content',
      description:
        'Works with Lottie animations — the tool handles all LottieFiles URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 LottieFiles embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real LottieFiles embed with full interactivity when available.'
    },
    {
      title: 'All Lottie animations',
      description:
        'Works with Lottie animations — all LottieFiles content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed LottieFiles content on my website?',
      answer:
        'Paste any LottieFiles URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the LottieFiles embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the LottieFiles content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
