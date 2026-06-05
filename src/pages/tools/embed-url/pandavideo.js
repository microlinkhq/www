import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Panda Video',
  slug: 'pandavideo',
  color: '#2D3436',
  exampleUrl: 'https://pandavideo.com',
  metaTitle: 'Panda Video Embed Code Generator — Embed Hosted Videos & Courses',
  metaDescription:
    'Free Panda Video embed code generator. Paste any Panda Video URL — get a ready-to-paste secure player for hosted videos and course lessons. No signup.',
  keywords: [
    'embed panda video',
    'panda video embed code',
    'panda video embed code generator',
    'embed panda video player',
    'panda video iframe code',
    'embed panda video course',
    'panda video player embed'
  ],
  heroTitle: 'Panda Video Embed Code Generator',
  heroSubtitle:
    'Paste any Panda Video URL — get a ready-to-paste secure player for hosted videos and course lessons.',
  howItWorksHeading: 'How to embed Panda Video content',
  howItWorksSteps: [
    {
      title: 'Paste a Panda Video link',
      description:
        'Copy the URL of any hosted video or course lesson and drop it into the field.'
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
  explanationHeading: 'Why use our Panda Video embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Panda Video link and get the player embed without digging through the dashboard for share settings.'
    },
    {
      title: 'Built for course creators',
      description:
        'Drop hosted videos and lessons into your course site, membership area, or landing page in seconds.'
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
      title: 'Secure video player',
      description:
        'Generates the Panda Video player embed so your hosted videos stream with the platform protections intact.'
    },
    {
      title: 'Responsive playback',
      description:
        'The player scales to fit any container, keeping a correct aspect ratio on desktop and mobile.'
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
    { href: '/tools/embed-url/sproutvideo', label: 'SproutVideo' }
  ],
  faq: [
    {
      question: 'How do I embed a Panda Video on my website?',
      answer:
        'Paste the video or lesson URL into the tool and click Generate. Copy the resulting HTML and paste it wherever you want the player to appear.'
    },
    {
      question: 'Can I embed full courses or just single videos?',
      answer:
        'You can embed individual hosted videos and course lessons. Paste the link for the specific video you want to show.'
    },
    {
      question: 'Does the embedded player stay secure?',
      answer:
        'Yes. The tool produces the native Panda Video player embed, so playback runs through the platform with its protections in place.'
    },
    {
      question: 'Will the player be responsive?',
      answer:
        'Yes. The generated markup keeps the correct aspect ratio and adapts to the width of its container.'
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
