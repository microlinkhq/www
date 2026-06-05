import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Buttondown',
  slug: 'buttondown',
  color: '#0069FF',
  exampleUrl:
    'https://buttondown.com/where-to-post/archive/launching-on-product-hunt/',
  metaTitle:
    'Buttondown Embed Code Generator — Embed Newsletter Issues & Archives',
  metaDescription:
    'Free Buttondown embed code generator. Paste a public newsletter issue or archive URL and get a ready-to-paste preview card with title and image. No signup.',
  keywords: [
    'embed buttondown',
    'buttondown embed code',
    'embed buttondown newsletter',
    'buttondown issue embed',
    'buttondown archive embed',
    'embed buttondown email',
    'buttondown newsletter preview card'
  ],
  heroTitle: 'Buttondown Embed Code Generator',
  heroSubtitle:
    'Paste a public Buttondown newsletter issue or archive URL to generate a clean preview card you can drop into any page.',
  howItWorksHeading: 'How to embed a Buttondown newsletter',
  howItWorksSteps: [
    {
      title: 'Paste a Buttondown link',
      description:
        'Copy a public buttondown.com archive URL — a single newsletter issue (/archive/your-issue/) or a full archive index.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the issue title, author, and preview image, then generates a styled preview card linking to the post.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Buttondown embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Buttondown has no per-issue iframe embed, so we build a tidy preview card from the public archive page automatically.'
    },
    {
      title: 'Works with issues and archives',
      description:
        'Paste a single newsletter issue or your full archive index — both buttondown.com/username and custom-domain archives work.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Buttondown embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Newsletter preview card',
      description:
        'Pulls the issue title, author, and cover image from the public archive into a clean linked card.'
    },
    {
      title: 'Responsive by default',
      description:
        'The generated card scales to its container, so it looks right on blogs, docs, and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/kit', label: 'Kit' },
    { href: '/tools/embed-url/wordpress-com', label: 'WordPress.com' },
    { href: '/tools/embed-url/tumblr', label: 'Tumblr' }
  ],
  faq: [
    {
      question: 'How do I embed a Buttondown newsletter on my website?',
      answer:
        'Paste a public Buttondown archive URL into the tool and click Generate. You will get a ready-to-paste preview card linking back to the issue.'
    },
    {
      question: 'Does Buttondown have a native iframe embed?',
      answer:
        'Buttondown does not offer a per-issue iframe embed. We generate a styled preview card from the public archive page so you can still share the issue inline.'
    },
    {
      question: 'Can I embed a single issue or the whole archive?',
      answer:
        'Both. Paste a single issue URL like buttondown.com/username/archive/issue-slug/, or the archive index URL to link to the newsletter as a whole.'
    },
    {
      question: 'What if the newsletter issue is private or subscriber-only?',
      answer:
        'Issues gated to subscribers are not publicly readable, so the tool falls back to a basic preview card with whatever metadata is available.'
    },
    {
      question: 'Is the Buttondown embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
