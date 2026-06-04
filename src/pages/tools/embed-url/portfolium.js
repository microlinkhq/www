import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Portfolium',
  slug: 'portfolium',
  color: '#00A1E0',
  exampleUrl: 'https://portfolium.com',
  metaTitle:
    'Portfolium Embed Code Generator — Embed ePortfolios & Project Showcases',
  metaDescription:
    'Free Portfolium embed code generator. Paste any Portfolium URL — get a ready-to-paste embed for student ePortfolios and project showcases. No signup.',
  keywords: [
    'embed portfolium',
    'portfolium embed code',
    'portfolium embed code generator',
    'embed portfolium project',
    'embed eportfolio',
    'portfolium iframe code',
    'portfolium project showcase embed'
  ],
  heroTitle: 'Portfolium Embed Code Generator',
  heroSubtitle:
    'Paste any Portfolium URL — get a ready-to-paste embed for student ePortfolios and project showcases.',
  howItWorksHeading: 'How to embed Portfolium content',
  howItWorksSteps: [
    {
      title: 'Paste a Portfolium link',
      description:
        'Copy the URL of any Portfolium project or ePortfolio and paste it into the field.'
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
  explanationHeading: 'Why use our Portfolium embed code generator',
  reasons: [
    {
      title: 'Built for ePortfolios',
      description:
        'Resolves Portfolium project and profile URLs into a clean embed that shows off student work and skills.'
    },
    {
      title: 'Showcase projects anywhere',
      description:
        'Drop a learner project from the Portfolium network into a course page, resume site, or institutional blog.'
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
      title: 'Project showcase embeds',
      description:
        'Embedded Portfolium projects keep their work samples, images, and descriptions in a single tidy block.'
    },
    {
      title: 'Skill and profile previews',
      description:
        'Pulls the title, cover image, and key details so visitors can see the highlights at a glance.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/speakerdeck', label: 'SpeakerDeck' },
    { href: '/tools/embed-url/learningapps-org', label: 'LearningApps' }
  ],
  faq: [
    {
      question: 'How do I embed a Portfolium project on my website?',
      answer:
        'Paste the Portfolium project URL into the tool, click Generate, then copy the embed code into your page.'
    },
    {
      question: 'Can I embed a full ePortfolio, not just one project?',
      answer:
        'Yes. The tool works with Portfolium project pages and profile URLs, generating the right embed for each.'
    },
    {
      question: 'Is Portfolium the same as Instructure?',
      answer:
        'Portfolium is the student ePortfolio network owned by Instructure, the company behind Canvas.'
    },
    {
      question: 'What happens if a project is private or restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image instead of a broken embed.'
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
