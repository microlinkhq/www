import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Odds',
  slug: 'odds',
  color: '#666666',
  exampleUrl: 'https://odds.com.au',
  metaTitle: 'Odds Embed Code Generator — Embed Pages & Shared Content',
  metaDescription:
    'Free Odds embed code generator. Paste any Odds URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed odds',
    'odds embed code',
    'odds embed code generator',
    'embed odds page',
    'embed odds link',
    'odds iframe code',
    'odds link embed'
  ],
  heroTitle: 'Odds Embed Code Generator',
  heroSubtitle:
    'Paste any Odds URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Odds content',
  howItWorksSteps: [
    {
      title: 'Paste an Odds link',
      description:
        'Copy the URL of any Odds page or shared link and paste it into the tool.'
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
  explanationHeading: 'Why use our Odds embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Odds link and get working embed HTML without writing any markup yourself.'
    },
    {
      title: 'Handles any Odds URL',
      description:
        'Works across Odds pages and shared content, generating a clean embed for whatever you link to.'
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
      title: 'Page embeds',
      description:
        'Embed Odds pages and shared links so visitors can preview the content directly on your site.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed scales to fit its container so it looks right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/pastery', label: 'Pastery' }
  ],
  faq: [
    {
      question: 'How do I embed an Odds page on my website?',
      answer:
        'Copy the Odds URL, paste it into the tool, then copy the generated HTML into your page.'
    },
    {
      question: 'What kind of Odds links can I embed?',
      answer:
        'Paste any Odds page or shared link and the tool will generate the best available embed for it.'
    },
    {
      question: 'Will the embed be responsive?',
      answer:
        'Yes. The output scales to fit its container so it displays correctly on any screen size.'
    },
    {
      question: 'What if an Odds link cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the title, image, and a link to the original page.'
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
