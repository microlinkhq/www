import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'DeviantArt',
  slug: 'deviantart-com',
  color: '#05CC47',
  exampleUrl: 'https://www.deviantart.com/spinebender/art/Cyrus-403371169',
  metaTitle: 'DeviantArt Embed Code Generator — Embed Deviations & Artwork',
  metaDescription:
    'Free DeviantArt embed code generator. Paste any deviation URL — get ready-to-paste HTML to embed artwork, illustrations, and photography on your site. No signup.',
  keywords: [
    'embed deviantart',
    'deviantart embed code',
    'deviantart embed code generator',
    'embed deviantart art',
    'embed deviantart deviation',
    'deviantart iframe code',
    'embed deviantart artwork'
  ],
  heroTitle: 'DeviantArt Embed Code Generator',
  heroSubtitle:
    'Paste any DeviantArt deviation URL — get ready-to-paste HTML to embed artwork, illustrations, and photography.',
  howItWorksHeading: 'How to embed DeviantArt artwork',
  howItWorksSteps: [
    {
      title: 'Paste a DeviantArt link',
      description:
        'Copy any deviantart.com deviation URL — digital art, illustrations, photography, and traditional pieces.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the deviation and generates the right embed HTML for the artwork.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our DeviantArt embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through oEmbed responses. Paste any deviation link and get working embed HTML.'
    },
    {
      title: 'All deviation types',
      description:
        'Works with digital art, illustrations, photography, and traditional artwork shared on DeviantArt.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 DeviantArt embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Real deviation preview',
      description:
        'Pull the artwork image, title, and artist straight from the deviation page.'
    },
    {
      title: 'Responsive artwork embed',
      description:
        'The embed scales to fit your layout so deviations look sharp on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/behance',
      label: 'Behance'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    },
    {
      href: '/tools/embed-url/sketchfab',
      label: 'Sketchfab'
    }
  ],
  faq: [
    {
      question: 'How do I embed a DeviantArt deviation on my website?',
      answer:
        'Paste any DeviantArt deviation URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of DeviantArt content can I embed?',
      answer:
        'Digital art, illustrations, photography, and traditional artwork shared as deviations are all supported.'
    },
    {
      question: 'Can I embed mature or private deviations?',
      answer:
        'No. Only public deviations can be embedded. Mature-content or private pieces are not available to anonymous viewers.'
    },
    {
      question: 'What if the artwork cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card showing the artwork image and title that you can customize before copying.'
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
