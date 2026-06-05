import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Land of Assets',
  slug: 'landofassets',
  color: '#1E1E2E',
  exampleUrl: 'https://landofassets.com',
  metaTitle: 'Land of Assets Embed Code Generator — Embed 3D Models & Assets',
  metaDescription:
    'Free Land of Assets embed code generator. Paste any Land of Assets URL — get a ready-to-paste embed or preview card for 3D models and digital game assets. No signup.',
  keywords: [
    'embed land of assets',
    'land of assets embed code',
    'land of assets embed code generator',
    'embed 3d model land of assets',
    'land of assets iframe code',
    'embed game asset',
    'land of assets product embed'
  ],
  heroTitle: 'Land of Assets Embed Code Generator',
  heroSubtitle:
    'Paste any Land of Assets URL — get a ready-to-paste embed or preview card for 3D models and digital game assets.',
  howItWorksHeading: 'How to embed Land of Assets content',
  howItWorksSteps: [
    {
      title: 'Paste a Land of Assets link',
      description:
        'Copy any landofassets.com URL — a 3D model or digital asset listing — and paste it into the tool.'
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
  explanationHeading: 'Why use our Land of Assets embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Land of Assets link and get working embed HTML — no wrestling with marketplace snippets.'
    },
    {
      title: 'Built for 3D models & assets',
      description:
        'Recognizes Land of Assets product and listing URLs and pulls the right title, preview, and price details.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Asset listing detection',
      description:
        'Identifies 3D model and digital asset pages and builds the matching embed for each listing.'
    },
    {
      title: 'Preview image & metadata',
      description:
        'Pulls the asset thumbnail, title, and description so buyers know what they are looking at.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/briovr', label: 'BrioVR' },
    { href: '/tools/embed-url/assemblrworld', label: 'Assemblr World' },
    { href: '/tools/embed-url/twinmotion', label: 'Twinmotion' }
  ],
  faq: [
    {
      question: 'How do I embed a Land of Assets 3D model on my website?',
      answer:
        'Paste the asset listing URL from landofassets.com into the tool and click Generate to get the embed HTML.'
    },
    {
      question: 'Can I embed any digital asset from Land of Assets?',
      answer:
        'Yes — the tool handles 3D models and other digital asset listings and generates the right embed for each.'
    },
    {
      question: 'Will the embed show the asset preview and price?',
      answer:
        'When the listing exposes that metadata, the embed includes the preview image, title, and available details.'
    },
    {
      question: 'What if a Land of Assets page cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
