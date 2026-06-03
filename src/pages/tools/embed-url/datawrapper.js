import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Datawrapper',
  slug: 'datawrapper',
  color: '#017DA1',
  exampleUrl: 'https://www.datawrapper.de/_/13o5F/',
  metaTitle: 'Datawrapper Embed Code Generator — Embed Charts, Maps & Tables',
  metaDescription:
    'Free Datawrapper embed code generator. Paste any Datawrapper URL — get a responsive iframe for charts, maps, and tables. No signup.',
  keywords: [
    'embed datawrapper chart',
    'datawrapper embed code',
    'datawrapper embed code generator',
    'datawrapper iframe code',
    'embed datawrapper map',
    'embed datawrapper table',
    'datawrapper embed html',
    'datawrapper responsive embed'
  ],
  heroTitle: 'Datawrapper Embed Code Generator',
  heroSubtitle:
    'Paste any Datawrapper URL — get a ready-to-paste responsive iframe for charts, maps, and tables.',
  howItWorksHeading: 'How to embed a Datawrapper chart',
  howItWorksSteps: [
    {
      title: 'Paste a Datawrapper link',
      description: 'Copy any published Datawrapper chart, map, or table URL.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the visualization type and generates the correct responsive iframe HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Datawrapper embed code generator',
  reasons: [
    {
      title: 'No export settings',
      description:
        'Skip digging through Datawrapper publish dialogs. Paste any chart link and get working embed HTML.'
    },
    {
      title: 'Charts, maps & tables',
      description:
        'Works with bar and line charts, choropleth and locator maps, and tables — every Datawrapper visualization type.'
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
      title: 'Interactive & responsive',
      description:
        'Tooltips, hover states, and responsive scaling all work inside the embed, adapting to any container width.'
    },
    {
      title: 'All visualization types',
      description:
        'Bar, line, and scatter charts, choropleth and symbol maps, locator maps, and data tables are all supported.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/infogram',
      label: 'Infogram'
    },
    {
      href: '/tools/embed-url/flourish',
      label: 'Flourish'
    },
    {
      href: '/tools/embed-url/observable',
      label: 'Observable'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Datawrapper chart on my website?',
      answer:
        'Paste any published Datawrapper URL into the tool and click Generate. You will get a ready-to-paste iframe HTML snippet to add to your blog, CMS, or MDX file.'
    },
    {
      question: 'Are the chart interactive and responsive features preserved?',
      answer:
        'Yes. Tooltips, hover states, and responsive scaling all work inside the embedded iframe, and the chart resizes to fit any container width.'
    },
    {
      question: 'Can I embed Datawrapper maps and tables?',
      answer:
        'Yes. Choropleth maps, symbol maps, locator maps, and data tables are all supported alongside charts.'
    },
    {
      question: 'What happens if native embedding is restricted?',
      answer:
        'Switch to Card mode to get a styled preview card with the visualization title and image as a fallback.'
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
