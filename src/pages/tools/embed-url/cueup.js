import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Cueup',
  slug: 'cueup',
  color: '#1A1A1A',
  exampleUrl: 'https://cueup.io/user/dj-robert-michaels',
  metaTitle: 'Cueup Embed Code Generator — Embed DJ Profiles',
  metaDescription:
    'Free Cueup embed code generator. Paste a Cueup DJ profile URL — get a ready-to-paste preview card with the DJ name, photo, and link. No signup.',
  keywords: [
    'embed cueup',
    'cueup embed code',
    'cueup embed code generator',
    'embed cueup dj profile',
    'cueup dj profile embed',
    'cueup profile link card',
    'embed cueup dj'
  ],
  heroTitle: 'Cueup Embed Code Generator',
  heroSubtitle:
    'Paste a Cueup DJ profile URL — get a ready-to-paste preview card with the DJ name, photo, and a link to book.',
  howItWorksHeading: 'How to embed a Cueup DJ profile',
  howItWorksSteps: [
    {
      title: 'Paste a Cueup link',
      description:
        'Copy a cueup.io DJ profile URL, such as a /user/ page for a DJ, band, or musician.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page and generates a styled preview card with the profile details.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Cueup embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing HTML by hand. Paste a Cueup profile link and get a ready-to-paste preview card.'
    },
    {
      title: 'Shareable DJ profiles',
      description:
        'Turn a Cueup DJ, band, or musician profile into a clean card you can drop into event pages and posts.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Cueup embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'DJ profile preview',
      description:
        'Pulls the profile name, photo, and link so visitors can see the DJ at a glance.'
    },
    {
      title: 'Responsive card',
      description:
        'The preview card scales to fit your layout, from inline mentions to full-width blocks.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/mixcloud',
      label: 'Mixcloud'
    },
    {
      href: '/tools/embed-url/hearthis',
      label: 'hearthis.at'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Cueup DJ profile on my website?',
      answer:
        'Paste a Cueup profile URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'Does Cueup provide a native embed player?',
      answer:
        'Cueup does not offer a native iframe embed, so the tool generates a styled preview card linking to the profile instead.'
    },
    {
      question: 'What does the Cueup preview card show?',
      answer:
        'The card shows the public profile details it can read, such as the DJ or artist name, photo, and a link to the Cueup page.'
    },
    {
      question: 'What if the Cueup profile is private or unavailable?',
      answer:
        'The tool falls back to a basic preview card with whatever public metadata is available, or just the link.'
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
