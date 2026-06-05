import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Fader',
  slug: 'fader',
  color: '#1A1A1A',
  exampleUrl:
    'https://app.getfader.com/projects/088f277d-e9b4-4f80-a0bc-27d367d8a060/publish',
  metaTitle: 'Fader Embed Code Generator — Embed 360° & VR Stories',
  metaDescription:
    'Free Fader embed code generator. Paste a getfader.com story URL to get a ready-to-paste 360°/VR embed or preview card. No signup.',
  keywords: [
    'embed fader',
    'fader embed code',
    'fader embed generator',
    'embed fader 360 story',
    'embed fader vr story',
    'getfader embed',
    'embed 360 story',
    'fader iframe embed'
  ],
  heroTitle: 'Fader Embed Code Generator',
  heroSubtitle:
    'Paste a Fader 360° story URL and get a ready-to-paste interactive embed or preview card.',
  howItWorksHeading: 'How to embed a Fader 360° story',
  howItWorksSteps: [
    {
      title: 'Paste a Fader link',
      description:
        'Copy the URL of a published getfader.com 360°/VR story and paste it in.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Fader story and generates a responsive iframe embed.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Fader embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a published Fader story link and get working iframe HTML — no need to dig through Fader settings.'
    },
    {
      title: 'Interactive 360° stories',
      description:
        'Keeps the immersive 360°/VR playback so readers can look around and tap hotspots in place.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Fader embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native 360° embed',
      description:
        'Get the real Fader iframe so the published 360°/VR story stays fully interactive.'
    },
    {
      title: 'Responsive by default',
      description:
        'The embed scales to fit posts, docs, and pages on desktop, mobile, and VR headsets.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/matterport', label: 'Matterport' },
    { href: '/tools/embed-url/sketchfab', label: 'Sketchfab' },
    { href: '/tools/embed-url/briovr', label: 'BrioVR' }
  ],
  faq: [
    {
      question: 'How do I embed a Fader 360° story on my website?',
      answer:
        'Paste the published getfader.com story URL into the tool and click Generate to get a ready-to-paste iframe.'
    },
    {
      question: 'What kind of content can I embed from Fader?',
      answer:
        'Fader publishes interactive 360°/VR stories that combine 360° images and video with text, sound, and clickable hotspots.'
    },
    {
      question: 'Will the embedded story stay interactive?',
      answer:
        'Yes — the native embed keeps the immersive 360° playback so viewers can look around and tap hotspots, including on VR headsets.'
    },
    {
      question: 'What if the Fader story is private or unpublished?',
      answer:
        'Only published stories can be embedded. If a story is not publicly available, the tool falls back to a styled preview card with the available metadata.'
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
