import React from 'react'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import { ACCENT } from 'components/pages/pdf/shared'

const Accent = ({ children }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/pdf/php'
const OG_IMAGE = 'https://cdn.microlink.io/banner/pdf.jpeg'

const php = {
  lang: 'php',
  label: 'PHP',

  meta: {
    title: 'PHP HTML to PDF API — Convert Any URL to PDF',
    description:
      'Convert any URL or HTML to a pixel-perfect PDF in PHP with a single HTTP request — no dompdf limits, no headless Chrome to install. Works with cURL, file_get_contents, Laravel, Symfony & WordPress. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML to PDF API for PHP',
        name: 'HTML to PDF API for PHP',
        description:
          'A developer guide to converting web pages to PDF programmatically in PHP over the Microlink REST API — request, convert, framework integration, and deployment without running dompdf, wkhtmltopdf, or a headless browser.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'PHP 7.4+, cURL or allow_url_fopen',
        keywords:
          'php html to pdf api, url to pdf php, convert webpage to pdf php, dompdf alternative, generate pdf from html php, laravel pdf',
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
          name: 'Microlink PDF API',
          url: 'https://microlink.io/pdf',
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
            name: 'PDF API',
            item: 'https://microlink.io/pdf'
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
        name: 'How to convert a URL to PDF in PHP',
        description:
          'Convert any URL into a PDF document in PHP with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'PHP' },
          { '@type': 'HowToTool', name: 'cURL' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and pdf parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the PDF URL',
            text: 'Decode the JSON response and read the hosted document from data.pdf.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the PDF URL',
            text: 'Serve the hosted document to your users or save it to disk.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'PDF API', href: '/pdf' }, { label: 'PHP' }],

  hero: {
    title: (
      <>
        <Accent>PHP</Accent> HTML to PDF API
      </>
    ),
    subtitle:
      'Convert any URL into a pixel-perfect PDF with one HTTP request in PHP — no dompdf, no headless Chrome, no servers to maintain.',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/pdf'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>PDF</Accent> in PHP
      </>
    ),
    caption:
      'No Composer package and no rendering library — the Microlink REST API turns any URL into a hosted PDF with a single HTTP GET. Here it is with file_get_contents and the cURL extension that ship with PHP.',
    steps: [
      {
        title: 'Convert any URL',
        description:
          'A one-liner with file_get_contents — no Composer package to add. Point it at a page and read the hosted document URL from the JSON response.',
        code: {
          language: 'php',
          title: 'convert.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'pdf' => 'true',
  'meta' => 'false', // skip metadata extraction for a faster response
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['pdf']['url'];`
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
  'pdf' => 'true',
  'meta' => 'false',
]);

$ch = curl_init("https://api.microlink.io?$query");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$res = json_decode(curl_exec($ch), true);
curl_close($ch);

echo $res['data']['pdf']['url'];`
        }
      },
      {
        title: 'Customize the document',
        description:
          'Paper format, margins, orientation, and print CSS — every document option is just a query field (dot notation for nested ones).',
        code: {
          language: 'php',
          title: 'options.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'pdf.format' => 'A4',        // A0-A6 | Letter | Legal | Tabloid
  'pdf.margin' => '0.35cm',    // cm, mm, in or px
  'pdf.landscape' => 'false',  // portrait (default) | landscape
  'mediaType' => 'print',      // print CSS stylesheets | screen (default)
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['pdf']['url'];`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted PDF URL on a global CDN. Download it with a second request, or just hand the URL to the browser.',
        code: {
          language: 'php',
          title: 'save.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'pdf' => 'true',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);
$pdf = $res['data']['pdf']['url'];

file_put_contents('document.pdf', file_get_contents($pdf));`
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
      'A route, a controller, or a shortcode — the same request becomes your ' +
      'own PDF endpoint, perfect for invoices, reports, and receipts on any ' +
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

// GET /pdf?url=https://example.com
Route::get('/pdf', function (Request $request) {
    $res = Http::get('https://api.microlink.io', [
        'url' => $request->query('url'),
        'pdf' => 'true',
        'meta' => 'false',
    ]);

    return redirect($res['data']['pdf']['url']);
});`
        }
      },
      {
        id: 'symfony',
        label: 'Symfony',
        code: {
          language: 'php',
          title: 'PdfController.php',
          source: `<?php
namespace App\\Controller;

use Symfony\\Component\\HttpFoundation\\Request;
use Symfony\\Component\\HttpFoundation\\RedirectResponse;
use Symfony\\Component\\Routing\\Annotation\\Route;
use Symfony\\Contracts\\HttpClient\\HttpClientInterface;

class PdfController
{
    // GET /pdf?url=https://example.com
    #[Route('/pdf')]
    public function convert(Request $request, HttpClientInterface $client): RedirectResponse
    {
        $res = $client->request('GET', 'https://api.microlink.io', [
            'query' => [
                'url' => $request->query->get('url'),
                'pdf' => 'true',
                'meta' => 'false',
            ],
        ])->toArray();

        return new RedirectResponse($res['data']['pdf']['url']);
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
// [microlink_pdf url="https://example.com"]
add_shortcode('microlink_pdf', function ($atts) {
    $endpoint = add_query_arg([
        'url' => $atts['url'],
        'pdf' => 'true',
        'meta' => 'false',
    ], 'https://api.microlink.io');

    $res = wp_remote_get($endpoint);
    $body = json_decode(wp_remote_retrieve_body($res), true);

    return esc_url($body['data']['pdf']['url']);
});`
        }
      },
      {
        id: 'php',
        label: 'PHP',
        code: {
          language: 'php',
          title: 'pdf.php',
          source: `<?php
// GET /pdf.php?url=https://example.com
$query = http_build_query([
  'url' => $_GET['url'],
  'pdf' => 'true',
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

header('Location: ' . $res['data']['pdf']['url']);`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>dompdf</Accent> limitations
      </>
    ),
    caption:
      'Generating PDFs in PHP means fighting dompdf and mPDF CSS limits, wrapping an archived wkhtmltopdf binary, or running a headless browser next to PHP-FPM. The API gives you a real browser rendering engine without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted PDF tooling',
        points: [
          'dompdf & mPDF never execute JavaScript, so dynamic pages render blank',
          'Limited modern CSS — flexbox and grid layouts break or misalign',
          'Snappy wraps wkhtmltopdf, which is archived upstream',
          'Running headless Chrome next to PHP-FPM stalls workers under load',
          'You build the process pool, queueing, retries and autoscaling',
          'Fonts, emoji, and page breaks behave differently on every host'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for PHP',
        points: [
          'One HTTP request — cURL or file_get_contents, no extension to add',
          'Runs anywhere: shared hosting, serverless, containers, your laptop',
          'Autoscaled managed browser fleet with a 99.9% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'A0-A6, Letter, Legal & Tabloid formats with margin and scale control',
          'Print or screen CSS, custom styles & DOM interaction included'
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
        A REST API that feels native in PHP — one HTTP call, JSON back, and at
        home on any host from shared hosting to a Laravel app. Read the{' '}
        <Link href='/docs/guides/pdf'>PDF guide</Link> to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Libraries to Install',
        description:
          'Skip dompdf, mPDF, and wkhtmltopdf entirely. There is no rendering engine to install, patch, or keep in sync across hosts.'
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
        title: 'Real Browser Rendering',
        description:
          'Pages render in Headless Chrome, so JavaScript, web fonts, and modern CSS come out exactly as they do on screen.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'Managed Headless Chrome, autoscaled and load-balanced. No browser pool, no servers, no patching to maintain.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'A0-A6, Letter, Legal, and Tabloid formats with portrait or landscape orientation, margins in cm, mm, or px, and page ranges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'Render the web layout as-is or switch to print stylesheets with mediaType for clean, print-optimized documents.'
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
      'Paste a URL and see the exact API request before you write a line of PHP.',
    cta: {
      label: 'Open the PDF tool',
      href: '/tools/website-to-pdf'
    }
  },

  faq: {
    title: 'PHP PDF FAQ',
    caption: (
      <>
        Everything PHP developers ask before integrating the Microlink PDF API.
      </>
    ),
    questions: [
      {
        question: 'Do I need dompdf, mPDF, or a headless browser?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              rendering library to install and no Chromium to download. The
              Headless Chrome fleet runs on Microlink's side.
            </div>
            <div>
              That also means JavaScript-heavy pages render correctly — unlike
              dompdf or mPDF, which never execute scripts.
            </div>
          </>
        )
      },
      {
        question: 'What paper sizes and layout options are supported?',
        answer: (
          <>
            <div>
              All standard formats: A0 through A6, Letter, Legal, and Tabloid,
              in portrait or landscape. Margins accept cm, mm, in, or px, and{' '}
              <code>pdf.scale</code> and <code>pdf.pageRanges</code> give you
              precise control over the output.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/guides/pdf/page-size-and-layout'>
                page size & layout guide
              </Link>{' '}
              for every option.
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
              <Link href='/docs/guides/pdf'>PDF guide</Link>.
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
              converting.
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
              Cached documents return sub-second from a global edge network, and
              the browser fleet autoscales behind a 99.9% uptime SLA — so a
              traffic spike does not mean provisioning more servers.
            </div>
            <div>
              Read the{' '}
              <Link href='/docs/guides/pdf/caching-and-performance'>
                caching & performance guide
              </Link>{' '}
              to tune TTL for your workload.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>converting</Accent> in PHP
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship a PDF in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default php
