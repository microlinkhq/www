import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod Université Paris 1',
  slug: 'poduparis1',
  color: '#0055A4',
  exampleUrl: 'https://mediatheque.univ-paris1.fr',
  metaTitle:
    'Pod Université Paris 1 Embed Code Generator — Embed Lecture Videos & Podcasts',
  metaDescription:
    'Free Pod Université Paris 1 embed code generator. Paste any Panthéon-Sorbonne mediatheque URL — get a ready-to-paste player for lecture videos and podcasts. No signup.',
  keywords: [
    'embed pod univ paris 1',
    'pod université paris 1 embed code',
    'mediatheque univ-paris1 embed generator',
    'embed esup-pod paris 1',
    'panthéon-sorbonne video iframe code',
    'embed lecture video paris 1',
    'pod paris 1 player embed'
  ],
  heroTitle: 'Pod Université Paris 1 Embed Code Generator',
  heroSubtitle:
    'Paste any Panthéon-Sorbonne mediatheque URL — get a ready-to-paste player for lecture recordings and academic podcasts.',
  howItWorksHeading: 'How to embed Pod Université Paris 1 content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod Paris 1 link',
      description:
        'Copy the URL of any lecture video or podcast from the Paris 1 mediatheque and paste it into the field.'
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
  explanationHeading: 'Why use our Pod Université Paris 1 embed code generator',
  reasons: [
    {
      title: 'Built for Esup-Pod',
      description:
        'Tuned for the Esup-Pod platform run by Université Paris 1 Panthéon-Sorbonne, so academic video URLs resolve into a working player.'
    },
    {
      title: 'Lectures and podcasts in one place',
      description:
        'Handles both recorded lectures and audio podcasts from the Paris 1 mediatheque with the correct player for each.'
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
        'Audio podcasts published on Pod Université Paris 1 embed with their native player and metadata.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/podulille', label: 'Pod Université de Lille' },
    { href: '/tools/embed-url/podupec', label: 'Pod UPEC' },
    { href: '/tools/embed-url/skoletube', label: 'SkoleTube' }
  ],
  faq: [
    {
      question: 'How do I embed a Pod Université Paris 1 lecture on my site?',
      answer:
        'Paste the mediatheque URL into the tool, click Generate, then copy the embed code into your page.'
    },
    {
      question: 'Can I embed podcasts as well as videos?',
      answer:
        'Yes. Both lecture videos and audio podcasts from Pod Université Paris 1 are supported, each with the right player.'
    },
    {
      question: 'Is Pod Université Paris 1 part of Esup-Pod?',
      answer:
        'Yes. It is an Esup-Pod instance run by Université Paris 1 Panthéon-Sorbonne for educational videos and podcasts.'
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
