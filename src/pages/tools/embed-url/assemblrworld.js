import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Assemblr World',
  slug: 'assemblrworld',
  color: '#0066FF',
  exampleUrl: 'https://studio.assemblrworld.com/explore',
  metaTitle: 'Assemblr World Embed Code Generator — Embed 3D & AR Projects',
  metaDescription:
    'Free Assemblr World embed code generator. Paste an Assemblr World project link to get a ready-to-paste 3D/AR embed or preview card. No signup.',
  keywords: [
    'embed assemblr world',
    'embed assemblr world ar',
    'assemblr world embed code',
    'assemblr world embed generator',
    'embed assemblr 3d project',
    'assemblr studio embed',
    'embed ar project',
    'embed 3d model assemblr'
  ],
  heroTitle: 'Assemblr World Embed Code Generator',
  heroSubtitle:
    'Paste an Assemblr World project link to get ready-to-paste embed HTML for your interactive 3D and AR experience.',
  howItWorksHeading: 'How to embed an Assemblr World project',
  howItWorksSteps: [
    {
      title: 'Paste an Assemblr World link',
      description:
        'Copy a published project link from studio.assemblrworld.com or an asblr.app share URL.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects your Assemblr World project and generates the interactive 3D/AR embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Assemblr World embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a published Assemblr World project link and get working embed HTML — no need to dig through the Share panel.'
    },
    {
      title: 'Interactive 3D & AR',
      description:
        'Embed Assemblr World scenes so visitors can rotate, zoom, and explore the 3D and AR content right on your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Assemblr World embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive embed',
      description:
        'Get the real Assemblr World viewer so visitors can pan, rotate, and zoom the 3D/AR scene without leaving your site.'
    },
    {
      title: 'Responsive viewer',
      description:
        'The embed scales to fit blog posts, course pages, and documentation across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/sketchfab', label: 'Sketchfab' },
    { href: '/tools/embed-url/matterport', label: 'Matterport' },
    { href: '/tools/embed-url/briovr', label: 'BrioVR' }
  ],
  faq: [
    {
      question: 'How do I embed an Assemblr World project on my website?',
      answer:
        'Publish your project in Assemblr Studio, copy its share link, then paste it into the tool to get ready-to-paste embed HTML.'
    },
    {
      question: 'What content can I embed from Assemblr World?',
      answer:
        'Interactive 3D and AR projects built in Assemblr Studio, including scenes with 3D models, animations, and clickable buttons.'
    },
    {
      question: 'Can visitors interact with the embedded 3D scene?',
      answer:
        'Yes. The native viewer lets people rotate, zoom, and explore the scene directly inside the embed.'
    },
    {
      question: 'What if the project is private or cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the project title and image so you still have something clean to paste.'
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
