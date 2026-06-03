import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'BYZART',
  slug: 'byzart',
  color: '#66023C',
  exampleUrl: 'https://byzart.eu/archives/426',
  metaTitle: 'BYZART Embed Code Generator — Embed Byzantine Art Archive Items',
  metaDescription:
    'Free BYZART embed code generator. Paste a byzart.eu archive link — get a ready-to-paste preview card for Byzantine art photos, exhibitions, and records. No signup.',
  keywords: [
    'embed byzart',
    'byzart embed code',
    'byzart embed code generator',
    'embed byzantine art archive',
    'byzart archive embed',
    'embed byzart exhibition',
    'byzantine art digital archive embed'
  ],
  heroTitle: 'BYZART Embed Code Generator',
  heroSubtitle:
    'Paste a BYZART archive URL — get a ready-to-paste preview card for Byzantine art photos, exhibitions, and archive records.',
  howItWorksHeading: 'How to embed a BYZART archive item',
  howItWorksSteps: [
    {
      title: 'Paste a BYZART link',
      description:
        'Copy any byzart.eu URL — a digital exhibition, archive item, or collection page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a preview card with the title and image.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our BYZART embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste a BYZART link and get a clean, ready-to-paste preview card.'
    },
    {
      title: 'Built for archive pages',
      description:
        'Works with BYZART digital exhibitions and catalogue items documenting Byzantine and post-Byzantine art and archaeology.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 BYZART embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Title and image preview',
      description:
        'Each card pulls the item title and a representative image so readers can see what the archive page holds.'
    },
    {
      title: 'Photos, exhibitions & records',
      description:
        'Reference photographic plates, slides, digital exhibitions, and audio-visual records from the BYZART collections.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/deviantart-com',
      label: 'DeviantArt'
    },
    {
      href: '/tools/embed-url/getty-images',
      label: 'Getty Images'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    }
  ],
  faq: [
    {
      question: 'What is BYZART?',
      answer:
        'BYZART (Byzantine Art and Archaeology on Europeana) is a digitization project led by the University of Bologna that published tens of thousands of photos, audio, video, and records of Byzantine cultural heritage online.'
    },
    {
      question: 'How do I embed a BYZART archive item on my website?',
      answer:
        'Paste a byzart.eu URL into the tool and click Generate. You will get a ready-to-paste preview card with the item title and image.'
    },
    {
      question: 'What kind of BYZART content can I embed?',
      answer:
        'Digital exhibitions, photographic archive items, and collection pages documenting Byzantine and post-Byzantine art and archaeology.'
    },
    {
      question: 'What if the BYZART page has no embeddable player?',
      answer:
        'BYZART archive pages are not designed as embeds, so the tool falls back to a styled preview card built from the page title and image.'
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
