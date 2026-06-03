import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'WordPress.com',
  slug: 'wordpress-com',
  color: '#21759B',
  exampleUrl: 'https://wordpress.com/blog/2026/05/26/wordpress-7-0-armstrong/',
  metaTitle: 'WordPress.com Embed Code Generator — Embed Posts & Pages',
  metaDescription:
    'Free WordPress.com embed code generator. Paste any WordPress.com post or page URL — get a ready-to-paste rich preview card or oEmbed. No signup.',
  keywords: [
    'embed wordpress.com',
    'wordpress.com embed code',
    'wordpress.com embed code generator',
    'embed wordpress post',
    'embed wordpress.com blog post',
    'wordpress.com oembed',
    'embed wordpress page'
  ],
  heroTitle: 'WordPress.com Embed Code Generator',
  heroSubtitle:
    'Paste any WordPress.com post or page URL — get a ready-to-paste rich preview card or native oEmbed.',
  howItWorksHeading: 'How to embed WordPress.com content',
  howItWorksSteps: [
    {
      title: 'Paste a WordPress.com link',
      description:
        'Copy any wordpress.com post or page URL, including hosted blogs on the wordpress.com domain.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the post and generates a rich preview card, or the native oEmbed when available.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our WordPress.com embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip hunting for shortcodes or oEmbed endpoints. Paste any WordPress.com link and get working embed HTML.'
    },
    {
      title: 'Posts and pages',
      description:
        'Works with WordPress.com blog posts and pages, pulling the title, image, and description automatically.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 WordPress.com embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native oEmbed support',
      description:
        'WordPress.com posts expose oEmbed, so you can get the platform-provided embed when it is available.'
    },
    {
      title: 'Rich preview cards',
      description:
        'Generate a clean card with the post title, featured image, and excerpt that adapts to any layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/tumblr',
      label: 'Tumblr'
    },
    {
      href: '/tools/embed-url/buttondown',
      label: 'Buttondown'
    },
    {
      href: '/tools/embed-url/reddit',
      label: 'Reddit'
    }
  ],
  faq: [
    {
      question: 'How do I embed a WordPress.com post on my website?',
      answer:
        'Paste any WordPress.com post URL into the tool and click Generate. You will get a ready-to-paste embed or preview card.'
    },
    {
      question: 'Can I embed WordPress.com pages as well as posts?',
      answer:
        'Yes. Both WordPress.com blog posts and static pages work, and the tool pulls the title, image, and description.'
    },
    {
      question: 'Does it use the WordPress.com oEmbed?',
      answer:
        'When a WordPress.com post exposes oEmbed, the tool can return that native embed. Otherwise it builds a rich preview card.'
    },
    {
      question: 'What if the post cannot be natively embedded?',
      answer:
        'The tool falls back to a styled preview card with the post title and featured image so you always get something to paste.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const WordPressComPage = () => <ProviderSubtool {...data} />

export default WordPressComPage
