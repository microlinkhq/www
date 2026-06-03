import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Animatron',
  slug: 'animatron',
  color: '#0091ff',
  exampleUrl: 'https://www.animatron.com/studio',
  metaTitle:
    'Animatron Embed Code Generator — Embed Animatron animations and videos',
  metaDescription:
    'Free Animatron embed code generator. Paste an Animatron Studio link to get a ready-to-paste embed for your HTML5 animation or video. No signup.',
  keywords: [
    'embed animatron',
    'animatron embed code',
    'embed animatron animation',
    'embed animatron video',
    'animatron studio embed',
    'animatron iframe code',
    'animatron embed generator',
    'embed html5 animation'
  ],
  heroTitle: 'Animatron Embed Code Generator',
  heroSubtitle:
    'Paste an Animatron Studio link and get ready-to-paste embed HTML for your animation or video.',
  howItWorksHeading: 'How to embed an Animatron animation',
  howItWorksSteps: [
    {
      title: 'Paste an Animatron link',
      description:
        'Copy the share or preview link of your published Animatron Studio project from animatron.com.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects your Animatron movie and generates a responsive iframe embed you can drop anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Animatron embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Animatron Studio export settings — paste a link and get working embed HTML.'
    },
    {
      title: 'Animations and videos',
      description:
        'Embed HTML5 animations and marketing videos published from Animatron Studio.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Animatron embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Animatron embed',
      description:
        'Get the real Animatron player iframe so your animation plays inline with full interactivity.'
    },
    {
      title: 'Responsive by default',
      description:
        'Embeds scale to fit your layout so animations and videos look right on any screen.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/animoto', label: 'Animoto' },
    { href: '/tools/embed-url/wavevideo', label: 'Wave.video' },
    { href: '/tools/embed-url/lottiefiles', label: 'LottieFiles' }
  ],
  faq: [
    {
      question: 'How do I embed an Animatron animation on my website?',
      answer:
        'Paste the share or preview link of your published Animatron Studio project into the tool and click Generate. Copy the embed code and paste it into your page.'
    },
    {
      question: 'What kind of Animatron content can I embed?',
      answer:
        'HTML5 animations and marketing videos published from Animatron Studio, the online animation maker in the Wave.video family.'
    },
    {
      question: 'Will the embed be responsive?',
      answer:
        'Yes. The generated iframe scales to fit your layout so your Animatron animation or video looks right on any screen size.'
    },
    {
      question: 'What if the Animatron project is private or unlisted?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card built from the available metadata such as the title and image.'
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
