import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Padlet',
  slug: 'padlet',
  color: '#FF4081',
  exampleUrl:
    'https://padlet.com/gallerytemplates/board-examples-re4mdv6hltsgef9b',
  metaTitle: 'Padlet Embed Code Generator — Embed Boards & Walls',
  metaDescription:
    'Free Padlet embed code generator. Paste any Padlet URL — get a ready-to-paste embed for collaborative boards, walls, maps, and timelines. No signup.',
  keywords: [
    'embed padlet',
    'padlet embed code',
    'padlet embed code generator',
    'embed padlet board',
    'padlet iframe code',
    'embed padlet wall',
    'padlet board embed'
  ],
  heroTitle: 'Padlet Embed Code Generator',
  heroSubtitle:
    'Paste any Padlet URL — get a ready-to-paste embed for collaborative boards, walls, maps, and timelines.',
  howItWorksHeading: 'How to embed a Padlet board',
  howItWorksSteps: [
    {
      title: 'Paste a Padlet link',
      description:
        'Copy any padlet.com URL — collaborative boards, walls, maps, and timelines.'
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
  explanationHeading: 'Why use our Padlet embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Padlet link and get working embed HTML.'
    },
    {
      title: 'All Padlet layouts',
      description:
        'Works with walls, grids, shelves, maps, and timelines — the tool handles all Padlet URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Padlet embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive board',
      description:
        'Get the real Padlet embed so readers can scroll posts, open attachments, and react in place.'
    },
    {
      title: 'Walls, maps & timelines',
      description:
        'Every Padlet layout works — walls, grids, shelves, maps, and timelines render responsively.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/miro', label: 'Miro' },
    { href: '/tools/embed-url/whimsical', label: 'Whimsical' },
    { href: '/tools/embed-url/wizer-me', label: 'Wizer.me' }
  ],
  faq: [
    {
      question: 'How do I embed a Padlet board on my website?',
      answer:
        'Paste any Padlet URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Which Padlet layouts can I embed?',
      answer:
        'All of them — walls, grids, shelves, maps, and timelines are supported.'
    },
    {
      question: 'Can readers interact with the embedded board?',
      answer:
        'Yes. The native embed keeps the board interactive so visitors can scroll posts and open attachments. Whether they can add posts depends on the board permissions you set in Padlet.'
    },
    {
      question: 'What if the Padlet board is private?',
      answer:
        'Private or password-protected boards cannot be embedded interactively, so the tool falls back to a styled preview card with the available metadata.'
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
