import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'BrioVR',
  slug: 'briovr',
  color: '#16C2D5',
  exampleUrl: 'https://experience.briovr.com/discover',
  metaTitle: 'BrioVR Embed Code Generator — Embed 3D, VR & AR Scenes',
  metaDescription:
    'Free BrioVR embed code generator. Paste any BrioVR scene URL — get a ready-to-paste embed for interactive 3D, VR, and AR scenes, or a preview card. No signup.',
  keywords: [
    'embed briovr',
    'briovr embed code',
    'briovr embed code generator',
    'embed briovr scene',
    'briovr 3d embed',
    'briovr iframe code',
    'embed briovr vr scene',
    'embed briovr ar scene'
  ],
  heroTitle: 'BrioVR Embed Code Generator',
  heroSubtitle:
    'Paste any BrioVR scene URL — get a ready-to-paste embed for interactive 3D, VR, and AR scenes.',
  howItWorksHeading: 'How to embed a BrioVR scene',
  howItWorksSteps: [
    {
      title: 'Paste a BrioVR link',
      description:
        'Copy the share URL for any published scene on experience.briovr.com.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the scene and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our BrioVR embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the share dialog. Paste any BrioVR scene link and get working embed HTML.'
    },
    {
      title: 'Interactive 3D in the browser',
      description:
        'The embed keeps the scene fully explorable — no downloads or installs for your visitors.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 BrioVR embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native scene viewer',
      description:
        'Get the real BrioVR viewer with orbit, pan, and zoom controls for the live 3D scene.'
    },
    {
      title: '3D, VR & AR scenes',
      description:
        'Works with interactive 3D presentations, VR walkthroughs, and AR scenes built in BrioVR.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/sketchfab',
      label: 'Sketchfab'
    },
    {
      href: '/tools/embed-url/matterport',
      label: 'Matterport'
    },
    {
      href: '/tools/embed-url/assemblrworld',
      label: 'Assemblr World'
    }
  ],
  faq: [
    {
      question: 'How do I embed a BrioVR scene on my website?',
      answer:
        'Paste your BrioVR scene URL into the tool and click Generate. You will get a ready-to-paste embed for the interactive scene.'
    },
    {
      question: 'What kinds of BrioVR content can I embed?',
      answer:
        'Interactive 3D scenes, VR walkthroughs, and AR scenes published from BrioVR are all supported.'
    },
    {
      question: 'Can visitors interact with the embedded scene?',
      answer:
        'Yes. The native embed keeps the scene explorable in the browser with no downloads or installs required.'
    },
    {
      question: 'What if the BrioVR scene is private?',
      answer:
        'If a scene is not publicly shared, the tool falls back to a styled preview card with the available title and image.'
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
