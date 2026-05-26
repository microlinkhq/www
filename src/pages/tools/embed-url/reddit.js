import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Reddit',
  slug: 'reddit',
  color: '#FF4500',
  exampleUrl: 'https://www.reddit.com/r/webdev/comments/example',
  metaTitle: 'Reddit Embed Code Generator — Embed Posts & Comments',
  metaDescription:
    'Free Reddit embed code generator. Paste any Reddit URL — get a ready-to-paste embed for posts, comments, and threads. No signup.',
  keywords: [
    'embed reddit post',
    'reddit embed code',
    'reddit embed code generator',
    'embed reddit comment',
    'reddit post embed html',
    'reddit embed for website'
  ],
  heroTitle: 'Reddit Embed Code Generator',
  heroSubtitle:
    'Paste any Reddit URL — get a ready-to-paste embed for posts, comments, and threads.',
  howItWorksHeading: 'How to embed Reddit content',
  howItWorksSteps: [
    {
      title: 'Paste a Reddit link',
      description: 'Copy any Reddit URL — posts, comments, and threads.'
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
  explanationHeading: 'Why use our Reddit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Reddit link and get working embed HTML.'
    },
    {
      title: 'All Reddit content',
      description:
        'Works with posts, comments, and threads — the tool handles all Reddit URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Reddit embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Reddit embed',
      description:
        'Get the real Reddit post embed with votes, author, subreddit, and comment count.'
    },
    {
      title: 'Posts & comments',
      description:
        'Post URLs, direct comment links, and cross-posts — the tool handles all Reddit URL formats.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled card with title and subreddit info when the native embed is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/twitter-or-x',
      label: 'Twitter / X'
    },
    {
      href: '/tools/embed-url/facebook',
      label: 'Facebook'
    },
    {
      href: '/tools/embed-url/telegram',
      label: 'Telegram'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Reddit post?',
      answer:
        'Paste any Reddit post URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'Can I embed Reddit comments?',
      answer:
        'Yes. Link directly to a comment and the tool will generate an embed for that specific comment.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const RedditPage = () => <ProviderSubtool {...data} />

export default RedditPage
