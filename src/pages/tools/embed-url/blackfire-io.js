import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Blackfire.io',
  slug: 'blackfire-io',
  color: '#65319E',
  exampleUrl:
    'https://blackfire.io/profiles/01e44337-ae51-465b-95ce-fb5fff3f73b7/graph',
  metaTitle: 'Blackfire.io Embed Code Generator — Embed Profiles & Reports',
  metaDescription:
    'Free Blackfire.io embed code generator. Paste a Blackfire profile or report URL — get a ready-to-paste preview card linking to the call graph. No signup.',
  keywords: [
    'embed blackfire',
    'blackfire embed code',
    'blackfire embed code generator',
    'embed blackfire profile',
    'blackfire profile preview',
    'blackfire report embed',
    'embed blackfire.io'
  ],
  heroTitle: 'Blackfire.io Embed Code Generator',
  heroSubtitle:
    'Paste a Blackfire.io profile or report URL — get a ready-to-paste preview card that links straight to the performance call graph.',
  howItWorksHeading: 'How to embed a Blackfire.io profile',
  howItWorksSteps: [
    {
      title: 'Paste a Blackfire.io link',
      description:
        'Copy a public blackfire.io URL — a shared performance profile, comparison, or report.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a clean preview card you can drop anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Blackfire.io embed code generator',
  reasons: [
    {
      title: 'Share profiles cleanly',
      description:
        'Turn a raw blackfire.io profile link into a tidy preview card with title and image instead of a bare URL.'
    },
    {
      title: 'Great for performance write-ups',
      description:
        'Reference a specific profile or before/after comparison in a blog post or postmortem with a card that links back to the full graph.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Blackfire.io embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Profile & report preview cards',
      description:
        'Profiles, comparisons, and reports each become a preview card that links to the live call graph on blackfire.io.'
    },
    {
      title: 'Works with public profiles',
      description:
        'Point it at any publicly shared blackfire.io profile URL and the card pulls the page title and image automatically.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    },
    {
      href: '/tools/embed-url/replit',
      label: 'Replit'
    },
    {
      href: '/tools/embed-url/codesandbox',
      label: 'CodeSandbox'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Blackfire.io profile on my website?',
      answer:
        'Paste a public blackfire.io profile URL into the tool and click Generate. You will get a ready-to-paste preview card that links to the call graph.'
    },
    {
      question: 'Does this show the interactive call graph inline?',
      answer:
        'No. Blackfire.io profiles are not served as a native inline embed, so the tool generates a styled preview card that links to the full graph on blackfire.io.'
    },
    {
      question: 'What kinds of Blackfire.io links work?',
      answer:
        'Public profiles, comparisons, and reports all work — anything with a shareable blackfire.io URL.'
    },
    {
      question: 'Can I embed a private profile?',
      answer:
        'No. Only profiles you have shared publicly can be previewed, since the tool reads the public page metadata.'
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
