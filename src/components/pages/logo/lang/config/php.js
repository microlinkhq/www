import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#f59f00' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/logo/php'

const php = {
  lang: 'php',
  label: 'PHP',

  meta: {
    title: 'PHP Logo API — Get the Logo of Any URL',
    description:
      'Get the logo of any website in PHP with a single HTTP request — markup, BIMI and favicon detection, format and dimensions, brand palette, hotlink-ready. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Logo API for PHP',
        name: 'Logo API for PHP',
        description:
          'A developer guide to getting the logo of any URL programmatically in PHP over the Microlink REST API — detection, image metadata, brand palette and hotlink embedding without scraping markup or probing images.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'PHP 8+, no Composer package required',
        keywords:
          'php logo api, logo api, get logo from url php, brand logo api, website logo php, favicon api php',
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
          name: 'Microlink Logo API',
          url: 'https://microlink.io/logo',
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
            name: 'Logo API',
            item: 'https://microlink.io/logo'
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
        name: 'How to get the logo of any URL in PHP',
        description:
          'Get the logo of any URL as a hotlink-ready image with format, dimensions and brand palette in PHP with one HTTP request in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'PHP' },
          { '@type': 'HowToTool', name: 'cURL' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url parameter.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the logo',
            text: 'Decode the JSON response and read the logo URL, format and dimensions from data.logo.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the logo',
            text: 'Hotlink the image with embed=logo.url, theme your UI with the palette, or store the asset.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'Logo API', href: '/logo' }, { label: 'PHP' }],

  hero: {
    title: (
      <>
        <Accent>PHP</Accent> Logo API
      </>
    ),
    subtitle:
      'Get the logo behind any URL with one HTTP request in PHP — markup, BIMI and favicon detection merged, with format, dimensions and brand palette.',
    demoAlt: 'PHP logo API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Get a <Accent>logo</Accent> in PHP
      </>
    ),
    caption:
      'No package and no scraping — the Microlink REST API detects the best logo for any URL and returns it with a single HTTP GET. Here it is with the file_get_contents and cURL that ship with PHP.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines of plain PHP — no Composer package to add. Point it at a domain and read the logo from the JSON response.',
        code: {
          language: 'php',
          title: 'logo.php',
          source: `<?php
$query = http_build_query(['url' => 'https://stripe.com']);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);
$logo = $res['data']['logo'];

echo $logo['url'];         // absolute, hotlink-ready
echo $logo['type'];        // 'png'
echo $logo['width'];       // 180
echo $logo['size_pretty']; // '3.14 kB'`
        }
      },
      {
        title: 'Read the logo fields',
        description:
          'URL, format, dimensions and byte size come back in one call — everything an img tag or an avatar component needs.',
        code: {
          language: 'php',
          title: 'palette.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://stripe.com',
  'palette' => 'true' // add the brand palette to every detected image
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

// Ordered from most dominant color to least
print_r($res['data']['logo']['palette']); // ['#543CFC', '#DEDAFC', ...]`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Icons injected by client-side JavaScript only exist after the page renders — prerender in a real browser and they are detected too, still one request.',
        code: {
          language: 'php',
          title: 'spa.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://app.example.com',
  'prerender' => 'true',          // render JS in a real browser first
  'waitForSelector' => 'h1'       // detect only when the content exists
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

// Icons injected by client-side JavaScript are found too
echo $res['data']['logo']['url'];`
        }
      },
      {
        title: 'Hotlink the image directly',
        description:
          'Add embed=logo.url and the API URL becomes the image itself — drop it into an img tag or a CSS background with no JSON parsing.',
        code: {
          language: 'php',
          title: 'embed.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://stripe.com',
  'embed' => 'logo.url' // the API URL becomes the image itself
]);

$logoUrl = "https://api.microlink.io?$query";

// Drop it straight into an <img> tag — no JSON parsing
echo "<img src="$logoUrl" alt="stripe logo" />";`
        }
      }
    ]
  },

  framework: {
    title: (
      <>
        Drop it into your <Accent>framework</Accent>
      </>
    ),
    caption:
      'A Laravel redirect, a Symfony proxy, or a WordPress shortcode — the same request becomes your own logo endpoint.',
    examples: [
      {
        id: 'laravel',
        label: 'Laravel',
        code: {
          language: 'php',
          title: 'routes/web.php',
          source: `<?php
use Illuminate\\Support\\Facades\\Route;

// GET /logo?url=https://stripe.com — redirect to the hotlink-ready image
Route::get('/logo', function () {
    $query = http_build_query([
        'url' => request('url'),
        'embed' => 'logo.url',
    ]);

    return redirect("https://api.microlink.io?$query");
});`
        }
      },
      {
        id: 'symfony',
        label: 'Symfony',
        code: {
          language: 'php',
          title: 'src/Controller/LogoController.php',
          source: `<?php
use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Attribute\\Route;
use Symfony\\Contracts\\HttpClient\\HttpClientInterface;

class LogoController
{
    #[Route('/logo')]
    public function show(HttpClientInterface $http): Response
    {
        $res = $http->request('GET', 'https://api.microlink.io', [
            'query' => [
                'url' => 'https://stripe.com',
                'embed' => 'logo.url',
            ],
        ]);

        return new Response($res->getContent(), 200, [
            'Content-Type' => $res->getHeaders()['content-type'][0],
        ]);
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
// [site_logo url="https://stripe.com"] renders the logo inline
add_shortcode('site_logo', function ($atts) {
    $logoUrl = add_query_arg([
        'url' => $atts['url'],
        'embed' => 'logo.url',
    ], 'https://api.microlink.io');

    return '<img src="' . esc_url($logoUrl) . '" alt="" loading="lazy" />';
});`
        }
      },
      {
        id: 'php',
        label: 'Plain PHP',
        code: {
          language: 'php',
          title: 'logo.php',
          source: `<?php
// php logo.php https://stripe.com
$query = http_build_query(['url' => $argv[1]]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

print_r($res['data']['logo']);`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>icon-hunting</Accent> scrapers
      </>
    ),
    caption:
      'Rolling your own means parsing apple-touch-icon, og:logo and JSON-LD per site, checking BIMI DNS records, probing image formats and building a palette pipeline. The API returns the best logo for any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY logo detection',
        points: [
          'Parse apple-touch-icon, og:logo and JSON-LD per site',
          'Check BIMI DNS records and favicon fallbacks yourself',
          'Probe image formats and dimensions with extra requests',
          'JavaScript-injected icons need a headless browser',
          'Extract brand palettes with your own image pipeline',
          'You build the caching, retries and autoscaling'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for PHP',
        points: [
          'One HTTP request — file_get_contents, no package to add',
          'Markup, BIMI and favicon detection merged for you',
          'Format, dimensions and byte size included',
          'Brand palette with WCAG-friendly color pairs',
          'Hotlink-ready with embed=logo.url',
          'Autoscaled fleet with a 99.95% uptime SLA'
        ]
      }
    ]
  },

  features: {
    title: (
      <>
        Built for the way you write <Accent>PHP</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in PHP — one call, JSON back, and at home
        in anything from a script to a WordPress theme. Read the{' '}
        <Link href='/docs/api/getting-started/overview'>API overview</Link> to
        go deeper.
      </>
    ),
    items: [
      {
        title: 'Three Detection Sources',
        description:
          'Page markup, the BIMI DNS record and the favicon as fallback — the best available asset wins, every time.'
      },
      {
        title: 'No Composer Package',
        description:
          'file_get_contents and cURL ship with PHP — the examples work with nothing to install.'
      },
      {
        title: 'Complete Image Metadata',
        description:
          'Format, byte size and exact dimensions come with every logo — no HEAD requests or image probing on your side.'
      },
      {
        title: 'Hotlink-Ready',
        description:
          'The logo comes back as an absolute URL — hotlink it directly, or use embed=logo.url and the API URL is the image.'
      },
      {
        title: 'Real Browser Detection',
        description:
          'Icons injected by client-side JavaScript are detected too, with prerender=true and waitForSelector.'
      },
      {
        title: 'Brand Palette',
        description:
          'Enable palette=true and every detected image gains a dominant-color palette with WCAG-friendly pairs — theme your UI straight from the response.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Laravel, Symfony, or WordPress as a route, controller or shortcode.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'Managed Headless Chrome, autoscaled and load-balanced. No browser pool, no servers, no patching to maintain.'
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start with 25 requests per day — no account, no credit card. Add an API key when you are ready to scale.'
      }
    ]
  },

  tool: {
    title: (
      <>
        Try it live in the <Accent>playground</Accent>
      </>
    ),
    caption:
      'Paste a URL and see the detected logo before you write a line of PHP.',
    cta: {
      label: 'Open the live demo',
      href: '/logo'
    }
  },

  faq: {
    title: 'PHP Logo API FAQ',
    caption: (
      <>
        Everything PHP developers ask before integrating the Microlink logo API.
      </>
    ),
    questions: [
      {
        question: 'Where does the logo come from?',
        answer: (
          <>
            <div>
              Microlink walks the page markup — apple-touch-icon, Open Graph and
              JSON-LD — checks the BIMI record in DNS, and falls back to the
              favicon. The best available asset wins, with its format and
              dimensions included.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a package?',
        answer: (
          <>
            <div>
              No. The examples use file_get_contents and the cURL extension that
              ship with PHP. If you already use Guzzle or Laravel’s HTTP client,
              the same request translates directly.
            </div>
          </>
        )
      },
      {
        question: 'What about icons injected by JavaScript?',
        answer: (
          <>
            <div>
              Pass <code>prerender=true</code> and the page is rendered in a
              real browser before detection, so icons injected by React, Vue or
              any client-side framework are found too. Combine it with{' '}
              <code>waitForSelector</code> to wait for specific content.
            </div>
          </>
        )
      },
      {
        question: 'Can I hotlink the logo directly?',
        answer: (
          <>
            <div>
              Yes. Add <code>embed=logo.url</code> and the API URL becomes the
              image itself — use it in an <code>img</code> tag or a CSS
              background with no JSON parsing and nothing to store on your side.
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
              extracting.
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
        question: 'How fresh is the logo?',
        answer: (
          <>
            <div>
              Responses are cached at the edge with a sane default TTL, and you
              control freshness per request — see the{' '}
              <Link href='/docs/api/getting-started/overview'>
                API overview
              </Link>{' '}
              for cache parameters.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>extracting</Accent> in PHP
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and get logos back in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default php
