import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod Université de Lille',
  slug: 'podulille',
  color: '#E2001A',
  exampleUrl: 'https://pod.univ-lille.fr',
  metaTitle:
    'Pod Université de Lille Embed Code Generator — Embed Lecture Videos & Podcasts',
  metaDescription:
    'Free Pod Université de Lille embed code generator. Paste any pod.univ-lille.fr URL — get a ready-to-paste player for lecture videos and podcasts. No signup.',
  keywords: [
    'embed pod univ lille',
    'pod univ-lille embed code',
    'pod université de lille embed generator',
    'embed esup-pod lille',
    'pod lille iframe code',
    'embed lecture video lille',
    'pod univ lille player embed'
  ],
  heroTitle: 'Pod Université de Lille Embed Code Generator',
  heroSubtitle:
    'Paste any pod.univ-lille.fr URL — get a ready-to-paste player for lecture recordings and academic podcasts.',
  howItWorksHeading: 'How to embed Pod Université de Lille content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod Lille link',
      description:
        'Copy the URL of any lecture video or podcast from pod.univ-lille.fr and paste it into the field.'
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
  explanationHeading:
    'Why use our Pod Université de Lille embed code generator',
  reasons: [
    {
      title: 'Built for Esup-Pod',
      description:
        'Tuned for the Esup-Pod platform that Université de Lille runs, so academic video URLs resolve into a working player.'
    },
    {
      title: 'Lectures and podcasts in one place',
      description:
        'Handles both recorded lectures and audio podcasts hosted on pod.univ-lille.fr with the correct player for each.'
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
      title: 'Responsive lecture player',
      description:
        'The embedded video scales to fit your page so recorded lectures stay watchable on any screen size.'
    },
    {
      title: 'Academic podcast support',
      description:
        'Audio podcasts published on Pod Université de Lille embed with their native player and metadata.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/poduparis1', label: 'Pod Université Paris 1' },
    { href: '/tools/embed-url/podupec', label: 'Pod UPEC' },
    { href: '/tools/embed-url/saooti', label: 'Saooti' }
  ],
  faq: [
    {
      question: 'How do I embed a Pod Université de Lille lecture on my site?',
      answer:
        'Paste the pod.univ-lille.fr lecture URL into the tool, click Generate, then copy the embed code into your page.'
    },
    {
      question: 'Can I embed podcasts as well as videos?',
      answer:
        'Yes. Both lecture videos and audio podcasts from Pod Université de Lille are supported, each with the right player.'
    },
    {
      question: 'Is Pod Université de Lille part of Esup-Pod?',
      answer:
        'Yes. It is an Esup-Pod instance run by Université de Lille for hosting educational videos and podcasts.'
    },
    {
      question: 'What happens if a recording is private or restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image instead of a broken player.'
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
