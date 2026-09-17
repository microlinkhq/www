import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#7048e8' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/html/php'

const php = {
  lang: 'php',
  label: 'PHP',

  meta: {
    title: 'PHP HTML API — Get Rendered HTML from Any URL',
    description:
      'Get the fully rendered HTML of any URL in PHP with a single HTTP request — real browser rendering, selector scoping, no headless browser to run. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML Extraction API for PHP',
        name: 'HTML Extraction API for PHP',
        description:
          'A developer guide to getting the rendered HTML of any URL programmatically in PHP over the Microlink REST API — request, selector scoping, JavaScript rendering, and framework integration without running a headless browser.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'PHP 8+, no Composer package required',
        keywords:
          'php html api, html api, get html from url php, render html api, scrape html php, website to html php',
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
          name: 'Microlink HTML API',
          url: 'https://microlink.io/html',
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
            name: 'HTML API',
            item: 'https://microlink.io/html'
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
        name: 'How to get the rendered HTML of any URL in PHP',
        description:
          'Get the fully rendered HTML of any URL in PHP with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'PHP' },
          { '@type': 'HowToTool', name: 'cURL' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and data.html.attr=html parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the HTML',
            text: 'Decode the JSON response and read the rendered markup from data.html.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the HTML',
            text: 'Archive the page, serve it, or feed it to your parser of choice.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'HTML API', href: '/html' }, { label: 'PHP' }],

  hero: {
    title: (
      <>
        <Accent>PHP</Accent> HTML API
      </>
    ),
    subtitle:
      'Get the fully rendered HTML of any URL with one HTTP request in PHP — real Chromium under the hood, none to maintain.',
    demoAlt: 'PHP HTML API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Get <Accent>HTML</Accent> in PHP
      </>
    ),
    caption:
      'No package and no browser — the Microlink REST API renders any URL and returns the HTML with a single HTTP GET. Here it is with the file_get_contents and cURL that ship with PHP.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines of plain PHP — no Composer package, no Chromium download. Point it at a page and read the rendered HTML from the JSON response.',
        code: {
          language: 'php',
          title: 'fetch.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://microlink.io',
  'data.html.attr' => 'html'
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);
$data = $res['data'];

echo strlen($data['html']);        // full rendered document
echo substr($data['html'], 0, 15); // '<!DOCTYPE html>'`
        }
      },
      {
        title: 'Scope to a selector',
        description:
          'Return the whole document or only the subtree you need — smaller responses, less parsing and lower token cost downstream.',
        code: {
          language: 'php',
          title: 'selector.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://microlink.io/blog',
  'data.html.attr' => 'html',
  'data.html.selector' => 'main' // only the <main> subtree
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

// No nav, no footer — just the content you asked for
echo $res['data']['html'];`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Client-rendered apps only produce their markup after JavaScript runs — prerender in a real browser and wait for it, still one request.',
        code: {
          language: 'php',
          title: 'spa.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://app.example.com',
  'data.html.attr' => 'html',
  'prerender' => 'true',          // render JS in a real browser first
  'waitForSelector' => 'h1'       // capture only when the content exists
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['html'];`
        }
      },
      {
        title: 'Serve the raw HTML',
        description:
          'Ask for embed=html and the API answers with text/html directly — proxy it straight to a browser or write it to a file.',
        code: {
          language: 'php',
          title: 'raw.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://microlink.io',
  'data.html.attr' => 'html',
  'embed' => 'html' // respond with text/html, no JSON
]);

$html = file_get_contents("https://api.microlink.io?$query");
// ready to serve or store`
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
      'A Laravel route, a Symfony controller, or a WordPress shortcode — the same request becomes your own rendering endpoint.',
    examples: [
      {
        id: 'laravel',
        label: 'Laravel',
        code: {
          language: 'php',
          title: 'routes/web.php',
          source: `<?php
use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Route;

// GET /render?url=https://microlink.io
Route::get('/render', function () {
    $data = Http::get('https://api.microlink.io', [
        'url' => request('url'),
        'data.html.attr' => 'html',
    ])->json('data');

    return response($data['html'])->header('Content-Type', 'text/html');
});`
        }
      },
      {
        id: 'symfony',
        label: 'Symfony',
        code: {
          language: 'php',
          title: 'src/Controller/RenderController.php',
          source: `<?php
use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Attribute\\Route;
use Symfony\\Contracts\\HttpClient\\HttpClientInterface;

class RenderController
{
    #[Route('/render')]
    public function show(HttpClientInterface $http): Response
    {
        $data = $http->request('GET', 'https://api.microlink.io', [
            'query' => [
                'url' => 'https://microlink.io',
                'data.html.attr' => 'html',
            ],
        ])->toArray()['data'];

        return new Response($data['html'], 200, [
            'Content-Type' => 'text/html',
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
// Render any URL inside a template or shortcode
add_shortcode('rendered_html', function ($atts) {
    $res = wp_remote_get(add_query_arg([
        'url' => $atts['url'],
        'data.html.attr' => 'html',
    ], 'https://api.microlink.io'));

    $data = json_decode(wp_remote_retrieve_body($res), true)['data'];
    return $data['html'];
});`
        }
      },
      {
        id: 'php',
        label: 'Plain PHP',
        code: {
          language: 'php',
          title: 'html.php',
          source: `<?php
// php html.php https://microlink.io
$query = http_build_query([
  'url' => $argv[1],
  'data.html.attr' => 'html'
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['html'];`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>browser-farm</Accent> ops
      </>
    ),
    caption:
      'Rolling your own means running a headless Chromium next to PHP-FPM, writing per-site wait logic, and fighting antibot walls. The API returns the rendered HTML of any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY rendering stack',
        points: [
          'Run and patch your own headless Chromium fleet',
          'Write per-site wait logic for JavaScript-rendered pages',
          'Fight antibot walls and CAPTCHAs with your own proxy pool',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the caching, retries and autoscaling',
          'Every Chromium upgrade breaks a selector somewhere'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for PHP',
        points: [
          'One HTTP request — no rendering infrastructure to run',
          'Fully rendered HTML from managed Chromium, JS included',
          'Selector scoping to return only the subtree you need',
          'Antibot and CAPTCHA resolution handled for you',
          'Cached responses from a global edge network',
          'Autoscaled fleet with a 99.9% uptime SLA'
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
        title: 'Real Browser Rendering',
        description:
          'Every request runs in managed Chromium, so client-rendered apps return complete markup instead of an empty shell.'
      },
      {
        title: 'No Composer Package',
        description:
          'file_get_contents and cURL ship with PHP — the examples work with nothing to install and no browser to manage.'
      },
      {
        title: 'Selector Scoping',
        description:
          'Return the full document or a single subtree with a selector — smaller payloads and less parsing downstream.'
      },
      {
        title: 'JSON or Raw HTML',
        description:
          'Read data.html from the JSON response, or ask for embed=html and get the document back as text/html — no JSON involved.'
      },
      {
        title: 'Readiness You Control',
        description:
          'waitUntil and waitForSelector let you block on network idle or on a specific element before the HTML is captured.'
      },
      {
        title: 'One Call, Many Formats',
        description:
          'Request HTML together with markdown, text, metadata, screenshots or PDFs and pay for a single render instead of several.'
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
      'Paste a URL and see the rendered output before you write a line of PHP.',
    cta: {
      label: 'Open the live demo',
      href: '/html'
    }
  },

  faq: {
    title: 'PHP HTML API FAQ',
    caption: (
      <>
        Everything PHP developers ask before integrating the Microlink HTML API.
      </>
    ),
    questions: [
      {
        question: 'Do I get the source HTML or the rendered DOM?',
        answer: (
          <>
            <div>
              Every request runs in a real Chromium instance, so data.html is
              the fully rendered DOM — JavaScript executed, lazy content loaded.
              Control the capture point with waitUntil and waitForSelector.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a package or a browser?',
        answer: (
          <>
            <div>
              No. The examples use file_get_contents and the cURL extension that
              ship with PHP, and rendering runs on Microlink — no headless
              Chromium next to PHP-FPM.
            </div>
          </>
        )
      },
      {
        question: 'How do I control when the HTML is captured?',
        answer: (
          <>
            <div>
              Use <code>waitUntil</code> to block on network idle or a fixed
              delay, and <code>waitForSelector</code> to hold the capture until
              a specific element exists — the HTML comes back exactly when your
              page is ready, still in one request.
            </div>
          </>
        )
      },
      {
        question: 'Can I get only part of the page?',
        answer: (
          <>
            <div>
              Yes. Add a <code>selector</code> to the extraction rule and only
              that subtree comes back — ideal for articles, product cards or
              pricing tables, with smaller payloads and less parsing downstream.
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
        question: 'How fresh is the HTML?',
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
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and get HTML back in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default php
