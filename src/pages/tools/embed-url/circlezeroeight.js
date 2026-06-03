import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Circle Zero Eight',
  slug: 'circlezeroeight',
  color: '#111111',
  exampleUrl: 'https://www.circlezeroeight.com/sport/tony-hawk',
  metaTitle:
    'Circle Zero Eight Embed Code Generator — Embed Sport & Culture Articles',
  metaDescription:
    'Free Circle Zero Eight embed code generator. Paste a circlezeroeight.com article URL — get a ready-to-paste embed or styled preview card. No signup.',
  keywords: [
    'embed circle zero eight',
    'circle zero eight embed code',
    'circle zero eight embed generator',
    'embed circlezeroeight article',
    'circlezeroeight.com embed',
    'circle zero eight magazine embed',
    'circle zero eight link preview'
  ],
  heroTitle: 'Circle Zero Eight Embed Code Generator',
  heroSubtitle:
    'Paste a Circle Zero Eight article URL — get a ready-to-paste embed or styled preview card.',
  howItWorksHeading: 'How to embed a Circle Zero Eight article',
  howItWorksSteps: [
    {
      title: 'Paste a Circle Zero Eight link',
      description:
        'Copy any circlezeroeight.com URL — sport, style, and culture features or interviews.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the article metadata and generates ready-to-paste embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Circle Zero Eight embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Circle Zero Eight link and get working embed HTML — no copy-pasting metadata by hand.'
    },
    {
      title: 'Built for editorial content',
      description:
        'Pulls the headline and lead image from sport, style, and culture features so the embed looks right.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Circle Zero Eight embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Article link previews',
      description:
        'Turns a Circle Zero Eight feature or interview into a clean preview with title, image, and link.'
    },
    {
      title: 'Sport, style & culture',
      description:
        'Works across the magazine sections — athlete interviews, fashion editorials, and culture stories.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/sketchfab', label: 'Sketchfab' }
  ],
  faq: [
    {
      question: 'How do I embed a Circle Zero Eight article on my website?',
      answer:
        'Paste any circlezeroeight.com URL into the tool and click Generate. You will get a ready-to-paste embed or preview card.'
    },
    {
      question: 'What kind of content does Circle Zero Eight publish?',
      answer:
        'Circle Zero Eight is a magazine fusing sport, style, and culture, with feature interviews, photo editorials, and cultural stories.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'The card uses the article metadata — headline, lead image, and link — so readers can click through to the full story.'
    },
    {
      question: 'Does the embed work for any Circle Zero Eight page?',
      answer:
        'It works with public sport, style, and culture article URLs. Pages without readable metadata fall back to a basic preview card.'
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
