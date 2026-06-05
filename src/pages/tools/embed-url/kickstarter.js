import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kickstarter',
  slug: 'kickstarter',
  color: '#05CE78',
  exampleUrl: 'https://www.kickstarter.com/projects/elanlee/exploding-kittens',
  metaTitle: 'Kickstarter Embed Code Generator — Embed Projects & Videos',
  metaDescription:
    'Free Kickstarter embed code generator. Paste any project URL — get a ready-to-paste embed for the pitch video or a project widget with funding stats. No signup.',
  keywords: [
    'embed kickstarter',
    'kickstarter embed code',
    'kickstarter embed code generator',
    'embed kickstarter project',
    'embed kickstarter video',
    'kickstarter widget embed',
    'kickstarter iframe code'
  ],
  heroTitle: 'Kickstarter Embed Code Generator',
  heroSubtitle:
    'Paste any Kickstarter project URL — get a ready-to-paste embed for the pitch video or a project widget with funding stats.',
  howItWorksHeading: 'How to embed a Kickstarter project',
  howItWorksSteps: [
    {
      title: 'Paste a Kickstarter link',
      description:
        'Copy any kickstarter.com/projects URL — campaign pages, pitch videos, and project widgets.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the project and generates the right embed HTML for the video or widget.'
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
        'Skip hunting for the Embed button on the project page. Paste any Kickstarter link and get working embed HTML.'
    },
    {
      title: 'Video or widget',
      description:
        'Embed the pitch video or a project widget showing the image, status, description, and funding stats.'
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
      title: 'Native project widget',
      description:
        'Get the real Kickstarter widget with the project image, funding progress, and backer stats.'
    },
    {
      title: 'Pitch video embed',
      description:
        'When a campaign has a pitch video, embed the player directly so visitors can watch it inline.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/actblue',
      label: 'ActBlue'
    },
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Kickstarter project on my website?',
      answer:
        'Paste any Kickstarter project URL into the tool and click Generate. You will get a ready-to-paste embed for the pitch video or project widget.'
    },
    {
      question: 'Can I embed the project widget with funding stats?',
      answer:
        'Yes. Projects can be embedded as a widget showing the image, status, description, and funding stats, or as the pitch video when one exists.'
    },
    {
      question: 'What if a project has no pitch video?',
      answer:
        'When a project has no video, the embed falls back to the project widget with the image, funding progress, and key stats.'
    },
    {
      question: 'What if the project cannot be embedded natively?',
      answer:
        'Switch to Card mode and the tool generates a styled preview card with the project title and image instead.'
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
