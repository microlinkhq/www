import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mixpanel',
  slug: 'mixpanel',
  color: '#5028C0',
  exampleUrl: 'https://mixpanel.com/project/3018488/view/3536632/app/boards',
  metaTitle: 'Mixpanel Embed Code Generator — Embed Boards & Reports',
  metaDescription:
    'Free Mixpanel embed code generator. Paste a Mixpanel board or report URL — get a ready-to-paste embed or a styled preview card. No signup.',
  keywords: [
    'embed mixpanel',
    'mixpanel embed code',
    'mixpanel embed code generator',
    'embed mixpanel board',
    'embed mixpanel report',
    'mixpanel dashboard embed',
    'mixpanel iframe code'
  ],
  heroTitle: 'Mixpanel Embed Code Generator',
  heroSubtitle:
    'Paste a Mixpanel board or report URL — get a ready-to-paste embed or a styled preview card.',
  howItWorksHeading: 'How to embed a Mixpanel board',
  howItWorksSteps: [
    {
      title: 'Paste a Mixpanel link',
      description:
        'Copy any mixpanel.com URL — boards, reports, and insights all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the link type and generates the right embed HTML, falling back to a preview card when access is restricted.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Mixpanel embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share modal. Paste a Mixpanel link and get working embed HTML.'
    },
    {
      title: 'Boards, reports & insights',
      description:
        'Works with Mixpanel boards, individual reports, and insights — the tool handles the URL format for you.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Mixpanel embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Mixpanel embed',
      description:
        'When a board is shared publicly, get the live, interactive Mixpanel embed with up-to-date charts.'
    },
    {
      title: 'Preview card for private analytics',
      description:
        'Most Mixpanel boards require authentication to view, so the tool returns a clean preview card with the title and image instead.'
    },
    {
      title: 'Responsive layout',
      description:
        'The embed and the preview card both scale to fit your container on desktop and mobile.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/totango', label: 'Totango' },
    { href: '/tools/embed-url/kubit', label: 'Kubit' },
    { href: '/tools/embed-url/infogram', label: 'Infogram' }
  ],
  faq: [
    {
      question: 'How do I embed a Mixpanel board on my website?',
      answer:
        'Paste your Mixpanel board or report URL into the tool and click Generate. You will get embed HTML you can paste anywhere, or a preview card if the board is not public.'
    },
    {
      question: 'Can I embed a private Mixpanel report?',
      answer:
        'Mixpanel boards and reports normally require authentication to view, so a private one will not render for your visitors. To embed live charts, create a Public Board in Mixpanel first; otherwise the tool returns a styled preview card.'
    },
    {
      question: 'Does the embed show live data?',
      answer:
        'Yes — when the board is shared publicly, the native embed loads the current Mixpanel charts. The preview card fallback is a static snapshot of the title and image.'
    },
    {
      question: 'What if the Mixpanel content cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the available title and image, which you can still customize in Card mode.'
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
