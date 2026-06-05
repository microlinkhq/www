import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sudomemo',
  slug: 'sudomemo',
  color: '#E60012',
  exampleUrl: 'https://sudomemo.net',
  metaTitle: 'Sudomemo Embed Code Generator — Embed Flipnote Animations',
  metaDescription:
    'Free Sudomemo embed code generator. Paste any Sudomemo URL — get a ready-to-paste player for Flipnote animations and creator pages. No signup.',
  keywords: [
    'embed sudomemo',
    'sudomemo embed code',
    'sudomemo embed code generator',
    'embed flipnote',
    'embed flipnote animation',
    'sudomemo iframe code',
    'sudomemo flipnote player embed'
  ],
  heroTitle: 'Sudomemo Embed Code Generator',
  heroSubtitle:
    'Paste any Sudomemo URL — get a ready-to-paste player for Flipnote animations and creator pages.',
  howItWorksHeading: 'How to embed Sudomemo Flipnotes',
  howItWorksSteps: [
    {
      title: 'Paste a Sudomemo link',
      description:
        'Copy the URL of any Flipnote or creator page from sudomemo.net and drop it into the field.'
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
  explanationHeading: 'Why use our Sudomemo embed code generator',
  reasons: [
    {
      title: 'Made for Flipnote animations',
      description:
        'Turn any Sudomemo Flipnote link into an animation player you can drop into a page in seconds.'
    },
    {
      title: 'Handles every Sudomemo link',
      description:
        'Works with individual Flipnote pages and creator profiles, no need to hunt for embed settings.'
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
      title: 'Flipnote animation player',
      description:
        'Embed Flipnote animations created with Nintendo Flipnote Studio straight from Sudomemo.'
    },
    {
      title: 'Creator page support',
      description:
        'Link to a creator profile and showcase their Flipnotes in a clean, responsive frame.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/vlipsy', label: 'Vlipsy' }
  ],
  faq: [
    {
      question: 'How do I embed a Sudomemo Flipnote on my website?',
      answer:
        'Paste the Flipnote URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I embed a whole Sudomemo creator page?',
      answer:
        'Yes. Paste a creator profile link and the tool builds an embed that points to their Flipnotes.'
    },
    {
      question: 'Will the Flipnote animation actually play in the embed?',
      answer:
        'When Sudomemo allows native embedding the animation plays inline; otherwise you get a preview card.'
    },
    {
      question: 'Do I need a Sudomemo account to use this?',
      answer:
        'No account is required. Just paste a public Sudomemo link and generate the code.'
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
