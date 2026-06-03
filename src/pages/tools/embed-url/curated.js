import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Curated',
  slug: 'curated',
  color: '#f57f3c',
  exampleUrl: 'https://newsletterfest.curated.co/issues/6',
  metaTitle: 'Curated Embed Code Generator — Embed Newsletter Issues',
  metaDescription:
    'Free Curated embed code generator. Paste a Curated newsletter issue URL — get a ready-to-paste embed or preview card for the web archive. No signup.',
  keywords: [
    'embed curated',
    'curated embed code',
    'curated embed code generator',
    'embed curated newsletter',
    'curated issue embed',
    'curated newsletter archive embed',
    'embed curated issue'
  ],
  heroTitle: 'Curated Embed Code Generator',
  heroSubtitle:
    'Paste a Curated newsletter issue URL — get a ready-to-paste embed or preview card for the web archive.',
  howItWorksHeading: 'How to embed a Curated newsletter issue',
  howItWorksSteps: [
    {
      title: 'Paste a Curated link',
      description:
        'Copy a published issue URL from a Curated newsletter, like yourpublication.curated.co/issues/6.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the issue title and image and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Curated embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste a Curated issue link and get a working preview to embed.'
    },
    {
      title: 'Built for newsletter archives',
      description:
        'Turn a published Curated issue from the web archive into a clean, shareable preview.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Curated embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Newsletter issue previews',
      description:
        'Link a published Curated issue and get a preview with its title, image, and link back to the archive.'
    },
    {
      title: 'Responsive layout',
      description:
        'The preview adapts to your page width so it looks right inline or as a feature block.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/buttondown', label: 'Buttondown' },
    { href: '/tools/embed-url/kit', label: 'Kit' },
    { href: '/tools/embed-url/wordpress-com', label: 'WordPress.com' }
  ],
  faq: [
    {
      question: 'How do I embed a Curated newsletter issue on my website?',
      answer:
        'Paste a published Curated issue URL into the tool and click Generate. You will get a ready-to-paste preview of the issue.'
    },
    {
      question: 'Which Curated URLs work?',
      answer:
        'Public issue URLs from a Curated web archive, such as yourpublication.curated.co/issues/6, work best.'
    },
    {
      question: 'Can I embed a private or unpublished issue?',
      answer:
        'No. Only publicly published issues from the web archive can be read. Draft or private issues are not accessible.'
    },
    {
      question: 'What if the issue cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the issue title and image so you always get something to paste.'
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
