import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Reddit',
  slug: 'reddit',
  color: '#FF4500',
  exampleUrl:
    'https://www.reddit.com/r/IAmA/comments/z1c9z/i_am_barack_obama_president_of_the_united_states/',
  metaTitle: 'Reddit Embed Code Generator — Embed Posts, Comments & Threads',
  metaDescription:
    'Free Reddit embed code generator. Paste any Reddit URL — get ready-to-paste embed HTML for posts, comments, and threads. No signup.',
  keywords: [
    'embed reddit',
    'reddit embed code',
    'reddit embed code generator',
    'embed reddit post',
    'embed reddit comment',
    'embed reddit thread',
    'reddit post embed html'
  ],
  heroTitle: 'Reddit Embed Code Generator',
  heroSubtitle:
    'Paste any Reddit URL — get ready-to-paste embed HTML for posts, comments, and threads.',
  howItWorksHeading: 'How to embed Reddit content',
  howItWorksSteps: [
    {
      title: 'Paste a Reddit link',
      description:
        'Copy any reddit.com URL — a post, a single comment, or an entire thread.'
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
        'Skip the blockquote and widgets.js script wiring. Paste any Reddit link and get working embed HTML.'
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
        'Get the real Reddit embed with the post title, author, subreddit, votes, and a link back to the thread.'
    },
    {
      title: 'Posts & comments',
      description:
        'Embed an entire post or a single comment — both Reddit content types are supported.'
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
      href: '/tools/embed-url/bluesky',
      label: 'Bluesky'
    },
    {
      href: '/tools/embed-url/tumblr',
      label: 'Tumblr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Reddit post on my website?',
      answer:
        'Paste any Reddit post URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed a single Reddit comment?',
      answer:
        'Yes. Link directly to a comment and the tool will generate an embed for that specific comment, alongside full posts and threads.'
    },
    {
      question: 'What if the post cannot be embedded natively?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image when native embedding is restricted.'
    },
    {
      question: 'Can I embed posts from private or NSFW subreddits?',
      answer:
        'Only publicly viewable posts can be embedded. Posts in private subreddits and some restricted content are not available.'
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
