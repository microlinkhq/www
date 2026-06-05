import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'PingVP',
  slug: 'pingvp',
  color: '#1E88E5',
  exampleUrl: 'https://pingvp.com',
  metaTitle: 'PingVP Embed Code Generator — Embed Videos',
  metaDescription:
    'Free PingVP embed code generator. Paste any PingVP video URL — get a ready-to-paste video player you can drop into any page. No signup.',
  keywords: [
    'embed pingvp',
    'pingvp embed code',
    'pingvp embed code generator',
    'embed pingvp video',
    'pingvp iframe code',
    'pingvp video player embed',
    'pingvp player embed'
  ],
  heroTitle: 'PingVP Embed Code Generator',
  heroSubtitle:
    'Paste any PingVP video URL — get a ready-to-paste player you can drop into a blog post, CMS, or landing page.',
  howItWorksHeading: 'How to embed PingVP videos',
  howItWorksSteps: [
    {
      title: 'Paste a PingVP link',
      description: 'Copy the URL of any PingVP-hosted video and paste it in.'
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
  explanationHeading: 'Why use our PingVP embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the player settings and copy a working video embed straight from any PingVP link.'
    },
    {
      title: 'Responsive video player',
      description:
        'The generated embed scales to fit any column width and stays sharp on mobile.'
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
      title: 'Native video embed',
      description:
        'Get the real PingVP player with full playback controls when embedding is available.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The player keeps a clean aspect ratio across desktop, tablet, and phone screens.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' }
  ],
  faq: [
    {
      question: 'How do I embed a PingVP video on my website?',
      answer:
        'Paste the PingVP video URL into the tool, click Generate, then copy the HTML and paste it where you want the player to appear.'
    },
    {
      question: 'Will the PingVP player work on mobile?',
      answer:
        'Yes. The generated embed is responsive and adjusts to the available width on phones and tablets.'
    },
    {
      question: 'What if the video cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and thumbnail so your readers still get a link to the video.'
    },
    {
      question: 'Do I need a PingVP account to use this?',
      answer:
        'No account is required. You only need the public URL of the video you want to embed.'
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
