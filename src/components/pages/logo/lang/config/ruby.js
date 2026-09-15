import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#f59f00' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/logo/ruby'

const ruby = {
  lang: 'ruby',
  label: 'Ruby',

  meta: {
    title: 'Ruby Logo API — Get the Logo of Any URL',
    description:
      'Get the logo of any website in Ruby with a single HTTP request — markup, BIMI and favicon detection, format and dimensions, brand palette, hotlink-ready. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Logo API for Ruby',
        name: 'Logo API for Ruby',
        description:
          'A developer guide to getting the logo of any URL programmatically in Ruby over the Microlink REST API — detection, image metadata, brand palette and hotlink embedding without scraping markup or probing images.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Ruby 3+, standard library only',
        keywords:
          'ruby logo api, logo api, get logo from url ruby, brand logo api, website logo ruby, favicon api ruby',
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
            name: 'Ruby',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to get the logo of any URL in Ruby',
        description:
          'Get the logo of any URL as a hotlink-ready image with format, dimensions and brand palette in Ruby with one HTTP request in three steps.',
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

  breadcrumb: [{ label: 'Logo API', href: '/logo' }, { label: 'Ruby' }],

  hero: {
    title: (
      <>
        <Accent>Ruby</Accent> Logo API
      </>
    ),
    subtitle:
      'Get the logo behind any URL with one HTTP request in Ruby — markup, BIMI and favicon detection merged, with format, dimensions and brand palette.',
    demoAlt: 'Ruby logo API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Get a <Accent>logo</Accent> in Ruby
      </>
    ),
    caption:
      'No gem and no scraping — the Microlink REST API detects the best logo for any URL and returns it with a single HTTP GET. Here it is with Net::HTTP and JSON from the Ruby standard library.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with the standard library — no gem to add. Point it at a domain and read the logo from the JSON response.',
        code: {
          language: 'ruby',
          title: 'logo.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: 'https://stripe.com')

logo = JSON.parse(Net::HTTP.get(uri)).dig('data', 'logo')

puts logo['url']         # absolute, hotlink-ready
puts logo['type']        # 'png'
puts logo['width']       # 180
puts logo['size_pretty'] # '3.14 kB'`
        }
      },
      {
        title: 'Read the logo fields',
        description:
          'URL, format, dimensions and byte size come back in one call — everything an img tag or an avatar component needs.',
        code: {
          language: 'ruby',
          title: 'palette.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(
  url: 'https://stripe.com',
  palette: 'true' # add the brand palette to every detected image
)

logo = JSON.parse(Net::HTTP.get(uri)).dig('data', 'logo')

# Ordered from most dominant color to least
puts logo['palette'] # ['#543CFC', '#DEDAFC', ...]`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Icons injected by client-side JavaScript only exist after the page renders — prerender in a real browser and they are detected too, still one request.',
        code: {
          language: 'ruby',
          title: 'spa.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(
  url: 'https://app.example.com',
  prerender: 'true',          # render JS in a real browser first
  waitForSelector: 'h1'       # detect only when the content exists
)

logo = JSON.parse(Net::HTTP.get(uri)).dig('data', 'logo')

# Icons injected by client-side JavaScript are found too
puts logo['url']`
        }
      },
      {
        title: 'Hotlink the image directly',
        description:
          'Add embed=logo.url and the API URL becomes the image itself — drop it into an img tag or a CSS background with no JSON parsing.',
        code: {
          language: 'ruby',
          title: 'embed.rb',
          source: `require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(
  url: 'https://stripe.com',
  embed: 'logo.url' # the API URL becomes the image itself
)

# Drop it straight into an <img> tag — no JSON parsing
puts %(<img src="#{uri}" alt="stripe logo" />)`
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
      'A Rails redirect, a Sinatra proxy, or a brand-avatar job — the same request becomes your own logo endpoint.',
    examples: [
      {
        id: 'rails',
        label: 'Rails',
        code: {
          language: 'ruby',
          title: 'app/controllers/logos_controller.rb',
          source: `class LogosController < ApplicationController
  # GET /logo?url=https://stripe.com — redirect to the hotlink-ready image
  def show
    uri = URI('https://api.microlink.io')
    uri.query = URI.encode_www_form(url: params[:url], embed: 'logo.url')

    redirect_to uri.to_s, allow_other_host: true
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
require 'net/http'
require 'uri'

# GET /logo?url=https://stripe.com
get '/logo' do
  uri = URI('https://api.microlink.io')
  uri.query = URI.encode_www_form(url: params[:url], embed: 'logo.url')

  upstream = Net::HTTP.get_response(uri)
  content_type upstream.content_type
  upstream.body
end`
        }
      },
      {
        id: 'avatar',
        label: 'Brand Avatar',
        code: {
          language: 'ruby',
          title: 'app/jobs/brand_avatar_job.rb',
          source: `class BrandAvatarJob
  include Sidekiq::Job

  # Pre-fetch logo and brand color for an avatar component
  def perform(url)
    uri = URI('https://api.microlink.io')
    uri.query = URI.encode_www_form(url: url, palette: 'true')

    logo = JSON.parse(Net::HTTP.get(uri)).dig('data', 'logo') || {}

    Avatar.create!(
      src: logo['url'],
      color: logo.dig('palette', 0) || '#cccccc'
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
          title: 'logo.rb',
          source: `# ruby logo.rb https://stripe.com
require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: ARGV[0])

logo = JSON.parse(Net::HTTP.get(uri)).dig('data', 'logo')
puts logo`
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
        heading: 'Microlink for Ruby',
        points: [
          'One HTTP request — Net::HTTP, no gem to add',
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
        Built for the way you write <Accent>Ruby</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Ruby — one call, JSON back, and at home
        in anything from a script to a background job. Read the{' '}
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
        title: 'Standard Library Only',
        description:
          'Net::HTTP and JSON ship with Ruby — the examples work with zero gems to install.'
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
          'Drop it into Rails, Sinatra, or a Sidekiq job as a controller action or a few-line worker.'
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
      'Paste a URL and see the detected logo before you write a line of Ruby.',
    cta: {
      label: 'Open the live demo',
      href: '/logo'
    }
  },

  faq: {
    title: 'Ruby Logo API FAQ',
    caption: (
      <>
        Everything Ruby developers ask before integrating the Microlink logo
        API.
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
        Start <Accent>extracting</Accent> in Ruby
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

export default ruby
