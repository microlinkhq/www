import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sketchfab',
  slug: 'sketchfab',
  color: '#1CAAD9',
  exampleUrl:
    'https://sketchfab.com/3d-models/sci-fi-mega-castle-by-jungle-jim-b1cd2b9ae975477b87ab180faf46e2b2',
  metaTitle: 'Sketchfab Embed Code Generator — Embed 3D Models & AR/VR Scenes',
  metaDescription:
    'Free Sketchfab embed code generator. Paste any Sketchfab URL — get a ready-to-paste interactive 3D model viewer with AR/VR support. No signup.',
  keywords: [
    'embed sketchfab',
    'sketchfab embed code',
    'sketchfab embed code generator',
    'embed sketchfab 3d model',
    'sketchfab iframe code',
    'sketchfab 3d viewer embed',
    'embed sketchfab ar vr'
  ],
  heroTitle: 'Sketchfab Embed Code Generator',
  heroSubtitle:
    'Paste any Sketchfab URL — get a ready-to-paste interactive 3D model viewer with AR and VR support.',
  howItWorksHeading: 'How to embed a Sketchfab 3D model',
  howItWorksSteps: [
    {
      title: 'Paste a Sketchfab link',
      description:
        'Copy any sketchfab.com 3D model or scene URL from the address bar or the Share menu.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the model and generates the interactive 3D viewer embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Sketchfab embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share dialog. Paste any Sketchfab link and get working embed HTML.'
    },
    {
      title: 'Interactive 3D models',
      description:
        'Visitors can orbit, zoom, and pan the model right inside your page — no plugins or downloads.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Sketchfab embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native 3D viewer',
      description:
        'Get the real Sketchfab viewer with orbit controls, zoom, annotations, and AR/VR modes when available.'
    },
    {
      title: 'Responsive 3D scenes',
      description:
        'The viewer scales to fit your layout so models and scenes look right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/matterport',
      label: 'Matterport'
    },
    {
      href: '/tools/embed-url/behance',
      label: 'Behance'
    },
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Sketchfab 3D model on my website?',
      answer:
        'Paste any Sketchfab model URL into the tool and click Generate. You will get a ready-to-paste iframe with the interactive 3D viewer.'
    },
    {
      question: 'Can visitors rotate and zoom the embedded model?',
      answer:
        'Yes. The native Sketchfab viewer keeps full orbit, zoom, and pan controls, plus AR and VR modes when the model supports them.'
    },
    {
      question: 'Is the embed responsive on mobile?',
      answer:
        'Yes. The 3D viewer scales to fit its container, so it adapts to desktop and mobile layouts.'
    },
    {
      question: 'What if the Sketchfab model is private?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the available title and thumbnail.'
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
