import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Outplayed',
  slug: 'outplayed-tv',
  color: '#FF4655',
  exampleUrl: 'https://outplayed.tv',
  metaTitle: 'Outplayed Embed Code Generator — Embed Gaming Clips',
  metaDescription:
    'Free Outplayed embed code generator. Paste any Outplayed URL — get a ready-to-paste player for gaming clips and highlights. No signup.',
  keywords: [
    'embed outplayed',
    'outplayed embed code',
    'outplayed embed code generator',
    'embed outplayed clip',
    'outplayed iframe code',
    'outplayed highlight embed',
    'outplayed clip player embed'
  ],
  heroTitle: 'Outplayed Embed Code Generator',
  heroSubtitle:
    'Paste any Outplayed URL — get a ready-to-paste player for gaming clips and highlights.',
  howItWorksHeading: 'How to embed Outplayed content',
  howItWorksSteps: [
    {
      title: 'Paste an Outplayed link',
      description:
        'Copy the URL of an Outplayed gaming clip or highlight and paste it into the field.'
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
  explanationHeading: 'Why use our Outplayed embed code generator',
  reasons: [
    {
      title: 'Gaming clips, no setup',
      description:
        'Paste an Outplayed clip link and get a working video player without writing any HTML yourself.'
    },
    {
      title: 'Built for highlights',
      description:
        'Drop your best gaming moments captured by Overwolf straight into a post, guide, or team page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Clip video player',
      description:
        'Embed an inline player so visitors can watch Outplayed gaming clips without leaving your page.'
    },
    {
      title: 'Highlight sharing',
      description:
        'Share auto-captured highlights so readers can replay the standout moments in place.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/streamable', label: 'Streamable' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed an Outplayed clip on my website?',
      answer:
        'Paste the clip URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I embed Outplayed highlights in a blog post?',
      answer:
        'Yes. Paste the highlight link and drop the generated HTML into any blog, CMS, or HTML editor.'
    },
    {
      question: 'Does the embedded clip player work on mobile?',
      answer:
        'Yes. The generated player is responsive and plays back on phones, tablets, and desktops.'
    },
    {
      question: 'What if the Outplayed clip is private or deleted?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is still available.'
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
