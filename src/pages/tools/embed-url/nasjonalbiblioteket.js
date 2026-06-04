import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Nasjonalbiblioteket',
  slug: 'nasjonalbiblioteket',
  color: '#00205B',
  exampleUrl: 'https://nb.no',
  metaTitle:
    'Nasjonalbiblioteket Embed Code Generator — Embed Digitized Books & Media',
  metaDescription:
    'Free Nasjonalbiblioteket embed code generator. Paste any nb.no URL — get a ready-to-paste embed for digitized books, photos, and media. No signup.',
  keywords: [
    'embed nasjonalbiblioteket',
    'nasjonalbiblioteket embed code',
    'nasjonalbiblioteket embed code generator',
    'embed nb.no',
    'nasjonalbiblioteket iframe code',
    'embed digitized books',
    'national library norway embed'
  ],
  heroTitle: 'Nasjonalbiblioteket Embed Code Generator',
  heroSubtitle:
    'Paste any nb.no URL — get a ready-to-paste embed for digitized books, photos, and media from the National Library of Norway.',
  howItWorksHeading: 'How to embed Nasjonalbiblioteket content',
  howItWorksSteps: [
    {
      title: 'Paste a Nasjonalbiblioteket link',
      description: 'Copy the URL of any nb.no item from the digital collection.'
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
  explanationHeading: 'Why use our Nasjonalbiblioteket embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any nb.no link and get working embed HTML in one step.'
    },
    {
      title: 'Built for archive material',
      description:
        'Embed digitized books, photographs, maps, and manuscripts directly into your page.'
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
      title: 'Embed digitized items',
      description:
        'Turn a nb.no link to a book, newspaper, photo, or map into clean embeddable HTML.'
    },
    {
      title: 'Perfect for research & history',
      description:
        'Cite and showcase primary sources from the National Library of Norway in articles and exhibits.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed Nasjonalbiblioteket content on my website?',
      answer:
        'Paste the nb.no URL into the tool and click Generate to get embeddable HTML.'
    },
    {
      question: 'What kind of Nasjonalbiblioteket content can I embed?',
      answer:
        'Digitized books, newspapers, photographs, maps, manuscripts, and other media from the collection.'
    },
    {
      question: 'Can I use these embeds in research articles?',
      answer:
        'Yes — paste the generated HTML into your blog, CMS, or academic page to showcase primary sources.'
    },
    {
      question: 'What if the Nasjonalbiblioteket item is restricted?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
