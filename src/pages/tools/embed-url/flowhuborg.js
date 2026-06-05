import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'FlowHub',
  slug: 'flowhuborg',
  color: '#040506',
  exampleUrl: 'https://flowhub.org/f/5f0c36ed4bd03058',
  metaTitle: 'FlowHub Embed Code Generator — Embed Node-RED Flows',
  metaDescription:
    'Free FlowHub embed code generator. Paste a flowhub.org flow URL to get ready-to-paste embed HTML or a preview card for your Node-RED flows. No signup.',
  keywords: [
    'embed flowhub',
    'flowhub embed code',
    'embed flowhub flow',
    'embed node-red flow',
    'flowhub embed generator',
    'flowhub oembed',
    'share node-red flow',
    'flowhub.org embed'
  ],
  heroTitle: 'FlowHub Embed Code Generator',
  heroSubtitle:
    'Paste a FlowHub flow URL to get a ready-to-paste embed or preview card for your Node-RED flow.',
  howItWorksHeading: 'How to embed a FlowHub flow',
  howItWorksSteps: [
    {
      title: 'Paste a FlowHub link',
      description:
        'Copy a flowhub.org flow URL, such as a /f/ share link to a Node-RED flow.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the flow via FlowHub oEmbed and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our FlowHub embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a FlowHub flow link and get working embed HTML without copying oEmbed snippets by hand.'
    },
    {
      title: 'Built for Node-RED flows',
      description:
        'Shows a visual preview of the shared Node-RED flow alongside its title and description.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 FlowHub embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'oEmbed-powered embed',
      description:
        'Uses FlowHub oEmbed support to pull the shared flow visualization into your page.'
    },
    {
      title: 'Node-RED flow previews',
      description:
        'Works with flowhub.org flow links covering web, ETL, IoT, and other Node-RED projects.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/codepen', label: 'CodePen' },
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' },
    { href: '/tools/embed-url/observable', label: 'Observable' }
  ],
  faq: [
    {
      question: 'How do I embed a FlowHub flow on my website?',
      answer:
        'Paste a flowhub.org flow URL into the tool and click Generate. It returns embed HTML you can drop into any page.'
    },
    {
      question: 'What kind of FlowHub content can I embed?',
      answer:
        'Shared Node-RED flows hosted on flowhub.org, including the visual flow diagram and its metadata.'
    },
    {
      question: 'Does it use FlowHub oEmbed?',
      answer:
        'Yes. FlowHub supports the oEmbed standard, and the tool uses it to build the embed for your flow link.'
    },
    {
      question: 'What if the flow cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the available title and image so you always get something to paste.'
    },
    {
      question: 'Is the FlowHub embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
