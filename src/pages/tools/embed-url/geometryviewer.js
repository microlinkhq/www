import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Geometry Viewer',
  slug: 'geometryviewer',
  color: '#0D1117',
  exampleUrl:
    'https://geometryviewer.com/?url=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
  metaTitle: 'Geometry Viewer Embed Code Generator — Embed 3D Models',
  metaDescription:
    'Free Geometry Viewer embed code generator. Paste a geometryviewer.com link — get a ready-to-paste embed for interactive STL, OBJ, GLTF, GLB, and 3MF 3D models. No signup.',
  keywords: [
    'embed geometry viewer',
    'geometry viewer embed code',
    'geometry viewer embed code generator',
    'embed geometryviewer 3d model',
    'geometry viewer iframe code',
    'embed stl model',
    'embed glb model',
    'embed 3d model'
  ],
  heroTitle: 'Geometry Viewer Embed Code Generator',
  heroSubtitle:
    'Paste a geometryviewer.com link — get a ready-to-paste embed for an interactive 3D model viewer.',
  howItWorksHeading: 'How to embed a Geometry Viewer model',
  howItWorksSteps: [
    {
      title: 'Paste a Geometry Viewer link',
      description:
        'Copy a geometryviewer.com share link to a 3D model — STL, OBJ, GLTF, GLB, or 3MF.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Geometry Viewer link and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Geometry Viewer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste any Geometry Viewer link and get working embed HTML.'
    },
    {
      title: 'Interactive 3D models',
      description:
        'Embed models visitors can spin, pinch, and zoom right inside your page — no app or install.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Geometry Viewer embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive 3D viewer',
      description:
        'Embed the live Geometry Viewer so readers can rotate, pinch, and zoom the model in the browser.'
    },
    {
      title: 'STL, OBJ, GLTF, GLB & 3MF',
      description:
        'Common 3D and 3D-printing formats are supported, with the file type detected automatically.'
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
      href: '/tools/embed-url/briovr',
      label: 'BrioVR'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Geometry Viewer model on my website?',
      answer:
        'Paste a geometryviewer.com link into the tool and click Generate. You will get a ready-to-paste embed for the 3D viewer.'
    },
    {
      question: 'Which 3D file formats does it support?',
      answer:
        'Geometry Viewer handles common formats including STL, OBJ, GLTF, GLB, and 3MF, detected automatically from the file.'
    },
    {
      question: 'Can visitors rotate and zoom the model?',
      answer:
        'Yes. The embedded viewer is interactive, so readers can spin, pinch, and zoom the model without any app or install.'
    },
    {
      question: 'What if the model cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the title and an image so you still get a clean, linkable result.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GeometryViewerPage = () => <ProviderSubtool {...data} />

export default GeometryViewerPage
