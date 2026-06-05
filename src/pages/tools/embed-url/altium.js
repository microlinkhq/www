import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Altium',
  slug: 'altium',
  color: '#D5BD81',
  exampleUrl:
    'https://personal-viewer.365.altium.com/client/index.html?feature=embed&source=43813802-47E4-4E9F-A52C-EAED1BDB57AB&activeView=SCH',
  metaTitle:
    'Altium Embed Code Generator — Embed PCB layouts, schematics & 3D designs',
  metaDescription:
    'Free Altium 365 embed code generator. Paste an Altium 365 Viewer link to embed interactive PCB layouts, schematics, BOMs, and 3D views. No signup.',
  keywords: [
    'embed altium',
    'altium embed code',
    'altium 365 viewer embed',
    'embed altium pcb',
    'embed altium schematic',
    'altium 365 embed code generator',
    'embed altium 3d design',
    'altium iframe embed'
  ],
  heroTitle: 'Altium Embed Code Generator',
  heroSubtitle:
    'Paste an Altium 365 Viewer link to get a ready-to-paste embed of your interactive PCB design or a preview card.',
  howItWorksHeading: 'How to embed an Altium 365 design',
  howItWorksSteps: [
    {
      title: 'Paste an Altium link',
      description:
        'Copy a shared Altium 365 Viewer link from 365.altium.com — schematics, PCB layouts, 3D views, or BOMs.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Altium 365 Viewer and generates the iframe HTML for an interactive design viewer.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Altium embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste an Altium 365 Viewer link and get working iframe embed HTML — no need to dig through the share menu.'
    },
    {
      title: 'Interactive design viewer',
      description:
        'Embed a CAD-centric viewer where readers can pan, zoom, and inspect schematics, PCB layouts, and 3D models in the browser.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Altium embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Altium 365 embed',
      description:
        'Get the real Altium 365 Viewer iframe with interactive schematic, PCB, and 3D navigation when sharing is enabled.'
    },
    {
      title: 'Schematics, PCB, 3D & BOM',
      description:
        'Works with the full range of Altium 365 Viewer content, including 2D/3D PCB layouts and bill-of-materials views.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/circuitlab', label: 'CircuitLab' },
    { href: '/tools/embed-url/wokwi', label: 'Wokwi' },
    { href: '/tools/embed-url/sketchfab', label: 'Sketchfab' }
  ],
  faq: [
    {
      question: 'How do I embed an Altium 365 design on my website?',
      answer:
        'Open your design in the Altium 365 Viewer, enable embedding from the share menu, copy the link, then paste it into the tool to generate the iframe embed HTML.'
    },
    {
      question: 'What types of Altium content can I embed?',
      answer:
        'Altium 365 Viewer designs, including interactive schematics, 2D and 3D PCB layouts, and bill-of-materials (BOM) views.'
    },
    {
      question: 'Is the embedded Altium viewer interactive?',
      answer:
        'Yes — the native embed loads the Altium 365 Viewer, so readers can pan, zoom, cross-probe, and inspect components and nets right in the page.'
    },
    {
      question: 'What if embedding is disabled or the design is private?',
      answer:
        'The tool falls back to a styled preview card with the available title and image so you still get something clean to share.'
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
