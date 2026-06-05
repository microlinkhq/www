import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'GMetri',
  slug: 'gmetri',
  color: '#303fe1',
  exampleUrl: 'https://gmetri_demo.gmetri.com/gmetri_event_vr_public',
  metaTitle: 'GMetri Embed Code Generator — Embed VR & 3D XR Experiences',
  metaDescription:
    'Free GMetri embed code generator. Paste a GMetri experience URL — get a ready-to-paste iframe for VR, 3D, and interactive XR experiences. No signup.',
  keywords: [
    'embed gmetri',
    'gmetri embed code',
    'gmetri embed code generator',
    'embed gmetri experience',
    'gmetri iframe code',
    'embed vr experience',
    'embed gmetri vr',
    'gmetri xr embed'
  ],
  heroTitle: 'GMetri Embed Code Generator',
  heroSubtitle:
    'Paste a GMetri experience URL — get a ready-to-paste iframe for VR, 3D, and interactive XR experiences.',
  howItWorksHeading: 'How to embed a GMetri experience',
  howItWorksSteps: [
    {
      title: 'Paste a GMetri link',
      description:
        'Copy the public deployment URL of your published GMetri experience.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the experience and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our GMetri embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Publish tab. Paste a GMetri deployment link and get working embed HTML.'
    },
    {
      title: 'Immersive XR content',
      description:
        'Embed interactive VR, 3D, and 360 experiences built on GMetri right inside your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 GMetri embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive embed',
      description:
        'Get the real GMetri iframe so visitors can explore the experience with full interactivity.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The embed scales to fit your layout, keeping the experience playable across screen sizes.'
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
    { href: '/tools/embed-url/assemblrworld', label: 'Assemblr World' }
  ],
  faq: [
    {
      question: 'How do I embed a GMetri experience on my website?',
      answer:
        'Paste the public deployment URL of your GMetri experience into the tool and click Generate. You will get a ready-to-paste iframe.'
    },
    {
      question: 'What kind of content can I embed?',
      answer:
        'Interactive VR, 3D, 360, and other XR experiences created and published on the GMetri platform.'
    },
    {
      question: 'My experience is private — will it embed?',
      answer:
        'The deployment must have its Public option turned on to embed. Otherwise the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is the embedded experience interactive?',
      answer:
        'Yes. The native iframe keeps the experience fully interactive so visitors can navigate it directly on your page.'
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
