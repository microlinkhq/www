import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bluesky',
  slug: 'bluesky',
  color: '#1185FE',
  exampleUrl: 'https://bsky.app/profile/bsky.app/post/3kq7aeuwbg42k',
  metaTitle: 'Bluesky Embed Code Generator — Embed Posts & Skeets',
  metaDescription:
    'Free Bluesky embed code generator. Paste any Bluesky post URL — get ready-to-paste embed HTML for skeets, replies, and quote posts on the AT Protocol. No signup.',
  keywords: [
    'embed bluesky',
    'bluesky embed code',
    'bluesky embed code generator',
    'embed bluesky post',
    'embed bsky post',
    'bluesky post embed',
    'embed skeet',
    'bsky embed code'
  ],
  heroTitle: 'Bluesky Embed Code Generator',
  heroSubtitle:
    'Paste any Bluesky post URL — get ready-to-paste embed HTML for skeets, replies, and quote posts.',
  howItWorksHeading: 'How to embed a Bluesky post',
  howItWorksSteps: [
    {
      title: 'Paste a Bluesky link',
      description:
        'Copy any bsky.app post URL — skeets, replies, and quote posts all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the post and generates the right embed HTML for it.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Bluesky embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through post menus for embed code. Paste any bsky.app link and get working embed HTML.'
    },
    {
      title: 'Posts, replies & quotes',
      description:
        'Works with standalone skeets, replies in a thread, and quote posts — the tool handles each bsky.app URL.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Bluesky embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Bluesky embed',
      description:
        'Get the real Bluesky post embed with author, avatar, text, and any attached images or media.'
    },
    {
      title: 'AT Protocol posts',
      description:
        'Built for posts on the AT Protocol — skeets, threaded replies, and quote posts all render correctly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/twitter-or-x',
      label: 'Twitter / X'
    },
    {
      href: '/tools/embed-url/reddit',
      label: 'Reddit'
    },
    {
      href: '/tools/embed-url/tumblr',
      label: 'Tumblr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Bluesky post on my website?',
      answer:
        'Paste any bsky.app post URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What is a skeet?',
      answer:
        'A skeet is the community nickname for a post on Bluesky, the social network built on the AT Protocol.'
    },
    {
      question: 'Can I embed replies and quote posts?',
      answer:
        'Yes. Standalone posts, replies in a thread, and quote posts are all supported.'
    },
    {
      question: 'What if a post cannot be embedded natively?',
      answer:
        'If native embedding is restricted, switch to Card mode to get a styled preview card with the post title and image instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const BlueskyPage = () => <ProviderSubtool {...data} />

export default BlueskyPage
