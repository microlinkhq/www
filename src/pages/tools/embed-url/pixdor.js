import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pixdor',
  slug: 'pixdor',
  color: '#00A36C',
  exampleUrl: 'https://pixdor.com',
  metaTitle: 'Pixdor Embed Code Generator — Embed Interactive Maps',
  metaDescription:
    'Free Pixdor embed code generator. Paste any Pixdor URL — get a ready-to-paste embed for interactive maps and markers. No signup.',
  keywords: [
    'embed pixdor',
    'pixdor embed code',
    'pixdor embed code generator',
    'embed pixdor map',
    'pixdor interactive map embed',
    'pixdor iframe code',
    'pixdor map embed'
  ],
  heroTitle: 'Pixdor Embed Code Generator',
  heroSubtitle:
    'Paste any Pixdor URL — get a ready-to-paste embed for interactive maps and markers.',
  howItWorksHeading: 'How to embed Pixdor maps',
  howItWorksSteps: [
    {
      title: 'Paste a Pixdor link',
      description:
        'Copy the URL of your Pixdor interactive map and paste it in.'
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
  explanationHeading: 'Why use our Pixdor embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Turn any Pixdor map link into a working embed without configuring tiles or scripts.'
    },
    {
      title: 'Keep maps interactive',
      description:
        'Readers can pan, zoom, and click markers right inside your page.'
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
      title: 'Native map embed',
      description:
        'Get the real Pixdor map so visitors can explore markers and locations in place.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The map scales to fit any column width and stays usable on mobile screens.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/naturalatlas', label: 'Natural Atlas' },
    { href: '/tools/embed-url/storymaps', label: 'StoryMaps' },
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' }
  ],
  faq: [
    {
      question: 'How do I embed a Pixdor map on my website?',
      answer:
        'Paste the Pixdor URL into the tool, click Generate, then copy the HTML and paste it where you want the map to appear.'
    },
    {
      question: 'Can visitors interact with the embedded map?',
      answer:
        'Yes. The native embed keeps the map interactive so people can pan, zoom, and click markers without leaving your page.'
    },
    {
      question: 'Will the map work on mobile devices?',
      answer:
        'It does. The generated embed is responsive and adjusts to the available width on phones and tablets.'
    },
    {
      question: 'What if the map cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and image and a link to the original map.'
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
