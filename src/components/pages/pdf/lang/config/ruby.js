import React from 'react'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import { ACCENT } from 'components/pages/pdf/shared'

const Accent = ({ children }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/pdf/ruby'
const OG_IMAGE = 'https://cdn.microlink.io/banner/pdf.jpeg'

const HELPER_SOURCE = `require 'json'
require 'net/http'
require 'uri'

module Microlink
  Error = Class.new(StandardError)

  ENDPOINT = 'https://api.microlink.io'.freeze

  module_function

  def pdf_url(target)
    uri = URI(ENDPOINT)
    uri.query = URI.encode_www_form(url: target, pdf: true, meta: false)

    request = Net::HTTP::Get.new(uri)

    response = begin
      Net::HTTP.start(
        uri.host, uri.port,
        use_ssl: true, open_timeout: 10, read_timeout: 60
      ) { |http| http.request(request) }
    rescue Net::OpenTimeout, Net::ReadTimeout => e
      raise Error, "microlink: #{e.class}"
    end

    payload = begin
      JSON.parse(response.body.to_s)
    rescue JSON::ParserError
      raise Error, "microlink: #{response.code} #{response.message}: invalid JSON"
    end

    unless response.is_a?(Net::HTTPSuccess)
      raise Error, "microlink: #{response.code}: #{payload['message']}"
    end

    payload.dig('data', 'pdf', 'url') ||
      raise(Error, 'microlink: no pdf url in response')
  end
end

puts Microlink.pdf_url('https://example.com')`

const ruby = {
  lang: 'ruby',
  label: 'Ruby',

  meta: {
    title: 'Ruby HTML to PDF API without wkhtmltopdf',
    description:
      'Convert any URL to a pixel-perfect PDF in Ruby with one HTTP request — no wkhtmltopdf, no wicked_pdf. Works with Rails, Sinatra and Sidekiq.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML to PDF API for Ruby',
        name: 'HTML to PDF API for Ruby',
        description:
          'A developer guide to converting web pages to PDF programmatically in Ruby over the Microlink REST API — request, convert, framework integration, and background jobs without running wkhtmltopdf or a headless browser.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Ruby 3.0+, standard library only',
        keywords:
          'ruby html to pdf api, url to pdf ruby, convert webpage to pdf ruby, wicked_pdf alternative, wkhtmltopdf alternative, generate pdf from html rails',
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
            name: 'Ruby',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to convert a URL to PDF in Ruby',
        description:
          'Convert any URL into a PDF document in Ruby with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Ruby' },
          { '@type': 'HowToTool', name: 'net/http' }
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
            text: 'Parse the JSON response and read the hosted document from data.pdf.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the PDF URL',
            text: 'Serve the hosted document to your users or stream it to disk.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'PDF API', href: '/pdf' }, { label: 'Ruby' }],

  hero: {
    title: (
      <>
        <Accent>Ruby</Accent> HTML to PDF API
      </>
    ),
    subtitle:
      'Convert any URL into a pixel-perfect PDF with one HTTP request in Ruby — no wkhtmltopdf binary, no Chrome in your slug, no servers to maintain.',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/pdf'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>PDF</Accent> in Ruby
      </>
    ),
    caption:
      'No gem and no browser binaries — the Microlink REST API turns any URL into a hosted PDF with a single HTTP GET. Everything below is standard library, built on net/http, uri and json.',
    steps: [
      {
        title: 'Skip the Gemfile',
        description:
          'Nothing to bundle install — the standard library already speaks HTTP. Run this from your terminal and a hosted PDF URL comes back before you write a single file.',
        code: {
          language: 'bash',
          source: `ruby -rnet/http -rjson -e '
  uri = URI("https://api.microlink.io?url=https://example.com&pdf=true&meta=false")
  puts JSON.parse(Net::HTTP.get(uri)).dig("data", "pdf", "url")'`
        }
      },
      {
        title: 'Convert any URL',
        description:
          'Point it at a page, ask for a PDF, and read the hosted document URL out of the JSON response. Net::HTTP.start carries the timeouts and keeps the connection open for the request. This module is reused everywhere below.',
        code: {
          language: 'ruby',
          title: 'microlink.rb',
          source: HELPER_SOURCE
        }
      },
      {
        title: 'Customize the document',
        description:
          'Paper format, margins, orientation, and print CSS are all query params — swap this hash into URI.encode_www_form. Nested options use dot notation, so pdf.format maps to the format field.',
        code: {
          language: 'ruby',
          title: 'options.rb',
          source: `def pdf_params(target)
  {
    url: target,
    'pdf.format': 'A4',         # A0-A6 | Letter | Legal | Tabloid
    'pdf.margin': '0.35cm',     # cm, mm, in or px
    'pdf.landscape': false,     # portrait (default) | landscape
    'pdf.scale': 1,             # zoom the rendering, 0.1 to 2
    mediaType: 'print',         # print stylesheets (default) | screen
    meta: false
  }
end`
        }
      },
      {
        title: 'Stream it to disk',
        description:
          'The response is a hosted PDF URL on a global CDN. Copy it into a file with a second request that streams the body in chunks, or hand the URL straight to your view.',
        code: {
          language: 'ruby',
          title: 'save.rb',
          source: `def save_pdf(target, path = 'document.pdf')
  uri = URI(Microlink.pdf_url(target))

  Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
    http.request(Net::HTTP::Get.new(uri)) do |response|
      unless response.is_a?(Net::HTTPSuccess)
        raise Microlink::Error, "download #{uri}: #{response.code}"
      end

      File.open(path, 'wb') do |file|
        response.read_body { |chunk| file.write(chunk) }
      end
    end
  end

  path
end`
        }
      }
    ]
  },

  framework: {
    title: (
      <>
        Drop it into your <Accent>app</Accent>
      </>
    ),
    caption:
      'A controller, a route, or a background job — the same request becomes ' +
      'your own PDF endpoint, perfect for invoice downloads, nightly reports, ' +
      'and export views in Rails, Sinatra, Sidekiq or plain Rack.',
    examples: [
      {
        id: 'rails',
        label: 'Rails',
        code: {
          language: 'ruby',
          title: 'app/controllers/pdfs_controller.rb',
          source: `# GET /pdf?url=https://example.com
class PdfsController < ApplicationController
  def show
    redirect_to Microlink.pdf_url(params[:url]), allow_other_host: true
  rescue Microlink::Error => e
    render plain: e.message, status: :bad_gateway
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
require_relative 'microlink'

# GET /pdf?url=https://example.com
get '/pdf' do
  redirect Microlink.pdf_url(params['url'])
rescue Microlink::Error => e
  halt 502, e.message
end`
        }
      },
      {
        id: 'sidekiq',
        label: 'Sidekiq',
        code: {
          language: 'ruby',
          title: 'app/jobs/invoice_pdf_job.rb',
          source: `# InvoicePdfJob.perform_async(invoice.id)
class InvoicePdfJob
  include Sidekiq::Job

  sidekiq_options retry: 3

  def perform(invoice_id)
    invoice = Invoice.find(invoice_id)
    invoice.update!(pdf_url: Microlink.pdf_url(invoice.public_url))
  end
end`
        }
      },
      {
        id: 'rack',
        label: 'Rack',
        code: {
          language: 'ruby',
          title: 'config.ru',
          source: `require 'rack'
require_relative 'microlink'

# GET /pdf?url=https://example.com
app = lambda do |env|
  target = Rack::Request.new(env).params['url']
  [302, { 'location' => Microlink.pdf_url(target) }, []]
rescue Microlink::Error => e
  [502, { 'content-type' => 'text/plain' }, [e.message]]
end

run app`
        }
      }
    ],
    footnote: {
      text: 'Every tab reuses the quickstart module:',
      code: 'Microlink.pdf_url(target)'
    }
  },

  comparison: {
    title: (
      <>
        Deploy a slug, not a <Accent>browser</Accent>
      </>
    ),
    caption:
      'Rendering a web page to PDF from Ruby means shelling out to a binary, running a headless browser beside Puma, or drawing the document by hand. The API gives you a real browser rendering engine without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted PDF tooling',
        points: [
          'wicked_pdf and pdfkit shell out to wkhtmltopdf, archived upstream',
          'Grover needs Node and Puppeteer installed beside Ruby',
          'Ferrum and Cuprite drive a Chrome you install, pool and restart',
          'Prawn draws documents from primitives, never from a URL',
          'Each browser eats hundreds of MB of RAM; workers crash under load',
          'Fonts, emoji, and modern CSS break differently on every host'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Ruby',
        points: [
          'One HTTP request — net/http and json, nothing to add to the Gemfile',
          'Runs anywhere: a Rails app, a Sidekiq worker, a rake task, your laptop',
          'Autoscaled managed browser fleet with a 99.9% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'A0-A6, Letter, Legal & Tabloid — set as plain query params',
          'Print stylesheets, custom CSS & DOM interaction, no extra deps'
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
        A REST API that feels native in Ruby — one HTTP call, JSON back, and at
        home in any runtime from a Rails controller to a Sidekiq worker. Read
        the <Link href='/docs/guides/pdf'>PDF guide</Link> to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Binaries to Install',
        description:
          'Skip wkhtmltopdf and the buildpack that ships it. There is no rendering engine to download, patch, or keep in sync across hosts.'
      },
      {
        title: 'Standard Library Only',
        description:
          'net/http sends the request, uri builds the query, json reads the response. No gem to add to your Gemfile and no native extension to compile.'
      },
      {
        title: 'Rails & Sinatra Friendly',
        description:
          'Drop it into a controller, a route, or a Sidekiq job in a few lines. The same request works in every framework.'
      },
      {
        title: 'Smaller Deploys',
        description:
          'No browser layer to bundle into the slug or image. Deploys stay small, which keeps boot times on Heroku, Fly and Kamal short.'
      },
      {
        title: 'Real Browser Rendering',
        description:
          'Pages render in Headless Chrome, so JavaScript-driven dashboards and charts come out right — the blind spot of PDF builders that never run scripts.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'No Chrome to pin to a driver version and no browser pool inside Puma. Your app stays a plain HTTP client.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'Every layout option is a query param: pdf.format, pdf.margin, pdf.landscape, pdf.scale, and pdf.pageRanges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'Print stylesheets apply by default. Set mediaType to screen in the same query to keep the on-screen layout instead.'
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start with 25 requests per day — no account, no credit card. Point at pro.microlink.io with an x-api-key header when you scale.'
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
      'Paste a URL and see the exact API request before you write a line of Ruby.',
    cta: {
      label: 'Open the PDF tool',
      href: '/tools/website-to-pdf'
    }
  },

  faq: {
    title: 'Ruby PDF FAQ',
    caption: (
      <>
        What Ruby developers ask before integrating. For formats, limits, and
        SLA, see the <Link href='/pdf'>PDF API overview</Link>.
      </>
    ),
    questions: [
      {
        question: 'Do I need wkhtmltopdf or a Chrome binary?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              binary to install next to your app and no buildpack to add. The
              Headless Chrome fleet runs on Microlink&apos;s side.
            </div>
            <div>
              That matters most for <code>wicked_pdf</code> and{' '}
              <code>pdfkit</code> users: both shell out to wkhtmltopdf, which is
              archived upstream and no longer maintained.
            </div>
          </>
        )
      },
      {
        question: 'Do I need a gem or an HTTP client?',
        answer: (
          <>
            <div>
              No. <code>net/http</code> sends the request, <code>uri</code>{' '}
              builds the query string, and <code>json</code> parses the response
              — all standard library, so the Gemfile does not change.
            </div>
            <div>
              Clients like <code>faraday</code> or <code>httparty</code> work
              the same way if you already use one; the request is an ordinary{' '}
              <code>GET</code> either way.
            </div>
          </>
        )
      },
      {
        question: 'Should I call it from a background job?',
        answer: (
          <>
            <div>
              For anything user-facing, yes. Rendering happens on
              Microlink&apos;s side, but your request still waits on the
              network, so a Sidekiq or Active Job worker keeps Puma threads free
              — see the Sidekiq tab above.
            </div>
            <div>
              Each conversion is an independent stateless request, so workers
              can run in parallel. Concurrency is bounded by your plan rather
              than your dynos — check the{' '}
              <Link href='/docs/api/basics/rate-limit'>rate limit</Link> docs
              before fanning out widely.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Rails, Sinatra, and Rack?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into any controller
              or route in a few lines — see the tabs above for Rails, Sinatra,
              Sidekiq, and Rack, or the{' '}
              <Link href='/docs/guides/pdf'>PDF guide</Link>.
            </div>
            <div>
              In Rails, redirecting to the hosted document needs{' '}
              <code>allow_other_host: true</code>, since the PDF is served from
              the Microlink CDN rather than your own domain.
            </div>
          </>
        )
      },
      {
        question: 'How do I authenticate from Ruby?',
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
              The module already builds a request, so add one line before{' '}
              <code>http.request(request)</code>:{' '}
              <code>
                request[&apos;x-api-key&apos;] =
                ENV[&apos;MICROLINK_API_KEY&apos;]
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
        question: 'How do I set a timeout?',
        answer: (
          <>
            <div>
              Both at once, the way the module above does it:{' '}
              <code>open_timeout</code> caps how long Ruby waits to connect and{' '}
              <code>read_timeout</code> caps how long it waits for the response
              body.
            </div>
            <div>
              Rendering happens on Microlink&apos;s side, so your app only ever
              waits on the network — never on a browser it has to start itself.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>converting</Accent> in Ruby
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account, no credit card. Paste the module into a controller and ship a PDF today.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default ruby
