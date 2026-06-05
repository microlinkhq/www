import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod UPEC',
  slug: 'podupec',
  color: '#003B71',
  exampleUrl: 'https://pod.u-pec.fr',
  metaTitle: 'Pod UPEC Embed Code Generator — Embed Lecture Videos & Podcasts',
  metaDescription:
    'Free Pod UPEC embed code generator. Paste any pod.u-pec.fr URL — get a ready-to-paste player for lecture videos and podcasts from Université Paris-Est Créteil. No signup.',
  keywords: [
    'embed pod upec',
    'pod upec embed code',
    'pod u-pec embed generator',
    'embed esup-pod upec',
    'pod upec iframe code',
    'embed lecture video upec',
    'pod upec player embed'
  ],
  heroTitle: 'Pod UPEC Embed Code Generator',
  heroSubtitle:
    'Paste any pod.u-pec.fr URL — get a ready-to-paste player for lecture recordings and academic podcasts from Université Paris-Est Créteil.',
  howItWorksHeading: 'How to embed Pod UPEC content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod UPEC link',
      description:
        'Copy the URL of any lecture video or podcast from pod.u-pec.fr and paste it into the field.'
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
  explanationHeading: 'Why use our Pod UPEC embed code generator',
  reasons: [
    {
      title: 'Built for Esup-Pod',
      description:
        'Tuned for the Esup-Pod platform run by Université Paris-Est Créteil, so academic video URLs resolve into a working player.'
    },
    {
      title: 'Lectures and podcasts in one place',
      description:
        'Handles both recorded lectures and audio podcasts hosted on pod.u-pec.fr with the correct player for each.'
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
        'Audio podcasts published on Pod UPEC embed with their native player and metadata.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/podulille', label: 'Pod Université de Lille' },
    { href: '/tools/embed-url/poduparis1', label: 'Pod Université Paris 1' },
    { href: '/tools/embed-url/nanoo', label: 'Nanoo' }
  ],
  faq: [
    {
      question: 'How do I embed a Pod UPEC lecture on my site?',
      answer:
        'Paste the pod.u-pec.fr lecture URL into the tool, click Generate, then copy the embed code into your page.'
    },
    {
      question: 'Can I embed podcasts as well as videos?',
      answer:
        'Yes. Both lecture videos and audio podcasts from Pod UPEC are supported, each with the right player.'
    },
    {
      question: 'Is Pod UPEC part of Esup-Pod?',
      answer:
        'Yes. It is an Esup-Pod instance run by Université Paris-Est Créteil for hosting educational videos and podcasts.'
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
