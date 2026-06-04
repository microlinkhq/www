import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Medienarchiv ZHdK',
  slug: 'medienarchiv-zhdk',
  color: '#000000',
  exampleUrl: 'https://medienarchiv.zhdk.ch',
  metaTitle:
    'Medienarchiv ZHdK Embed Code Generator — Embed Archive Images, Video & Audio',
  metaDescription:
    'Free Medienarchiv ZHdK embed code generator. Paste any medienarchiv.zhdk.ch URL — get a ready-to-paste embed for archived images, video, and audio. No signup.',
  keywords: [
    'embed medienarchiv zhdk',
    'medienarchiv zhdk embed code',
    'medienarchiv zhdk embed code generator',
    'embed zhdk media archive',
    'medienarchiv zhdk iframe code',
    'embed zhdk video',
    'embed zhdk image'
  ],
  heroTitle: 'Medienarchiv ZHdK Embed Code Generator',
  heroSubtitle:
    'Paste any Medienarchiv ZHdK URL — get a ready-to-paste embed for archived images, video, and audio from the Zurich University of the Arts.',
  howItWorksHeading: 'How to embed Medienarchiv ZHdK content',
  howItWorksSteps: [
    {
      title: 'Paste a Medienarchiv ZHdK link',
      description:
        'Copy any medienarchiv.zhdk.ch URL for an image, video, or audio entry.'
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
  explanationHeading: 'Why use our Medienarchiv ZHdK embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Medienarchiv ZHdK link and get working embed HTML in seconds.'
    },
    {
      title: 'Built for archive media',
      description:
        'Handles the images, video, and audio held in the ZHdK media archive of student and faculty works.'
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
      title: 'Image, video & audio',
      description:
        'Embed archived images, video clips, and audio recordings from the collection.'
    },
    {
      title: 'Responsive player',
      description:
        'The generated embed scales to fit the column width of your page or article.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed Medienarchiv ZHdK content on my website?',
      answer:
        'Paste the medienarchiv.zhdk.ch URL into the tool, click Generate, and copy the embed HTML into your page.'
    },
    {
      question: 'What kinds of media can I embed?',
      answer:
        'Archived images, video, and audio from the Zurich University of the Arts media archive.'
    },
    {
      question: 'What if an entry in the archive is private?',
      answer:
        'Private or access-restricted entries fall back to a styled preview card with the available metadata.'
    },
    {
      question: 'Will the embed stay responsive on mobile?',
      answer:
        'Yes. The generated player adapts to the available width so it looks right on phones, tablets, and desktops.'
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
