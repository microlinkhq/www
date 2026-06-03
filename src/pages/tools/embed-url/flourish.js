import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Flourish',
  slug: 'flourish',
  color: '#1364E2',
  exampleUrl: 'https://public.flourish.studio/visualisation/1077576/',
  metaTitle: 'Flourish Embed Code Generator — Embed Charts & Data Stories',
  metaDescription:
    'Free Flourish embed code generator. Paste any Flourish URL — get a ready-to-paste iframe for interactive charts, maps, and animated data stories. No signup.',
  keywords: [
    'embed flourish',
    'flourish embed code',
    'flourish embed code generator',
    'flourish iframe code',
    'embed flourish chart',
    'embed flourish story',
    'flourish visualization embed'
  ],
  heroTitle: 'Flourish Embed Code Generator',
  heroSubtitle:
    'Paste any Flourish URL — get a ready-to-paste iframe for interactive charts, maps, and animated data stories.',
  howItWorksHeading: 'How to embed Flourish content',
  howItWorksSteps: [
    {
      title: 'Paste a Flourish link',
      description:
        'Copy any public.flourish.studio URL — a visualisation or a multi-step data story.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the visualisation and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Flourish embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Flourish link and get working embed HTML.'
    },
    {
      title: 'All Flourish content',
      description:
        'Works with visualisations and data stories — the tool handles all Flourish URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Flourish embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive visualizations',
      description:
        'Get the live Flourish embed — tooltips, animations, and bar chart races all play in place.'
    },
    {
      title: 'Charts, maps & stories',
      description:
        'Bar chart races, line charts, maps, scatter plots, and scrollytelling stories all work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/datawrapper',
      label: 'Datawrapper'
    },
    {
      href: '/tools/embed-url/infogram',
      label: 'Infogram'
    },
    {
      href: '/tools/embed-url/observable',
      label: 'Observable'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Flourish chart on my website?',
      answer:
        'Paste the public.flourish.studio URL of your published visualisation into the tool and click Generate. You will get a ready-to-paste iframe.'
    },
    {
      question: 'Can I embed a Flourish data story?',
      answer:
        'Yes. Both single visualisations and multi-step data stories are supported.'
    },
    {
      question: 'Are interactions and animations preserved?',
      answer:
        'Yes. Tooltips, filters, animations, and bar chart race playback all work inside the embed.'
    },
    {
      question: 'What if the visualisation is private?',
      answer:
        'Only published, public Flourish visualisations can be embedded. Unpublished or private projects will fall back to a preview card.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const FlourishPage = () => <ProviderSubtool {...data} />

export default FlourishPage
