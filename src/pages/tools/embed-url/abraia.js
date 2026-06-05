import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Abraia',
  slug: 'abraia',
  color: '#FFCC00',
  exampleUrl:
    'https://store.abraia.me/05bf471cbb3f9fa9ed785718e6f60e28/Tests/PexelsVideos2795392/index.html',
  metaTitle: 'Abraia Embed Code Generator — Embed Optimized Images & Videos',
  metaDescription:
    'Free Abraia embed code generator. Paste an abraia.me link to your optimized image, HLS video, or hosted media — get a ready-to-paste preview card. No signup.',
  keywords: [
    'embed abraia',
    'abraia embed code',
    'abraia embed code generator',
    'embed abraia video',
    'embed abraia image',
    'abraia preview card',
    'abraia.me embed'
  ],
  heroTitle: 'Abraia Embed Code Generator',
  heroSubtitle:
    'Paste an abraia.me link to an optimized image, HLS video, or hosted media file — get ready-to-paste embed HTML.',
  howItWorksHeading: 'How to embed Abraia media',
  howItWorksSteps: [
    {
      title: 'Paste an Abraia link',
      description:
        'Copy any abraia.me or store.abraia.me URL — optimized images, HLS videos, or hosted media files.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and generates a styled preview card you can drop anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Abraia embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building markup by hand. Paste an Abraia link and get working embed HTML in one click.'
    },
    {
      title: 'Optimized images & videos',
      description:
        'Abraia delivers compressed, web-ready images and adaptive-bitrate (HLS) video — the preview reflects whatever the link points to.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Abraia embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Preview card for hosted media',
      description:
        'Abraia has no standard public embed API, so the tool builds a styled preview card from the page title and thumbnail — clean and ready to paste.'
    },
    {
      title: 'Images, video & multimedia',
      description:
        'Works with Abraia-optimized photos, HLS video pages, and other media hosted on the abraia.me cloud.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated card adapts to your layout so it looks right on mobile and desktop.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/flickr', label: 'Flickr' },
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/sketchfab', label: 'Sketchfab' }
  ],
  faq: [
    {
      question: 'How do I embed Abraia media on my website?',
      answer:
        'Paste an abraia.me link into the tool and click Generate. You will get a ready-to-paste preview card for the optimized image or video.'
    },
    {
      question: 'Does Abraia have a native embed code?',
      answer:
        'Abraia is an image and video optimization cloud, not a social platform, and does not publish a standard public embed API. The tool generates a styled preview card from the page metadata instead.'
    },
    {
      question: 'What kinds of Abraia content can I embed?',
      answer:
        'Optimized images, adaptive-bitrate (HLS) videos, and other media hosted on the abraia.me cloud — anything reachable by a public URL.'
    },
    {
      question: 'What if the Abraia link is private or restricted?',
      answer:
        'If the page is not publicly reachable, the tool falls back to a styled preview card using whatever metadata is available.'
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
