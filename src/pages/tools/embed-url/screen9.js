import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Screen9',
  slug: 'screen9',
  color: '#1E88E5',
  exampleUrl: 'https://screen9.com',
  metaTitle: 'Screen9 Embed Code Generator — Embed Business Video',
  metaDescription:
    'Free Screen9 embed code generator. Paste any Screen9 URL — get a ready-to-paste player for hosted business video. No signup, no API key.',
  keywords: [
    'embed screen9',
    'screen9 embed code',
    'screen9 embed code generator',
    'embed screen9 video',
    'screen9 iframe code',
    'screen9 player embed',
    'screen9 video embed'
  ],
  heroTitle: 'Screen9 Embed Code Generator',
  heroSubtitle:
    'Paste any Screen9 URL — get a ready-to-paste player for hosted business video.',
  howItWorksHeading: 'How to embed Screen9 video',
  howItWorksSteps: [
    {
      title: 'Paste a Screen9 link',
      description:
        'Copy the URL of any video hosted on the Screen9 online video platform and drop it in.'
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
  explanationHeading: 'Why use our Screen9 embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Screen9 dashboard for embed snippets — paste a link and get working HTML instantly.'
    },
    {
      title: 'Built for business video',
      description:
        'Screen9 is an online video platform for hosting and securely delivering business video. The tool resolves its player URLs for you.'
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
      title: 'Responsive video player',
      description:
        'The generated embed scales to fit any container, from a full-width article to a narrow sidebar.'
    },
    {
      title: 'Hosted business video',
      description:
        'Works with video managed and delivered through the Screen9 online video platform.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' },
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' }
  ],
  faq: [
    {
      question: 'How do I embed a Screen9 video on my website?',
      answer:
        'Paste the Screen9 video URL into the tool and click Generate, then copy the HTML into your page.'
    },
    {
      question: 'What kind of content can I embed from Screen9?',
      answer:
        'Screen9 is an online video platform for business video, so you can embed any hosted video your account has access to.'
    },
    {
      question: 'Will the embedded player be responsive?',
      answer:
        'Yes — the generated code adapts to the width of its container so the player looks right on any device.'
    },
    {
      question: 'What if the Screen9 video is private or restricted?',
      answer:
        'The tool falls back to a styled preview card with the available metadata so your layout stays intact.'
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
