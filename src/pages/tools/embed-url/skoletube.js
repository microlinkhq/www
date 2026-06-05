import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SkoleTube',
  slug: 'skoletube',
  color: '#00A0E3',
  exampleUrl: 'https://skoletube.dk',
  metaTitle: 'SkoleTube Embed Code Generator — Embed Educational Videos',
  metaDescription:
    'Free SkoleTube embed code generator. Paste any SkoleTube URL — get a ready-to-paste player for educational videos. No signup.',
  keywords: [
    'embed skoletube',
    'skoletube embed code',
    'skoletube embed code generator',
    'embed skoletube video',
    'skoletube iframe code',
    'skoletube video embed',
    'embed skoletube school video'
  ],
  heroTitle: 'SkoleTube Embed Code Generator',
  heroSubtitle:
    'Paste any SkoleTube URL — get a ready-to-paste player for educational videos from the Danish school platform.',
  howItWorksHeading: 'How to embed SkoleTube videos',
  howItWorksSteps: [
    {
      title: 'Paste a SkoleTube link',
      description:
        'Copy the URL of any SkoleTube video and paste it into the tool.'
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
  explanationHeading: 'Why use our SkoleTube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any SkoleTube link and get working embed HTML without hunting for the share code.'
    },
    {
      title: 'Built for educational video',
      description:
        'Handles SkoleTube videos so teachers and students can place lessons on any learning page.'
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
      title: 'Educational video player',
      description:
        'Embeds SkoleTube videos with native playback controls for classroom and e-learning use.'
    },
    {
      title: 'Responsive player',
      description:
        'The generated embed scales to fit course pages, blogs, and mobile screens.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/nanoo', label: 'Nanoo' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/learningapps-org', label: 'LearningApps' }
  ],
  faq: [
    {
      question: 'How do I embed a SkoleTube video on my website?',
      answer:
        'Paste the SkoleTube URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can teachers embed SkoleTube videos in learning materials?',
      answer:
        'Yes. The tool works with SkoleTube educational videos so you can place them in lessons, blogs, or an LMS.'
    },
    {
      question: 'Does the video player work on mobile?',
      answer:
        'Yes. The generated embed is responsive and adapts to phones, tablets, and desktop layouts.'
    },
    {
      question: 'What if the SkoleTube video is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is available.'
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
