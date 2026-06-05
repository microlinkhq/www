import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bumper',
  slug: 'bumper',
  color: '#111111',
  exampleUrl: 'https://wearebumper.com/blog/introducing-the-bumper-dashboard',
  metaTitle: 'Bumper Embed Code Generator — Embed Bumper Pages & Articles',
  metaDescription:
    'Free Bumper embed code generator. Paste any wearebumper.com URL — get a ready-to-paste preview card for blog posts, dashboard pages, and service pages. No signup.',
  keywords: [
    'embed bumper',
    'bumper embed code',
    'bumper embed code generator',
    'embed bumper podcast',
    'bumper dashboard embed',
    'wearebumper embed',
    'embed bumper blog post'
  ],
  heroTitle: 'Bumper Embed Code Generator',
  heroSubtitle:
    'Paste any Bumper URL — get a ready-to-paste preview card for blog posts, dashboard pages, and service pages.',
  howItWorksHeading: 'How to embed Bumper content',
  howItWorksSteps: [
    {
      title: 'Paste a Bumper link',
      description:
        'Copy any wearebumper.com URL — blog posts, the Bumper Dashboard, or service pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and generates a styled preview card you can paste anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Bumper embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste any Bumper link and get a ready-to-paste preview card.'
    },
    {
      title: 'All Bumper pages',
      description:
        'Works with blog posts, the Bumper Dashboard, and service pages across wearebumper.com.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Bumper embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Clean link preview',
      description:
        'Turn a Bumper podcast-growth page into a tidy card with its title, description, and image.'
    },
    {
      title: 'Works with any Bumper URL',
      description:
        'Blog articles, the Bumper Dashboard, and service pages all generate a shareable preview.'
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
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Bumper page on my website?',
      answer:
        'Paste any wearebumper.com URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'Can I embed Bumper blog posts?',
      answer:
        'Yes. Blog posts, the Bumper Dashboard, and service pages all generate a preview card with the page title, description, and image.'
    },
    {
      question: 'Does Bumper have a native embed player?',
      answer:
        'Bumper is a podcast data and growth platform rather than a media host, so the tool generates a styled preview card instead of an inline player.'
    },
    {
      question: 'What if the Bumper page is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is publicly available.'
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
