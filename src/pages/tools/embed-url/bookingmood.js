import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bookingmood',
  slug: 'bookingmood',
  color: '#10b981',
  exampleUrl: 'https://www.bookingmood.com/en-US/features/widgets',
  metaTitle:
    'Bookingmood Embed Code Generator — Embed Availability Calendars & Booking Widgets',
  metaDescription:
    'Free Bookingmood embed code generator. Paste a Bookingmood widget URL to embed an availability calendar or booking widget for your rental. No signup.',
  keywords: [
    'embed bookingmood',
    'bookingmood embed code',
    'bookingmood widget embed',
    'embed bookingmood calendar',
    'bookingmood availability calendar',
    'embed booking calendar rental',
    'bookingmood booking widget',
    'bookingmood embed generator'
  ],
  heroTitle: 'Bookingmood Embed Code Generator',
  heroSubtitle:
    'Paste a Bookingmood widget URL to embed an availability calendar or booking widget for your rental.',
  howItWorksHeading: 'How to embed a Bookingmood widget',
  howItWorksSteps: [
    {
      title: 'Paste a Bookingmood link',
      description:
        'Copy a bookingmood.com widget or share link — a calendar, timeline, inventory, or search widget.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Bookingmood widget and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Bookingmood embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a Bookingmood widget link and get working embed HTML — no dashboard digging.'
    },
    {
      title: 'Booking-ready calendars',
      description:
        'Embeds the live availability calendar so visitors can check dates and request bookings.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Bookingmood embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native booking widget',
      description:
        'Get the real Bookingmood widget with live availability and direct booking requests when available.'
    },
    {
      title: 'Calendar, timeline & search',
      description:
        'Works with Bookingmood calendar, timeline, inventory, and search widgets, and adapts to your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/tickcounter', label: 'TickCounter' },
    { href: '/tools/embed-url/padlet', label: 'Padlet' },
    { href: '/tools/embed-url/wordpress-com', label: 'WordPress.com' }
  ],
  faq: [
    {
      question: 'How do I embed a Bookingmood calendar on my website?',
      answer:
        'Paste your Bookingmood widget URL into the tool and click Generate, then copy the embed code into your page.'
    },
    {
      question: 'Which Bookingmood widgets can I embed?',
      answer:
        'Calendar, timeline, inventory, and search widgets — anything Bookingmood lets you share as a widget link.'
    },
    {
      question: 'Can visitors book directly through the embedded widget?',
      answer:
        'Yes — the native Bookingmood widget keeps live availability and lets visitors place booking requests or instant bookings.'
    },
    {
      question: 'What if the widget cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the available title and image so you always get something to paste.'
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
