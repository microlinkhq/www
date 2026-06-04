import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'NFB',
  slug: 'nfb-ca',
  color: '#E4002B',
  exampleUrl: 'https://www.nfb.ca',
  metaTitle:
    'NFB Embed Code Generator — Embed Films, Documentaries & Animation',
  metaDescription:
    'Free NFB embed code generator. Paste any nfb.ca URL — get a ready-to-paste player for films, documentaries, and animation. No signup.',
  keywords: [
    'embed nfb',
    'nfb embed code',
    'nfb embed code generator',
    'embed nfb film',
    'embed nfb documentary',
    'nfb iframe code',
    'national film board embed'
  ],
  heroTitle: 'NFB Embed Code Generator',
  heroSubtitle:
    'Paste any NFB URL — get a ready-to-paste player for films, documentaries, and animation from the National Film Board of Canada.',
  howItWorksHeading: 'How to embed NFB content',
  howItWorksSteps: [
    {
      title: 'Paste an NFB link',
      description:
        'Copy the URL of any nfb.ca film, documentary, or animation and paste it into the tool.'
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
  explanationHeading: 'Why use our NFB embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste an NFB link and get working player HTML — no need to dig through the page for embed options.'
    },
    {
      title: 'Built for the NFB film collection',
      description:
        'Tuned for the National Film Board free streaming catalogue, so documentaries, films, and animation render cleanly on your page.'
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
      title: 'Film and documentary embeds',
      description:
        'Embed full NFB films and documentaries with a responsive player for classrooms, articles, or research pages.'
    },
    {
      title: 'Animation support',
      description:
        'Showcase NFB animated shorts inline so visitors can watch without leaving your site.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/dailymotion', label: 'Dailymotion' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' }
  ],
  faq: [
    {
      question: 'How do I embed an NFB film on my website?',
      answer:
        'Copy the nfb.ca film URL, paste it into the tool, then copy the generated HTML into your page.'
    },
    {
      question: 'Can I embed NFB documentaries in a lesson or article?',
      answer:
        'Yes. Paste the documentary URL and the tool produces a responsive player you can drop into any page or LMS.'
    },
    {
      question: 'Does it work with NFB animated films?',
      answer:
        'Yes. NFB animation is detected automatically and embedded with a player and its title.'
    },
    {
      question: 'What if an NFB title cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the title, image, and a link to watch on nfb.ca.'
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
