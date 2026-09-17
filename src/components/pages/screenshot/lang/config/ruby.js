import React from 'react'
import { colors } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: colors.red6 }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/screenshot/ruby'
const OG_IMAGE = 'https://cdn.microlink.io/banner/screenshot.jpeg'

const ruby = {
  lang: 'ruby',
  label: 'Ruby',

  meta: {
    title: 'Ruby Screenshot API — Capture Any Website in Code',
    description:
      'Take pixel-perfect website screenshots in Ruby with a single HTTP request — no Selenium, no headless Chrome to install. Works with Net::HTTP, Rails, Sinatra & Sidekiq. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Screenshot API for Ruby',
        name: 'Website Screenshot API for Ruby',
        description:
          'A developer guide to capturing website screenshots programmatically in Ruby over the Microlink REST API — request, capture, framework integration, and background jobs without running Selenium or Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Ruby 3.0+, standard library only',
        keywords:
          'ruby screenshot api, take screenshot ruby, website screenshot ruby, selenium alternative ruby, ferrum alternative, capture url rails',
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
            name: 'Ruby',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to take a website screenshot in Ruby',
        description:
          'Capture a screenshot of any URL in Ruby with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Ruby' },
          { '@type': 'HowToTool', name: 'Net::HTTP' }
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

  breadcrumb: [
    { label: 'Screenshot API', href: '/screenshot' },
    { label: 'Ruby' }
  ],

  hero: {
    title: (
      <>
        <Accent>Ruby</Accent> Screenshot API
      </>
    ),
    subtitle:
      'Capture pixel-perfect screenshots of any URL with one HTTP request in Ruby — no Selenium, no ChromeDriver, no servers to maintain.',
    demoAlt: 'Ruby website screenshot API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/screenshot'
    }
  },

  quickstart: {
    title: (
      <>
        Take a <Accent>screenshot</Accent> in Ruby
      </>
    ),
    caption:
      'No gem and no headless browser — the Microlink REST API turns any URL into a hosted screenshot with a single HTTP GET. Here it is with Net::HTTP and JSON from the Ruby standard library.',
    steps: [
      {
        title: 'Capture any URL',
        description:
          'A few lines with the standard library — no gem to add. Point it at a page and read the hosted image URL from the JSON response.',
        code: {
          language: 'ruby',
          title: 'capture.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(
  url: 'https://example.com',
  screenshot: true,
  meta: false # skip metadata extraction for a faster response
)

res = JSON.parse(Net::HTTP.get(uri))

puts res.dig('data', 'screenshot', 'url')`
        }
      },
      {
        title: 'Add timeouts and error handling',
        description:
          'When it runs in production, wrap the request with explicit timeouts and raise on anything that is not a hosted screenshot URL.',
        code: {
          language: 'ruby',
          title: 'microlink.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

module Microlink
  Error = Class.new(StandardError)

  ENDPOINT = 'https://api.microlink.io'.freeze

  module_function

  def screenshot_url(target)
    uri = URI(ENDPOINT)
    uri.query = URI.encode_www_form(url: target, screenshot: true, meta: false)

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

    payload.dig('data', 'screenshot', 'url') ||
      raise(Error, 'microlink: no screenshot url in response')
  end
end`
        }
      },
      {
        title: 'Customize the capture',
        description:
          'Output format, full-page captures, device emulation, and ad blocking — every Headless Chrome option is just a query field (dot notation for nested ones).',
        code: {
          language: 'ruby',
          title: 'options.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(
  'url' => 'https://example.com',
  'screenshot.type' => 'jpeg',     # png (default) | jpeg
  'screenshot.fullPage' => 'true', # capture the entire scrollable page
  'device' => 'iPhone X',          # emulate any device
  'adblock' => 'true',             # strip ads & cookie banners (default)
  'meta' => 'false'
)

res = JSON.parse(Net::HTTP.get(uri))

puts res.dig('data', 'screenshot', 'url')`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted image URL on a global CDN. Download it with a second request, or just hand the URL to the browser.',
        code: {
          language: 'ruby',
          title: 'save.rb',
          source: `require 'json'
require 'net/http'
require 'uri'

uri = URI('https://api.microlink.io')
uri.query = URI.encode_www_form(url: 'https://example.com', screenshot: true)

res = JSON.parse(Net::HTTP.get(uri))
image = res.dig('data', 'screenshot', 'url')

File.binwrite('screenshot.png', Net::HTTP.get(URI(image)))`
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
      'A controller action, a Sinatra route, or a Sidekiq job — the same request becomes your own screenshot endpoint, perfect for dynamic Open Graph images on any host.',
    examples: [
      {
        id: 'rails',
        label: 'Rails',
        code: {
          language: 'ruby',
          title: 'app/controllers/screenshots_controller.rb',
          source: `# GET /screenshot?url=https://example.com
class ScreenshotsController < ApplicationController
  def show
    redirect_to Microlink.screenshot_url(params[:url]), allow_other_host: true
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

# GET /screenshot?url=https://example.com
get '/screenshot' do
  redirect Microlink.screenshot_url(params['url'])
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
          title: 'app/jobs/screenshot_job.rb',
          source: `# ScreenshotJob.perform_async(page.id)
class ScreenshotJob
  include Sidekiq::Job

  sidekiq_options retry: 3

  def perform(page_id)
    page = Page.find(page_id)
    page.update!(screenshot_url: Microlink.screenshot_url(page.public_url))
  end
end`
        }
      },
      {
        id: 'ruby',
        label: 'Plain Ruby',
        code: {
          language: 'ruby',
          title: 'screenshot.rb',
          source: `require_relative 'microlink'

# ruby screenshot.rb https://example.com
puts Microlink.screenshot_url(ARGV.fetch(0))`
        }
      }
    ],
    footnote: {
      text: 'Every tab reuses the quickstart module:',
      code: 'Microlink.screenshot_url(target)'
    }
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>headless Chrome</Accent> maintenance
      </>
    ),
    caption:
      'Driving a browser from Ruby means wiring Selenium, Ferrum or Cuprite to a Chrome binary, shipping 300 MB of browser in every deploy, and fighting cold starts. The API gives you the same control without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted headless Chrome',
        points: [
          'Wire selenium-webdriver, Ferrum or Cuprite to a Chrome binary',
          'Install & maintain Chromium (~300 MB) plus system libraries',
          'Each browser eats hundreds of MB of RAM; Puma workers stall',
          'Launching Chromium adds seconds of latency per request',
          'You build the process pool, queueing, retries and autoscaling',
          'Write your own cookie-banner & ad dismissal scripts'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Ruby',
        points: [
          'One HTTP request — Net::HTTP from the standard library, no gem to add',
          'Runs anywhere: Heroku, Rails, serverless, containers, your laptop',
          'Autoscaled managed browser fleet with a 99.9% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'Built-in adblock removes ads & cookie banners automatically',
          'Full-page, device emulation, overlays & DOM interaction included'
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
        home in anything from a Rake task to a Rails app. Read the{' '}
        <Link href='/docs/guides/screenshot'>screenshot guide</Link> to go
        deeper.
      </>
    ),
    items: [
      {
        title: 'No Browser to Install',
        description:
          'Ruby cannot run a headless browser natively. With the API there is no Chrome, ChromeDriver, or Ferrum setup to install or maintain.'
      },
      {
        title: 'Standard Library Only',
        description:
          'Net::HTTP and JSON ship with Ruby — it is a plain HTTP GET, with no gem required and nothing to compile.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Rails, Sinatra, or a Sidekiq job as a controller action, route, or worker in a few lines.'
      },
      {
        title: 'Runs on Any Host',
        description:
          'Works on Heroku, serverless, and containers alike — there are no binaries or system libraries to ship.'
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

  tool: {
    title: (
      <>
        Try it live in the <Accent>playground</Accent>
      </>
    ),
    caption:
      'Paste a URL and see the exact API request before you write a line of Ruby.',
    cta: {
      label: 'Open the screenshot tool',
      href: '/tools/website-screenshot'
    }
  },

  faq: {
    title: 'Ruby Screenshot FAQ',
    caption: (
      <>
        Everything Ruby developers ask before integrating the Microlink
        screenshot API.
      </>
    ),
    questions: [
      {
        question: 'Do I need a headless browser or Chrome?',
        answer: (
          <>
            <div>
              No. Driving a browser from Ruby normally means Selenium,{' '}
              <Link href='https://github.com/rubycdp/ferrum'>Ferrum</Link> or
              Cuprite wired to a Chrome binary. With the API it is just an HTTP
              request — the Headless Chrome fleet runs on Microlink's side.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a gem?',
        answer: (
          <>
            <div>
              No. <code>Net::HTTP</code> and <code>JSON</code> are part of the
              Ruby standard library, so the examples work with zero
              dependencies. If you already use <code>faraday</code> or{' '}
              <code>httparty</code>, the same request translates directly.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Rails, Sinatra, and Sidekiq?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into a Rails
              controller, a Sinatra route, or a Sidekiq worker in a few lines —
              see the tabs above, or the{' '}
              <Link href='/docs/guides/screenshot'>screenshot guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Does it run on Heroku or serverless?',
        answer: (
          <>
            <div>
              Yes. Because there are no binaries or system libraries to install,
              it works on Heroku, serverless functions, and containers alike —
              no Chrome buildpack to fight.
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
              the browser fleet autoscales behind a 99.9% uptime SLA — so a
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

  cta: {
    title: (
      <>
        Start <Accent>capturing</Accent> in Ruby
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

export default ruby
