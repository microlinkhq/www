import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'StoryMaps',
  slug: 'storymaps',
  color: '#007AC2',
  exampleUrl: 'https://storymaps.arcgis.com',
  metaTitle: 'StoryMaps Embed Code Generator — Embed Interactive Story Maps',
  metaDescription:
    'Free StoryMaps embed code generator. Paste any Esri StoryMaps URL — get a ready-to-paste embed for interactive maps with narrative, images, and media. No signup.',
  keywords: [
    'embed storymaps',
    'storymaps embed code',
    'storymaps embed code generator',
    'embed esri storymaps',
    'storymaps iframe code',
    'arcgis storymaps embed',
    'embed interactive story map'
  ],
  heroTitle: 'StoryMaps Embed Code Generator',
  heroSubtitle:
    'Paste any Esri StoryMaps URL — get a ready-to-paste embed for interactive, place-based stories.',
  howItWorksHeading: 'How to embed StoryMaps content',
  howItWorksSteps: [
    {
      title: 'Paste a StoryMaps link',
      description: 'Copy the share URL of any Esri StoryMaps story.'
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
  explanationHeading: 'Why use our StoryMaps embed code generator',
  reasons: [
    {
      title: 'Keep maps interactive',
      description:
        'Embed live StoryMaps so readers can pan, zoom, and scroll through the narrative instead of viewing a static image.'
    },
    {
      title: 'Tell place-based stories inline',
      description:
        'Bring interactive maps, text, images, and multimedia together right inside your article or report.'
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
      title: 'Interactive map embeds',
      description:
        'Render the full Esri StoryMaps experience with scrollable narrative and explorable maps.'
    },
    {
      title: 'Responsive sizing',
      description:
        'Embeds scale to fit blogs, news sites, and reports across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/naturalatlas', label: 'Natural Atlas' },
    { href: '/tools/embed-url/scribblemaps', label: 'Scribble Maps' },
    { href: '/tools/embed-url/socialexplorer', label: 'Social Explorer' }
  ],
  faq: [
    {
      question: 'How do I embed a StoryMaps story on my website?',
      answer:
        'Paste the Esri StoryMaps share URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'Will the embedded map stay interactive?',
      answer:
        'Yes — when the story supports native embedding, readers can pan, zoom, and scroll through it inside your page.'
    },
    {
      question: 'What if the StoryMaps story is private?',
      answer:
        'Private or unshared stories fall back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Where can I paste the StoryMaps embed code?',
      answer:
        'Anywhere that accepts HTML — blog posts, news articles, reports, and CMS pages.'
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
