import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'GW2Fashions',
  slug: 'gw2fashions',
  color: '#AA0404',
  exampleUrl: 'https://gw2fashions.com/',
  metaTitle:
    'GW2Fashions Embed Code Generator — Embed Guild Wars 2 Fashion Templates',
  metaDescription:
    'Free GW2Fashions embed code generator. Paste a gw2fashions.com URL to get a ready-to-paste embed or styled preview card for Guild Wars 2 fashion looks. No signup.',
  keywords: [
    'embed gw2fashions',
    'gw2fashions embed code',
    'gw2fashions embed code generator',
    'embed guild wars 2 fashion',
    'gw2 fashion template embed',
    'gw2fashions iframe code',
    'embed gw2 outfit'
  ],
  heroTitle: 'GW2Fashions Embed Code Generator',
  heroSubtitle:
    'Paste a GW2Fashions URL to get a ready-to-paste embed or preview card for Guild Wars 2 fashion templates.',
  howItWorksHeading: 'How to embed GW2Fashions content',
  howItWorksSteps: [
    {
      title: 'Paste a GW2Fashions link',
      description:
        'Copy any gw2fashions.com URL for a Guild Wars 2 fashion template or shared look.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page and generates ready-to-paste embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our GW2Fashions embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste a GW2Fashions link and get working embed HTML.'
    },
    {
      title: 'Share your looks',
      description:
        'Embed Guild Wars 2 fashion templates straight into guides, wikis, and community posts.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 GW2Fashions embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Fashion template embeds',
      description:
        'Turn a gw2fashions.com link into an embed for the shared Guild Wars 2 look.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed adapts to your page width so it fits any layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/deviantart-com',
      label: 'DeviantArt'
    },
    {
      href: '/tools/embed-url/behance',
      label: 'Behance'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a GW2Fashions look on my website?',
      answer:
        'Paste a gw2fashions.com URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What is GW2Fashions?',
      answer:
        'GW2Fashions is a community tool for creating and sharing Guild Wars 2 fashion templates — outfit, armor, and dye combinations for your characters.'
    },
    {
      question: 'What if the look cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and image so you always get something to paste.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed adjusts to the width of your page so it works on desktop and mobile.'
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
