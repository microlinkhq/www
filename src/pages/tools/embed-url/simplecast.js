import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Simplecast',
  slug: 'simplecast',
  color: '#E66E50',
  exampleUrl: 'https://armchairexpert.simplecast.com/episodes/980a207c',
  metaTitle: 'Simplecast Embed Code Generator — Embed Podcast Episodes & Shows',
  metaDescription:
    'Free Simplecast embed code generator. Paste any Simplecast URL — get a ready-to-paste web player for podcast episodes and shows. No signup.',
  keywords: [
    'embed simplecast',
    'simplecast embed code',
    'simplecast embed code generator',
    'embed simplecast episode',
    'simplecast player embed',
    'simplecast iframe code',
    'embed simplecast podcast'
  ],
  heroTitle: 'Simplecast Embed Code Generator',
  heroSubtitle:
    'Paste any Simplecast URL — get a ready-to-paste web player for your podcast episodes and shows.',
  howItWorksHeading: 'How to embed a Simplecast episode',
  howItWorksSteps: [
    {
      title: 'Paste a Simplecast link',
      description:
        'Copy any simplecast.com URL — a show page or an individual episode link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects whether it is an episode or a show and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Simplecast embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through promotion pages for embed snippets. Paste any Simplecast link and get working embed HTML.'
    },
    {
      title: 'Episodes and shows',
      description:
        'Works with single episode links and full show pages — the tool handles both Simplecast URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Simplecast embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Simplecast player',
      description:
        'Get the real Simplecast web player with cover art, playback controls, and a progress bar.'
    },
    {
      title: 'Responsive embed',
      description:
        'The player scales to fit your column width, so episodes look right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/podbean',
      label: 'Podbean'
    },
    {
      href: '/tools/embed-url/spreaker',
      label: 'Spreaker'
    },
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Simplecast episode on my website?',
      answer:
        'Paste any Simplecast episode URL into the tool and click Generate. You will get a ready-to-paste web player.'
    },
    {
      question: 'Can I embed a whole show instead of one episode?',
      answer:
        'Yes. Paste a Simplecast show page URL and the tool generates an embed for the full show.'
    },
    {
      question: 'Can I embed a private or unlisted episode?',
      answer:
        'Private and unlisted episodes are not publicly accessible, so they cannot be embedded. Only published, public episodes work.'
    },
    {
      question: 'What if the episode cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card showing the episode title and image, which you can customize in Card mode.'
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
