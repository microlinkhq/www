import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Twinmotion',
  slug: 'twinmotion',
  color: '#2D2D2D',
  exampleUrl: 'https://twinmotion.unrealengine.com',
  metaTitle: 'Twinmotion Embed Code Generator — Embed 3D Visualizations',
  metaDescription:
    'Free Twinmotion embed code generator. Paste any Twinmotion URL — get a ready-to-paste embed for interactive 3D visualizations and presentations. No signup.',
  keywords: [
    'embed twinmotion',
    'twinmotion embed code',
    'twinmotion embed code generator',
    'embed twinmotion presentation',
    'twinmotion iframe code',
    'embed 3d visualization',
    'twinmotion render embed'
  ],
  heroTitle: 'Twinmotion Embed Code Generator',
  heroSubtitle:
    'Paste any Twinmotion URL — get a ready-to-paste embed for interactive 3D visualizations and presentations.',
  howItWorksHeading: 'How to embed Twinmotion visualizations',
  howItWorksSteps: [
    {
      title: 'Paste a Twinmotion link',
      description:
        'Copy the share URL for your Twinmotion presentation or render.'
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
  explanationHeading: 'Why use our Twinmotion embed code generator',
  reasons: [
    {
      title: 'Share interactive 3D anywhere',
      description:
        'Drop a Twinmotion presentation into any web page so clients can explore the model in the browser.'
    },
    {
      title: 'No manual setup',
      description:
        'Paste a Twinmotion share link and get working embed HTML in seconds — no markup to write by hand.'
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
      title: 'Interactive presentation embed',
      description:
        'Embed Twinmotion 3D presentations with full pan, orbit, and walkthrough controls in the page.'
    },
    {
      title: 'Responsive viewport',
      description:
        'The embed scales to your layout so architectural visualizations look sharp on any screen.'
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
    { href: '/tools/embed-url/icosa-gallery', label: 'Icosa Gallery' }
  ],
  faq: [
    {
      question: 'How do I embed a Twinmotion presentation on my website?',
      answer:
        'Paste the Twinmotion share URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can visitors interact with the 3D model in the embed?',
      answer:
        'Yes. When the presentation supports it, viewers can orbit, pan, and move through the scene right in the page.'
    },
    {
      question: 'Will the Twinmotion embed work on mobile?',
      answer:
        'The embed scales to the width of your page so 3D visualizations stay usable on tablets and phones.'
    },
    {
      question:
        'What if the Twinmotion presentation cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card built from the available presentation metadata.'
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
