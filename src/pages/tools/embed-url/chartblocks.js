import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ChartBlocks',
  slug: 'chartblocks',
  color: '#1C75BC',
  exampleUrl: 'https://public.chartblocks.com/c/5adc3c471ea0f6ac2f827745',
  metaTitle: 'ChartBlocks Embed Code Generator — Embed Interactive Charts',
  metaDescription:
    'Free ChartBlocks embed code generator. Paste any ChartBlocks chart URL — get a ready-to-paste iframe for interactive bar, line, and scatter charts. No signup.',
  keywords: [
    'embed chartblocks',
    'chartblocks embed code',
    'chartblocks embed code generator',
    'embed chartblocks chart',
    'chartblocks iframe code',
    'embed interactive chart',
    'chartblocks chart embed'
  ],
  heroTitle: 'ChartBlocks Embed Code Generator',
  heroSubtitle:
    'Paste any ChartBlocks chart URL — get a ready-to-paste iframe for interactive bar, line, and scatter charts.',
  howItWorksHeading: 'How to embed a ChartBlocks chart',
  howItWorksSteps: [
    {
      title: 'Paste a ChartBlocks link',
      description:
        'Copy a public.chartblocks.com chart URL — the public share link for any bar, line, pie, or scatter chart.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the chart and generates the right responsive iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our ChartBlocks embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share dialog. Paste a ChartBlocks chart link and get working embed HTML.'
    },
    {
      title: 'Interactive charts stay interactive',
      description:
        'The embed keeps the chart responsive and interactive — hover tooltips and resizing work just like on ChartBlocks.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 ChartBlocks embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native chart embed',
      description:
        'Get the real ChartBlocks iframe so the published chart renders live on your page.'
    },
    {
      title: 'Bar, line, pie & scatter charts',
      description:
        'Works with every ChartBlocks chart type, and the responsive embed adapts to your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/infogram', label: 'Infogram' },
    { href: '/tools/embed-url/flourish', label: 'Flourish' }
  ],
  faq: [
    {
      question: 'How do I embed a ChartBlocks chart on my website?',
      answer:
        'Paste a public ChartBlocks chart URL (public.chartblocks.com/c/...) into the tool and click Generate. You will get a ready-to-paste iframe.'
    },
    {
      question: 'What chart types can I embed?',
      answer:
        'Any chart published on ChartBlocks — bar, line, pie, scatter, and other chart types are all supported.'
    },
    {
      question: 'Is the embedded chart still interactive?',
      answer:
        'Yes. The native iframe keeps the chart responsive, with hover tooltips and resizing intact.'
    },
    {
      question: 'What if the chart is private or unavailable?',
      answer:
        'The tool falls back to a styled preview card with the available title and image when the chart cannot be embedded natively.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const ChartBlocksPage = () => <ProviderSubtool {...data} />

export default ChartBlocksPage
