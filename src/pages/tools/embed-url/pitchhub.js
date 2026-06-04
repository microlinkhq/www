import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'PitchHub',
  slug: 'pitchhub',
  color: '#5A31F4',
  exampleUrl: 'https://pitchhub.com',
  metaTitle: 'PitchHub Embed Code Generator — Embed Pitch Decks',
  metaDescription:
    'Free PitchHub embed code generator. Paste any PitchHub URL — get a ready-to-paste embed for pitch decks and presentations. No signup.',
  keywords: [
    'embed pitchhub',
    'pitchhub embed code',
    'pitchhub embed code generator',
    'embed pitchhub deck',
    'pitchhub presentation embed',
    'pitchhub iframe code',
    'pitchhub pitch deck embed'
  ],
  heroTitle: 'PitchHub Embed Code Generator',
  heroSubtitle:
    'Paste any PitchHub URL — get a ready-to-paste embed for pitch decks and presentations.',
  howItWorksHeading: 'How to embed PitchHub decks',
  howItWorksSteps: [
    {
      title: 'Paste a PitchHub link',
      description:
        'Copy the URL of your PitchHub deck or presentation and paste it in.'
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
  explanationHeading: 'Why use our PitchHub embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Turn any PitchHub deck link into a working embed without exporting slides or files.'
    },
    {
      title: 'Always shows the latest version',
      description:
        'The embed points to your live deck, so updates show up wherever it is shared.'
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
      title: 'Native deck embed',
      description:
        'Get the real PitchHub viewer so readers can flip through every slide in place.'
    },
    {
      title: 'Decks and presentations',
      description:
        'Works across PitchHub content, from short pitch decks to longer presentations.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/speakerdeck', label: 'SpeakerDeck' },
    { href: '/tools/embed-url/beautiful', label: 'Beautiful.ai' },
    { href: '/tools/embed-url/canva', label: 'Canva' }
  ],
  faq: [
    {
      question: 'How do I embed a PitchHub deck on my website?',
      answer:
        'Paste the PitchHub URL into the tool, click Generate, then copy the HTML and paste it where you want the deck to appear.'
    },
    {
      question: 'Can readers page through the slides in the embed?',
      answer:
        'Yes. The native embed keeps the deck interactive so visitors can move through the slides without leaving your page.'
    },
    {
      question: 'Will the embed update when I edit my deck?',
      answer:
        'The embed links to your live PitchHub deck, so changes you publish appear in the embedded version too.'
    },
    {
      question: 'What if the deck cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and image and a link to the original deck.'
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
