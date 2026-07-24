import React from 'react'
import { Shield } from 'react-feather'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import { theme } from 'theme'

import {
  buildMqlLanguages,
  faqFromItems
} from 'components/patterns/FeatureStory'

export const META = {
  title: 'Residential Proxy API: Bypass Antibots & CAPTCHAs',
  description:
    'Residential Proxy API that bypasses Cloudflare, DataDome, Akamai antibots and reCAPTCHA, hCaptcha, Cloudflare Turnstile on metadata, HTML and markdown scraping requests. Zero-config web unblocker — one parameter replaces three vendors.'
}

export const HERO = {
  name: 'Proxy Resolution',
  title: 'Proxy Resolution',
  description:
    'Zero-config web unblocker. Auto-detect blocks, route through a rotating residential pool, and pick the resolution path for that antibot — well-tested across the Top 500 sites.',
  primaryCta: {
    label: 'See pricing →',
    href: '/pricing'
  },
  secondaryCta: {
    label: 'View API docs',
    href: '/docs/api/parameters/proxy'
  },
  plans: [
    { plan: 'Pro', description: 'Automatic residential resolution included.' }
  ]
}

export const HeroMark = () => (
  <Flex
    css={theme({
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      border: 1,
      borderColor: 'black10',
      bg: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'blue7'
    })}
  >
    <Shield size={36} />
  </Flex>
)

export const OVERVIEW = {
  body: (
    <>
      On Pro, the API detects when a target is blocking and routes through a
      residential pool for that provider. Verify with{' '}
      <Link href='/docs/guides/common/proxy#verify-proxy-is-active'>
        x-fetch-mode
      </Link>{' '}
      ending in <code>-proxy</code>. Or bring your own exit IP with the{' '}
      <Link href='/docs/api/parameters/proxy'>proxy</Link> parameter.
    </>
  ),
  bullets: [
    'Included on every Pro plan — cancel a vendor',
    'Cloudflare, DataDome, Akamai, PerimeterX, and more',
    'CAPTCHA avoidance without a third-party solver',
    'Works on metadata, HTML, and markdown requests'
  ],
  sample: `{
  "status": "success",
  "headers": {
    "x-pricing-plan": "pro",
    "x-fetch-mode": "fetch-proxy"
  }
}`,
  sampleTitle: 'headers'
}

export const STEPS = [
  {
    title: 'Request',
    description: 'Call metadata, HTML, or markdown with your Pro API key.'
  },
  {
    title: 'Detect',
    description: 'Microlink identifies which antibot or CAPTCHA is blocking.'
  },
  {
    title: 'Route',
    description: 'Rotate residential IPs and escalate rendering as needed.'
  },
  {
    title: 'Verify',
    description: 'x-fetch-mode ending in -proxy confirms the path taken.'
  }
]

export const LANGUAGES = buildMqlLanguages({
  url: 'https://www.bloomberg.com',
  options: {},
  comment: 'Pro API key enables automatic proxy resolution'
})

// Inject apiKey note into JS sample
LANGUAGES.JavaScript = `import mql from '@microlink/mql'

const { data } = await mql('https://www.bloomberg.com', {
  apiKey: process.env.MICROLINK_API_KEY
})

console.log(data)`

export const QUICK_START = {
  description:
    'No proxy config required on Pro. Pass proxy as a URL only when you need a dedicated geo IP.',
  playgroundHref: '/docs/guides/common/proxy'
}

export const PARAMS = {
  docsHref: '/docs/api/parameters/proxy',
  rows: [
    {
      name: 'url',
      type: 'string',
      description: 'Target page (auto-proxy on meta / html / markdown).',
      required: true,
      plan: 'Free + Pro'
    },
    {
      name: 'proxy',
      type: 'boolean | string',
      description: 'Omit for automatic Pro resolution; pass a URL for BYO.',
      required: false,
      plan: 'Pro (auto) / all (BYO)'
    },
    {
      name: 'apiKey',
      type: 'string',
      description: 'Pro authentication required for automatic resolution.',
      required: true,
      plan: 'Pro'
    }
  ]
}

export const EXAMPLES = {
  moreHref: '/docs/guides/common/proxy',
  items: [
    {
      title: 'Automatic resolution',
      description: 'Pro engages the proxy layer only when required.',
      snippet: 'await mql(url, { apiKey: process.env.MICROLINK_API_KEY })',
      href: '/features/proxy'
    },
    {
      title: 'Bring your own proxy',
      description: 'Force a dedicated or geo-fixed residential exit.',
      snippet: "proxy: 'https://user:pass@superproxy.cool:8001'",
      href: '/docs/guides/common/proxy#bring-your-own-proxy'
    },
    {
      title: 'Verify proxy was used',
      description: 'Inspect response headers after a proxied call.',
      snippet: `x-fetch-mode: fetch-proxy
x-pricing-plan: pro`,
      href: '/docs/guides/common/proxy#verify-proxy-is-active'
    }
  ]
}

export const USE_CASES = [
  {
    title: 'Replace three vendors',
    description: 'Pool + antibot + CAPTCHA under one Pro key.',
    icon: 'shield'
  },
  {
    title: 'Top-500 scraping',
    description: 'Metadata and HTML past major WAFs.',
    icon: 'globe'
  },
  {
    title: 'CAPTCHA avoidance',
    description: 'Clean residential exits reduce challenges.',
    icon: 'radar'
  },
  {
    title: 'Fixed-country exits',
    description: 'Pass your own proxy URL for a dedicated geo IP.',
    icon: 'lock'
  },
  {
    title: 'No silent blocks',
    description: 'Free plans get EPROXYNEEDED instead of empty failures.',
    icon: 'code'
  }
]

export const FAQ_RAW = [
  {
    question: 'Do I need to bring my own proxy?',
    text: 'No — the residential proxy is included on every Pro plan. Without Pro, when a target requires a proxy the API returns EPROXYNEEDED. Pass your own proxy URL when you need a fixed country IP.'
  },
  {
    question: 'Does this work with screenshots and PDFs too?',
    text: 'Not yet. Automatic proxy resolution currently runs on metadata, HTML scraping, and markdown requests. For screenshots and PDFs, bring your own proxy via the proxy parameter or contact hello@microlink.io.'
  },
  {
    question: 'Which antibot systems does Microlink bypass?',
    text: 'Nine major providers including Cloudflare, DataDome, Akamai Bot Manager, PerimeterX, Kasada, Imperva, AWS WAF, Vercel Attack Mode, and Shape Security. Detection is open source as is-antibot.'
  },
  {
    question: 'Does this bypass CAPTCHAs too?',
    text: 'Yes. Most CAPTCHAs never surface when requests look like a real browser on a clean residential IP. When a challenge appears, the pipeline escalates — a third-party CAPTCHA solver is never needed.'
  },
  {
    question: 'How do I confirm a proxy was actually used?',
    text: 'Check the x-fetch-mode response header. Any value ending in -proxy means the request was routed through the proxy layer.'
  }
]

export const FAQ_ITEMS = faqFromItems(FAQ_RAW)
