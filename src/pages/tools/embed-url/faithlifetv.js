import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Faithlife TV',
  slug: 'faithlifetv',
  color: '#1E91D6',
  exampleUrl: 'https://faithlifetv.com/items/1277582',
  metaTitle:
    'Faithlife TV Embed Code Generator — Embed Christian Videos & Courses',
  metaDescription:
    'Free Faithlife TV embed code generator. Paste any Faithlife TV URL — get ready-to-paste embed HTML for Christian movies, documentaries, and Bible courses. No signup.',
  keywords: [
    'embed faithlife tv',
    'faithlife tv embed code',
    'faithlife tv embed code generator',
    'embed faithlife tv video',
    'faithlife tv iframe code',
    'faithlife tv video embed',
    'embed christian video faithlife tv'
  ],
  heroTitle: 'Faithlife TV Embed Code Generator',
  heroSubtitle:
    'Paste any Faithlife TV URL — get ready-to-paste embed HTML for Christian movies, documentaries, kids shows, and Bible video courses.',
  howItWorksHeading: 'How to embed a Faithlife TV video',
  howItWorksSteps: [
    {
      title: 'Paste a Faithlife TV link',
      description:
        'Copy any faithlifetv.com item URL — movies, documentaries, kids shows, or Bible video courses.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Faithlife TV video and generates the right embed HTML for you.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Faithlife TV embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through share menus. Paste any Faithlife TV link and get working embed HTML instantly.'
    },
    {
      title: 'All Faithlife TV content',
      description:
        'Works with Christian movies, documentaries, kids programming, and Logos Bible video courses.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Faithlife TV embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Faithlife TV player',
      description:
        'Get the real Faithlife TV video player with playback controls right inside your page.'
    },
    {
      title: 'Movies, courses & documentaries',
      description:
        'Feature films, faith-based kids shows, documentaries, and seminary-level video courses all work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/gloriatv',
      label: 'Gloria.tv'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Faithlife TV video on my website?',
      answer:
        'Paste any Faithlife TV item URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What Faithlife TV content can I embed?',
      answer:
        'Christian movies, documentaries, faith-based kids shows, and Logos Bible video courses are all supported.'
    },
    {
      question: 'Can I embed private or subscriber-only videos?',
      answer:
        'Only publicly viewable Faithlife TV items embed reliably. Videos behind a Faithlife TV Plus subscription may require viewers to be signed in.'
    },
    {
      question: 'What happens if a video cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card showing the title and thumbnail that links back to Faithlife TV.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const FaithlifeTVPage = () => <ProviderSubtool {...data} />

export default FaithlifeTVPage
