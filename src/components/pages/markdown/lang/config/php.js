import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: 'rgb(224, 0, 172)' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/markdown/php'

const php = {
  lang: 'php',
  label: 'PHP',

  meta: {
    title: 'PHP URL to Markdown API — Convert Any Website in Code',
    description:
      'Convert any URL to clean markdown in PHP with a single HTTP request — no headless browser, no readability pipeline to maintain. Built for LLM ingestion, RAG and agents. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'URL to Markdown API for PHP',
        name: 'URL to Markdown API for PHP',
        description:
          'A developer guide to converting web pages to clean markdown programmatically in PHP over the Microlink REST API — request, convert, framework integration, and LLM pipelines without running a headless browser or a readability pipeline.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'PHP 8.0+, cURL extension or file_get_contents',
        keywords:
          'php url to markdown, url to markdown api, html to markdown php, llm ingestion php, rag pipeline web data, convert webpage to markdown php',
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
          name: 'Microlink URL to Markdown API',
          url: 'https://microlink.io/markdown',
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
            name: 'URL to Markdown API',
            item: 'https://microlink.io/markdown'
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
        name: 'How to convert a URL to markdown in PHP',
        description:
          'Convert any URL to clean markdown in PHP with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'PHP' },
          { '@type': 'HowToTool', name: 'cURL' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and data.markdown.attr parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the markdown',
            text: 'Decode the JSON response and read the markdown string from data.markdown.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the markdown',
            text: 'Feed it to your LLM, RAG index, or save it as a .md file.'
          }
        ]
      }
    ]
  },

  breadcrumb: [
    { label: 'URL to Markdown API', href: '/markdown' },
    { label: 'PHP' }
  ],

  hero: {
    title: (
      <>
        <Accent>PHP</Accent> URL to Markdown API
      </>
    ),
    subtitle:
      'Convert any URL to clean, LLM-ready markdown with one HTTP request in PHP — no headless browser, no readability pipeline, no servers to maintain.',
    demoAlt: 'PHP URL to markdown API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>markdown</Accent> in PHP
      </>
    ),
    caption:
      'No package and no browser — the Microlink REST API turns any URL into clean markdown with a single HTTP GET. Here it is with file_get_contents and the cURL extension that ship with PHP.',
    steps: [
      {
        title: 'Convert any URL',
        description:
          'A one-liner with file_get_contents — no Composer package to add. Point it at a page and read the markdown string from the JSON response.',
        code: {
          language: 'php',
          title: 'convert.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'data.markdown.attr' => 'markdown',
  'meta' => 'false', // skip metadata extraction for a faster response
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['markdown'];`
        }
      },
      {
        title: 'Scope the extraction',
        description:
          'Pass a CSS selector to keep just the article body and drop headers, footers, and sidebars — fewer tokens, better embeddings.',
        code: {
          language: 'php',
          title: 'scoped.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com/blog/post',
  'data.markdown.attr' => 'markdown',
  'data.markdown.selector' => 'article', // keep just the article body
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['markdown'];`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Client-side rendered content only exists after JavaScript runs — prerender with a real browser and wait for the content, still one request.',
        code: {
          language: 'php',
          title: 'spa.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://app.example.com/docs',
  'data.markdown.attr' => 'markdown',
  'data.markdown.selector' => 'main',
  'prerender' => 'true',        // render JS in a real browser first
  'waitForSelector' => 'main h1', // wait until the content exists
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['markdown'];`
        }
      },
      {
        title: 'Get markdown back directly',
        description:
          'Skip the JSON envelope entirely: embed=markdown returns the page as text/markdown, ready to write into a file or a prompt.',
        code: {
          language: 'php',
          title: 'embed.php',
          source: `<?php
$query = http_build_query([
  'url' => 'https://example.com',
  'data.markdown.attr' => 'markdown',
  'meta' => 'false',
  'embed' => 'markdown', // respond with text/markdown instead of JSON
]);

$markdown = file_get_contents("https://api.microlink.io?$query");

file_put_contents('page.md', $markdown);`
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
      'A Laravel route, a Symfony controller, or a WordPress shortcode — the same request becomes your own URL-to-markdown primitive for agents and RAG pipelines.',
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

// GET /markdown?url=https://example.com
Route::get('/markdown', function () {
    $res = Http::get('https://api.microlink.io', [
        'url' => request('url'),
        'data.markdown.attr' => 'markdown',
        'meta' => 'false',
    ]);

    return response($res['data']['markdown'])
        ->header('Content-Type', 'text/markdown');
});`
        }
      },
      {
        id: 'symfony',
        label: 'Symfony',
        code: {
          language: 'php',
          title: 'MarkdownController.php',
          source: `<?php
namespace App\\Controller;

use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Annotation\\Route;
use Symfony\\Contracts\\HttpClient\\HttpClientInterface;

class MarkdownController
{
    // GET /markdown?url=https://example.com
    #[Route('/markdown')]
    public function convert(HttpClientInterface $client): Response
    {
        $res = $client->request('GET', 'https://api.microlink.io', [
            'query' => [
                'url' => $_GET['url'],
                'data.markdown.attr' => 'markdown',
                'meta' => 'false',
                'embed' => 'markdown',
            ],
        ]);

        return new Response(
            $res->getContent(),
            200,
            ['Content-Type' => 'text/markdown']
        );
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
// [microlink_markdown url="https://example.com"]
add_shortcode('microlink_markdown', function ($atts) {
    $endpoint = add_query_arg([
        'url' => $atts['url'],
        'data.markdown.attr' => 'markdown',
        'meta' => 'false',
    ], 'https://api.microlink.io');

    $res = wp_remote_get($endpoint);
    $body = json_decode(wp_remote_retrieve_body($res), true);

    return esc_html($body['data']['markdown']);
});`
        }
      },
      {
        id: 'php',
        label: 'Plain PHP',
        code: {
          language: 'php',
          title: 'markdown.php',
          source: `<?php
// php markdown.php https://example.com
$query = http_build_query([
  'url' => $argv[1],
  'data.markdown.attr' => 'markdown',
  'meta' => 'false',
]);

$res = json_decode(file_get_contents("https://api.microlink.io?$query"), true);

echo $res['data']['markdown'];`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>readability pipeline</Accent> maintenance
      </>
    ),
    caption:
      'Rolling your own means fetching HTML, running a readability extractor, converting to markdown, and adding a headless browser when a page needs JavaScript. The API gives you clean markdown from any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY extraction pipeline',
        points: [
          'Fetch HTML, then chain a readability + markdown converter yourself',
          'Every site breaks your selectors in its own special way',
          'JavaScript-rendered pages need Panther or a Node sidecar with Playwright',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the queueing, retries, caching and autoscaling',
          'Output quality drifts as sites change; you own the fixes'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for PHP',
        points: [
          'One HTTP request — cURL or file_get_contents, no extension to add',
          'Runs anywhere: shared hosting, serverless, containers, your laptop',
          'Real browser rendering built in with prerender=true',
          'CSS selector scoping keeps tokens focused on the content',
          'Cached responses from a global edge network',
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
        A REST API that feels native in PHP — one call, JSON back, and at
        home in anything from a script to a Laravel app. Read the{' '}
        <Link href='/docs/guides/content-conversion/url-to-markdown'>
          URL to Markdown guide
        </Link>{' '}
        to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Browser to Install',
        description:
          'No headless browser to install or keep patched. JavaScript rendering runs on Microlink’s side with prerender=true.'
      },
      {
        title: 'cURL or file_get_contents',
        description:
          'Use the bundled cURL extension or a one-line file_get_contents — it is a plain HTTP GET, with no Composer package required.'
      },
      {
        title: 'LLM-Ready Output',
        description:
          'Clean markdown instead of HTML noise — around 80% fewer tokens on average, so agents spend context on meaning, not markup.'
      },
      {
        title: 'CSS Selector Scoping',
        description:
          'Extract the whole page or narrow to article, main, or any selector — precise content targeting for better embeddings.'
      },
      {
        title: 'JavaScript Rendering',
        description:
          'SPAs and client-rendered docs are rendered in a real browser first, with waitForSelector to catch late content.'
      },
      {
        title: 'Documents Too',
        description:
          'Point it at a PDF or an office file — docx, xlsx, pptx — and the content is converted to markdown the same way.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Laravel, Symfony, or WordPress as a route, controller, or shortcode in a few lines.'
      },
      {
        title: 'text/markdown Responses',
        description:
          'embed=markdown returns the page as text/markdown — pipe it straight into a file, a queue, or a prompt.'
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
      'Paste a URL and see the exact markdown output before you write a line of PHP.',
    cta: {
      label: 'Open the URL to Markdown tool',
      href: '/tools/url-to-markdown'
    }
  },

  faq: {
    title: 'PHP URL to Markdown FAQ',
    caption: (
      <>
        Everything PHP developers ask before integrating the Microlink
        URL to Markdown API.
      </>
    ),
    questions: [
      {
        question: 'Do I need a headless browser?',
        answer: (
          <>
            <div>
              No. JavaScript rendering runs on Microlink’s managed browser
              fleet — pass <code>prerender=true</code> and the page is rendered
              before conversion. Your PHP process stays browser-free.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a Composer package?',
        answer: (
          <>
            <div>
              No. The examples use file_get_contents and the cURL extension that ship with PHP. If you already use Guzzle or Laravel’s HTTP client, the same request translates directly.
            </div>
          </>
        )
      },
      {
        question: 'How do I convert only the article body?',
        answer: (
          <>
            <div>
              Pass a CSS selector with{' '}
              <code>data.markdown.selector=article</code> and the extraction is
              scoped to that element — headers, footers, and sidebars are
              dropped before conversion, which keeps token counts down.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/guides/content-conversion/url-to-markdown'>
                URL to Markdown guide
              </Link>{' '}
              for scoping strategies.
            </div>
          </>
        )
      },
      {
        question: 'Does it run on shared hosting or serverless?',
        answer: (
          <>
            <div>
              Yes. Because there is no browser binary to ship, it works on shared hosting, serverless functions, and containers alike — a plain HTTPS call with nothing to compile.
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
        question: 'Can I get the response as markdown instead of JSON?',
        answer: (
          <>
            <div>
              Yes. Add <code>embed=markdown</code> and the API responds with{' '}
              <code>text/markdown</code> directly — handy for piping into
              files, queues, or prompts without parsing an envelope.
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
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship markdown in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default php
