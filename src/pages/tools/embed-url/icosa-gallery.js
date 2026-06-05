import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Icosa Gallery',
  slug: 'icosa-gallery',
  color: '#00B8D4',
  exampleUrl: 'https://icosa.gallery',
  metaTitle: 'Icosa Gallery Embed Code Generator — Embed 3D Models',
  metaDescription:
    'Free Icosa Gallery embed code generator. Paste any Icosa Gallery URL — get a ready-to-paste interactive 3D model viewer for Open Brush sketches, Blocks models, and glTF assets. No signup.',
  keywords: [
    'embed icosa gallery',
    'icosa gallery embed code',
    'icosa gallery embed code generator',
    'embed 3d model',
    'icosa gallery iframe code',
    'embed open brush sketch',
    'icosa 3d viewer embed'
  ],
  heroTitle: 'Icosa Gallery Embed Code Generator',
  heroSubtitle:
    'Paste any Icosa Gallery URL — get a ready-to-paste interactive 3D viewer for Open Brush sketches, Blocks models, and glTF assets.',
  howItWorksHeading: 'How to embed Icosa Gallery content',
  howItWorksSteps: [
    {
      title: 'Paste an Icosa Gallery link',
      description:
        'Copy any icosa.gallery URL — Open Brush sketches, Blocks models, or uploaded 3D assets.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the 3D asset and generates the right interactive viewer HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Icosa Gallery embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Icosa Gallery link and get the interactive 3D viewer embed HTML — no exporting or hosting required.'
    },
    {
      title: 'Open-source 3D library',
      description:
        'Works with the community-run successor to Google Poly — Open Brush sketches, Blocks models, and glTF/GLB uploads.'
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
      title: 'Interactive 3D viewer',
      description:
        'Visitors can rotate, pan, and zoom the model right in the browser with the WebGL viewer.'
    },
    {
      title: 'Sketches, models & glTF',
      description:
        'Open Brush sketches, Blocks creations, and glTF/GLB uploads — every Icosa asset type works.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and thumbnail when the 3D viewer cannot load.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/briovr',
      label: 'BrioVR'
    },
    {
      href: '/tools/embed-url/assemblrworld',
      label: 'Assemblr'
    },
    {
      href: '/tools/embed-url/twinmotion',
      label: 'Twinmotion'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Icosa Gallery 3D model on my website?',
      answer:
        'Paste any Icosa Gallery URL into the tool and click Generate. You will get a ready-to-paste interactive 3D viewer.'
    },
    {
      question: 'What is Icosa Gallery?',
      answer:
        'Icosa Gallery is an open-source, community-run host for 3D models — the spiritual successor to Google Poly — supporting Open Brush sketches, Blocks models, and glTF assets.'
    },
    {
      question: 'Can visitors interact with the embedded model?',
      answer:
        'Yes. The embedded WebGL viewer lets visitors rotate, pan, and zoom the 3D model directly in the page.'
    },
    {
      question: 'What if the 3D viewer cannot load?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and thumbnail instead.'
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
