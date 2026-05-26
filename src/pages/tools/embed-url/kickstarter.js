import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kickstarter',
  slug: 'kickstarter',
  color: '#05CE78',
  exampleUrl: 'https://www.kickstarter.com/projects/creator/project-name',
  metaTitle: 'Kickstarter Embed Code Generator — Embed Projects & Campaigns',
  metaDescription:
    'Free Kickstarter embed code generator. Paste any Kickstarter URL — get a ready-to-paste embed for campaigns and projects. No signup.',
  keywords: [
    'embed kickstarter',
    'kickstarter embed code',
    'kickstarter embed generator',
    'embed kickstarter project',
    'kickstarter campaign embed',
    'kickstarter embed html'
  ],
  heroTitle: 'Kickstarter Embed Code Generator',
  heroSubtitle:
    'Paste any Kickstarter URL — get a ready-to-paste embed for campaigns and projects.',
  howItWorksHeading: 'How to embed Kickstarter content',
  howItWorksSteps: [
    {
      title: 'Paste a Kickstarter link',
      description: 'Copy any Kickstarter URL — projects and campaigns.'
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
  explanationHeading: 'Why use our Kickstarter embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Kickstarter link and get working embed HTML.'
    },
    {
      title: 'All Kickstarter content',
      description:
        'Works with projects and campaigns — the tool handles all Kickstarter URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Kickstarter embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Campaign widget',
      description:
        'Get the Kickstarter campaign widget with project image, funding progress, and backer count.'
    },
    {
      title: 'Any campaign URL',
      description:
        'Active campaigns, funded projects, and creator pages — all Kickstarter link types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled card with project details when the native widget is not available.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/amazon',
      label: 'Amazon'
    },
    {
      href: '/tools/embed-url/etsy',
      label: 'Etsy'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Kickstarter project?',
      answer:
        'Paste any Kickstarter project URL into the tool and click Generate.'
    },
    {
      question: 'Does the embed show funding progress?',
      answer:
        'The Kickstarter embed shows the project card with campaign details.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const KickstarterPage = () => <ProviderSubtool {...data} />

export default KickstarterPage
