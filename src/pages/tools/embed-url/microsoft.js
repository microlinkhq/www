import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Microsoft',
  slug: 'microsoft',
  color: '#00A4EF',
  exampleUrl:
    'https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/',
  metaTitle: 'Microsoft Embed Code Generator — Embed Microsoft Pages & News',
  metaDescription:
    'Free Microsoft embed code generator. Paste any microsoft.com URL — get a rich preview card with title, image, and description for news, blogs, and product pages. No signup.',
  keywords: [
    'embed microsoft',
    'microsoft embed code',
    'microsoft embed code generator',
    'embed microsoft news',
    'embed microsoft blog post',
    'microsoft link preview',
    'embed microsoft page'
  ],
  heroTitle: 'Microsoft Embed Code Generator',
  heroSubtitle:
    'Paste any microsoft.com URL — get a rich preview card with the title, image, and description for news, blog posts, and product pages.',
  howItWorksHeading: 'How to embed a Microsoft page',
  howItWorksSteps: [
    {
      title: 'Paste a Microsoft link',
      description:
        'Copy any microsoft.com URL — news from news.microsoft.com, posts on blogs.microsoft.com, or product and support pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and generates a preview card with the title, image, and description.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Microsoft embed code generator',
  reasons: [
    {
      title: 'Rich preview, not a bare link',
      description:
        'Turn a plain microsoft.com URL into a styled card showing the page title, image, and description.'
    },
    {
      title: 'Works across Microsoft sites',
      description:
        'News, official blogs, product pages, and support articles on microsoft.com all generate a clean preview.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Microsoft embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Title, image & description',
      description:
        'The card pulls the page metadata so readers see what they are clicking before they click.'
    },
    {
      title: 'Responsive by default',
      description:
        'The preview card adapts to your layout, from narrow sidebars to full-width article bodies.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/microsoft-sway',
      label: 'Microsoft Sway'
    },
    {
      href: '/tools/embed-url/new-york-times',
      label: 'The New York Times'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Microsoft page on my website?',
      answer:
        'Paste any microsoft.com URL into the tool and click Generate. You will get a ready-to-paste preview card with the page title, image, and description.'
    },
    {
      question: 'Which Microsoft URLs work?',
      answer:
        'Public microsoft.com links work, including news on news.microsoft.com, posts on blogs.microsoft.com, and product or support pages.'
    },
    {
      question: 'Does Microsoft provide a native embed?',
      answer:
        'Most microsoft.com pages do not offer a native iframe embed, so the tool generates a styled preview card from the page metadata instead.'
    },
    {
      question: 'Can I customize the preview card?',
      answer:
        'Yes. Switch to Card mode to adjust the colors, fonts, and layout before you copy the HTML.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const MicrosoftPage = () => <ProviderSubtool {...data} />

export default MicrosoftPage
