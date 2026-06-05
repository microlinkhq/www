import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Observable',
  slug: 'observable',
  color: '#4269D0',
  exampleUrl: 'https://observablehq.com/@d3/bar-chart-transitions',
  metaTitle: 'Observable Embed Code Generator — Embed Notebooks & D3 Charts',
  metaDescription:
    'Free Observable embed code generator. Paste any Observable URL — get a ready-to-paste iframe for interactive notebooks, D3 charts, and data visualizations. No signup.',
  keywords: [
    'embed observable',
    'observable embed code',
    'observable embed code generator',
    'embed observable notebook',
    'observable notebook iframe',
    'embed observable chart',
    'observable d3 embed'
  ],
  heroTitle: 'Observable Embed Code Generator',
  heroSubtitle:
    'Paste any Observable URL — get a ready-to-paste iframe for interactive notebooks, D3 charts, and data visualizations.',
  howItWorksHeading: 'How to embed an Observable notebook',
  howItWorksSteps: [
    {
      title: 'Paste an Observable link',
      description:
        'Copy any observablehq.com URL — interactive notebooks, D3 charts, and data visualizations.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the notebook and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Observable embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing the iframe by hand. Paste any Observable link and get working embed HTML.'
    },
    {
      title: 'Keeps notebooks interactive',
      description:
        'Embedded notebooks stay live and reactive — readers can interact with the visualization, not just view a screenshot.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Observable embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Live interactive notebook',
      description:
        'Get the real Observable notebook embed with reactive cells and full D3 interactivity intact.'
    },
    {
      title: 'Notebooks, charts & data viz',
      description:
        'Works with full notebooks and individual cells — D3 charts, maps, and exploratory data visualizations all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/flourish', label: 'Flourish' },
    { href: '/tools/embed-url/infogram', label: 'Infogram' }
  ],
  faq: [
    {
      question: 'How do I embed an Observable notebook on my website?',
      answer:
        'Paste any observablehq.com URL into the tool and click Generate. You will get a ready-to-paste iframe that renders the live notebook.'
    },
    {
      question: 'Can I embed a single cell instead of the whole notebook?',
      answer:
        'Yes. Observable supports embedding individual cells, so you can show just one D3 chart or visualization rather than the entire notebook.'
    },
    {
      question: 'Is the embedded notebook still interactive?',
      answer:
        'Yes. The notebook stays reactive inside the iframe, so viewers can use inputs and explore the data visualization directly.'
    },
    {
      question: 'What if the Observable notebook is private?',
      answer:
        'Private or unlisted notebooks cannot be embedded natively. The tool falls back to a styled preview card with the available title and image.'
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
