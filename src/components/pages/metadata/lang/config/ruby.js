import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#3e55ff' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/metadata/ruby'

const ruby = {
  lang: 'ruby',
  label: 'Ruby',

  meta: {
    title: 'Ruby Metadata API — Extract Metadata from Any URL',
    description:
      'Extract title, description, image and logo from any URL in Ruby with a single HTTP request — no HTML parsing, no headless browser. Open Graph, Twitter Cards and JSON-LD merged. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Metadata API for Ruby',
        name: 'Website Metadata API for Ruby',
        description:
          'A developer guide to extracting website metadata programmatically in Ruby over the Microlink REST API — request, extract, framework integration, and link previews without parsing HTML or running a headless browser.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Ruby 3.0+, standard library only',
        keywords:
          'ruby metadata api, website metadata api, url metadata ruby, open graph parser ruby, link preview api, url preview rails',
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
          name: 'Microlink Metadata API',
          url: 'https://microlink.io/metadata',
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
            name: 'Metadata API',
            item: 'https://microlink.io/metadata'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Ruby',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to extract website metadata in Ruby',
        description:
          'Extract title, description, image and logo from any URL in Ruby with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Ruby' },
          { '@type': 'HowToTool', name: 'Net::HTTP' }
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
            name: 'Read the metadata',
            text: 'Decode the JSON response and read title, description, image and logo from data.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the metadata',
            text: 'Render a link preview, enrich a record, or store the fields.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'Metadata API', href: '/metadata' }, { label: 'Ruby' }],

  hero: {
    title: (
      <>
        <Accent>Ruby</Accent> Metadata API
      </>
    ),
    subtitle:
      'Extract title, description, image and logo from any URL with one HTTP request in Ruby — no HTML parsing, no tag soup, no browser to maintain.',
    demoAlt: 'Ruby website metadata API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Extract <Accent>metadata</Accent> in Ruby
      </>
    ),
    caption:
      'No gem and no parser — the Microlink REST API turns any URL into normalized metadata with a single HTTP GET. Here it is with Net::HTTP and JSON from the Ruby standard library.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with the standard library — no gem to add. Point it at a page and read the metadata from the JSON response.',
        code: {
          language: 'ruby',
          title: 'extract.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: 'https://microlink.io')

data = JSON.parse(Net::HTTP.get(uri))['data']

puts data['title']        # 'Microlink | The web, ready for AI'
puts data['description']  # 'A single API for turning any URL into data…'
puts data.dig('image', 'url') # absolute, CDN-hosted
puts data.dig('logo', 'url')  # absolute, CDN-hosted`
        }
      },
      {
        title: 'Pick the fields you need',
        description:
          'Title, description, publisher, author, date, lang, image and logo all come back in one call — build exactly the object your product needs.',
        code: {
          language: 'ruby',
          title: 'fields.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: 'https://microlink.io')

data = JSON.parse(Net::HTTP.get(uri))['data']

preview = {
  title: data['title'],
  description: data['description'],
  publisher: data['publisher'],
  author: data['author'],
  date: data['date'],
  lang: data['lang'],
  image: data.dig('image', 'url'),
  logo: data.dig('logo', 'url')
}`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Tags injected by client-side JavaScript only exist after the page renders — prerender with a real browser and wait for them, still one request.',
        code: {
          language: 'ruby',
          title: 'spa.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(
  url: 'https://app.example.com',
  prerender: true,          # render JS in a real browser first
  waitForSelector: 'h1'     # wait until the content exists
)

data = JSON.parse(Net::HTTP.get(uri))['data']

puts data['title']`
        }
      },
      {
        title: 'Build a link preview',
        description:
          'Image and logo come back as absolute, CDN-hosted URLs — drop them straight into an img tag and you have a link preview.',
        code: {
          language: 'ruby',
          title: 'link_preview.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: 'https://microlink.io')

data = JSON.parse(Net::HTTP.get(uri))['data']
image = data.dig('image', 'url') || data.dig('logo', 'url')

puts <<~HTML
  <a href="#{data['url']}" class="card">
    <img src="#{image}" alt="" />
    <strong>#{data['title']}</strong>
    <p>#{data['description']}</p>
  </a>
HTML`
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
      'A Rails controller, a Sinatra route, or a Sidekiq job — the same request becomes your own metadata endpoint for link previews and enrichment.',
    examples: [
      {
        id: 'rails',
        label: 'Rails',
        code: {
          language: 'ruby',
          title: 'app/controllers/previews_controller.rb',
          source: `class PreviewsController < ApplicationController
  # GET /preview?url=https://microlink.io
  def show
    uri = URI('https://api.microlink.io')
    uri.query = URI.encode_www_form(url: params.require(:url))

    data = JSON.parse(Net::HTTP.get(uri))['data']

    render json: {
      title: data['title'],
      description: data['description'],
      image: data.dig('image', 'url'),
      logo: data.dig('logo', 'url')
    }
  end
end`
        }
      },
      {
        id: 'sinatra',
        label: 'Sinatra',
        code: {
          language: 'ruby',
          title: 'app.rb',
          source: `require 'sinatra'
require 'json'
require 'net/http'
require 'uri'

# GET /preview?url=https://microlink.io
get '/preview' do
  uri = URI('https://api.microlink.io')
  uri.query = URI.encode_www_form(url: params[:url])

  data = JSON.parse(Net::HTTP.get(uri))['data']

  content_type :json
  {
    title: data['title'],
    description: data['description'],
    image: data.dig('image', 'url')
  }.to_json
end`
        }
      },
      {
        id: 'sidekiq',
        label: 'Sidekiq',
        code: {
          language: 'ruby',
          title: 'app/workers/enrich_worker.rb',
          source: `class EnrichWorker
  include Sidekiq::Job

  def perform(company_id)
    company = Company.find(company_id)

    uri = URI('https://api.microlink.io')
    uri.query = URI.encode_www_form(url: company.website)

    data = JSON.parse(Net::HTTP.get(uri))['data']

    company.update!(
      description: data['description'],
      logo_url: data.dig('logo', 'url')
    )
  end
end`
        }
      },
      {
        id: 'ruby',
        label: 'Plain Ruby',
        code: {
          language: 'ruby',
          title: 'metadata.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

# ruby metadata.rb https://microlink.io
uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: ARGV.fetch(0))

data = JSON.parse(Net::HTTP.get(uri))['data']

puts JSON.pretty_generate(data)`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>tag-parsing</Accent> maintenance
      </>
    ),
    caption:
      'Rolling your own means fetching HTML, parsing Open Graph and Twitter Cards with Nokogiri, merging JSON-LD and oEmbed, and wiring Selenium or Ferrum for JavaScript-injected tags. The API gives you normalized metadata from any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY tag parsing',
        points: [
          'Fetch the HTML and parse og, twitter and meta tags yourself',
          'Merge JSON-LD, oEmbed and microdata by hand — every site differs',
          'Resolve relative image and logo URLs against redirects yourself',
          'JavaScript-injected tags need a headless browser — a 300 MB binary',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the caching, retries and autoscaling'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Ruby',
        points: [
          'One HTTP request — Net::HTTP from the standard library, no gem to add',
          'Open Graph, Twitter Cards, JSON-LD and oEmbed merged for you',
          'Image and logo as absolute, CDN-hosted URLs',
          'JavaScript-injected tags captured with prerender=true',
          'Cached responses from a global edge network',
          'Autoscaled fleet with a 99.9% uptime SLA'
        ]
      }
    ]
  },

  features: {
    title: (
      <>
        Built for the way you write <Accent>Ruby</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Ruby — one call, JSON back, and at home
        in anything from a Rake task to a Rails app. Read the{' '}
        <Link href='/docs/api/getting-started/overview'>API overview</Link> to
        go deeper.
      </>
    ),
    items: [
      {
        title: 'No HTML Parsing',
        description:
          'No tag soup, no regex, no DOM library to install. One HTTP GET returns a normalized JSON object.'
      },
      {
        title: 'Standard Library Only',
        description:
          'Net::HTTP and JSON ship with Ruby — the examples work with zero dependencies and nothing to compile.'
      },
      {
        title: 'Every Source Merged',
        description:
          'Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata and plain HTML tags are merged into a single normalized response.'
      },
      {
        title: 'CDN-Hosted Assets',
        description:
          'Image and logo come back as absolute URLs on a global CDN — hot-link them directly, no downloading or proxying.'
      },
      {
        title: 'JavaScript Rendering',
        description:
          'Tags injected by client-side JavaScript are captured too, with prerender=true and waitForSelector.'
      },
      {
        title: 'Link Preview Ready',
        description:
          'Title, description, image, logo and publisher are exactly the fields a link preview card needs — one call, one card.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Rails, Sinatra, or a Sidekiq job as a controller action, route, or worker in a few lines.'
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
      'Paste a URL and see the exact metadata response before you write a line of Ruby.',
    cta: {
      label: 'Open the sharing debugger',
      href: '/tools/sharing-debugger'
    }
  },

  faq: {
    title: 'Ruby Metadata API FAQ',
    caption: (
      <>
        Everything Ruby developers ask before integrating the Microlink metadata
        API.
      </>
    ),
    questions: [
      {
        question: 'Which metadata sources are covered?',
        answer: (
          <>
            <div>
              Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa and
              plain HTML tags — all merged and normalized into a single JSON
              response, so you never parse tag soup yourself.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a gem?',
        answer: (
          <>
            <div>
              No. Net::HTTP and JSON are part of the Ruby standard library, so
              the examples work with zero dependencies. If you already use
              faraday or httparty, the same request translates directly.
            </div>
          </>
        )
      },
      {
        question: 'What about tags rendered by JavaScript?',
        answer: (
          <>
            <div>
              Pass <code>prerender=true</code> and the page is rendered in a
              real browser before extraction, so tags injected by React, Vue or
              any client-side framework are captured too. Combine it with{' '}
              <code>waitForSelector</code> to wait for specific content.
            </div>
          </>
        )
      },
      {
        question: 'Are image and logo URLs ready to use?',
        answer: (
          <>
            <div>
              Yes. They come back as absolute URLs hosted on a global CDN —
              resolve-relative-URL bugs included — so you can hot-link them
              directly in an <code>img</code> tag or store them as-is.
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
        question: 'How fresh is the metadata?',
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
        Start <Accent>extracting</Accent> in Ruby
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship metadata in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default ruby
