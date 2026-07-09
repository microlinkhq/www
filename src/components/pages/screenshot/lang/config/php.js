import React from 'react'
import { colors } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'

// Per-language configuration for /screenshot/php. PHP has no official Microlink
// SDK, so every example calls the REST API over native HTTP (file_get_contents
// and the cURL extension that ship with PHP — no Composer package required).

const Accent = ({ children }) => (
  <span style={{ color: colors.red6 }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/screenshot/php'
const OG_IMAGE = 'https://cdn.microlink.io/banner/screenshot.jpeg'

const php = {
  lang: 'php',
  label: 'PHP',

  // ── SEO ──────────────────────────────────────────────────────────────────
  // Owns the "php screenshot api" intent — distinct from the product page
  // (/screenshot, "website screenshot api") and the other language spokes.
  meta: {
    title: 'PHP Screenshot API — Capture Any Website in Code',
    description:
      'Take pixel-perfect website screenshots in PHP with a single HTTP request — no headless Chrome to install. Works with cURL, file_get_contents, Laravel, Symfony & WordPress. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Screenshot API for PHP',
        name: 'Website Screenshot API for PHP',
        description:
          'A developer guide to capturing website screenshots programmatically in PHP over the Microlink REST API — request, capture, framework integration, and deployment without running a headless browser.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'PHP 7.4+, cURL or allow_url_fopen',
        keywords:
          'php screenshot api, take screenshot php, website screenshot php, headless chrome php, capture url php, laravel screenshot',
        author: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cdn.microlink.io/logo/logo.png'
          }
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://microlink.io',
          url: 'https://microlink.io',
          name: 'Microlink'
        },
        about: {
          '@type': 'SoftwareApplication',
          name: 'Microlink Screenshot API',
          url: 'https://microlink.io/screenshot',
          applicationCategory: ['DeveloperApplication', 'WebAPI']
        },
        mainEntityOfPage: PAGE_URL
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Microlink',
            item: 'https://microlink.io'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Screenshot API',
            item: 'https://microlink.io/screenshot'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'PHP',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to take a website screenshot in PHP',
        description:
          'Capture a screenshot of any URL in PHP with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'PHP' },
          { '@type': 'HowToTool', name: 'cURL' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and screenshot parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the screenshot URL',
            text: 'Decode the JSON response and read the hosted image from data.screenshot.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the image URL',
            text: 'Serve the hosted screenshot to your users or save it to disk.'
          }
        ]
      }
    ]
  },

  // ── Breadcrumb (visual) ───────────────────────────────────────────────────
  breadcrumb: [
    { label: 'Screenshot API', href: '/screenshot' },
    { label: 'PHP' }
  ],

  // ── Hero (centered, code-free) ────────────────────────────────────────────
  hero: {
    title: (
      <>
        <Accent>PHP</Accent> Screenshot API
      </>
    ),
    subtitle:
      'Capture pixel-perfect screenshots of any URL with one HTTP request in PHP — no headless Chrome, no extensions to compile, no servers to maintain.',
    demoAlt: 'PHP website screenshot API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/screenshot'
    }
  },

  // ── Quickstart steps (vertical, progressively deeper) ─────────────────────
  quickstart: {
    title: (
      <>
        Take a <Accent>screenshot</Accent> in PHP
      </>
    ),
    caption:
      'No SDK and no headless browser — the Microlink REST API turns any URL into a hosted screenshot with a single HTTP GET. Here it is with file_get_contents and the cURL extension that ship with PHP.',
    steps: [
      {
        title: 'Capture any URL',
        description:
          'A one-liner with file_get_contents — no Composer package to add. Point it at a page and read the hosted image URL from the JSON response.',
        code: {
          language: 'php',
          title: 'capture.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'screenshot' => 'true',
  'meta' => 'false', // skip metadata extraction for a faster response
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['screenshot']['url'];`
        }
      },
      {
        title: 'Use cURL for more control',
        description:
          'When you need timeouts and error handling in production, the bundled cURL extension does the same job.',
        code: {
          language: 'php',
          title: 'curl.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'screenshot' => 'true',
  'meta' => 'false',
]);

$ch = curl_init("https://api.microlink.io?$query");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$res = json_decode(curl_exec($ch), true);
curl_close($ch);

echo $res['data']['screenshot']['url'];`
        }
      },
      {
        title: 'Customize the capture',
        description:
          'Output format, full-page captures, device emulation, and ad blocking — every Headless Chrome option is just a query field (dot notation for nested ones).',
        code: {
          language: 'php',
          title: 'options.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'screenshot.type' => 'jpeg',      // png (default) | jpeg
  'screenshot.fullPage' => 'true',  // capture the entire scrollable page
  'device' => 'iPhone X',           // emulate any device
  'adblock' => 'true',              // strip ads & cookie banners (default)
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['screenshot']['url'];`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted image URL on a global CDN. Download it with a second request, or just hand the URL to the browser.',
        code: {
          language: 'php',
          title: 'save.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'screenshot' => 'true',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);
$image = $res['data']['screenshot']['url'];

file_put_contents('screenshot.png', file_get_contents($image));`
        }
      }
    ]
  },

  // ── Framework integration (tabbed) ────────────────────────────────────────
  framework: {
    title: (
      <>
        Drop it into your <Accent>framework</Accent>
      </>
    ),
    caption:
      'A route, a controller, or a shortcode — the same request becomes your ' +
      'own screenshot endpoint, perfect for dynamic Open Graph images on any ' +
      'host.',
    examples: [
      {
        id: 'laravel',
        label: 'Laravel',
        code: {
          language: 'php',
          title: 'routes/web.php',
          source: `<?php
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Route;

// GET /screenshot?url=https://example.com
Route::get('/screenshot', function (Request $request) {
    $res = Http::get('https://api.microlink.io', [
        'url' => $request->query('url'),
        'screenshot' => 'true',
        'meta' => 'false',
    ]);

    return redirect($res['data']['screenshot']['url']);
});`
        }
      },
      {
        id: 'symfony',
        label: 'Symfony',
        code: {
          language: 'php',
          title: 'ScreenshotController.php',
          source: `<?php
namespace App\\Controller;

use Symfony\\Component\\HttpFoundation\\Request;
use Symfony\\Component\\HttpFoundation\\RedirectResponse;
use Symfony\\Component\\Routing\\Annotation\\Route;
use Symfony\\Contracts\\HttpClient\\HttpClientInterface;

class ScreenshotController
{
    // GET /screenshot?url=https://example.com
    #[Route('/screenshot')]
    public function capture(Request $request, HttpClientInterface $client): RedirectResponse
    {
        $res = $client->request('GET', 'https://api.microlink.io', [
            'query' => [
                'url' => $request->query->get('url'),
                'screenshot' => 'true',
                'meta' => 'false',
            ],
        ])->toArray();

        return new RedirectResponse($res['data']['screenshot']['url']);
    }
}`
        }
      },
      {
        id: 'wordpress',
        label: 'WordPress',
        code: {
          language: 'php',
          title: 'functions.php',
          source: `<?php
// [microlink_screenshot url="https://example.com"]
add_shortcode('microlink_screenshot', function ($atts) {
    $endpoint = add_query_arg([
        'url' => $atts['url'],
        'screenshot' => 'true',
        'meta' => 'false',
    ], 'https://api.microlink.io');

    $res = wp_remote_get($endpoint);
    $body = json_decode(wp_remote_retrieve_body($res), true);

    return esc_url($body['data']['screenshot']['url']);
});`
        }
      },
      {
        id: 'php',
        label: 'PHP',
        code: {
          language: 'php',
          title: 'screenshot.php',
          source: `<?php
// GET /screenshot.php?url=https://example.com
$query = http_build_query([
  'url' => $_GET['url'],
  'screenshot' => 'true',
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

header('Location: ' . $res['data']['screenshot']['url']);`
        }
      }
    ]
  },

  // ── Why the API vs self-hosting a browser ─────────────────────────────────
  comparison: {
    title: (
      <>
        Skip the <Accent>headless Chrome</Accent> maintenance
      </>
    ),
    caption:
      'PHP cannot drive a browser on its own — capturing pages yourself means running Panther or a Node sidecar, shipping a 300 MB browser, and fighting cold starts. The API gives you the same control without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted headless Chrome',
        points: [
          "PHP can't drive a browser — you run Panther, ChromeDriver or a Node sidecar",
          'Install & maintain Chromium (~300 MB) plus system libraries',
          'Each browser eats hundreds of MB of RAM; PHP-FPM workers stall',
          'Launching Chromium adds seconds of latency per request',
          'You build the process pool, queueing, retries and autoscaling',
          'Write your own cookie-banner & ad dismissal scripts'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for PHP',
        points: [
          'One HTTP request — cURL or file_get_contents, no extension to add',
          'Runs anywhere: shared hosting, serverless, containers, your laptop',
          'Autoscaled managed browser fleet with a 99.95% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'Built-in adblock removes ads & cookie banners automatically',
          'Full-page, device emulation, overlays & DOM interaction included'
        ]
      }
    ]
  },

  // ── Features (PHP-flavored) ───────────────────────────────────────────────
  features: {
    title: (
      <>
        Built for the way you write <Accent>PHP</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in PHP — one HTTP call, JSON back, and at
        home on any host from shared hosting to a Laravel app. Read the{' '}
        <Link href='/docs/guides/screenshot'>screenshot guide</Link> to go
        deeper.
      </>
    ),
    items: [
      {
        title: 'No Browser to Install',
        description:
          'PHP cannot run a headless browser natively. With the API there is no Chrome, Panther, or ChromeDriver to install or maintain.'
      },
      {
        title: 'cURL or file_get_contents',
        description:
          'Use the bundled cURL extension or a one-line file_get_contents — it is a plain HTTP GET, with no Composer package required.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Laravel, Symfony, or WordPress as a route, controller, or shortcode in a few lines.'
      },
      {
        title: 'Runs on Any Host',
        description:
          'Works on shared hosting, serverless, and containers alike — there are no binaries or system libraries to ship.'
      },
      {
        title: 'Simple JSON Response',
        description:
          'A single request returns JSON with the hosted image URL. No drivers, no explicit waits, no browser process to babysit.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'Managed Headless Chrome, autoscaled and load-balanced. No browser pool, no servers, no patching to maintain.'
      },
      {
        title: 'Built-in Adblock',
        description:
          'Captures arrive clean — GDPR cookie banners, newsletter popups, and injected ads are removed before the shot.'
      },
      {
        title: 'Full Browser Control',
        description:
          'Full-page captures, viewport and device emulation, click and wait, plus custom CSS and JavaScript injection.'
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start with 25 requests per day — no account, no credit card. Add an API key when you are ready to scale.'
      }
    ]
  },

  // ── Try it live ───────────────────────────────────────────────────────────
  tool: {
    title: (
      <>
        Try it live in the <Accent>playground</Accent>
      </>
    ),
    caption:
      'Paste a URL and see the exact API request before you write a line of PHP.',
    cta: {
      label: 'Open the screenshot tool',
      href: '/tools/website-screenshot'
    }
  },

  // ── FAQ (PHP-specific) ────────────────────────────────────────────────────
  faq: {
    title: 'PHP Screenshot FAQ',
    caption: (
      <>
        Everything PHP developers ask before integrating the Microlink
        screenshot API.
      </>
    ),
    questions: [
      {
        question: 'Do I need a headless browser or Chrome?',
        answer: (
          <>
            <div>
              No. PHP cannot drive a browser natively, so normally you would run{' '}
              <Link href='https://symfony.com/doc/current/testing/end_to_end.html'>
                Panther
              </Link>{' '}
              or a Node sidecar. With the API it is just an HTTP request — the
              Headless Chrome fleet runs on Microlink's side.
            </div>
          </>
        )
      },
      {
        question: 'cURL or file_get_contents?',
        answer: (
          <>
            <div>
              Either works. <code>file_get_contents</code> is a one-liner when{' '}
              <code>allow_url_fopen</code> is enabled; the <code>cURL</code>{' '}
              extension gives you timeouts and richer error handling for
              production.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Laravel, Symfony, and WordPress?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into a Laravel
              route, a Symfony controller, or a WordPress shortcode in a few
              lines — see the tabs above, or the{' '}
              <Link href='/docs/guides/screenshot'>screenshot guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Does it run on shared hosting or serverless?',
        answer: (
          <>
            <div>
              Yes. Because there are no binaries or system libraries to install,
              it works on shared hosting, serverless functions, and containers
              alike.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/api/getting-started/overview'>
                API overview
              </Link>{' '}
              for request details.
            </div>
          </>
        )
      },
      {
        question: 'Is there a free tier or do I need an API key?',
        answer: (
          <>
            <div>
              The free tier gives you 25 requests per day with no account, no
              credit card, and no API key. Just call the endpoint and start
              capturing.
            </div>
            <div>
              When you need more throughput or caching control, add an{' '}
              <code>apiKey</code> header and requests route to the Pro tier. See{' '}
              <Link href='/pricing'>pricing</Link> for the limits.
            </div>
          </>
        )
      },
      {
        question: 'How fast is it and how does it scale?',
        answer: (
          <>
            <div>
              Cached captures return sub-second from a global edge network, and
              the browser fleet autoscales behind a 99.95% uptime SLA — so a
              traffic spike does not mean provisioning more servers.
            </div>
            <div>
              Compare the numbers on the{' '}
              <Link href='/benchmarks/screenshot-api'>
                screenshot API benchmarks
              </Link>
              .
            </div>
          </>
        )
      }
    ]
  },

  // ── Final CTA ─────────────────────────────────────────────────────────────
  cta: {
    title: (
      <>
        Start <Accent>capturing</Accent> in PHP
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship a screenshot in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default php
