import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CodeSandbox',
  slug: 'codesandbox',
  color: '#161616',
  exampleUrl: 'https://codesandbox.io/s/new',
  metaTitle: 'CodeSandbox Embed Code Generator — Embed Live Sandboxes',
  metaDescription:
    'Free CodeSandbox embed code generator. Paste any CodeSandbox URL — get a ready-to-paste iframe with a live, editable sandbox and preview. No signup.',
  keywords: [
    'embed codesandbox',
    'embed codesandbox sandbox',
    'codesandbox embed code',
    'codesandbox embed code generator',
    'codesandbox iframe code',
    'embed codesandbox in blog',
    'codesandbox embed html'
  ],
  heroTitle: 'CodeSandbox Embed Code Generator',
  heroSubtitle:
    'Paste any CodeSandbox URL — get a ready-to-paste iframe with a live, editable sandbox and preview.',
  howItWorksHeading: 'How to embed CodeSandbox content',
  howItWorksSteps: [
    {
      title: 'Paste a CodeSandbox link',
      description:
        'Copy any codesandbox.io URL — a sandbox editor link or a shared sandbox.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the sandbox and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our CodeSandbox embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip opening the Share dialog and copying embed options on CodeSandbox. Paste any sandbox link and get working embed HTML.'
    },
    {
      title: 'Live, editable sandbox',
      description:
        'The embed runs the actual sandbox — readers can browse the file tree, edit the code, and see the preview update.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CodeSandbox embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Runnable code editor',
      description:
        'The embed shows the code editor, file explorer, and a live preview, so readers can run and modify the project inline.'
    },
    {
      title: 'Editor and preview views',
      description:
        'Show just the code, just the preview, or both side by side — the responsive embed adapts to your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    },
    {
      href: '/tools/embed-url/replit',
      label: 'Replit'
    },
    {
      href: '/tools/embed-url/wokwi',
      label: 'Wokwi'
    }
  ],
  faq: [
    {
      question: 'How do I embed a CodeSandbox sandbox on my website?',
      answer:
        'Paste any codesandbox.io URL into the tool and click Generate. You will get a ready-to-paste iframe with a live, editable sandbox.'
    },
    {
      question: 'Is the embedded sandbox editable?',
      answer:
        'Yes. The embed shows the code editor, file tree, and a live preview, so readers can run and edit the project inline.'
    },
    {
      question: 'Can I choose to show only the code or only the preview?',
      answer:
        'Yes. CodeSandbox embeds support editor-only, preview-only, and split views, and the embed is responsive so it adapts to your layout.'
    },
    {
      question: 'What happens if a sandbox cannot be embedded directly?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the title and image that links to the sandbox.'
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
