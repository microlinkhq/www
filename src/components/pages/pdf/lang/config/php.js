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
    title: 'PHP HTML to PDF API without dompdf or mPDF',
    description:
      'Convert any URL to a pixel-perfect PDF in PHP with one HTTP request — no dompdf, no wkhtmltopdf. Works with Laravel, Symfony and WordPress.',
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
          'Paper format, margins, orientation, and print CSS are all query fields. http_build_query handles the encoding, and nested options use dot notation.',
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
          'The response is a hosted PDF URL on a global CDN. Copy it to disk with file_put_contents, or redirect the visitor straight to it.',
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
      'own PDF endpoint, perfect for invoice downloads, packing slips, and ' +
      'report links in Laravel, Symfony, or WordPress.',
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
          'A0-A6, Letter, Legal & Tabloid — set with http_build_query',
          'Print stylesheets, custom CSS & DOM interaction on any host'
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
          'Pages render in Headless Chrome, so flexbox, grid, web fonts, and JavaScript all survive — the things dompdf and mPDF silently drop.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'No Chrome process sitting next to PHP-FPM competing for memory. Your host only makes an outbound HTTP request.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'Every layout option is a query field: pdf.format, pdf.margin, pdf.landscape, pdf.scale, and pdf.pageRanges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'Add mediaType => print to the same query array when you want print stylesheets instead of the on-screen layout.'
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start free at 25 requests per day. Production traffic moves to pro.microlink.io with an x-api-key header.'
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
        What PHP developers ask before integrating. For formats, limits, and
        SLA, see the <Link href='/pdf'>PDF API overview</Link>.
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
        question: 'Does it work on shared hosting?',
        answer: (
          <>
            <div>
              Yes. There is nothing to compile and no Composer package to add —
              the cURL extension ships with virtually every PHP install, and{' '}
              <code>file_get_contents</code> covers the rest wherever{' '}
              <code>allow_url_fopen</code> is enabled.
            </div>
            <div>
              That matters because the usual alternatives do not: wrapping{' '}
              <code>wkhtmltopdf</code> or running headless Chrome needs shell
              access and system libraries most shared hosts do not give you.
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
        question: 'How do I authenticate from PHP?',
        answer: (
          <>
            <div>
              Two things change together: send your key as the{' '}
              <code>x-api-key</code> header, and point the request at{' '}
              <code>pro.microlink.io</code> instead of{' '}
              <code>api.microlink.io</code>. Sending the header to the free
              endpoint returns an <code>EPRO</code> error.
            </div>
            <div>
              With cURL that is{' '}
              <code>
                curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-api-key: KEY'])
              </code>
              . See the{' '}
              <Link href='/docs/api/basics/authentication'>
                authentication docs
              </Link>{' '}
              and <Link href='/pricing'>pricing</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Will PDF generation block my PHP-FPM workers?',
        answer: (
          <>
            <div>
              Far less than the alternatives. No Chrome process spawns on your
              host, so a conversion costs one worker waiting on an outbound
              request rather than hundreds of megabytes of RAM per document.
            </div>
            <div>
              The request is still synchronous, so for bulk jobs queue it —
              Laravel jobs, a Symfony messenger handler, or WP-Cron — and cached
              documents come back sub-second on repeat conversions.
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
      'Get 25 requests/day with zero commitment — no account, no credit card. Drop the snippet into a route and ship a PDF today.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default php
