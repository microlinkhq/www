import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Screenr',
  slug: 'screenr',
  color: '#5BA329',
  exampleUrl: 'https://screenr.com',
  metaTitle: 'Screenr Embed Code Generator — Embed Screencasts',
  metaDescription:
    'Free Screenr embed code generator. Paste any Screenr URL — get a ready-to-paste embed for web-based screencasts. No signup, no API key.',
  keywords: [
    'embed screenr',
    'screenr embed code',
    'screenr embed code generator',
    'embed screenr screencast',
    'screenr iframe code',
    'screenr player embed',
    'screenr screencast embed'
  ],
  heroTitle: 'Screenr Embed Code Generator',
  heroSubtitle:
    'Paste any Screenr URL — get a ready-to-paste embed for web-based screencasts.',
  howItWorksHeading: 'How to embed Screenr screencasts',
  howItWorksSteps: [
    {
      title: 'Paste a Screenr link',
      description:
        'Copy the URL of any screencast recorded with Screenr and drop it in.'
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
  explanationHeading: 'Why use our Screenr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to track down the original share options — paste a Screenr link and get working HTML instantly.'
    },
    {
      title: 'Built for screencasts',
      description:
        'Screenr was a web-based screen recorder for creating and sharing screencasts, and the tool resolves its links for you.'
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
      title: 'Screencast playback',
      description:
        'Turns a Screenr link into an embeddable player so visitors can watch the recording inline.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed scales to fit any container so screencasts look right at any width.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/dadan', label: 'Dadan' }
  ],
  faq: [
    {
      question: 'How do I embed a Screenr screencast on my website?',
      answer:
        'Paste the Screenr URL into the tool and click Generate, then copy the HTML into your page.'
    },
    {
      question: 'What kind of content does Screenr host?',
      answer:
        'Screenr was a web-based screen recorder, so its links point to screencasts recorded and shared through the service.'
    },
    {
      question: 'Will the embedded screencast be responsive?',
      answer:
        'Yes — the generated code adapts to the width of its container so the player looks right on any device.'
    },
    {
      question: 'What if the Screenr screencast is unavailable?',
      answer:
        'The tool falls back to a styled preview card with the available metadata so your layout stays intact.'
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
