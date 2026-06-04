import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vouch',
  slug: 'vouch',
  color: '#5B2EFF',
  exampleUrl: 'https://vouchfor.com',
  metaTitle: 'Vouch Embed Code Generator — Embed Video Testimonials',
  metaDescription:
    'Free Vouch embed code generator. Paste any Vouch URL — get a ready-to-paste player for video testimonials and customer feedback reels. No signup.',
  keywords: [
    'embed vouch',
    'vouch embed code',
    'vouch embed code generator',
    'embed vouch testimonial',
    'vouch iframe code',
    'vouch video player embed',
    'embed video testimonials'
  ],
  heroTitle: 'Vouch Embed Code Generator',
  heroSubtitle:
    'Paste any Vouch URL — get a ready-to-paste player for video testimonials and customer feedback reels.',
  howItWorksHeading: 'How to embed Vouch testimonials',
  howItWorksSteps: [
    {
      title: 'Paste a Vouch link',
      description:
        'Copy the URL of any Vouch video testimonial or feedback collection and drop it into the field.'
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
  explanationHeading: 'Why use our Vouch embed code generator',
  reasons: [
    {
      title: 'Built for video testimonials',
      description:
        'Turn a Vouch testimonial link into a clean, embeddable player you can place on landing pages and case studies.'
    },
    {
      title: 'No manual setup',
      description:
        'Skip digging through share menus. Paste a Vouch link and get working embed HTML in one step.'
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
      title: 'Testimonial player embed',
      description:
        'Embed the interactive Vouch player so visitors can watch customer testimonials inline.'
    },
    {
      title: 'Feedback reel support',
      description:
        'Works with single testimonials and curated feedback reels collected through Vouch.'
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
    { href: '/tools/embed-url/synthesia', label: 'Synthesia' }
  ],
  faq: [
    {
      question: 'How do I embed a Vouch video testimonial on my site?',
      answer:
        'Paste the Vouch testimonial URL into the tool and click Generate. You will get a ready-to-paste player snippet.'
    },
    {
      question: 'Can I embed a whole Vouch feedback collection?',
      answer:
        'Yes. Paste the link to a Vouch reel or collection and the tool generates the matching embed.'
    },
    {
      question: 'Will the testimonial stay playable after I paste it?',
      answer:
        'The embed loads the live Vouch player, so the testimonial plays directly inside your page.'
    },
    {
      question: 'What if the Vouch testimonial is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
