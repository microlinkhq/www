import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Tumblr',
  slug: 'tumblr',
  color: '#36465D',
  exampleUrl: 'https://www.tumblr.com/staff/70425851417',
  metaTitle: 'Tumblr Embed Code Generator — Embed Posts, Photos & Videos',
  metaDescription:
    'Free Tumblr embed code generator. Paste any Tumblr post URL — get a ready-to-paste embed for text, photo, and video posts. No signup.',
  keywords: [
    'embed tumblr',
    'tumblr embed code',
    'tumblr embed code generator',
    'embed tumblr post',
    'tumblr post embed',
    'embed tumblr photo',
    'embed tumblr video'
  ],
  heroTitle: 'Tumblr Embed Code Generator',
  heroSubtitle:
    'Paste any Tumblr post URL — get a ready-to-paste embed for text, photo, and video posts.',
  howItWorksHeading: 'How to embed a Tumblr post',
  howItWorksSteps: [
    {
      title: 'Paste a Tumblr link',
      description:
        'Copy any tumblr.com post permalink — text, photo, and video posts.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the post and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Tumblr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the share menu. Paste any Tumblr post link and get working embed HTML.'
    },
    {
      title: 'All post types',
      description:
        'Works with text, photo, and video posts — the tool handles all Tumblr post URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Tumblr embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Tumblr post embed',
      description:
        'Get the real Tumblr embed so readers can like, reblog, and follow right from the post.'
    },
    {
      title: 'Text, photo & video posts',
      description:
        'Individual text, photo, and video posts all render with their original formatting.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/twitter-or-x', label: 'Twitter / X' },
    { href: '/tools/embed-url/reddit', label: 'Reddit' },
    { href: '/tools/embed-url/bluesky', label: 'Bluesky' }
  ],
  faq: [
    {
      question: 'How do I embed a Tumblr post on my website?',
      answer:
        'Paste any Tumblr post URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'What types of Tumblr posts can I embed?',
      answer:
        'Text, photo, and video posts are all supported — paste the post permalink and the tool detects the type.'
    },
    {
      question: 'Can readers interact with the embedded post?',
      answer:
        'Yes. Logged-in Tumblr users can like, reblog, and follow from the embed; logged-out readers can click through to the original post.'
    },
    {
      question: 'What if the Tumblr post is private?',
      answer:
        'Private or unavailable posts cannot be embedded natively, so the tool falls back to a styled preview card with the available metadata.'
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
