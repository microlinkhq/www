import demoLinks from '../../../../data/demo-links.json'

export const screenshotUrl =
  'https://cdn.microlink.io/screenshot/browser/dark/apple.png'

export const pdfUrl = 'https://cdn.microlink.io/mqleditor/file.pdf'

export const insightsUrl =
  'https://lighthouse.microlink.io/?url=https://cdn.microlink.io/mqleditor/insights.json'

export const meta = demoLinks.find(({ id }) => id === 'twitter').data

export const iframe = {
  iframe: {
    html:
      '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">These tires can even climb stairs <a href="https://t.co/ymr4KK15oI">pic.twitter.com/ymr4KK15oI</a></p>&mdash; Futurism (@futurism) <a href="https://twitter.com/futurism/status/882987478541533189?ref_src=twsrc%5Etfw">July 6, 2017</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
    scripts: [
      {
        async: true,
        src: 'https://platform.twitter.com/widgets.js',
        charset: 'utf-8'
      }
    ]
  },
  url: 'https://twitter.com/futurism/status/882987478541533189'
}

export const screenshot = {
  screenshot: {
    url: screenshotUrl,
    type: 'png',
    size: 1388551,
    height: 1910,
    width: 2776,
    size_pretty: '1.39 MB'
  },
  url: 'https://apple.com/music'
}

export const pdf = {
  pdf: {
    size_pretty: '356 kB',
    size: 356141,
    type: 'pdf',
    url: pdfUrl
  },
  url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications'
}

export const insights = {
  insights: {
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/84.0.4147.0 Safari/537.36',
    environment: {
      networkUserAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4143.7 Safari/537.36 Chrome-Lighthouse',
      hostUserAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/84.0.4147.0 Safari/537.36',
      benchmarkIndex: 954
    },
    lighthouseVersion: '6.1.1',
    fetchTime: '2020-07-19T16:38:13.954Z',
    requestedUrl: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html',
    finalUrl: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html',
    runWarnings: [],
    audits: {
      'is-on-https': {
        id: 'is-on-https',
        title: 'Uses HTTPS',
        description:
          "All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding [mixed content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content), where some resources are loaded over HTTP despite the initial request being servedover HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. [Learn more](https://web.dev/is-on-https/).",
        score: 1,
        scoreDisplayMode: 'binary',
        displayValue: '',
        details: { type: 'table', headings: [], items: [] }
      },
      viewport: {
        id: 'viewport',
        title:
          'Does not have a `<meta name="viewport">` tag with `width` or `initial-scale`',
        description:
          'Add a `<meta name="viewport">` tag to optimize your app for mobile screens. [Learn more](https://web.dev/viewport/).',
        score: 0,
        scoreDisplayMode: 'binary',
        explanation: 'No `<meta name="viewport">` tag found'
      },
      'first-contentful-paint': {
        id: 'first-contentful-paint',
        title: 'First Contentful Paint',
        description:
          'First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).',
        score: 0.78,
        scoreDisplayMode: 'numeric',
        numericValue: 1162.56,
        numericUnit: 'millisecond',
        displayValue: '1.2 s'
      },
      'largest-contentful-paint': {
        id: 'largest-contentful-paint',
        title: 'Largest Contentful Paint',
        description:
          'Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn More](https://web.dev/lighthouse-largest-contentful-paint/)',
        score: 0.9,
        scoreDisplayMode: 'numeric',
        numericValue: 1215.06,
        numericUnit: 'millisecond',
        displayValue: '1.2 s'
      },
      'first-meaningful-paint': {
        id: 'first-meaningful-paint',
        title: 'First Meaningful Paint',
        description:
          'First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint/).',
        score: 0.74,
        scoreDisplayMode: 'numeric',
        numericValue: 1215.06,
        numericUnit: 'millisecond',
        displayValue: '1.2 s'
      },
      'speed-index': {
        id: 'speed-index',
        title: 'Speed Index',
        description:
          'Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/).',
        score: 0.89,
        scoreDisplayMode: 'numeric',
        numericValue: 1346.358482898538,
        numericUnit: 'millisecond',
        displayValue: '1.3 s'
      },
      'screenshot-thumbnails': {
        id: 'screenshot-thumbnails',
        title: 'Screenshot Thumbnails',
        description: 'This is what the load of your site looked like.',
        score: null,
        scoreDisplayMode: 'informative',
        details: {
          type: 'filmstrip',
          scale: 3000,
          items: [
            {
              timing: 300,
              timestamp: 272095654750,
              data:
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAFMAeAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP1ToAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD//Z'
            },
            {
              timing: 600,
              timestamp: 272095954750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 900,
              timestamp: 272096254750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 1200,
              timestamp: 272096554750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 1500,
              timestamp: 272096854750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 1800,
              timestamp: 272097154750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 2100,
              timestamp: 272097454750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 2400,
              timestamp: 272097754750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 2700,
              timestamp: 272098054750,
              data:
                'data:image/jpeg;base64,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'
            },
            {
              timing: 3000,
              timestamp: 272098354750,
              data:
                'data:image/jpeg;base64,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'
            }
          ]
        }
      },
      'final-screenshot': {
        id: 'final-screenshot',
        title: 'Final Screenshot',
        description: 'The last screenshot captured of the pageload.',
        score: null,
        scoreDisplayMode: 'informative',
        details: {
          type: 'screenshot',
          timing: 611,
          timestamp: 272095965725,
          data:
            'data:image/jpeg;base64,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khV+qmweG4IVT6PgDnO/cRjOCRXTpjMsDvLpknou8fEW4FyrKN8jYYcb53I7q6vtVv7ePzCnarf20fmFMwZaI9JsWF1cNaFWgnMJRpRgbZyzAEA7YwM7kDvqpedKbq00+1mlsC0080g6tc54FnVMAd7lWzjbkTyFdR2q39tF5hTtVv7aPzCmYMuci6XRkM0tsqIo3YS5DekV4l23XIxxeJxiopOmEscbSNpUqx5wrGTH8ZTLbeiNic+GPHbqO1W/tovMKdqt/bR+YUzBly0nTGSNx1mmtEhBIMsuN+NkA2BGcqTzwBvmo7Xps0zAtpzqjqjKOLfDEjh5fbxg8Phk5rre1W/tovMKdqt/bReYUzBlU0bUX1GJmkgEDrjKF+IjOfcNsf758N9jUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFO1W/t4/MKZgympUParf28fmFZxzRyEiORGI8DmmYXLOlKVRoL6GO8je0ltWuUZQWQYwBnY7kb5Hd4VmqSqBiwm2AGSUJ29/FUFxqLabdyzdR1kQhDO5lVAgBO5Jr6vSSR7dp4tPMkaqXylxGdhnPf4gitYZynCzAYFhMB7uD8VCkpznT5d9z9jf/KrI1CcjPZV/u/lX3t8/wDKr/d/KoKoWUHIsJs+PofioFmAwLCYD3cH4qtdvn/lV/u/lTt8/wDKr/d/Kgr5uP5Kf5p+Kmbj+Sn+afiqx2+f+VX+7+VO3z/yq/3fyoKwlYTLFLBJEzKWXixg4xnkT4ipajlkmuLuGR4ljSNHXZ+Ikkr7vcakpKwsWX74/CmrGQWjmFS0oU8I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'
        }
      },
      'estimated-input-latency': {
        id: 'estimated-input-latency',
        title: 'Estimated Input Latency',
        description:
          'Estimated Input Latency is an estimate of how long your app takes to respond to user input, in milliseconds, during the busiest 5s window of page load. If your latency is higher than 50 ms, users may perceive your app as laggy. [Learn more](https://web.dev/estimated-input-latency/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 12.8,
        numericUnit: 'millisecond',
        displayValue: '10 ms'
      },
      'total-blocking-time': {
        id: 'total-blocking-time',
        title: 'Total Blocking Time',
        description:
          'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more](https://web.dev/lighthouse-total-blocking-time/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 27.5,
        numericUnit: 'millisecond',
        displayValue: '30 ms'
      },
      'max-potential-fid': {
        id: 'max-potential-fid',
        title: 'Max Potential First Input Delay',
        description:
          'The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more](https://web.dev/lighthouse-max-potential-fid/).',
        score: 0.94,
        scoreDisplayMode: 'numeric',
        numericValue: 111,
        numericUnit: 'millisecond',
        displayValue: '110 ms'
      },
      'cumulative-layout-shift': {
        id: 'cumulative-layout-shift',
        title: 'Cumulative Layout Shift',
        description:
          'Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'unitless',
        displayValue: '0',
        details: {
          type: 'debugdata',
          items: [{ finalLayoutShiftTraceEventFound: false }]
        }
      },
      'errors-in-console': {
        id: 'errors-in-console',
        title: 'No browser errors logged to the console',
        description:
          'Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns. [Learn more](https://web.dev/errors-in-console/)',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'server-response-time': {
        id: 'server-response-time',
        title: 'Initial server response time was short',
        description:
          'Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/).',
        score: 1,
        scoreDisplayMode: 'binary',
        numericValue: 89.95400000000004,
        numericUnit: 'millisecond',
        displayValue: 'Root document took 90 ms',
        details: {
          type: 'opportunity',
          overallSavingsMs: -510.04599999999994,
          headings: [],
          items: []
        }
      },
      'first-cpu-idle': {
        id: 'first-cpu-idle',
        title: 'First CPU Idle',
        description:
          "First CPU Idle marks the first time at which the page's main thread is quiet enough to handle input.  [Learn more](https://web.dev/first-cpu-idle/).",
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 1215.06,
        numericUnit: 'millisecond',
        displayValue: '1.2 s'
      },
      interactive: {
        id: 'interactive',
        title: 'Time to Interactive',
        description:
          'Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 1215.06,
        numericUnit: 'millisecond',
        displayValue: '1.2 s'
      },
      'user-timings': {
        id: 'user-timings',
        title: 'User Timing marks and measures',
        description:
          "Consider instrumenting your app with the User Timing API to measure your app's real-world performance during key user experiences. [Learn more](https://web.dev/user-timings/).",
        score: null,
        scoreDisplayMode: 'notApplicable',
        details: { type: 'table', headings: [], items: [] }
      },
      'critical-request-chains': {
        id: 'critical-request-chains',
        title: 'Avoid chaining critical requests',
        description:
          'The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn more](https://web.dev/critical-request-chains/).',
        score: null,
        scoreDisplayMode: 'informative',
        displayValue: '5 chains found',
        details: {
          type: 'criticalrequestchain',
          chains: {
            '78824159071B051C87326BFDF8050474': {
              request: {
                url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html',
                startTime: 272095.355724,
                endTime: 272095.655509,
                responseReceivedTime: 272095.65457400004,
                transferSize: 5851
              },
              children: {
                196.2: {
                  request: {
                    url:
                      'https://varnish-cache.org/docs/6.2/_static/classic.css',
                    startTime: 272095.673331,
                    endTime: 272095.755375,
                    responseReceivedTime: 272095.754602,
                    transferSize: 1394
                  },
                  children: {
                    196.9: {
                      request: {
                        url:
                          'https://varnish-cache.org/docs/6.2/_static/basic.css',
                        startTime: 272095.762277,
                        endTime: 272095.842891,
                        responseReceivedTime: 272095.841701,
                        transferSize: 2777
                      }
                    }
                  }
                },
                196.3: {
                  request: {
                    url:
                      'https://varnish-cache.org/docs/6.2/_static/pygments.css',
                    startTime: 272095.674819,
                    endTime: 272095.758246,
                    responseReceivedTime: 272095.75573800004,
                    transferSize: 1197
                  }
                },
                196.4: {
                  request: {
                    url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
                    startTime: 272095.675119,
                    endTime: 272095.835399,
                    responseReceivedTime: 272095.75846800004,
                    transferSize: 30348
                  }
                },
                196.5: {
                  request: {
                    url:
                      'https://varnish-cache.org/docs/6.2/_static/underscore.js',
                    startTime: 272095.675376,
                    endTime: 272095.837817,
                    responseReceivedTime: 272095.836527,
                    transferSize: 4369
                  }
                },
                196.6: {
                  request: {
                    url:
                      'https://varnish-cache.org/docs/6.2/_static/doctools.js',
                    startTime: 272095.675565,
                    endTime: 272095.840192,
                    responseReceivedTime: 272095.83908199996,
                    transferSize: 3562
                  }
                }
              }
            }
          },
          longestChain: {
            duration: 487.1669999556616,
            length: 3,
            transferSize: 2777
          }
        }
      },
      redirects: {
        id: 'redirects',
        title: 'Avoid multiple page redirects',
        description:
          'Redirects introduce additional delays before the page can be loaded. [Learn more](https://web.dev/redirects/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0
        }
      },
      'image-aspect-ratio': {
        id: 'image-aspect-ratio',
        title: 'Displays images with correct aspect ratio',
        description:
          'Image display dimensions should match natural aspect ratio. [Learn more](https://web.dev/image-aspect-ratio/).',
        score: 1,
        scoreDisplayMode: 'binary',
        warnings: [],
        details: { type: 'table', headings: [], items: [] }
      },
      'image-size-responsive': {
        id: 'image-size-responsive',
        title: 'Serves images with appropriate resolution',
        description:
          'Image natural dimensions should be proportional to the display size and the pixel ratio to maximize image clarity. [Learn more](https://web.dev/serve-responsive-images/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      deprecations: {
        id: 'deprecations',
        title: 'Avoids deprecated APIs',
        description:
          'Deprecated APIs will eventually be removed from the browser. [Learn more](https://web.dev/deprecations/).',
        score: 1,
        scoreDisplayMode: 'binary',
        displayValue: '',
        details: { type: 'table', headings: [], items: [] }
      },
      'mainthread-work-breakdown': {
        id: 'mainthread-work-breakdown',
        title: 'Minimizes main-thread work',
        description:
          'Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/mainthread-work-breakdown/)',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 571.4760000000001,
        numericUnit: 'millisecond',
        displayValue: '0.6 s',
        details: {
          type: 'table',
          headings: [
            { key: 'groupLabel', itemType: 'text', text: 'Category' },
            {
              key: 'duration',
              itemType: 'ms',
              granularity: 1,
              text: 'Time Spent'
            }
          ],
          items: [
            {
              group: 'scriptEvaluation',
              groupLabel: 'Script Evaluation',
              duration: 259.7920000000001
            },
            {
              group: 'styleLayout',
              groupLabel: 'Style & Layout',
              duration: 112.30000000000001
            },
            {
              group: 'other',
              groupLabel: 'Other',
              duration: 111.22000000000001
            },
            {
              group: 'parseHTML',
              groupLabel: 'Parse HTML & CSS',
              duration: 34.96
            },
            {
              group: 'paintCompositeRender',
              groupLabel: 'Rendering',
              duration: 26.72
            },
            {
              group: 'scriptParseCompile',
              groupLabel: 'Script Parsing & Compilation',
              duration: 26.483999999999998
            }
          ]
        }
      },
      'bootup-time': {
        id: 'bootup-time',
        title: 'JavaScript execution time',
        description:
          'Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 265.94399999999996,
        numericUnit: 'millisecond',
        displayValue: '0.3 s',
        details: {
          type: 'table',
          headings: [
            { key: 'url', itemType: 'url', text: 'URL' },
            {
              key: 'total',
              granularity: 1,
              itemType: 'ms',
              text: 'Total CPU Time'
            },
            {
              key: 'scripting',
              granularity: 1,
              itemType: 'ms',
              text: 'Script Evaluation'
            },
            {
              key: 'scriptParseCompile',
              granularity: 1,
              itemType: 'ms',
              text: 'Script Parse'
            }
          ],
          items: [
            {
              url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html',
              total: 362.62,
              scripting: 181.90400000000002,
              scriptParseCompile: 4.2
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              total: 122.12799999999996,
              scripting: 67.90399999999997,
              scriptParseCompile: 11.936
            }
          ],
          summary: { wastedMs: 265.94399999999996 }
        }
      },
      'uses-rel-preload': {
        id: 'uses-rel-preload',
        title: 'Preload key requests',
        description:
          'Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load. [Learn more](https://web.dev/uses-rel-preload/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0
        }
      },
      'uses-rel-preconnect': {
        id: 'uses-rel-preconnect',
        title: 'Preconnect to required origins',
        description:
          'Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. [Learn more](https://web.dev/uses-rel-preconnect/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        warnings: [],
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0
        }
      },
      'font-display': {
        id: 'font-display',
        title: 'All text remains visible during webfont loads',
        description:
          'Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading. [Learn more](https://web.dev/font-display/).',
        score: 1,
        scoreDisplayMode: 'binary',
        warnings: [],
        details: { type: 'table', headings: [], items: [] }
      },
      diagnostics: {
        id: 'diagnostics',
        title: 'Diagnostics',
        description: 'Collection of useful page vitals.',
        score: null,
        scoreDisplayMode: 'informative',
        details: {
          type: 'debugdata',
          items: [
            {
              numRequests: 7,
              numScripts: 3,
              numStylesheets: 3,
              numFonts: 0,
              numTasks: 41,
              numTasksOver10ms: 2,
              numTasksOver25ms: 2,
              numTasksOver50ms: 2,
              numTasksOver100ms: 0,
              numTasksOver500ms: 0,
              rtt: 77.463,
              throughput: 4673094.407734089,
              maxRtt: 77.463,
              maxServerLatency: 1.5600000000000165,
              totalByteWeight: 49498,
              totalTaskTime: 142.86899999999997,
              mainDocumentTransferSize: 5851
            }
          ]
        }
      },
      'network-requests': {
        id: 'network-requests',
        title: 'Network Requests',
        description:
          'Lists the network requests that were made during page load.',
        score: null,
        scoreDisplayMode: 'informative',
        details: {
          type: 'table',
          headings: [
            { key: 'url', itemType: 'url', text: 'URL' },
            {
              key: 'startTime',
              itemType: 'ms',
              granularity: 1,
              text: 'Start Time'
            },
            {
              key: 'endTime',
              itemType: 'ms',
              granularity: 1,
              text: 'End Time'
            },
            {
              key: 'transferSize',
              itemType: 'bytes',
              displayUnit: 'kb',
              granularity: 1,
              text: 'Transfer Size'
            },
            {
              key: 'resourceSize',
              itemType: 'bytes',
              displayUnit: 'kb',
              granularity: 1,
              text: 'Resource Size'
            },
            { key: 'statusCode', itemType: 'text', text: 'Status Code' },
            { key: 'mimeType', itemType: 'text', text: 'MIME Type' },
            { key: 'resourceType', itemType: 'text', text: 'Resource Type' }
          ],
          items: [
            {
              url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html',
              startTime: 0,
              endTime: 299.7849999810569,
              finished: true,
              transferSize: 5851,
              resourceSize: 17862,
              statusCode: 200,
              mimeType: 'text/html',
              resourceType: 'Document'
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/classic.css',
              startTime: 317.60700000450015,
              endTime: 399.6509999851696,
              finished: true,
              transferSize: 1394,
              resourceSize: 4142,
              statusCode: 200,
              mimeType: 'text/css',
              resourceType: 'Stylesheet'
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/pygments.css',
              startTime: 319.0949999843724,
              endTime: 402.5219999602996,
              finished: true,
              transferSize: 1197,
              resourceSize: 4395,
              statusCode: 200,
              mimeType: 'text/css',
              resourceType: 'Stylesheet'
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              startTime: 319.39499999862164,
              endTime: 479.67499995138496,
              finished: true,
              transferSize: 30348,
              resourceSize: 86351,
              statusCode: 200,
              mimeType: 'application/x-javascript',
              resourceType: 'Script'
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/underscore.js',
              startTime: 319.65199997648597,
              endTime: 482.0929999696091,
              finished: true,
              transferSize: 4369,
              resourceSize: 12140,
              statusCode: 200,
              mimeType: 'application/x-javascript',
              resourceType: 'Script'
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/doctools.js',
              startTime: 319.8409999604337,
              endTime: 484.4679999514483,
              finished: true,
              transferSize: 3562,
              resourceSize: 9131,
              statusCode: 200,
              mimeType: 'application/x-javascript',
              resourceType: 'Script'
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/basic.css',
              startTime: 406.55299997888505,
              endTime: 487.1669999556616,
              finished: true,
              transferSize: 2777,
              resourceSize: 10362,
              statusCode: 200,
              mimeType: 'text/css',
              resourceType: 'Stylesheet'
            }
          ]
        }
      },
      'network-rtt': {
        id: 'network-rtt',
        title: 'Network Round Trip Times',
        description:
          "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more](https://hpbn.co/primer-on-latency-and-bandwidth/).",
        score: null,
        scoreDisplayMode: 'informative',
        numericValue: 77.463,
        numericUnit: 'millisecond',
        displayValue: '80 ms',
        details: {
          type: 'table',
          headings: [
            { key: 'origin', itemType: 'text', text: 'URL' },
            { key: 'rtt', itemType: 'ms', granularity: 1, text: 'Time Spent' }
          ],
          items: [{ origin: 'https://varnish-cache.org', rtt: 77.463 }]
        }
      },
      'network-server-latency': {
        id: 'network-server-latency',
        title: 'Server Backend Latencies',
        description:
          "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
        score: null,
        scoreDisplayMode: 'informative',
        numericValue: 1.5600000000000165,
        numericUnit: 'millisecond',
        displayValue: '0 ms',
        details: {
          type: 'table',
          headings: [
            { key: 'origin', itemType: 'text', text: 'URL' },
            {
              key: 'serverResponseTime',
              itemType: 'ms',
              granularity: 1,
              text: 'Time Spent'
            }
          ],
          items: [
            {
              origin: 'https://varnish-cache.org',
              serverResponseTime: 1.5600000000000165
            }
          ]
        }
      },
      'main-thread-tasks': {
        id: 'main-thread-tasks',
        title: 'Tasks',
        description:
          'Lists the toplevel main thread tasks that executed during page load.',
        score: null,
        scoreDisplayMode: 'informative',
        details: {
          type: 'table',
          headings: [
            {
              key: 'startTime',
              itemType: 'ms',
              granularity: 1,
              text: 'Start Time'
            },
            {
              key: 'duration',
              itemType: 'ms',
              granularity: 1,
              text: 'End Time'
            }
          ],
          items: [
            { duration: 7.996, startTime: 312.457 },
            { duration: 5.404, startTime: 409.034 },
            { duration: 55.698, startTime: 495.974 },
            { duration: 52.592, startTime: 551.991 }
          ]
        }
      },
      metrics: {
        id: 'metrics',
        title: 'Metrics',
        description: 'Collects all available metrics.',
        score: null,
        scoreDisplayMode: 'informative',
        numericValue: 1215,
        numericUnit: 'millisecond',
        details: {
          type: 'debugdata',
          items: [
            {
              firstContentfulPaint: 1163,
              firstMeaningfulPaint: 1215,
              largestContentfulPaint: 1215,
              firstCPUIdle: 1215,
              interactive: 1215,
              speedIndex: 1346,
              estimatedInputLatency: 13,
              totalBlockingTime: 28,
              maxPotentialFID: 111,
              cumulativeLayoutShift: 0,
              observedNavigationStart: 0,
              observedNavigationStartTs: 272095354750,
              observedFirstPaint: 584,
              observedFirstPaintTs: 272095938263,
              observedFirstContentfulPaint: 584,
              observedFirstContentfulPaintTs: 272095938263,
              observedFirstMeaningfulPaint: 584,
              observedFirstMeaningfulPaintTs: 272095938263,
              observedLargestContentfulPaint: 584,
              observedLargestContentfulPaintTs: 272095938263,
              observedTraceEnd: 1658,
              observedTraceEndTs: 272097012365,
              observedLoad: 592,
              observedLoadTs: 272095947097,
              observedDomContentLoaded: 592,
              observedDomContentLoadedTs: 272095946415,
              observedCumulativeLayoutShift: 0,
              observedFirstVisualChange: 560,
              observedFirstVisualChangeTs: 272095914750,
              observedLastVisualChange: 610,
              observedLastVisualChangeTs: 272095964750,
              observedSpeedIndex: 576,
              observedSpeedIndexTs: 272095930726
            },
            { lcpInvalidated: false }
          ]
        }
      },
      'performance-budget': {
        id: 'performance-budget',
        title: 'Performance budget',
        description:
          'Keep the quantity and size of network requests under the targets set by the provided performance budget. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'timing-budget': {
        id: 'timing-budget',
        title: 'Timing budget',
        description:
          'Set a timing budget to help you keep an eye on the performance of your site. Performant sites load fast and respond to user input events quickly. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'resource-summary': {
        id: 'resource-summary',
        title: 'Keep request counts low and transfer sizes small',
        description:
          'To set budgets for the quantity and size of page resources, add a budget.json file. [Learn more](https://web.dev/use-lighthouse-for-performance-budgets/).',
        score: null,
        scoreDisplayMode: 'informative',
        displayValue: '7 requests • 48 KiB',
        details: {
          type: 'table',
          headings: [
            { key: 'label', itemType: 'text', text: 'Resource Type' },
            { key: 'requestCount', itemType: 'numeric', text: 'Requests' },
            { key: 'transferSize', itemType: 'bytes', text: 'Transfer Size' }
          ],
          items: [
            {
              resourceType: 'total',
              label: 'Total',
              requestCount: 7,
              transferSize: 49498
            },
            {
              resourceType: 'script',
              label: 'Script',
              requestCount: 3,
              transferSize: 38279
            },
            {
              resourceType: 'document',
              label: 'Document',
              requestCount: 1,
              transferSize: 5851
            },
            {
              resourceType: 'stylesheet',
              label: 'Stylesheet',
              requestCount: 3,
              transferSize: 5368
            },
            {
              resourceType: 'image',
              label: 'Image',
              requestCount: 0,
              transferSize: 0
            },
            {
              resourceType: 'media',
              label: 'Media',
              requestCount: 0,
              transferSize: 0
            },
            {
              resourceType: 'font',
              label: 'Font',
              requestCount: 0,
              transferSize: 0
            },
            {
              resourceType: 'other',
              label: 'Other',
              requestCount: 0,
              transferSize: 0
            },
            {
              resourceType: 'third-party',
              label: 'Third-party',
              requestCount: 0,
              transferSize: 0
            }
          ]
        }
      },
      'third-party-summary': {
        id: 'third-party-summary',
        title: 'Minimize third-party usage',
        description:
          'Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading. [Learn more](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'largest-contentful-paint-element': {
        id: 'largest-contentful-paint-element',
        title: 'Largest Contentful Paint element',
        description:
          'This is the largest contentful element painted within the viewport. [Learn More](https://web.dev/lighthouse-largest-contentful-paint/)',
        score: null,
        scoreDisplayMode: 'informative',
        displayValue: '1 element found',
        details: {
          type: 'table',
          headings: [{ key: 'node', itemType: 'node', text: 'Element' }],
          items: [
            {
              node: {
                type: 'node',
                path: '1,HTML,1,BODY,1,DIV,0,DIV,0,DIV,0,DIV,0,DIV,18,DIV,2,P',
                selector:
                  'div.body > div#going-fast-slowly > div#anyway-what-do-programmers-do-all-day > p',
                nodeLabel:
                  'Back before the dot-com disaster, people had actually spent considerable time a…',
                snippet: '<p>'
              }
            }
          ]
        }
      },
      'layout-shift-elements': {
        id: 'layout-shift-elements',
        title: 'Avoid large layout shifts',
        description:
          'These DOM elements contribute most to the CLS of the page.',
        score: null,
        scoreDisplayMode: 'notApplicable',
        details: { type: 'table', headings: [], items: [] }
      },
      'long-tasks': {
        id: 'long-tasks',
        title: 'Avoid long main-thread tasks',
        description:
          'Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. [Learn more](https://web.dev/long-tasks-devtools/)',
        score: null,
        scoreDisplayMode: 'informative',
        displayValue: '2 long tasks found',
        details: {
          type: 'table',
          headings: [
            { key: 'url', itemType: 'url', text: 'URL' },
            {
              key: 'startTime',
              itemType: 'ms',
              granularity: 1,
              text: 'Start Time'
            },
            {
              key: 'duration',
              itemType: 'ms',
              granularity: 1,
              text: 'Duration'
            }
          ],
          items: [
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              duration: 111,
              startTime: 1156.56
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              duration: 105,
              startTime: 1051.56
            }
          ]
        }
      },
      accesskeys: {
        id: 'accesskeys',
        title: '`[accesskey]` values are unique',
        description:
          'Access keys let users quickly focus a part of the page. For proper navigation, each access key must be unique. [Learn more](https://web.dev/accesskeys/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-allowed-attr': {
        id: 'aria-allowed-attr',
        title: '`[aria-*]` attributes match their roles',
        description:
          'Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching these invalidates the `aria-*` attributes. [Learn more](https://web.dev/aria-allowed-attr/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-hidden-body': {
        id: 'aria-hidden-body',
        title: '`[aria-hidden="true"]` is not present on the document `<body>`',
        description:
          'Assistive technologies, like screen readers, work inconsistently when `aria-hidden="true"` is set on the document `<body>`. [Learn more](https://web.dev/aria-hidden-body/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-hidden-focus': {
        id: 'aria-hidden-focus',
        title:
          '`[aria-hidden="true"]` elements do not contain focusable descendents',
        description:
          'Focusable descendents within an `[aria-hidden="true"]` element prevent those interactive elements from being available to users of assistive technologies like screen readers. [Learn more](https://web.dev/aria-hidden-focus/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'aria-input-field-name': {
        id: 'aria-input-field-name',
        title: 'ARIA input fields have accessible names',
        description:
          "When an input field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-input-field-name/).",
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'aria-required-attr': {
        id: 'aria-required-attr',
        title: '`[role]`s have all required `[aria-*]` attributes',
        description:
          'Some ARIA roles have required attributes that describe the state of the element to screen readers. [Learn more](https://web.dev/aria-required-attr/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-required-children': {
        id: 'aria-required-children',
        title:
          'Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.',
        description:
          'Some ARIA parent roles must contain specific child roles to perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-children/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-required-parent': {
        id: 'aria-required-parent',
        title: '`[role]`s are contained by their required parent element',
        description:
          'Some ARIA child roles must be contained by specific parent roles to properly perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-parent/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-roles': {
        id: 'aria-roles',
        title: '`[role]` values are valid',
        description:
          'ARIA roles must have valid values in order to perform their intended accessibility functions. [Learn more](https://web.dev/aria-roles/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-toggle-field-name': {
        id: 'aria-toggle-field-name',
        title: 'ARIA toggle fields have accessible names',
        description:
          "When a toggle field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-toggle-field-name/).",
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'aria-valid-attr-value': {
        id: 'aria-valid-attr-value',
        title: '`[aria-*]` attributes have valid values',
        description:
          "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values. [Learn more](https://web.dev/aria-valid-attr-value/).",
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'aria-valid-attr': {
        id: 'aria-valid-attr',
        title: '`[aria-*]` attributes are valid and not misspelled',
        description:
          "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid names. [Learn more](https://web.dev/aria-valid-attr/).",
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'button-name': {
        id: 'button-name',
        title: 'Buttons have an accessible name',
        description:
          'When a button doesn\'t have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers. [Learn more](https://web.dev/button-name/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      bypass: {
        id: 'bypass',
        title: 'The page contains a heading, skip link, or landmark region',
        description:
          'Adding ways to bypass repetitive content lets keyboard users navigate the page more efficiently. [Learn more](https://web.dev/bypass/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'color-contrast': {
        id: 'color-contrast',
        title:
          'Background and foreground colors do not have a sufficient contrast ratio.',
        description:
          'Low-contrast text is difficult or impossible for many users to read. [Learn more](https://web.dev/color-contrast/).',
        score: 0,
        scoreDisplayMode: 'binary',
        details: {
          type: 'table',
          headings: [
            { key: 'node', itemType: 'node', text: 'Failing Elements' }
          ],
          items: [
            {
              node: {
                type: 'node',
                selector: 'a[accesskey="I"]',
                path: '1,HTML,1,BODY,0,DIV,1,UL,0,LI,0,A',
                snippet:
                  '<a href="../genindex.html" title="General Index" accesskey="I">index</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'index'
              }
            },
            {
              node: {
                type: 'node',
                selector: 'a[accesskey="N"]',
                path: '1,HTML,1,BODY,0,DIV,1,UL,1,LI,0,A',
                snippet:
                  '<a href="firstdesign.html" title="The first design of Varnish" accesskey="N">next</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'next'
              }
            },
            {
              node: {
                type: 'node',
                selector: 'a[accesskey="P"]',
                path: '1,HTML,1,BODY,0,DIV,1,UL,2,LI,0,A',
                snippet:
                  '<a href="farfaraway.html" title="Far, far away" accesskey="P">previous</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'previous'
              }
            },
            {
              node: {
                type: 'node',
                selector:
                  '.related[aria-label="related\\ navigation"][role="navigation"]:nth-child(1) > ul > .nav-item-0.nav-item > a[href="\\.\\.\\/index\\.html"]',
                path: '1,HTML,1,BODY,0,DIV,1,UL,3,LI,0,A',
                snippet:
                  '<a href="../index.html">Varnish version 6.2.3 documentation</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'Varnish version 6.2.3 documentation'
              }
            },
            {
              node: {
                type: 'node',
                selector: 'a[accesskey="U"]',
                path: '1,HTML,1,BODY,0,DIV,1,UL,4,LI,0,A',
                snippet:
                  '<a href="index.html" accesskey="U">Poul-Hennings random outbursts</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'Poul-Hennings random outbursts'
              }
            },
            {
              node: {
                type: 'node',
                selector:
                  '.related[aria-label="related\\ navigation"][role="navigation"]:nth-child(3) > ul > .right:nth-child(1) > a[title="General\\ Index"][href="\\.\\.\\/genindex\\.html"]',
                path: '1,HTML,1,BODY,2,DIV,1,UL,0,LI,0,A',
                snippet:
                  '<a href="../genindex.html" title="General Index">index</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'index'
              }
            },
            {
              node: {
                type: 'node',
                selector:
                  '.related[aria-label="related\\ navigation"][role="navigation"]:nth-child(3) > ul > .right:nth-child(2) > a[title="The\\ first\\ design\\ of\\ Varnish"][href$="firstdesign\\.html"]',
                path: '1,HTML,1,BODY,2,DIV,1,UL,1,LI,0,A',
                snippet:
                  '<a href="firstdesign.html" title="The first design of Varnish">next</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'next'
              }
            },
            {
              node: {
                type: 'node',
                selector:
                  '.related[aria-label="related\\ navigation"][role="navigation"]:nth-child(3) > ul > .right:nth-child(3) > a[title="Far\\,\\ far\\ away"][href$="farfaraway\\.html"]',
                path: '1,HTML,1,BODY,2,DIV,1,UL,2,LI,0,A',
                snippet:
                  '<a href="farfaraway.html" title="Far, far away">previous</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'previous'
              }
            },
            {
              node: {
                type: 'node',
                selector:
                  '.related[aria-label="related\\ navigation"][role="navigation"]:nth-child(3) > ul > .nav-item-0.nav-item > a[href="\\.\\.\\/index\\.html"]',
                path: '1,HTML,1,BODY,2,DIV,1,UL,3,LI,0,A',
                snippet:
                  '<a href="../index.html">Varnish version 6.2.3 documentation</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'Varnish version 6.2.3 documentation'
              }
            },
            {
              node: {
                type: 'node',
                selector:
                  '.related[aria-label="related\\ navigation"][role="navigation"]:nth-child(3) > ul > .nav-item-1.nav-item > a[href="index\\.html"]',
                path: '1,HTML,1,BODY,2,DIV,1,UL,4,LI,0,A',
                snippet:
                  '<a href="index.html">Poul-Hennings random outbursts</a>',
                explanation:
                  'Fix any of the following:\n  Element has insufficient color contrast of 4.31 (foreground color: #ffffff, background color: #437eb2, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1',
                nodeLabel: 'Poul-Hennings random outbursts'
              }
            }
          ],
          debugData: {
            type: 'debugdata',
            impact: 'serious',
            tags: ['cat.color', 'wcag2aa', 'wcag143']
          }
        }
      },
      'definition-list': {
        id: 'definition-list',
        title:
          "`<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.",
        description:
          'When definition lists are not properly marked up, screen readers may produce confusing or inaccurate output. [Learn more](https://web.dev/definition-list/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      dlitem: {
        id: 'dlitem',
        title: 'Definition list items are wrapped in `<dl>` elements',
        description:
          'Definition list items (`<dt>` and `<dd>`) must be wrapped in a parent `<dl>` element to ensure that screen readers can properly announce them. [Learn more](https://web.dev/dlitem/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'document-title': {
        id: 'document-title',
        title: 'Document has a `<title>` element',
        description:
          'The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more](https://web.dev/document-title/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'duplicate-id-active': {
        id: 'duplicate-id-active',
        title: '`[id]` attributes on active, focusable elements are unique',
        description:
          "All focusable elements must have a unique `id` to ensure that they're visible to assistive technologies. [Learn more](https://web.dev/duplicate-id-active/).",
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'duplicate-id-aria': {
        id: 'duplicate-id-aria',
        title: 'ARIA IDs are unique',
        description:
          'The value of an ARIA ID must be unique to prevent other instances from being overlooked by assistive technologies. [Learn more](https://web.dev/duplicate-id-aria/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'form-field-multiple-labels': {
        id: 'form-field-multiple-labels',
        title: 'No form fields have multiple labels',
        description:
          'Form fields with multiple labels can be confusingly announced by assistive technologies like screen readers which use either the first, the last, or all of the labels. [Learn more](https://web.dev/form-field-multiple-labels/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'frame-title': {
        id: 'frame-title',
        title: '`<frame>` or `<iframe>` elements have a title',
        description:
          'Screen reader users rely on frame titles to describe the contents of frames. [Learn more](https://web.dev/frame-title/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'heading-order': {
        id: 'heading-order',
        title: 'Heading elements appear in a sequentially-descending order',
        description:
          'Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more](https://web.dev/heading-order/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'html-has-lang': {
        id: 'html-has-lang',
        title: '`<html>` element does not have a `[lang]` attribute',
        description:
          "If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default language that the user chose when setting up the screen reader. If the page isn't actually in the default language, then the screen reader might not announce the page's text correctly. [Learn more](https://web.dev/html-has-lang/).",
        score: 0,
        scoreDisplayMode: 'binary',
        details: {
          type: 'table',
          headings: [
            { key: 'node', itemType: 'node', text: 'Failing Elements' }
          ],
          items: [
            {
              node: {
                type: 'node',
                selector: 'html',
                path: '1,HTML',
                snippet: '<html xmlns="http://www.w3.org/1999/xhtml">',
                explanation:
                  'Fix any of the following:\n  The <html> element does not have a lang attribute',
                nodeLabel: 'html'
              }
            }
          ],
          debugData: {
            type: 'debugdata',
            impact: 'serious',
            tags: ['cat.language', 'wcag2a', 'wcag311']
          }
        }
      },
      'html-lang-valid': {
        id: 'html-lang-valid',
        title: '`<html>` element has a valid value for its `[lang]` attribute',
        description:
          'Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) helps screen readers announce text properly. [Learn more](https://web.dev/html-lang-valid/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'image-alt': {
        id: 'image-alt',
        title: 'Image elements have `[alt]` attributes',
        description:
          'Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. [Learn more](https://web.dev/image-alt/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'input-image-alt': {
        id: 'input-image-alt',
        title: '`<input type="image">` elements have `[alt]` text',
        description:
          'When an image is being used as an `<input>` button, providing alternative text can help screen reader users understand the purpose of the button. [Learn more](https://web.dev/input-image-alt/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      label: {
        id: 'label',
        title: 'Form elements do not have associated labels',
        description:
          'Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more](https://web.dev/label/).',
        score: 0,
        scoreDisplayMode: 'binary',
        details: {
          type: 'table',
          headings: [
            { key: 'node', itemType: 'node', text: 'Failing Elements' }
          ],
          items: [
            {
              node: {
                type: 'node',
                selector: 'input[type="text"]',
                path:
                  '1,HTML,1,BODY,1,DIV,1,DIV,0,DIV,7,DIV,1,FORM,0,DIV,0,INPUT',
                snippet: '<input type="text" name="q">',
                explanation:
                  'Fix any of the following:\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  Element has no title attribute or the title attribute is empty',
                nodeLabel: 'input'
              }
            }
          ],
          debugData: {
            type: 'debugdata',
            impact: 'critical',
            tags: [
              'cat.forms',
              'wcag2a',
              'wcag412',
              'wcag131',
              'section508',
              'section508.22.n'
            ]
          }
        }
      },
      'layout-table': {
        id: 'layout-table',
        title:
          'Presentational `<table>` elements avoid using `<th>`, `<caption>` or the `[summary]` attribute.',
        description:
          'A table being used for layout purposes should not include data elements, such as the th or caption elements or the summary attribute, because this can create a confusing experience for screen reader users. [Learn more](https://web.dev/layout-table/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'link-name': {
        id: 'link-name',
        title: 'Links have a discernible name',
        description:
          'Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn more](https://web.dev/link-name/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      list: {
        id: 'list',
        title:
          'Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).',
        description:
          'Screen readers have a specific way of announcing lists. Ensuring proper list structure aids screen reader output. [Learn more](https://web.dev/list/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      listitem: {
        id: 'listitem',
        title:
          'List items (`<li>`) are contained within `<ul>` or `<ol>` parent elements',
        description:
          'Screen readers require list items (`<li>`) to be contained within a parent `<ul>` or `<ol>` to be announced properly. [Learn more](https://web.dev/listitem/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'meta-refresh': {
        id: 'meta-refresh',
        title: 'The document does not use `<meta http-equiv="refresh">`',
        description:
          'Users do not expect a page to refresh automatically, and doing so will move focus back to the top of the page. This may create a frustrating or confusing experience. [Learn more](https://web.dev/meta-refresh/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'meta-viewport': {
        id: 'meta-viewport',
        title:
          '`[user-scalable="no"]` is not used in the `<meta name="viewport">` element and the `[maximum-scale]` attribute is not less than 5.',
        description:
          'Disabling zooming is problematic for users with low vision who rely on screen magnification to properly see the contents of a web page. [Learn more](https://web.dev/meta-viewport/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'object-alt': {
        id: 'object-alt',
        title: '`<object>` elements have `[alt]` text',
        description:
          'Screen readers cannot translate non-text content. Adding alt text to `<object>` elements helps screen readers convey meaning to users. [Learn more](https://web.dev/object-alt/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      tabindex: {
        id: 'tabindex',
        title: 'No element has a `[tabindex]` value greater than 0',
        description:
          'A value greater than 0 implies an explicit navigation ordering. Although technically valid, this often creates frustrating experiences for users who rely on assistive technologies. [Learn more](https://web.dev/tabindex/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'td-headers-attr': {
        id: 'td-headers-attr',
        title:
          'Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.',
        description:
          'Screen readers have features to make navigating tables easier. Ensuring `<td>` cells using the `[headers]` attribute only refer to other cells in the same table may improve the experience for screen reader users. [Learn more](https://web.dev/td-headers-attr/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'th-has-data-cells': {
        id: 'th-has-data-cells',
        title:
          '`<th>` elements and elements with `[role="columnheader"/"rowheader"]` have data cells they describe.',
        description:
          'Screen readers have features to make navigating tables easier. Ensuring table headers always refer to some set of cells may improve the experience for screen reader users. [Learn more](https://web.dev/th-has-data-cells/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'valid-lang': {
        id: 'valid-lang',
        title: '`[lang]` attributes have a valid value',
        description:
          'Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) on elements helps ensure that text is pronounced correctly by a screen reader. [Learn more](https://web.dev/valid-lang/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'video-caption': {
        id: 'video-caption',
        title:
          '`<video>` elements contain a `<track>` element with `[kind="captions"]`',
        description:
          'When a video provides a caption it is easier for deaf and hearing impaired users to access its information. [Learn more](https://web.dev/video-caption/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'video-description': {
        id: 'video-description',
        title:
          '`<video>` elements contain a `<track>` element with `[kind="description"]`',
        description:
          'Audio descriptions provide relevant information for videos that dialogue cannot, such as facial expressions and scenes. [Learn more](https://web.dev/video-description/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'custom-controls-labels': {
        id: 'custom-controls-labels',
        title: 'Custom controls have associated labels',
        description:
          'Custom interactive controls have associated labels, provided by aria-label or aria-labelledby. [Learn more](https://web.dev/custom-controls-labels/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'custom-controls-roles': {
        id: 'custom-controls-roles',
        title: 'Custom controls have ARIA roles',
        description:
          'Custom interactive controls have appropriate ARIA roles. [Learn more](https://web.dev/custom-control-roles/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'focus-traps': {
        id: 'focus-traps',
        title: 'User focus is not accidentally trapped in a region',
        description:
          'A user can tab into and out of any control or region without accidentally trapping their focus. [Learn more](https://web.dev/focus-traps/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'focusable-controls': {
        id: 'focusable-controls',
        title: 'Interactive controls are keyboard focusable',
        description:
          'Custom interactive controls are keyboard focusable and display a focus indicator. [Learn more](https://web.dev/focusable-controls/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'interactive-element-affordance': {
        id: 'interactive-element-affordance',
        title: 'Interactive elements indicate their purpose and state',
        description:
          'Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements. [Learn more](https://web.dev/interactive-element-affordance/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'logical-tab-order': {
        id: 'logical-tab-order',
        title: 'The page has a logical tab order',
        description:
          'Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen. [Learn more](https://web.dev/logical-tab-order/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'managed-focus': {
        id: 'managed-focus',
        title: "The user's focus is directed to new content added to the page",
        description:
          "If new content, such as a dialog, is added to the page, the user's focus is directed to it. [Learn more](https://web.dev/managed-focus/).",
        score: null,
        scoreDisplayMode: 'manual'
      },
      'offscreen-content-hidden': {
        id: 'offscreen-content-hidden',
        title: 'Offscreen content is hidden from assistive technology',
        description:
          'Offscreen content is hidden with display: none or aria-hidden=true. [Learn more](https://web.dev/offscreen-content-hidden/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'use-landmarks': {
        id: 'use-landmarks',
        title: 'HTML5 landmark elements are used to improve navigation',
        description:
          'Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology. [Learn more](https://web.dev/use-landmarks/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'visual-order-follows-dom': {
        id: 'visual-order-follows-dom',
        title: 'Visual order on the page follows DOM order',
        description:
          'DOM order matches the visual order, improving navigation for assistive technology. [Learn more](https://web.dev/visual-order-follows-dom/).',
        score: null,
        scoreDisplayMode: 'manual'
      },
      'uses-long-cache-ttl': {
        id: 'uses-long-cache-ttl',
        title: 'Serve static assets with an efficient cache policy',
        description:
          'A long cache lifetime can speed up repeat visits to your page. [Learn more](https://web.dev/uses-long-cache-ttl/).',
        score: 0.89,
        scoreDisplayMode: 'numeric',
        numericValue: 29679.96,
        numericUnit: 'byte',
        displayValue: '6 resources found',
        details: {
          type: 'table',
          headings: [
            { key: 'url', itemType: 'url', text: 'URL' },
            {
              key: 'cacheLifetimeMs',
              itemType: 'ms',
              text: 'Cache TTL',
              displayUnit: 'duration'
            },
            {
              key: 'totalBytes',
              itemType: 'bytes',
              text: 'Transfer Size',
              displayUnit: 'kb',
              granularity: 1
            }
          ],
          items: [
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              debugData: { type: 'debugdata', public: true, 'max-age': 14400 },
              cacheLifetimeMs: 14400000,
              cacheHitProbability: 0.32,
              totalBytes: 30348,
              wastedBytes: 20636.64
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/underscore.js',
              debugData: { type: 'debugdata', public: true, 'max-age': 14400 },
              cacheLifetimeMs: 14400000,
              cacheHitProbability: 0.32,
              totalBytes: 4369,
              wastedBytes: 2970.9199999999996
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/doctools.js',
              debugData: { type: 'debugdata', public: true, 'max-age': 14400 },
              cacheLifetimeMs: 14400000,
              cacheHitProbability: 0.32,
              totalBytes: 3562,
              wastedBytes: 2422.16
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/basic.css',
              debugData: { type: 'debugdata', public: true, 'max-age': 14400 },
              cacheLifetimeMs: 14400000,
              cacheHitProbability: 0.32,
              totalBytes: 2777,
              wastedBytes: 1888.36
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/classic.css',
              debugData: { type: 'debugdata', public: true, 'max-age': 14400 },
              cacheLifetimeMs: 14400000,
              cacheHitProbability: 0.32,
              totalBytes: 1394,
              wastedBytes: 947.92
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/pygments.css',
              debugData: { type: 'debugdata', public: true, 'max-age': 14400 },
              cacheLifetimeMs: 14400000,
              cacheHitProbability: 0.32,
              totalBytes: 1197,
              wastedBytes: 813.9599999999999
            }
          ],
          summary: { wastedBytes: 29679.96 }
        }
      },
      'total-byte-weight': {
        id: 'total-byte-weight',
        title: 'Avoids enormous network payloads',
        description:
          'Large network payloads cost users real money and are highly correlated with long load times. [Learn more](https://web.dev/total-byte-weight/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 49498,
        numericUnit: 'byte',
        displayValue: 'Total size was 48 KiB',
        details: {
          type: 'table',
          headings: [
            { key: 'url', itemType: 'url', text: 'URL' },
            { key: 'totalBytes', itemType: 'bytes', text: 'Transfer Size' }
          ],
          items: [
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              totalBytes: 30348
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html',
              totalBytes: 5851
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/underscore.js',
              totalBytes: 4369
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/doctools.js',
              totalBytes: 3562
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/basic.css',
              totalBytes: 2777
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/classic.css',
              totalBytes: 1394
            },
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/pygments.css',
              totalBytes: 1197
            }
          ]
        }
      },
      'offscreen-images': {
        id: 'offscreen-images',
        title: 'Defer offscreen images',
        description:
          'Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn more](https://web.dev/offscreen-images/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        warnings: [],
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'render-blocking-resources': {
        id: 'render-blocking-resources',
        title: 'Eliminate render-blocking resources',
        description:
          'Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn more](https://web.dev/render-blocking-resources/).',
        score: 0.7,
        scoreDisplayMode: 'numeric',
        numericValue: 395,
        numericUnit: 'millisecond',
        displayValue: 'Potential savings of 400 ms',
        details: {
          type: 'opportunity',
          headings: [
            { key: 'url', valueType: 'url', label: 'URL' },
            { key: 'totalBytes', valueType: 'bytes', label: 'Transfer Size' },
            {
              key: 'wastedMs',
              valueType: 'timespanMs',
              label: 'Potential Savings'
            }
          ],
          items: [
            {
              url: 'https://varnish-cache.org/docs/6.2/_static/jquery.js',
              totalBytes: 30348,
              wastedMs: 300
            }
          ],
          overallSavingsMs: 395
        }
      },
      'unminified-css': {
        id: 'unminified-css',
        title: 'Minify CSS',
        description:
          'Minifying CSS files can reduce network payload sizes. [Learn more](https://web.dev/unminified-css/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'unminified-javascript': {
        id: 'unminified-javascript',
        title: 'Minify JavaScript',
        description:
          'Minifying JavaScript files can reduce payload sizes and script parse time. [Learn more](https://web.dev/unminified-javascript/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        warnings: [],
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'unused-css-rules': {
        id: 'unused-css-rules',
        title: 'Remove unused CSS',
        description:
          'Remove dead rules from stylesheets and defer the loading of CSS not used for above-the-fold content to reduce unnecessary bytes consumed by network activity. [Learn more](https://web.dev/unused-css-rules/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'unused-javascript': {
        id: 'unused-javascript',
        title: 'Remove unused JavaScript',
        description:
          'Remove unused JavaScript to reduce bytes consumed by network activity. [Learn more](https://web.dev/remove-unused-code/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'uses-webp-images': {
        id: 'uses-webp-images',
        title: 'Serve images in next-gen formats',
        description:
          'Image formats like JPEG 2000, JPEG XR, and WebP often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more](https://web.dev/uses-webp-images/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        warnings: [],
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'uses-optimized-images': {
        id: 'uses-optimized-images',
        title: 'Efficiently encode images',
        description:
          'Optimized images load faster and consume less cellular data. [Learn more](https://web.dev/uses-optimized-images/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        warnings: [],
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'uses-text-compression': {
        id: 'uses-text-compression',
        title: 'Enable text compression',
        description:
          'Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more](https://web.dev/uses-text-compression/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'uses-responsive-images': {
        id: 'uses-responsive-images',
        title: 'Properly size images',
        description:
          'Serve images that are appropriately-sized to save cellular data and improve load time. [Learn more](https://web.dev/uses-responsive-images/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        warnings: [],
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'efficient-animated-content': {
        id: 'efficient-animated-content',
        title: 'Use video formats for animated content',
        description:
          'Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more](https://web.dev/efficient-animated-content/)',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 0,
        numericUnit: 'millisecond',
        displayValue: '',
        details: {
          type: 'opportunity',
          headings: [],
          items: [],
          overallSavingsMs: 0,
          overallSavingsBytes: 0
        }
      },
      'appcache-manifest': {
        id: 'appcache-manifest',
        title: 'Avoids Application Cache',
        description:
          'Application Cache is deprecated. [Learn more](https://web.dev/appcache-manifest/).',
        score: 1,
        scoreDisplayMode: 'binary'
      },
      doctype: {
        id: 'doctype',
        title: 'Page lacks the HTML doctype, thus triggering quirks-mode',
        description:
          'Specifying a doctype prevents the browser from switching to quirks-mode. [Learn more](https://web.dev/doctype/).',
        score: 0,
        scoreDisplayMode: 'binary',
        explanation: 'Expected publicId to be an empty string'
      },
      charset: {
        id: 'charset',
        title: 'Properly defines charset',
        description:
          'A character encoding declaration is required. It can be done with a <meta> tag in the first 1024 bytes of the HTML or in the Content-Type HTTP response header. [Learn more](https://web.dev/charset/).',
        score: 1,
        scoreDisplayMode: 'binary'
      },
      'dom-size': {
        id: 'dom-size',
        title: 'Avoids an excessive DOM size',
        description:
          'A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn more](https://web.dev/dom-size/).',
        score: 1,
        scoreDisplayMode: 'numeric',
        numericValue: 319,
        numericUnit: 'element',
        displayValue: '319 elements',
        details: {
          type: 'table',
          headings: [
            { key: 'statistic', itemType: 'text', text: 'Statistic' },
            { key: 'element', itemType: 'code', text: 'Element' },
            { key: 'value', itemType: 'numeric', text: 'Value' }
          ],
          items: [
            { statistic: 'Total DOM Elements', element: '', value: '319' },
            {
              statistic: 'Maximum DOM Depth',
              element: {
                type: 'code',
                value: '<a class="fn-backref" href="#id1">'
              },
              value: '12'
            },
            {
              statistic: 'Maximum Child Elements',
              element: { type: 'code', value: '<pre>' },
              value: '31'
            }
          ]
        }
      },
      'external-anchors-use-rel-noopener': {
        id: 'external-anchors-use-rel-noopener',
        title: 'Links to cross-origin destinations are safe',
        description:
          'Add `rel="noopener"` or `rel="noreferrer"` to any external links to improve performance and prevent security vulnerabilities. [Learn more](https://web.dev/external-anchors-use-rel-noopener/).',
        score: 1,
        scoreDisplayMode: 'binary',
        warnings: [],
        details: { type: 'table', headings: [], items: [] }
      },
      'geolocation-on-start': {
        id: 'geolocation-on-start',
        title: 'Avoids requesting the geolocation permission on page load',
        description:
          'Users are mistrustful of or confused by sites that request their location without context. Consider tying the request to a user action instead. [Learn more](https://web.dev/geolocation-on-start/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'no-document-write': {
        id: 'no-document-write',
        title: 'Avoids `document.write()`',
        description:
          'For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds. [Learn more](https://web.dev/no-document-write/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'no-vulnerable-libraries': {
        id: 'no-vulnerable-libraries',
        title:
          'Includes front-end JavaScript libraries with known security vulnerabilities',
        description:
          'Some third-party scripts may contain known security vulnerabilities that are easily identified and exploited by attackers. [Learn more](https://web.dev/no-vulnerable-libraries/).',
        score: 0,
        scoreDisplayMode: 'binary',
        displayValue: '3 vulnerabilities detected',
        details: {
          type: 'table',
          headings: [
            { key: 'detectedLib', itemType: 'link', text: 'Library Version' },
            { key: 'vulnCount', itemType: 'text', text: 'Vulnerability Count' },
            {
              key: 'highestSeverity',
              itemType: 'text',
              text: 'Highest Severity'
            }
          ],
          items: [
            {
              highestSeverity: 'Medium',
              vulnCount: 3,
              detectedLib: {
                text: 'jQuery@3.1.0',
                url:
                  'https://snyk.io/vuln/npm:jquery?lh=3.1.0&utm_source=lighthouse&utm_medium=ref&utm_campaign=audit',
                type: 'link'
              }
            }
          ],
          summary: {}
        }
      },
      'js-libraries': {
        id: 'js-libraries',
        title: 'Detected JavaScript libraries',
        description:
          'All front-end JavaScript libraries detected on the page. [Learn more](https://web.dev/js-libraries/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: {
          type: 'table',
          headings: [
            { key: 'name', itemType: 'text', text: 'Name' },
            { key: 'version', itemType: 'text', text: 'Version' }
          ],
          items: [{ name: 'jQuery', version: '3.1.0', npm: 'jquery' }],
          summary: {},
          debugData: {
            type: 'debugdata',
            stacks: [{ id: 'jquery', version: '3.1.0' }, { id: 'jquery-fast' }]
          }
        }
      },
      'notification-on-start': {
        id: 'notification-on-start',
        title: 'Avoids requesting the notification permission on page load',
        description:
          'Users are mistrustful of or confused by sites that request to send notifications without context. Consider tying the request to user gestures instead. [Learn more](https://web.dev/notification-on-start/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'password-inputs-can-be-pasted-into': {
        id: 'password-inputs-can-be-pasted-into',
        title: 'Allows users to paste into password fields',
        description:
          'Preventing password pasting undermines good security policy. [Learn more](https://web.dev/password-inputs-can-be-pasted-into/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'uses-http2': {
        id: 'uses-http2',
        title: 'Uses HTTP/2 for its own resources',
        description:
          'HTTP/2 offers many benefits over HTTP/1.1, including binary headers, multiplexing, and server push. [Learn more](https://web.dev/uses-http2/).',
        score: 1,
        scoreDisplayMode: 'binary',
        displayValue: '',
        details: { type: 'table', headings: [], items: [] }
      },
      'uses-passive-event-listeners': {
        id: 'uses-passive-event-listeners',
        title: 'Uses passive listeners to improve scrolling performance',
        description:
          "Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. [Learn more](https://web.dev/uses-passive-event-listeners/).",
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'meta-description': {
        id: 'meta-description',
        title: 'Document does not have a meta description',
        description:
          'Meta descriptions may be included in search results to concisely summarize page content. [Learn more](https://web.dev/meta-description/).',
        score: 0,
        scoreDisplayMode: 'binary'
      },
      'http-status-code': {
        id: 'http-status-code',
        title: 'Page has successful HTTP status code',
        description:
          'Pages with unsuccessful HTTP status codes may not be indexed properly. [Learn more](https://web.dev/http-status-code/).',
        score: 1,
        scoreDisplayMode: 'binary'
      },
      'font-size': {
        id: 'font-size',
        title: 'Document uses legible font sizes',
        description:
          'Font sizes less than 12px are too small to be legible and require mobile visitors to “pinch to zoom” in order to read. Strive to have >60% of page text ≥12px. [Learn more](https://web.dev/font-size/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'link-text': {
        id: 'link-text',
        title: 'Links have descriptive text',
        description:
          'Descriptive link text helps search engines understand your content. [Learn more](https://web.dev/link-text/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [], summary: {} }
      },
      'crawlable-anchors': {
        id: 'crawlable-anchors',
        title: 'Links are crawlable',
        description:
          'Search engines may use `href` attributes on links to crawl websites. Ensure that the `href` attribute of anchor elements links to an appropriate destination, so more pages of the site can be discovered. [Learn More](https://support.google.com/webmasters/answer/9112205)',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'is-crawlable': {
        id: 'is-crawlable',
        title: 'Page isn’t blocked from indexing',
        description:
          "Search engines are unable to include your pages in search results if they don't have permission to crawl them. [Learn more](https://web.dev/is-crawable/).",
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      'robots-txt': {
        id: 'robots-txt',
        title: 'robots.txt is valid',
        description:
          'If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. [Learn more](https://web.dev/robots-txt/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [], summary: {} }
      },
      'tap-targets': {
        id: 'tap-targets',
        title: 'Tap targets are sized appropriately',
        description:
          'Interactive elements like buttons and links should be large enough (48x48px), and have enough space around them, to be easy enough to tap without overlapping onto other elements. [Learn more](https://web.dev/tap-targets/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      hreflang: {
        id: 'hreflang',
        title: 'Document has a valid `hreflang`',
        description:
          'hreflang links tell search engines what version of a page they should list in search results for a given language or region. [Learn more](https://web.dev/hreflang/).',
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      plugins: {
        id: 'plugins',
        title: 'Document avoids plugins',
        description:
          "Search engines can't index plugin content, and many devices restrict plugins or don't support them. [Learn more](https://web.dev/plugins/).",
        score: 1,
        scoreDisplayMode: 'binary',
        details: { type: 'table', headings: [], items: [] }
      },
      canonical: {
        id: 'canonical',
        title: 'Document has a valid `rel=canonical`',
        description:
          'Canonical links suggest which URL to show in search results. [Learn more](https://web.dev/canonical/).',
        score: null,
        scoreDisplayMode: 'notApplicable'
      },
      'structured-data': {
        id: 'structured-data',
        title: 'Structured data is valid',
        description:
          'Run the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) and the [Structured Data Linter](http://linter.structured-data.org/) to validate structured data. [Learn more](https://web.dev/structured-data/).',
        score: null,
        scoreDisplayMode: 'manual'
      }
    },
    configSettings: {
      output: 'json',
      maxWaitForFcp: 30000,
      maxWaitForLoad: 16666.4,
      throttlingMethod: 'simulate',
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        requestLatencyMs: 562.5,
        downloadThroughputKbps: 1474.5600000000002,
        uploadThroughputKbps: 675,
        cpuSlowdownMultiplier: 4
      },
      auditMode: false,
      gatherMode: false,
      disableStorageReset: true,
      emulatedFormFactor: 'desktop',
      internalDisableDeviceScreenEmulation: false,
      channel: 'node',
      budgets: null,
      locale: 'en-US',
      blockedUrlPatterns: null,
      additionalTraceCategories: null,
      extraHeaders: null,
      precomputedLanternData: null,
      onlyAudits: null,
      onlyCategories: ['performance', 'best-practices', 'accessibility', 'seo'],
      skipAudits: null
    },
    categories: {
      performance: {
        title: 'Performance',
        auditRefs: [
          { id: 'first-contentful-paint', weight: 15, group: 'metrics' },
          { id: 'speed-index', weight: 15, group: 'metrics' },
          { id: 'largest-contentful-paint', weight: 25, group: 'metrics' },
          { id: 'interactive', weight: 15, group: 'metrics' },
          { id: 'total-blocking-time', weight: 25, group: 'metrics' },
          { id: 'cumulative-layout-shift', weight: 5, group: 'metrics' },
          { id: 'first-cpu-idle', weight: 0 },
          { id: 'max-potential-fid', weight: 0 },
          { id: 'first-meaningful-paint', weight: 0 },
          { id: 'estimated-input-latency', weight: 0 },
          {
            id: 'render-blocking-resources',
            weight: 0,
            group: 'load-opportunities'
          },
          {
            id: 'uses-responsive-images',
            weight: 0,
            group: 'load-opportunities'
          },
          { id: 'offscreen-images', weight: 0, group: 'load-opportunities' },
          { id: 'unminified-css', weight: 0, group: 'load-opportunities' },
          {
            id: 'unminified-javascript',
            weight: 0,
            group: 'load-opportunities'
          },
          { id: 'unused-css-rules', weight: 0, group: 'load-opportunities' },
          { id: 'unused-javascript', weight: 0, group: 'load-opportunities' },
          {
            id: 'uses-optimized-images',
            weight: 0,
            group: 'load-opportunities'
          },
          { id: 'uses-webp-images', weight: 0, group: 'load-opportunities' },
          {
            id: 'uses-text-compression',
            weight: 0,
            group: 'load-opportunities'
          },
          { id: 'uses-rel-preconnect', weight: 0, group: 'load-opportunities' },
          {
            id: 'server-response-time',
            weight: 0,
            group: 'load-opportunities'
          },
          { id: 'redirects', weight: 0, group: 'load-opportunities' },
          { id: 'uses-rel-preload', weight: 0, group: 'load-opportunities' },
          {
            id: 'efficient-animated-content',
            weight: 0,
            group: 'load-opportunities'
          },
          { id: 'total-byte-weight', weight: 0, group: 'diagnostics' },
          { id: 'uses-long-cache-ttl', weight: 0, group: 'diagnostics' },
          { id: 'dom-size', weight: 0, group: 'diagnostics' },
          { id: 'critical-request-chains', weight: 0, group: 'diagnostics' },
          { id: 'user-timings', weight: 0, group: 'diagnostics' },
          { id: 'bootup-time', weight: 0, group: 'diagnostics' },
          { id: 'mainthread-work-breakdown', weight: 0, group: 'diagnostics' },
          { id: 'font-display', weight: 0, group: 'diagnostics' },
          { id: 'performance-budget', weight: 0, group: 'budgets' },
          { id: 'timing-budget', weight: 0, group: 'budgets' },
          { id: 'resource-summary', weight: 0, group: 'diagnostics' },
          { id: 'third-party-summary', weight: 0, group: 'diagnostics' },
          {
            id: 'largest-contentful-paint-element',
            weight: 0,
            group: 'diagnostics'
          },
          { id: 'layout-shift-elements', weight: 0, group: 'diagnostics' },
          { id: 'uses-http2', weight: 0, group: 'diagnostics' },
          {
            id: 'uses-passive-event-listeners',
            weight: 0,
            group: 'diagnostics'
          },
          { id: 'no-document-write', weight: 0, group: 'diagnostics' },
          { id: 'long-tasks', weight: 0, group: 'diagnostics' },
          { id: 'network-requests', weight: 0 },
          { id: 'network-rtt', weight: 0 },
          { id: 'network-server-latency', weight: 0 },
          { id: 'main-thread-tasks', weight: 0 },
          { id: 'diagnostics', weight: 0 },
          { id: 'metrics', weight: 0 },
          { id: 'screenshot-thumbnails', weight: 0 },
          { id: 'final-screenshot', weight: 0 }
        ],
        id: 'performance',
        score: 0.93
      },
      accessibility: {
        title: 'Accessibility',
        description:
          'These checks highlight opportunities to [improve the accessibility of your web app](https://developers.google.com/web/fundamentals/accessibility). Only a subset of accessibility issues can be automatically detected so manual testing is also encouraged.',
        manualDescription:
          'These items address areas which an automated testing tool cannot cover. Learn more in our guide on [conducting an accessibility review](https://developers.google.com/web/fundamentals/accessibility/how-to-review).',
        auditRefs: [
          { id: 'accesskeys', weight: 3, group: 'a11y-navigation' },
          { id: 'aria-allowed-attr', weight: 10, group: 'a11y-aria' },
          { id: 'aria-hidden-body', weight: 10, group: 'a11y-aria' },
          { id: 'aria-hidden-focus', weight: 0, group: 'a11y-aria' },
          { id: 'aria-input-field-name', weight: 0, group: 'a11y-aria' },
          { id: 'aria-required-attr', weight: 10, group: 'a11y-aria' },
          { id: 'aria-required-children', weight: 10, group: 'a11y-aria' },
          { id: 'aria-required-parent', weight: 10, group: 'a11y-aria' },
          { id: 'aria-roles', weight: 10, group: 'a11y-aria' },
          { id: 'aria-toggle-field-name', weight: 0, group: 'a11y-aria' },
          { id: 'aria-valid-attr-value', weight: 10, group: 'a11y-aria' },
          { id: 'aria-valid-attr', weight: 10, group: 'a11y-aria' },
          { id: 'button-name', weight: 0, group: 'a11y-names-labels' },
          { id: 'bypass', weight: 3, group: 'a11y-navigation' },
          { id: 'color-contrast', weight: 3, group: 'a11y-color-contrast' },
          { id: 'definition-list', weight: 0, group: 'a11y-tables-lists' },
          { id: 'dlitem', weight: 0, group: 'a11y-tables-lists' },
          { id: 'document-title', weight: 3, group: 'a11y-names-labels' },
          { id: 'duplicate-id-active', weight: 3, group: 'a11y-navigation' },
          { id: 'duplicate-id-aria', weight: 0, group: 'a11y-aria' },
          {
            id: 'form-field-multiple-labels',
            weight: 0,
            group: 'a11y-names-labels'
          },
          { id: 'frame-title', weight: 0, group: 'a11y-names-labels' },
          { id: 'heading-order', weight: 2, group: 'a11y-navigation' },
          { id: 'html-has-lang', weight: 3, group: 'a11y-language' },
          { id: 'html-lang-valid', weight: 0, group: 'a11y-language' },
          { id: 'image-alt', weight: 0, group: 'a11y-names-labels' },
          { id: 'input-image-alt', weight: 0, group: 'a11y-names-labels' },
          { id: 'label', weight: 10, group: 'a11y-names-labels' },
          { id: 'layout-table', weight: 0, group: 'a11y-tables-lists' },
          { id: 'link-name', weight: 3, group: 'a11y-names-labels' },
          { id: 'list', weight: 3, group: 'a11y-tables-lists' },
          { id: 'listitem', weight: 3, group: 'a11y-tables-lists' },
          { id: 'meta-refresh', weight: 0, group: 'a11y-best-practices' },
          { id: 'meta-viewport', weight: 0, group: 'a11y-best-practices' },
          { id: 'object-alt', weight: 0, group: 'a11y-names-labels' },
          { id: 'tabindex', weight: 0, group: 'a11y-navigation' },
          { id: 'td-headers-attr', weight: 3, group: 'a11y-tables-lists' },
          { id: 'th-has-data-cells', weight: 3, group: 'a11y-tables-lists' },
          { id: 'valid-lang', weight: 0, group: 'a11y-language' },
          { id: 'video-caption', weight: 0, group: 'a11y-audio-video' },
          { id: 'video-description', weight: 0, group: 'a11y-audio-video' },
          { id: 'logical-tab-order', weight: 0 },
          { id: 'focusable-controls', weight: 0 },
          { id: 'interactive-element-affordance', weight: 0 },
          { id: 'managed-focus', weight: 0 },
          { id: 'focus-traps', weight: 0 },
          { id: 'custom-controls-labels', weight: 0 },
          { id: 'custom-controls-roles', weight: 0 },
          { id: 'visual-order-follows-dom', weight: 0 },
          { id: 'offscreen-content-hidden', weight: 0 },
          { id: 'use-landmarks', weight: 0 }
        ],
        id: 'accessibility',
        score: 0.87
      },
      'best-practices': {
        title: 'Best Practices',
        auditRefs: [
          {
            id: 'is-on-https',
            weight: 1,
            group: 'best-practices-trust-safety'
          },
          {
            id: 'external-anchors-use-rel-noopener',
            weight: 1,
            group: 'best-practices-trust-safety'
          },
          {
            id: 'geolocation-on-start',
            weight: 1,
            group: 'best-practices-trust-safety'
          },
          {
            id: 'notification-on-start',
            weight: 1,
            group: 'best-practices-trust-safety'
          },
          {
            id: 'no-vulnerable-libraries',
            weight: 1,
            group: 'best-practices-trust-safety'
          },
          {
            id: 'password-inputs-can-be-pasted-into',
            weight: 1,
            group: 'best-practices-ux'
          },
          { id: 'image-aspect-ratio', weight: 1, group: 'best-practices-ux' },
          {
            id: 'image-size-responsive',
            weight: 1,
            group: 'best-practices-ux'
          },
          { id: 'doctype', weight: 1, group: 'best-practices-browser-compat' },
          { id: 'charset', weight: 1, group: 'best-practices-browser-compat' },
          {
            id: 'appcache-manifest',
            weight: 1,
            group: 'best-practices-general'
          },
          { id: 'js-libraries', weight: 0, group: 'best-practices-general' },
          { id: 'deprecations', weight: 1, group: 'best-practices-general' },
          {
            id: 'errors-in-console',
            weight: 1,
            group: 'best-practices-general'
          }
        ],
        id: 'best-practices',
        score: 0.85
      },
      seo: {
        title: 'SEO',
        description:
          'These checks ensure that your page is optimized for search engine results ranking. There are additional factors Lighthouse does not check that may affect your search ranking. [Learn more](https://support.google.com/webmasters/answer/35769).',
        manualDescription:
          'Run these additional validators on your site to check additional SEO best practices.',
        auditRefs: [
          { id: 'viewport', weight: 1, group: 'seo-mobile' },
          { id: 'document-title', weight: 1, group: 'seo-content' },
          { id: 'meta-description', weight: 1, group: 'seo-content' },
          { id: 'http-status-code', weight: 1, group: 'seo-crawl' },
          { id: 'link-text', weight: 1, group: 'seo-content' },
          { id: 'crawlable-anchors', weight: 1, group: 'seo-crawl' },
          { id: 'is-crawlable', weight: 1, group: 'seo-crawl' },
          { id: 'robots-txt', weight: 1, group: 'seo-crawl' },
          { id: 'image-alt', weight: 0, group: 'seo-content' },
          { id: 'hreflang', weight: 1, group: 'seo-content' },
          { id: 'canonical', weight: 0, group: 'seo-content' },
          { id: 'font-size', weight: 0, group: 'seo-mobile' },
          { id: 'plugins', weight: 1, group: 'seo-content' },
          { id: 'tap-targets', weight: 0, group: 'seo-mobile' },
          { id: 'structured-data', weight: 0 }
        ],
        id: 'seo',
        score: 0.8
      }
    },
    categoryGroups: {
      metrics: { title: 'Metrics' },
      'load-opportunities': {
        title: 'Opportunities',
        description:
          "These suggestions can help your page load faster. They don't [directly affect](https://web.dev/performance-scoring/) the Performance score."
      },
      budgets: {
        title: 'Budgets',
        description:
          'Performance budgets set standards for the performance of your site.'
      },
      diagnostics: {
        title: 'Diagnostics',
        description:
          "More information about the performance of your application. These numbers don't [directly affect](https://web.dev/performance-scoring/) the Performance score."
      },
      'pwa-fast-reliable': { title: 'Fast and reliable' },
      'pwa-installable': { title: 'Installable' },
      'pwa-optimized': { title: 'PWA Optimized' },
      'a11y-best-practices': {
        title: 'Best practices',
        description:
          'These items highlight common accessibility best practices.'
      },
      'a11y-color-contrast': {
        title: 'Contrast',
        description:
          'These are opportunities to improve the legibility of your content.'
      },
      'a11y-names-labels': {
        title: 'Names and labels',
        description:
          'These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.'
      },
      'a11y-navigation': {
        title: 'Navigation',
        description:
          'These are opportunities to improve keyboard navigation in your application.'
      },
      'a11y-aria': {
        title: 'ARIA',
        description:
          'These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader.'
      },
      'a11y-language': {
        title: 'Internationalization and localization',
        description:
          'These are opportunities to improve the interpretation of your content by users in different locales.'
      },
      'a11y-audio-video': {
        title: 'Audio and video',
        description:
          'These are opportunities to provide alternative content for audio and video. This may improve the experience for users with hearing or vision impairments.'
      },
      'a11y-tables-lists': {
        title: 'Tables and lists',
        description:
          'These are opportunities to to improve the experience of reading tabular or list data using assistive technology, like a screen reader.'
      },
      'seo-mobile': {
        title: 'Mobile Friendly',
        description:
          'Make sure your pages are mobile friendly so users don’t have to pinch or zoom in order to read the content pages. [Learn more](https://developers.google.com/search/mobile-sites/).'
      },
      'seo-content': {
        title: 'Content Best Practices',
        description:
          'Format your HTML in a way that enables crawlers to better understand your app’s content.'
      },
      'seo-crawl': {
        title: 'Crawling and Indexing',
        description:
          'To appear in search results, crawlers need access to your app.'
      },
      'best-practices-trust-safety': { title: 'Trust and Safety' },
      'best-practices-ux': { title: 'User Experience' },
      'best-practices-browser-compat': { title: 'Browser Compatibility' },
      'best-practices-general': { title: 'General' }
    },
    timing: {
      entries: [
        {
          startTime: 353.97,
          name: 'lh:init:config',
          duration: 303.73,
          entryType: 'measure'
        },
        {
          startTime: 363.24,
          name: 'lh:config:requireGatherers',
          duration: 38.46,
          entryType: 'measure'
        },
        {
          startTime: 402.13,
          name: 'lh:config:requireAudits',
          duration: 222.59,
          entryType: 'measure'
        },
        {
          startTime: 658.37,
          name: 'lh:runner:run',
          duration: 4084.38,
          entryType: 'measure'
        },
        {
          startTime: 660.19,
          name: 'lh:init:connect',
          duration: 36.62,
          entryType: 'measure'
        },
        {
          startTime: 696.91,
          name: 'lh:gather:loadBlank',
          duration: 21.92,
          entryType: 'measure'
        },
        {
          startTime: 719.06,
          name: 'lh:gather:getVersion',
          duration: 0.77,
          entryType: 'measure'
        },
        {
          startTime: 719.96,
          name: 'lh:gather:getBenchmarkIndex',
          duration: 507.8,
          entryType: 'measure'
        },
        {
          startTime: 1227.94,
          name: 'lh:gather:setupDriver',
          duration: 12.78,
          entryType: 'measure'
        },
        {
          startTime: 1241.06,
          name: 'lh:gather:runPass-defaultPass',
          duration: 2549.56,
          entryType: 'measure'
        },
        {
          startTime: 1241.08,
          name: 'lh:gather:loadBlank',
          duration: 13.79,
          entryType: 'measure'
        },
        {
          startTime: 1255.03,
          name: 'lh:gather:setupPassNetwork',
          duration: 2.24,
          entryType: 'measure'
        },
        {
          startTime: 1257.42,
          name: 'lh:gather:beforePass',
          duration: 19.85,
          entryType: 'measure'
        },
        {
          startTime: 1257.47,
          name: 'lh:gather:beforePass:CSSUsage',
          duration: 0.07,
          entryType: 'measure'
        },
        {
          startTime: 1257.57,
          name: 'lh:gather:beforePass:JsUsage',
          duration: 13.53,
          entryType: 'measure'
        },
        {
          startTime: 1271.17,
          name: 'lh:gather:beforePass:ViewportDimensions',
          duration: 0.03,
          entryType: 'measure'
        },
        {
          startTime: 1271.22,
          name: 'lh:gather:beforePass:RuntimeExceptions',
          duration: 0.14,
          entryType: 'measure'
        },
        {
          startTime: 1271.38,
          name: 'lh:gather:beforePass:ConsoleMessages',
          duration: 3.74,
          entryType: 'measure'
        },
        {
          startTime: 1275.18,
          name: 'lh:gather:beforePass:AnchorElements',
          duration: 0.04,
          entryType: 'measure'
        },
        {
          startTime: 1275.24,
          name: 'lh:gather:beforePass:ImageElements',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.27,
          name: 'lh:gather:beforePass:LinkElements',
          duration: 0.03,
          entryType: 'measure'
        },
        {
          startTime: 1275.31,
          name: 'lh:gather:beforePass:MetaElements',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.34,
          name: 'lh:gather:beforePass:ScriptElements',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.37,
          name: 'lh:gather:beforePass:MainDocumentContent',
          duration: 0.01,
          entryType: 'measure'
        },
        {
          startTime: 1275.39,
          name: 'lh:gather:beforePass:AppCacheManifest',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.42,
          name: 'lh:gather:beforePass:Doctype',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.44,
          name: 'lh:gather:beforePass:DOMStats',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.47,
          name: 'lh:gather:beforePass:OptimizedImages',
          duration: 0.01,
          entryType: 'measure'
        },
        {
          startTime: 1275.48,
          name: 'lh:gather:beforePass:PasswordInputsWithPreventedPaste',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1275.51,
          name: 'lh:gather:beforePass:ResponseCompression',
          duration: 0.01,
          entryType: 'measure'
        },
        {
          startTime: 1275.53,
          name: 'lh:gather:beforePass:TagsBlockingFirstPaint',
          duration: 1.31,
          entryType: 'measure'
        },
        {
          startTime: 1276.87,
          name: 'lh:gather:beforePass:FontSize',
          duration: 0.03,
          entryType: 'measure'
        },
        {
          startTime: 1276.92,
          name: 'lh:gather:beforePass:EmbeddedContent',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1276.95,
          name: 'lh:gather:beforePass:RobotsTxt',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1276.97,
          name: 'lh:gather:beforePass:TapTargets',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 1277,
          name: 'lh:gather:beforePass:Accessibility',
          duration: 0.01,
          entryType: 'measure'
        },
        {
          startTime: 1277.02,
          name: 'lh:gather:beforePass:TraceElements',
          duration: 0.01,
          entryType: 'measure'
        },
        {
          startTime: 1277.05,
          name: 'lh:gather:beforePass:SourceMaps',
          duration: 0.21,
          entryType: 'measure'
        },
        {
          startTime: 1277.36,
          name: 'lh:gather:beginRecording',
          duration: 7.4,
          entryType: 'measure'
        },
        {
          startTime: 1277.6,
          name: 'lh:gather:getVersion',
          duration: 0.91,
          entryType: 'measure'
        },
        {
          startTime: 1285,
          name: 'lh:gather:loadPage-defaultPass',
          duration: 1662.18,
          entryType: 'measure'
        },
        {
          startTime: 2947.33,
          name: 'lh:gather:pass',
          duration: 0.33,
          entryType: 'measure'
        },
        {
          startTime: 2947.74,
          name: 'lh:gather:getTrace',
          duration: 66.24,
          entryType: 'measure'
        },
        {
          startTime: 3013.99,
          name: 'lh:gather:getDevtoolsLog',
          duration: 0.96,
          entryType: 'measure'
        },
        {
          startTime: 3016.75,
          name: 'lh:gather:afterPass',
          duration: 773.69,
          entryType: 'measure'
        },
        {
          startTime: 3021.91,
          name: 'lh:gather:afterPass:CSSUsage',
          duration: 22.87,
          entryType: 'measure'
        },
        {
          startTime: 3044.82,
          name: 'lh:gather:afterPass:JsUsage',
          duration: 12.46,
          entryType: 'measure'
        },
        {
          startTime: 3057.3,
          name: 'lh:gather:afterPass:ViewportDimensions',
          duration: 2.85,
          entryType: 'measure'
        },
        {
          startTime: 3060.19,
          name: 'lh:gather:afterPass:RuntimeExceptions',
          duration: 1.31,
          entryType: 'measure'
        },
        {
          startTime: 3061.52,
          name: 'lh:gather:afterPass:ConsoleMessages',
          duration: 2.12,
          entryType: 'measure'
        },
        {
          startTime: 3063.67,
          name: 'lh:gather:afterPass:AnchorElements',
          duration: 50.04,
          entryType: 'measure'
        },
        {
          startTime: 3113.74,
          name: 'lh:gather:afterPass:ImageElements',
          duration: 10.47,
          entryType: 'measure'
        },
        {
          startTime: 3124.26,
          name: 'lh:gather:afterPass:LinkElements',
          duration: 4.35,
          entryType: 'measure'
        },
        {
          startTime: 3128.63,
          name: 'lh:gather:afterPass:MetaElements',
          duration: 3.66,
          entryType: 'measure'
        },
        {
          startTime: 3132.31,
          name: 'lh:gather:afterPass:ScriptElements',
          duration: 10.06,
          entryType: 'measure'
        },
        {
          startTime: 3142.4,
          name: 'lh:gather:afterPass:MainDocumentContent',
          duration: 3.7,
          entryType: 'measure'
        },
        {
          startTime: 3146.13,
          name: 'lh:gather:afterPass:AppCacheManifest',
          duration: 4.15,
          entryType: 'measure'
        },
        {
          startTime: 3150.31,
          name: 'lh:gather:afterPass:Doctype',
          duration: 3.07,
          entryType: 'measure'
        },
        {
          startTime: 3153.39,
          name: 'lh:gather:afterPass:DOMStats',
          duration: 8.31,
          entryType: 'measure'
        },
        {
          startTime: 3161.73,
          name: 'lh:gather:afterPass:OptimizedImages',
          duration: 2.33,
          entryType: 'measure'
        },
        {
          startTime: 3164.08,
          name: 'lh:gather:afterPass:PasswordInputsWithPreventedPaste',
          duration: 3.5,
          entryType: 'measure'
        },
        {
          startTime: 3167.61,
          name: 'lh:gather:afterPass:ResponseCompression',
          duration: 3.76,
          entryType: 'measure'
        },
        {
          startTime: 3171.4,
          name: 'lh:gather:afterPass:TagsBlockingFirstPaint',
          duration: 10.27,
          entryType: 'measure'
        },
        {
          startTime: 3181.7,
          name: 'lh:gather:afterPass:FontSize',
          duration: 32.77,
          entryType: 'measure'
        },
        {
          startTime: 3214.49,
          name: 'lh:gather:afterPass:EmbeddedContent',
          duration: 5.5,
          entryType: 'measure'
        },
        {
          startTime: 3220.02,
          name: 'lh:gather:afterPass:RobotsTxt',
          duration: 83.77,
          entryType: 'measure'
        },
        {
          startTime: 3303.81,
          name: 'lh:gather:afterPass:TapTargets',
          duration: 12.42,
          entryType: 'measure'
        },
        {
          startTime: 3316.26,
          name: 'lh:gather:afterPass:Accessibility',
          duration: 462.38,
          entryType: 'measure'
        },
        {
          startTime: 3778.66,
          name: 'lh:gather:afterPass:TraceElements',
          duration: 9.94,
          entryType: 'measure'
        },
        {
          startTime: 3788.61,
          name: 'lh:gather:afterPass:SourceMaps',
          duration: 1.81,
          entryType: 'measure'
        },
        {
          startTime: 3892.95,
          name: 'lh:gather:disconnect',
          duration: 2.39,
          entryType: 'measure'
        },
        {
          startTime: 3895.63,
          name: 'lh:runner:auditing',
          duration: 844.81,
          entryType: 'measure'
        },
        {
          startTime: 3899.34,
          name: 'lh:audit:is-on-https',
          duration: 1.21,
          entryType: 'measure'
        },
        {
          startTime: 3899.63,
          name: 'lh:computed:NetworkRecords',
          duration: 0.47,
          entryType: 'measure'
        },
        {
          startTime: 3900.98,
          name: 'lh:audit:viewport',
          duration: 0.39,
          entryType: 'measure'
        },
        {
          startTime: 3901.12,
          name: 'lh:computed:ViewportMeta',
          duration: 0.12,
          entryType: 'measure'
        },
        {
          startTime: 3901.61,
          name: 'lh:audit:first-contentful-paint',
          duration: 15.76,
          entryType: 'measure'
        },
        {
          startTime: 3901.81,
          name: 'lh:computed:FirstContentfulPaint',
          duration: 15.25,
          entryType: 'measure'
        },
        {
          startTime: 3901.92,
          name: 'lh:computed:TraceOfTab',
          duration: 4.69,
          entryType: 'measure'
        },
        {
          startTime: 3906.8,
          name: 'lh:computed:LanternFirstContentfulPaint',
          duration: 10.25,
          entryType: 'measure'
        },
        {
          startTime: 3906.99,
          name: 'lh:computed:PageDependencyGraph',
          duration: 3.22,
          entryType: 'measure'
        },
        {
          startTime: 3910.26,
          name: 'lh:computed:LoadSimulator',
          duration: 1.66,
          entryType: 'measure'
        },
        {
          startTime: 3910.36,
          name: 'lh:computed:NetworkAnalysis',
          duration: 1.33,
          entryType: 'measure'
        },
        {
          startTime: 3917.69,
          name: 'lh:audit:largest-contentful-paint',
          duration: 2.4,
          entryType: 'measure'
        },
        {
          startTime: 3917.88,
          name: 'lh:computed:LargestContentfulPaint',
          duration: 1.93,
          entryType: 'measure'
        },
        {
          startTime: 3917.94,
          name: 'lh:computed:LanternLargestContentfulPaint',
          duration: 1.86,
          entryType: 'measure'
        },
        {
          startTime: 3920.37,
          name: 'lh:audit:first-meaningful-paint',
          duration: 2.47,
          entryType: 'measure'
        },
        {
          startTime: 3920.56,
          name: 'lh:computed:FirstMeaningfulPaint',
          duration: 2,
          entryType: 'measure'
        },
        {
          startTime: 3920.62,
          name: 'lh:computed:LanternFirstMeaningfulPaint',
          duration: 1.93,
          entryType: 'measure'
        },
        {
          startTime: 3923.08,
          name: 'lh:audit:speed-index',
          duration: 372.77,
          entryType: 'measure'
        },
        {
          startTime: 3923.29,
          name: 'lh:computed:SpeedIndex',
          duration: 372.31,
          entryType: 'measure'
        },
        {
          startTime: 3923.34,
          name: 'lh:computed:LanternSpeedIndex',
          duration: 372.24,
          entryType: 'measure'
        },
        {
          startTime: 3923.39,
          name: 'lh:computed:Speedline',
          duration: 370.4,
          entryType: 'measure'
        },
        {
          startTime: 4295.89,
          name: 'lh:audit:screenshot-thumbnails',
          duration: 211.23,
          entryType: 'measure'
        },
        {
          startTime: 4507.16,
          name: 'lh:audit:final-screenshot',
          duration: 0.6,
          entryType: 'measure'
        },
        {
          startTime: 4507.35,
          name: 'lh:computed:Screenshots',
          duration: 0.35,
          entryType: 'measure'
        },
        {
          startTime: 4508.23,
          name: 'lh:audit:estimated-input-latency',
          duration: 2.61,
          entryType: 'measure'
        },
        {
          startTime: 4508.44,
          name: 'lh:computed:EstimatedInputLatency',
          duration: 2.14,
          entryType: 'measure'
        },
        {
          startTime: 4508.54,
          name: 'lh:computed:LanternEstimatedInputLatency',
          duration: 2.02,
          entryType: 'measure'
        },
        {
          startTime: 4511.09,
          name: 'lh:audit:total-blocking-time',
          duration: 4.06,
          entryType: 'measure'
        },
        {
          startTime: 4511.31,
          name: 'lh:computed:TotalBlockingTime',
          duration: 3.53,
          entryType: 'measure'
        },
        {
          startTime: 4511.36,
          name: 'lh:computed:LanternTotalBlockingTime',
          duration: 3.46,
          entryType: 'measure'
        },
        {
          startTime: 4511.45,
          name: 'lh:computed:LanternInteractive',
          duration: 1.54,
          entryType: 'measure'
        },
        {
          startTime: 4515.42,
          name: 'lh:audit:max-potential-fid',
          duration: 1.84,
          entryType: 'measure'
        },
        {
          startTime: 4515.6,
          name: 'lh:computed:MaxPotentialFID',
          duration: 1.4,
          entryType: 'measure'
        },
        {
          startTime: 4515.66,
          name: 'lh:computed:LanternMaxPotentialFID',
          duration: 1.33,
          entryType: 'measure'
        },
        {
          startTime: 4517.47,
          name: 'lh:audit:cumulative-layout-shift',
          duration: 0.93,
          entryType: 'measure'
        },
        {
          startTime: 4517.66,
          name: 'lh:computed:CumulativeLayoutShift',
          duration: 0.35,
          entryType: 'measure'
        },
        {
          startTime: 4518.69,
          name: 'lh:audit:errors-in-console',
          duration: 0.69,
          entryType: 'measure'
        },
        {
          startTime: 4519.61,
          name: 'lh:audit:server-response-time',
          duration: 0.68,
          entryType: 'measure'
        },
        {
          startTime: 4519.8,
          name: 'lh:computed:MainResource',
          duration: 0.2,
          entryType: 'measure'
        },
        {
          startTime: 4520.48,
          name: 'lh:audit:first-cpu-idle',
          duration: 2.22,
          entryType: 'measure'
        },
        {
          startTime: 4520.67,
          name: 'lh:computed:FirstCPUIdle',
          duration: 1.83,
          entryType: 'measure'
        },
        {
          startTime: 4520.72,
          name: 'lh:computed:LanternFirstCPUIdle',
          duration: 1.76,
          entryType: 'measure'
        },
        {
          startTime: 4522.91,
          name: 'lh:audit:interactive',
          duration: 0.47,
          entryType: 'measure'
        },
        {
          startTime: 4523.1,
          name: 'lh:computed:Interactive',
          duration: 0.08,
          entryType: 'measure'
        },
        {
          startTime: 4523.56,
          name: 'lh:audit:user-timings',
          duration: 1.05,
          entryType: 'measure'
        },
        {
          startTime: 4523.73,
          name: 'lh:computed:UserTimings',
          duration: 0.55,
          entryType: 'measure'
        },
        {
          startTime: 4524.8,
          name: 'lh:audit:critical-request-chains',
          duration: 1.27,
          entryType: 'measure'
        },
        {
          startTime: 4524.96,
          name: 'lh:computed:CriticalRequestChains',
          duration: 0.44,
          entryType: 'measure'
        },
        {
          startTime: 4526.3,
          name: 'lh:audit:redirects',
          duration: 0.68,
          entryType: 'measure'
        },
        {
          startTime: 4527.28,
          name: 'lh:audit:image-aspect-ratio',
          duration: 0.38,
          entryType: 'measure'
        },
        {
          startTime: 4527.96,
          name: 'lh:audit:image-size-responsive',
          duration: 0.59,
          entryType: 'measure'
        },
        {
          startTime: 4528.75,
          name: 'lh:audit:deprecations',
          duration: 0.37,
          entryType: 'measure'
        },
        {
          startTime: 4529.32,
          name: 'lh:audit:mainthread-work-breakdown',
          duration: 10.84,
          entryType: 'measure'
        },
        {
          startTime: 4529.57,
          name: 'lh:computed:MainThreadTasks',
          duration: 9.25,
          entryType: 'measure'
        },
        {
          startTime: 4540.59,
          name: 'lh:audit:bootup-time',
          duration: 1.78,
          entryType: 'measure'
        },
        {
          startTime: 4542.67,
          name: 'lh:audit:uses-rel-preload',
          duration: 3.13,
          entryType: 'measure'
        },
        {
          startTime: 4543.15,
          name: 'lh:computed:LoadSimulator',
          duration: 0.09,
          entryType: 'measure'
        },
        {
          startTime: 4546.14,
          name: 'lh:audit:uses-rel-preconnect',
          duration: 1.12,
          entryType: 'measure'
        },
        {
          startTime: 4547.59,
          name: 'lh:audit:font-display',
          duration: 0.96,
          entryType: 'measure'
        },
        {
          startTime: 4548.57,
          name: 'lh:audit:diagnostics',
          duration: 0.47,
          entryType: 'measure'
        },
        {
          startTime: 4549.06,
          name: 'lh:audit:network-requests',
          duration: 0.63,
          entryType: 'measure'
        },
        {
          startTime: 4550.04,
          name: 'lh:audit:network-rtt',
          duration: 0.55,
          entryType: 'measure'
        },
        {
          startTime: 4550.89,
          name: 'lh:audit:network-server-latency',
          duration: 0.46,
          entryType: 'measure'
        },
        {
          startTime: 4551.36,
          name: 'lh:audit:main-thread-tasks',
          duration: 0.26,
          entryType: 'measure'
        },
        {
          startTime: 4551.65,
          name: 'lh:audit:metrics',
          duration: 1.61,
          entryType: 'measure'
        },
        {
          startTime: 4551.83,
          name: 'lh:computed:TimingSummary',
          duration: 1.23,
          entryType: 'measure'
        },
        {
          startTime: 4553.55,
          name: 'lh:audit:performance-budget',
          duration: 1.47,
          entryType: 'measure'
        },
        {
          startTime: 4553.81,
          name: 'lh:computed:ResourceSummary',
          duration: 1,
          entryType: 'measure'
        },
        {
          startTime: 4555.24,
          name: 'lh:audit:timing-budget',
          duration: 0.45,
          entryType: 'measure'
        },
        {
          startTime: 4555.99,
          name: 'lh:audit:resource-summary',
          duration: 0.82,
          entryType: 'measure'
        },
        {
          startTime: 4557.07,
          name: 'lh:audit:third-party-summary',
          duration: 3.37,
          entryType: 'measure'
        },
        {
          startTime: 4560.71,
          name: 'lh:audit:largest-contentful-paint-element',
          duration: 0.39,
          entryType: 'measure'
        },
        {
          startTime: 4561.33,
          name: 'lh:audit:layout-shift-elements',
          duration: 0.32,
          entryType: 'measure'
        },
        {
          startTime: 4561.83,
          name: 'lh:audit:long-tasks',
          duration: 1.51,
          entryType: 'measure'
        },
        {
          startTime: 4563.57,
          name: 'lh:audit:accesskeys',
          duration: 1.22,
          entryType: 'measure'
        },
        {
          startTime: 4565.08,
          name: 'lh:audit:aria-allowed-attr',
          duration: 0.94,
          entryType: 'measure'
        },
        {
          startTime: 4566.3,
          name: 'lh:audit:aria-hidden-body',
          duration: 0.85,
          entryType: 'measure'
        },
        {
          startTime: 4567.4,
          name: 'lh:audit:aria-hidden-focus',
          duration: 0.28,
          entryType: 'measure'
        },
        {
          startTime: 4567.88,
          name: 'lh:audit:aria-input-field-name',
          duration: 0.25,
          entryType: 'measure'
        },
        {
          startTime: 4568.34,
          name: 'lh:audit:aria-required-attr',
          duration: 0.97,
          entryType: 'measure'
        },
        {
          startTime: 4569.68,
          name: 'lh:audit:aria-required-children',
          duration: 0.88,
          entryType: 'measure'
        },
        {
          startTime: 4570.84,
          name: 'lh:audit:aria-required-parent',
          duration: 0.78,
          entryType: 'measure'
        },
        {
          startTime: 4571.86,
          name: 'lh:audit:aria-roles',
          duration: 0.75,
          entryType: 'measure'
        },
        {
          startTime: 4572.83,
          name: 'lh:audit:aria-toggle-field-name',
          duration: 0.36,
          entryType: 'measure'
        },
        {
          startTime: 4573.53,
          name: 'lh:audit:aria-valid-attr-value',
          duration: 2.62,
          entryType: 'measure'
        },
        {
          startTime: 4576.42,
          name: 'lh:audit:aria-valid-attr',
          duration: 1.04,
          entryType: 'measure'
        },
        {
          startTime: 4577.68,
          name: 'lh:audit:button-name',
          duration: 0.35,
          entryType: 'measure'
        },
        {
          startTime: 4578.28,
          name: 'lh:audit:bypass',
          duration: 0.86,
          entryType: 'measure'
        },
        {
          startTime: 4579.43,
          name: 'lh:audit:color-contrast',
          duration: 1.21,
          entryType: 'measure'
        },
        {
          startTime: 4581.1,
          name: 'lh:audit:definition-list',
          duration: 0.59,
          entryType: 'measure'
        },
        {
          startTime: 4582.03,
          name: 'lh:audit:dlitem',
          duration: 3.25,
          entryType: 'measure'
        },
        {
          startTime: 4585.63,
          name: 'lh:audit:document-title',
          duration: 1.28,
          entryType: 'measure'
        },
        {
          startTime: 4587.27,
          name: 'lh:audit:duplicate-id-active',
          duration: 1.01,
          entryType: 'measure'
        },
        {
          startTime: 4588.63,
          name: 'lh:audit:duplicate-id-aria',
          duration: 0.49,
          entryType: 'measure'
        },
        {
          startTime: 4589.38,
          name: 'lh:audit:form-field-multiple-labels',
          duration: 1.05,
          entryType: 'measure'
        },
        {
          startTime: 4590.71,
          name: 'lh:audit:frame-title',
          duration: 0.48,
          entryType: 'measure'
        },
        {
          startTime: 4591.39,
          name: 'lh:audit:heading-order',
          duration: 0.66,
          entryType: 'measure'
        },
        {
          startTime: 4592.22,
          name: 'lh:audit:html-has-lang',
          duration: 0.68,
          entryType: 'measure'
        },
        {
          startTime: 4593.09,
          name: 'lh:audit:html-lang-valid',
          duration: 0.36,
          entryType: 'measure'
        },
        {
          startTime: 4593.6,
          name: 'lh:audit:image-alt',
          duration: 0.35,
          entryType: 'measure'
        },
        {
          startTime: 4594.15,
          name: 'lh:audit:input-image-alt',
          duration: 0.53,
          entryType: 'measure'
        },
        {
          startTime: 4594.87,
          name: 'lh:audit:label',
          duration: 0.56,
          entryType: 'measure'
        },
        {
          startTime: 4595.65,
          name: 'lh:audit:layout-table',
          duration: 0.33,
          entryType: 'measure'
        },
        {
          startTime: 4596.13,
          name: 'lh:audit:link-name',
          duration: 0.51,
          entryType: 'measure'
        },
        {
          startTime: 4596.85,
          name: 'lh:audit:list',
          duration: 0.52,
          entryType: 'measure'
        },
        {
          startTime: 4597.56,
          name: 'lh:audit:listitem',
          duration: 0.51,
          entryType: 'measure'
        },
        {
          startTime: 4598.37,
          name: 'lh:audit:meta-refresh',
          duration: 0.46,
          entryType: 'measure'
        },
        {
          startTime: 4599.23,
          name: 'lh:audit:meta-viewport',
          duration: 0.35,
          entryType: 'measure'
        },
        {
          startTime: 4599.78,
          name: 'lh:audit:object-alt',
          duration: 0.36,
          entryType: 'measure'
        },
        {
          startTime: 4600.31,
          name: 'lh:audit:tabindex',
          duration: 0.39,
          entryType: 'measure'
        },
        {
          startTime: 4600.91,
          name: 'lh:audit:td-headers-attr',
          duration: 0.52,
          entryType: 'measure'
        },
        {
          startTime: 4602.4,
          name: 'lh:audit:th-has-data-cells',
          duration: 0.76,
          entryType: 'measure'
        },
        {
          startTime: 4603.37,
          name: 'lh:audit:valid-lang',
          duration: 0.41,
          entryType: 'measure'
        },
        {
          startTime: 4603.96,
          name: 'lh:audit:video-caption',
          duration: 0.41,
          entryType: 'measure'
        },
        {
          startTime: 4604.56,
          name: 'lh:audit:video-description',
          duration: 0.43,
          entryType: 'measure'
        },
        {
          startTime: 4605.03,
          name: 'lh:audit:custom-controls-labels',
          duration: 0.14,
          entryType: 'measure'
        },
        {
          startTime: 4605.19,
          name: 'lh:audit:custom-controls-roles',
          duration: 0.03,
          entryType: 'measure'
        },
        {
          startTime: 4605.23,
          name: 'lh:audit:focus-traps',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.26,
          name: 'lh:audit:focusable-controls',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.29,
          name: 'lh:audit:interactive-element-affordance',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.32,
          name: 'lh:audit:logical-tab-order',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.35,
          name: 'lh:audit:managed-focus',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.38,
          name: 'lh:audit:offscreen-content-hidden',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.41,
          name: 'lh:audit:use-landmarks',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.44,
          name: 'lh:audit:visual-order-follows-dom',
          duration: 0.02,
          entryType: 'measure'
        },
        {
          startTime: 4605.65,
          name: 'lh:audit:uses-long-cache-ttl',
          duration: 1.68,
          entryType: 'measure'
        },
        {
          startTime: 4607.54,
          name: 'lh:audit:total-byte-weight',
          duration: 0.6,
          entryType: 'measure'
        },
        {
          startTime: 4608.32,
          name: 'lh:audit:offscreen-images',
          duration: 2.29,
          entryType: 'measure'
        },
        {
          startTime: 4610.89,
          name: 'lh:audit:render-blocking-resources',
          duration: 3.77,
          entryType: 'measure'
        },
        {
          startTime: 4611.4,
          name: 'lh:computed:UnusedCSS',
          duration: 0.54,
          entryType: 'measure'
        },
        {
          startTime: 4612,
          name: 'lh:computed:FirstContentfulPaint',
          duration: 1.76,
          entryType: 'measure'
        },
        {
          startTime: 4612.05,
          name: 'lh:computed:LanternFirstContentfulPaint',
          duration: 1.69,
          entryType: 'measure'
        },
        {
          startTime: 4614.87,
          name: 'lh:audit:unminified-css',
          duration: 8.31,
          entryType: 'measure'
        },
        {
          startTime: 4623.39,
          name: 'lh:audit:unminified-javascript',
          duration: 30.35,
          entryType: 'measure'
        },
        {
          startTime: 4653.98,
          name: 'lh:audit:unused-css-rules',
          duration: 1.29,
          entryType: 'measure'
        },
        {
          startTime: 4655.46,
          name: 'lh:audit:unused-javascript',
          duration: 26.62,
          entryType: 'measure'
        },
        {
          startTime: 4655.8,
          name: 'lh:computed:JSBundles',
          duration: 0.17,
          entryType: 'measure'
        },
        {
          startTime: 4656.02,
          name: 'lh:computed:UnusedJavascriptSummary',
          duration: 0.29,
          entryType: 'measure'
        },
        {
          startTime: 4656.36,
          name: 'lh:computed:UnusedJavascriptSummary',
          duration: 9.77,
          entryType: 'measure'
        },
        {
          startTime: 4666.25,
          name: 'lh:computed:UnusedJavascriptSummary',
          duration: 13.6,
          entryType: 'measure'
        },
        {
          startTime: 4680,
          name: 'lh:computed:UnusedJavascriptSummary',
          duration: 0.16,
          entryType: 'measure'
        },
        {
          startTime: 4682.47,
          name: 'lh:audit:uses-webp-images',
          duration: 3.23,
          entryType: 'measure'
        },
        {
          startTime: 4686.16,
          name: 'lh:audit:uses-optimized-images',
          duration: 12.09,
          entryType: 'measure'
        },
        {
          startTime: 4698.63,
          name: 'lh:audit:uses-text-compression',
          duration: 2.07,
          entryType: 'measure'
        },
        {
          startTime: 4701.09,
          name: 'lh:audit:uses-responsive-images',
          duration: 4.34,
          entryType: 'measure'
        },
        {
          startTime: 4705.8,
          name: 'lh:audit:efficient-animated-content',
          duration: 2.35,
          entryType: 'measure'
        },
        {
          startTime: 4708.5,
          name: 'lh:audit:appcache-manifest',
          duration: 0.51,
          entryType: 'measure'
        },
        {
          startTime: 4709.32,
          name: 'lh:audit:doctype',
          duration: 0.41,
          entryType: 'measure'
        },
        {
          startTime: 4709.99,
          name: 'lh:audit:charset',
          duration: 0.84,
          entryType: 'measure'
        },
        {
          startTime: 4711.1,
          name: 'lh:audit:dom-size',
          duration: 0.96,
          entryType: 'measure'
        },
        {
          startTime: 4712.33,
          name: 'lh:audit:external-anchors-use-rel-noopener',
          duration: 0.6,
          entryType: 'measure'
        },
        {
          startTime: 4713.27,
          name: 'lh:audit:geolocation-on-start',
          duration: 0.47,
          entryType: 'measure'
        },
        {
          startTime: 4713.96,
          name: 'lh:audit:no-document-write',
          duration: 0.46,
          entryType: 'measure'
        },
        {
          startTime: 4714.77,
          name: 'lh:audit:no-vulnerable-libraries',
          duration: 8.14,
          entryType: 'measure'
        },
        {
          startTime: 4723.29,
          name: 'lh:audit:js-libraries',
          duration: 0.54,
          entryType: 'measure'
        },
        {
          startTime: 4724.2,
          name: 'lh:audit:notification-on-start',
          duration: 0.39,
          entryType: 'measure'
        },
        {
          startTime: 4724.89,
          name: 'lh:audit:password-inputs-can-be-pasted-into',
          duration: 0.42,
          entryType: 'measure'
        },
        {
          startTime: 4725.59,
          name: 'lh:audit:uses-http2',
          duration: 0.94,
          entryType: 'measure'
        },
        {
          startTime: 4726.87,
          name: 'lh:audit:uses-passive-event-listeners',
          duration: 0.4,
          entryType: 'measure'
        },
        {
          startTime: 4727.54,
          name: 'lh:audit:meta-description',
          duration: 0.38,
          entryType: 'measure'
        },
        {
          startTime: 4728.21,
          name: 'lh:audit:http-status-code',
          duration: 0.44,
          entryType: 'measure'
        },
        {
          startTime: 4728.89,
          name: 'lh:audit:font-size',
          duration: 0.55,
          entryType: 'measure'
        },
        {
          startTime: 4729.69,
          name: 'lh:audit:link-text',
          duration: 1.65,
          entryType: 'measure'
        },
        {
          startTime: 4731.58,
          name: 'lh:audit:crawlable-anchors',
          duration: 0.97,
          entryType: 'measure'
        },
        {
          startTime: 4732.92,
          name: 'lh:audit:is-crawlable',
          duration: 2.06,
          entryType: 'measure'
        },
        {
          startTime: 4735.29,
          name: 'lh:audit:robots-txt',
          duration: 0.79,
          entryType: 'measure'
        },
        {
          startTime: 4736.37,
          name: 'lh:audit:tap-targets',
          duration: 0.49,
          entryType: 'measure'
        },
        {
          startTime: 4737.13,
          name: 'lh:audit:hreflang',
          duration: 0.46,
          entryType: 'measure'
        },
        {
          startTime: 4737.88,
          name: 'lh:audit:plugins',
          duration: 0.49,
          entryType: 'measure'
        },
        {
          startTime: 4738.68,
          name: 'lh:audit:canonical',
          duration: 0.79,
          entryType: 'measure'
        },
        {
          startTime: 4740.19,
          name: 'lh:audit:structured-data',
          duration: 0.24,
          entryType: 'measure'
        },
        {
          startTime: 4740.46,
          name: 'lh:runner:generate',
          duration: 2.24,
          entryType: 'measure'
        }
      ],
      total: 4084.38
    },
    i18n: {
      rendererFormattedStrings: {
        auditGroupExpandTooltip: 'Show audits',
        calculatorLink: 'See calculator.',
        crcInitialNavigation: 'Initial Navigation',
        crcLongestDurationLabel: 'Maximum critical path latency:',
        dropdownCopyJSON: 'Copy JSON',
        dropdownDarkTheme: 'Toggle Dark Theme',
        dropdownPrintExpanded: 'Print Expanded',
        dropdownPrintSummary: 'Print Summary',
        dropdownSaveGist: 'Save as Gist',
        dropdownSaveHTML: 'Save as HTML',
        dropdownSaveJSON: 'Save as JSON',
        dropdownViewer: 'Open in Viewer',
        errorLabel: 'Error!',
        errorMissingAuditInfo: 'Report error: no audit information',
        footerIssue: 'File an issue',
        labDataTitle: 'Lab Data',
        lsPerformanceCategoryDescription:
          '[Lighthouse](https://developers.google.com/web/tools/lighthouse/) analysis of the current page on an emulated mobile network. Values are estimated and may vary.',
        manualAuditsGroupTitle: 'Additional items to manually check',
        notApplicableAuditsGroupTitle: 'Not applicable',
        opportunityResourceColumnLabel: 'Opportunity',
        opportunitySavingsColumnLabel: 'Estimated Savings',
        passedAuditsGroupTitle: 'Passed audits',
        runtimeDesktopEmulation: 'Emulated Desktop',
        runtimeMobileEmulation: 'Emulated Moto G4',
        runtimeNoEmulation: 'No emulation',
        runtimeSettingsBenchmark: 'CPU/Memory Power',
        runtimeSettingsChannel: 'Channel',
        runtimeSettingsCPUThrottling: 'CPU throttling',
        runtimeSettingsDevice: 'Device',
        runtimeSettingsFetchTime: 'Fetch Time',
        runtimeSettingsNetworkThrottling: 'Network throttling',
        runtimeSettingsTitle: 'Runtime Settings',
        runtimeSettingsUA: 'User agent (host)',
        runtimeSettingsUANetwork: 'User agent (network)',
        runtimeSettingsUrl: 'URL',
        runtimeUnknown: 'Unknown',
        snippetCollapseButtonLabel: 'Collapse snippet',
        snippetExpandButtonLabel: 'Expand snippet',
        thirdPartyResourcesLabel: 'Show 3rd-party resources',
        throttlingProvided: 'Provided by environment',
        toplevelWarningsMessage:
          'There were issues affecting this run of Lighthouse:',
        varianceDisclaimer:
          'Values are estimated and may vary. The [performance score is calculated](https://web.dev/performance-scoring/) directly from these metrics.',
        warningAuditsGroupTitle: 'Passed audits but with warnings',
        warningHeader: 'Warnings: '
      },
      icuMessagePaths: {
        'lighthouse-core/audits/is-on-https.js | title': [
          'audits[is-on-https].title'
        ],
        'lighthouse-core/audits/is-on-https.js | description': [
          'audits[is-on-https].description'
        ],
        'lighthouse-core/audits/viewport.js | failureTitle': [
          'audits.viewport.title'
        ],
        'lighthouse-core/audits/viewport.js | description': [
          'audits.viewport.description'
        ],
        'lighthouse-core/audits/viewport.js | explanationNoTag': [
          'audits.viewport.explanation'
        ],
        'lighthouse-core/lib/i18n/i18n.js | firstContentfulPaintMetric': [
          'audits[first-contentful-paint].title'
        ],
        'lighthouse-core/audits/metrics/first-contentful-paint.js | description': [
          'audits[first-contentful-paint].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | seconds': [
          {
            values: { timeInMs: 1162.56 },
            path: 'audits[first-contentful-paint].displayValue'
          },
          {
            values: { timeInMs: 1215.06 },
            path: 'audits[largest-contentful-paint].displayValue'
          },
          {
            values: { timeInMs: 1215.06 },
            path: 'audits[first-meaningful-paint].displayValue'
          },
          {
            values: { timeInMs: 1346.358482898538 },
            path: 'audits[speed-index].displayValue'
          },
          {
            values: { timeInMs: 1215.06 },
            path: 'audits[first-cpu-idle].displayValue'
          },
          {
            values: { timeInMs: 1215.06 },
            path: 'audits.interactive.displayValue'
          },
          {
            values: { timeInMs: 571.4760000000001 },
            path: 'audits[mainthread-work-breakdown].displayValue'
          },
          {
            values: { timeInMs: 265.94399999999996 },
            path: 'audits[bootup-time].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | largestContentfulPaintMetric': [
          'audits[largest-contentful-paint].title'
        ],
        'lighthouse-core/audits/metrics/largest-contentful-paint.js | description': [
          'audits[largest-contentful-paint].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | firstMeaningfulPaintMetric': [
          'audits[first-meaningful-paint].title'
        ],
        'lighthouse-core/audits/metrics/first-meaningful-paint.js | description': [
          'audits[first-meaningful-paint].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | speedIndexMetric': [
          'audits[speed-index].title'
        ],
        'lighthouse-core/audits/metrics/speed-index.js | description': [
          'audits[speed-index].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | estimatedInputLatencyMetric': [
          'audits[estimated-input-latency].title'
        ],
        'lighthouse-core/audits/metrics/estimated-input-latency.js | description': [
          'audits[estimated-input-latency].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | ms': [
          {
            values: { timeInMs: 12.8 },
            path: 'audits[estimated-input-latency].displayValue'
          },
          {
            values: { timeInMs: 27.5 },
            path: 'audits[total-blocking-time].displayValue'
          },
          {
            values: { timeInMs: 111 },
            path: 'audits[max-potential-fid].displayValue'
          },
          {
            values: { timeInMs: 77.463 },
            path: 'audits[network-rtt].displayValue'
          },
          {
            values: { timeInMs: 1.5600000000000165 },
            path: 'audits[network-server-latency].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | totalBlockingTimeMetric': [
          'audits[total-blocking-time].title'
        ],
        'lighthouse-core/audits/metrics/total-blocking-time.js | description': [
          'audits[total-blocking-time].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | maxPotentialFIDMetric': [
          'audits[max-potential-fid].title'
        ],
        'lighthouse-core/audits/metrics/max-potential-fid.js | description': [
          'audits[max-potential-fid].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | cumulativeLayoutShiftMetric': [
          'audits[cumulative-layout-shift].title'
        ],
        'lighthouse-core/audits/metrics/cumulative-layout-shift.js | description': [
          'audits[cumulative-layout-shift].description'
        ],
        'lighthouse-core/audits/errors-in-console.js | title': [
          'audits[errors-in-console].title'
        ],
        'lighthouse-core/audits/errors-in-console.js | description': [
          'audits[errors-in-console].description'
        ],
        'lighthouse-core/audits/server-response-time.js | title': [
          'audits[server-response-time].title'
        ],
        'lighthouse-core/audits/server-response-time.js | description': [
          'audits[server-response-time].description'
        ],
        'lighthouse-core/audits/server-response-time.js | displayValue': [
          {
            values: { timeInMs: 89.95400000000004 },
            path: 'audits[server-response-time].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | firstCPUIdleMetric': [
          'audits[first-cpu-idle].title'
        ],
        'lighthouse-core/audits/metrics/first-cpu-idle.js | description': [
          'audits[first-cpu-idle].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | interactiveMetric': [
          'audits.interactive.title'
        ],
        'lighthouse-core/audits/metrics/interactive.js | description': [
          'audits.interactive.description'
        ],
        'lighthouse-core/audits/user-timings.js | title': [
          'audits[user-timings].title'
        ],
        'lighthouse-core/audits/user-timings.js | description': [
          'audits[user-timings].description'
        ],
        'lighthouse-core/audits/critical-request-chains.js | title': [
          'audits[critical-request-chains].title'
        ],
        'lighthouse-core/audits/critical-request-chains.js | description': [
          'audits[critical-request-chains].description'
        ],
        'lighthouse-core/audits/critical-request-chains.js | displayValue': [
          {
            values: { itemCount: 5 },
            path: 'audits[critical-request-chains].displayValue'
          }
        ],
        'lighthouse-core/audits/redirects.js | title': [
          'audits.redirects.title'
        ],
        'lighthouse-core/audits/redirects.js | description': [
          'audits.redirects.description'
        ],
        'lighthouse-core/audits/image-aspect-ratio.js | title': [
          'audits[image-aspect-ratio].title'
        ],
        'lighthouse-core/audits/image-aspect-ratio.js | description': [
          'audits[image-aspect-ratio].description'
        ],
        'lighthouse-core/audits/image-size-responsive.js | title': [
          'audits[image-size-responsive].title'
        ],
        'lighthouse-core/audits/image-size-responsive.js | description': [
          'audits[image-size-responsive].description'
        ],
        'lighthouse-core/audits/deprecations.js | title': [
          'audits.deprecations.title'
        ],
        'lighthouse-core/audits/deprecations.js | description': [
          'audits.deprecations.description'
        ],
        'lighthouse-core/audits/mainthread-work-breakdown.js | title': [
          'audits[mainthread-work-breakdown].title'
        ],
        'lighthouse-core/audits/mainthread-work-breakdown.js | description': [
          'audits[mainthread-work-breakdown].description'
        ],
        'lighthouse-core/audits/mainthread-work-breakdown.js | columnCategory': [
          'audits[mainthread-work-breakdown].details.headings[0].text'
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnTimeSpent': [
          'audits[mainthread-work-breakdown].details.headings[1].text',
          'audits[network-rtt].details.headings[1].text',
          'audits[network-server-latency].details.headings[1].text'
        ],
        'lighthouse-core/audits/bootup-time.js | title': [
          'audits[bootup-time].title'
        ],
        'lighthouse-core/audits/bootup-time.js | description': [
          'audits[bootup-time].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnURL': [
          'audits[bootup-time].details.headings[0].text',
          'audits[network-rtt].details.headings[0].text',
          'audits[network-server-latency].details.headings[0].text',
          'audits[long-tasks].details.headings[0].text',
          'audits[uses-long-cache-ttl].details.headings[0].text',
          'audits[total-byte-weight].details.headings[0].text',
          'audits[render-blocking-resources].details.headings[0].label'
        ],
        'lighthouse-core/audits/bootup-time.js | columnTotal': [
          'audits[bootup-time].details.headings[1].text'
        ],
        'lighthouse-core/audits/bootup-time.js | columnScriptEval': [
          'audits[bootup-time].details.headings[2].text'
        ],
        'lighthouse-core/audits/bootup-time.js | columnScriptParse': [
          'audits[bootup-time].details.headings[3].text'
        ],
        'lighthouse-core/audits/uses-rel-preload.js | title': [
          'audits[uses-rel-preload].title'
        ],
        'lighthouse-core/audits/uses-rel-preload.js | description': [
          'audits[uses-rel-preload].description'
        ],
        'lighthouse-core/audits/uses-rel-preconnect.js | title': [
          'audits[uses-rel-preconnect].title'
        ],
        'lighthouse-core/audits/uses-rel-preconnect.js | description': [
          'audits[uses-rel-preconnect].description'
        ],
        'lighthouse-core/audits/font-display.js | title': [
          'audits[font-display].title'
        ],
        'lighthouse-core/audits/font-display.js | description': [
          'audits[font-display].description'
        ],
        'lighthouse-core/audits/network-rtt.js | title': [
          'audits[network-rtt].title'
        ],
        'lighthouse-core/audits/network-rtt.js | description': [
          'audits[network-rtt].description'
        ],
        'lighthouse-core/audits/network-server-latency.js | title': [
          'audits[network-server-latency].title'
        ],
        'lighthouse-core/audits/network-server-latency.js | description': [
          'audits[network-server-latency].description'
        ],
        'lighthouse-core/audits/performance-budget.js | title': [
          'audits[performance-budget].title'
        ],
        'lighthouse-core/audits/performance-budget.js | description': [
          'audits[performance-budget].description'
        ],
        'lighthouse-core/audits/timing-budget.js | title': [
          'audits[timing-budget].title'
        ],
        'lighthouse-core/audits/timing-budget.js | description': [
          'audits[timing-budget].description'
        ],
        'lighthouse-core/audits/resource-summary.js | title': [
          'audits[resource-summary].title'
        ],
        'lighthouse-core/audits/resource-summary.js | description': [
          'audits[resource-summary].description'
        ],
        'lighthouse-core/audits/resource-summary.js | displayValue': [
          {
            values: { requestCount: 7, byteCount: 49498 },
            path: 'audits[resource-summary].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnResourceType': [
          'audits[resource-summary].details.headings[0].text'
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnRequests': [
          'audits[resource-summary].details.headings[1].text'
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnTransferSize': [
          'audits[resource-summary].details.headings[2].text',
          'audits[uses-long-cache-ttl].details.headings[2].text',
          'audits[total-byte-weight].details.headings[1].text',
          'audits[render-blocking-resources].details.headings[1].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | totalResourceType': [
          'audits[resource-summary].details.items[0].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | scriptResourceType': [
          'audits[resource-summary].details.items[1].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | documentResourceType': [
          'audits[resource-summary].details.items[2].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | stylesheetResourceType': [
          'audits[resource-summary].details.items[3].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | imageResourceType': [
          'audits[resource-summary].details.items[4].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | mediaResourceType': [
          'audits[resource-summary].details.items[5].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | fontResourceType': [
          'audits[resource-summary].details.items[6].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | otherResourceType': [
          'audits[resource-summary].details.items[7].label'
        ],
        'lighthouse-core/lib/i18n/i18n.js | thirdPartyResourceType': [
          'audits[resource-summary].details.items[8].label'
        ],
        'lighthouse-core/audits/third-party-summary.js | title': [
          'audits[third-party-summary].title'
        ],
        'lighthouse-core/audits/third-party-summary.js | description': [
          'audits[third-party-summary].description'
        ],
        'lighthouse-core/audits/largest-contentful-paint-element.js | title': [
          'audits[largest-contentful-paint-element].title'
        ],
        'lighthouse-core/audits/largest-contentful-paint-element.js | description': [
          'audits[largest-contentful-paint-element].description'
        ],
        'lighthouse-core/audits/largest-contentful-paint-element.js | displayValue': [
          {
            values: { itemCount: 1 },
            path: 'audits[largest-contentful-paint-element].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnElement': [
          'audits[largest-contentful-paint-element].details.headings[0].text',
          'audits[dom-size].details.headings[1].text'
        ],
        'lighthouse-core/audits/layout-shift-elements.js | title': [
          'audits[layout-shift-elements].title'
        ],
        'lighthouse-core/audits/layout-shift-elements.js | description': [
          'audits[layout-shift-elements].description'
        ],
        'lighthouse-core/audits/long-tasks.js | title': [
          'audits[long-tasks].title'
        ],
        'lighthouse-core/audits/long-tasks.js | description': [
          'audits[long-tasks].description'
        ],
        'lighthouse-core/audits/long-tasks.js | displayValue': [
          { values: { itemCount: 2 }, path: 'audits[long-tasks].displayValue' }
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnStartTime': [
          'audits[long-tasks].details.headings[1].text'
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnDuration': [
          'audits[long-tasks].details.headings[2].text'
        ],
        'lighthouse-core/audits/accessibility/accesskeys.js | title': [
          'audits.accesskeys.title'
        ],
        'lighthouse-core/audits/accessibility/accesskeys.js | description': [
          'audits.accesskeys.description'
        ],
        'lighthouse-core/audits/accessibility/aria-allowed-attr.js | title': [
          'audits[aria-allowed-attr].title'
        ],
        'lighthouse-core/audits/accessibility/aria-allowed-attr.js | description': [
          'audits[aria-allowed-attr].description'
        ],
        'lighthouse-core/audits/accessibility/aria-hidden-body.js | title': [
          'audits[aria-hidden-body].title'
        ],
        'lighthouse-core/audits/accessibility/aria-hidden-body.js | description': [
          'audits[aria-hidden-body].description'
        ],
        'lighthouse-core/audits/accessibility/aria-hidden-focus.js | title': [
          'audits[aria-hidden-focus].title'
        ],
        'lighthouse-core/audits/accessibility/aria-hidden-focus.js | description': [
          'audits[aria-hidden-focus].description'
        ],
        'lighthouse-core/audits/accessibility/aria-input-field-name.js | title': [
          'audits[aria-input-field-name].title'
        ],
        'lighthouse-core/audits/accessibility/aria-input-field-name.js | description': [
          'audits[aria-input-field-name].description'
        ],
        'lighthouse-core/audits/accessibility/aria-required-attr.js | title': [
          'audits[aria-required-attr].title'
        ],
        'lighthouse-core/audits/accessibility/aria-required-attr.js | description': [
          'audits[aria-required-attr].description'
        ],
        'lighthouse-core/audits/accessibility/aria-required-children.js | title': [
          'audits[aria-required-children].title'
        ],
        'lighthouse-core/audits/accessibility/aria-required-children.js | description': [
          'audits[aria-required-children].description'
        ],
        'lighthouse-core/audits/accessibility/aria-required-parent.js | title': [
          'audits[aria-required-parent].title'
        ],
        'lighthouse-core/audits/accessibility/aria-required-parent.js | description': [
          'audits[aria-required-parent].description'
        ],
        'lighthouse-core/audits/accessibility/aria-roles.js | title': [
          'audits[aria-roles].title'
        ],
        'lighthouse-core/audits/accessibility/aria-roles.js | description': [
          'audits[aria-roles].description'
        ],
        'lighthouse-core/audits/accessibility/aria-toggle-field-name.js | title': [
          'audits[aria-toggle-field-name].title'
        ],
        'lighthouse-core/audits/accessibility/aria-toggle-field-name.js | description': [
          'audits[aria-toggle-field-name].description'
        ],
        'lighthouse-core/audits/accessibility/aria-valid-attr-value.js | title': [
          'audits[aria-valid-attr-value].title'
        ],
        'lighthouse-core/audits/accessibility/aria-valid-attr-value.js | description': [
          'audits[aria-valid-attr-value].description'
        ],
        'lighthouse-core/audits/accessibility/aria-valid-attr.js | title': [
          'audits[aria-valid-attr].title'
        ],
        'lighthouse-core/audits/accessibility/aria-valid-attr.js | description': [
          'audits[aria-valid-attr].description'
        ],
        'lighthouse-core/audits/accessibility/button-name.js | title': [
          'audits[button-name].title'
        ],
        'lighthouse-core/audits/accessibility/button-name.js | description': [
          'audits[button-name].description'
        ],
        'lighthouse-core/audits/accessibility/bypass.js | title': [
          'audits.bypass.title'
        ],
        'lighthouse-core/audits/accessibility/bypass.js | description': [
          'audits.bypass.description'
        ],
        'lighthouse-core/audits/accessibility/color-contrast.js | failureTitle': [
          'audits[color-contrast].title'
        ],
        'lighthouse-core/audits/accessibility/color-contrast.js | description': [
          'audits[color-contrast].description'
        ],
        'lighthouse-core/audits/accessibility/axe-audit.js | failingElementsHeader': [
          'audits[color-contrast].details.headings[0].text',
          'audits[html-has-lang].details.headings[0].text',
          'audits.label.details.headings[0].text'
        ],
        'lighthouse-core/audits/accessibility/definition-list.js | title': [
          'audits[definition-list].title'
        ],
        'lighthouse-core/audits/accessibility/definition-list.js | description': [
          'audits[definition-list].description'
        ],
        'lighthouse-core/audits/accessibility/dlitem.js | title': [
          'audits.dlitem.title'
        ],
        'lighthouse-core/audits/accessibility/dlitem.js | description': [
          'audits.dlitem.description'
        ],
        'lighthouse-core/audits/accessibility/document-title.js | title': [
          'audits[document-title].title'
        ],
        'lighthouse-core/audits/accessibility/document-title.js | description': [
          'audits[document-title].description'
        ],
        'lighthouse-core/audits/accessibility/duplicate-id-active.js | title': [
          'audits[duplicate-id-active].title'
        ],
        'lighthouse-core/audits/accessibility/duplicate-id-active.js | description': [
          'audits[duplicate-id-active].description'
        ],
        'lighthouse-core/audits/accessibility/duplicate-id-aria.js | title': [
          'audits[duplicate-id-aria].title'
        ],
        'lighthouse-core/audits/accessibility/duplicate-id-aria.js | description': [
          'audits[duplicate-id-aria].description'
        ],
        'lighthouse-core/audits/accessibility/form-field-multiple-labels.js | title': [
          'audits[form-field-multiple-labels].title'
        ],
        'lighthouse-core/audits/accessibility/form-field-multiple-labels.js | description': [
          'audits[form-field-multiple-labels].description'
        ],
        'lighthouse-core/audits/accessibility/frame-title.js | title': [
          'audits[frame-title].title'
        ],
        'lighthouse-core/audits/accessibility/frame-title.js | description': [
          'audits[frame-title].description'
        ],
        'lighthouse-core/audits/accessibility/heading-order.js | title': [
          'audits[heading-order].title'
        ],
        'lighthouse-core/audits/accessibility/heading-order.js | description': [
          'audits[heading-order].description'
        ],
        'lighthouse-core/audits/accessibility/html-has-lang.js | failureTitle': [
          'audits[html-has-lang].title'
        ],
        'lighthouse-core/audits/accessibility/html-has-lang.js | description': [
          'audits[html-has-lang].description'
        ],
        'lighthouse-core/audits/accessibility/html-lang-valid.js | title': [
          'audits[html-lang-valid].title'
        ],
        'lighthouse-core/audits/accessibility/html-lang-valid.js | description': [
          'audits[html-lang-valid].description'
        ],
        'lighthouse-core/audits/accessibility/image-alt.js | title': [
          'audits[image-alt].title'
        ],
        'lighthouse-core/audits/accessibility/image-alt.js | description': [
          'audits[image-alt].description'
        ],
        'lighthouse-core/audits/accessibility/input-image-alt.js | title': [
          'audits[input-image-alt].title'
        ],
        'lighthouse-core/audits/accessibility/input-image-alt.js | description': [
          'audits[input-image-alt].description'
        ],
        'lighthouse-core/audits/accessibility/label.js | failureTitle': [
          'audits.label.title'
        ],
        'lighthouse-core/audits/accessibility/label.js | description': [
          'audits.label.description'
        ],
        'lighthouse-core/audits/accessibility/layout-table.js | title': [
          'audits[layout-table].title'
        ],
        'lighthouse-core/audits/accessibility/layout-table.js | description': [
          'audits[layout-table].description'
        ],
        'lighthouse-core/audits/accessibility/link-name.js | title': [
          'audits[link-name].title'
        ],
        'lighthouse-core/audits/accessibility/link-name.js | description': [
          'audits[link-name].description'
        ],
        'lighthouse-core/audits/accessibility/list.js | title': [
          'audits.list.title'
        ],
        'lighthouse-core/audits/accessibility/list.js | description': [
          'audits.list.description'
        ],
        'lighthouse-core/audits/accessibility/listitem.js | title': [
          'audits.listitem.title'
        ],
        'lighthouse-core/audits/accessibility/listitem.js | description': [
          'audits.listitem.description'
        ],
        'lighthouse-core/audits/accessibility/meta-refresh.js | title': [
          'audits[meta-refresh].title'
        ],
        'lighthouse-core/audits/accessibility/meta-refresh.js | description': [
          'audits[meta-refresh].description'
        ],
        'lighthouse-core/audits/accessibility/meta-viewport.js | title': [
          'audits[meta-viewport].title'
        ],
        'lighthouse-core/audits/accessibility/meta-viewport.js | description': [
          'audits[meta-viewport].description'
        ],
        'lighthouse-core/audits/accessibility/object-alt.js | title': [
          'audits[object-alt].title'
        ],
        'lighthouse-core/audits/accessibility/object-alt.js | description': [
          'audits[object-alt].description'
        ],
        'lighthouse-core/audits/accessibility/tabindex.js | title': [
          'audits.tabindex.title'
        ],
        'lighthouse-core/audits/accessibility/tabindex.js | description': [
          'audits.tabindex.description'
        ],
        'lighthouse-core/audits/accessibility/td-headers-attr.js | title': [
          'audits[td-headers-attr].title'
        ],
        'lighthouse-core/audits/accessibility/td-headers-attr.js | description': [
          'audits[td-headers-attr].description'
        ],
        'lighthouse-core/audits/accessibility/th-has-data-cells.js | title': [
          'audits[th-has-data-cells].title'
        ],
        'lighthouse-core/audits/accessibility/th-has-data-cells.js | description': [
          'audits[th-has-data-cells].description'
        ],
        'lighthouse-core/audits/accessibility/valid-lang.js | title': [
          'audits[valid-lang].title'
        ],
        'lighthouse-core/audits/accessibility/valid-lang.js | description': [
          'audits[valid-lang].description'
        ],
        'lighthouse-core/audits/accessibility/video-caption.js | title': [
          'audits[video-caption].title'
        ],
        'lighthouse-core/audits/accessibility/video-caption.js | description': [
          'audits[video-caption].description'
        ],
        'lighthouse-core/audits/accessibility/video-description.js | title': [
          'audits[video-description].title'
        ],
        'lighthouse-core/audits/accessibility/video-description.js | description': [
          'audits[video-description].description'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-long-cache-ttl.js | failureTitle': [
          'audits[uses-long-cache-ttl].title'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-long-cache-ttl.js | description': [
          'audits[uses-long-cache-ttl].description'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-long-cache-ttl.js | displayValue': [
          {
            values: { itemCount: 6 },
            path: 'audits[uses-long-cache-ttl].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnCacheTTL': [
          'audits[uses-long-cache-ttl].details.headings[1].text'
        ],
        'lighthouse-core/audits/byte-efficiency/total-byte-weight.js | title': [
          'audits[total-byte-weight].title'
        ],
        'lighthouse-core/audits/byte-efficiency/total-byte-weight.js | description': [
          'audits[total-byte-weight].description'
        ],
        'lighthouse-core/audits/byte-efficiency/total-byte-weight.js | displayValue': [
          {
            values: { totalBytes: 49498 },
            path: 'audits[total-byte-weight].displayValue'
          }
        ],
        'lighthouse-core/audits/byte-efficiency/offscreen-images.js | title': [
          'audits[offscreen-images].title'
        ],
        'lighthouse-core/audits/byte-efficiency/offscreen-images.js | description': [
          'audits[offscreen-images].description'
        ],
        'lighthouse-core/audits/byte-efficiency/render-blocking-resources.js | title': [
          'audits[render-blocking-resources].title'
        ],
        'lighthouse-core/audits/byte-efficiency/render-blocking-resources.js | description': [
          'audits[render-blocking-resources].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | displayValueMsSavings': [
          {
            values: { wastedMs: 395 },
            path: 'audits[render-blocking-resources].displayValue'
          }
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnWastedBytes': [
          'audits[render-blocking-resources].details.headings[2].label'
        ],
        'lighthouse-core/audits/byte-efficiency/unminified-css.js | title': [
          'audits[unminified-css].title'
        ],
        'lighthouse-core/audits/byte-efficiency/unminified-css.js | description': [
          'audits[unminified-css].description'
        ],
        'lighthouse-core/audits/byte-efficiency/unminified-javascript.js | title': [
          'audits[unminified-javascript].title'
        ],
        'lighthouse-core/audits/byte-efficiency/unminified-javascript.js | description': [
          'audits[unminified-javascript].description'
        ],
        'lighthouse-core/audits/byte-efficiency/unused-css-rules.js | title': [
          'audits[unused-css-rules].title'
        ],
        'lighthouse-core/audits/byte-efficiency/unused-css-rules.js | description': [
          'audits[unused-css-rules].description'
        ],
        'lighthouse-core/audits/byte-efficiency/unused-javascript.js | title': [
          'audits[unused-javascript].title'
        ],
        'lighthouse-core/audits/byte-efficiency/unused-javascript.js | description': [
          'audits[unused-javascript].description'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-webp-images.js | title': [
          'audits[uses-webp-images].title'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-webp-images.js | description': [
          'audits[uses-webp-images].description'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-optimized-images.js | title': [
          'audits[uses-optimized-images].title'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-optimized-images.js | description': [
          'audits[uses-optimized-images].description'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-text-compression.js | title': [
          'audits[uses-text-compression].title'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-text-compression.js | description': [
          'audits[uses-text-compression].description'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-responsive-images.js | title': [
          'audits[uses-responsive-images].title'
        ],
        'lighthouse-core/audits/byte-efficiency/uses-responsive-images.js | description': [
          'audits[uses-responsive-images].description'
        ],
        'lighthouse-core/audits/byte-efficiency/efficient-animated-content.js | title': [
          'audits[efficient-animated-content].title'
        ],
        'lighthouse-core/audits/byte-efficiency/efficient-animated-content.js | description': [
          'audits[efficient-animated-content].description'
        ],
        'lighthouse-core/audits/dobetterweb/appcache-manifest.js | title': [
          'audits[appcache-manifest].title'
        ],
        'lighthouse-core/audits/dobetterweb/appcache-manifest.js | description': [
          'audits[appcache-manifest].description'
        ],
        'lighthouse-core/audits/dobetterweb/doctype.js | failureTitle': [
          'audits.doctype.title'
        ],
        'lighthouse-core/audits/dobetterweb/doctype.js | description': [
          'audits.doctype.description'
        ],
        'lighthouse-core/audits/dobetterweb/doctype.js | explanationPublicId': [
          'audits.doctype.explanation'
        ],
        'lighthouse-core/audits/dobetterweb/charset.js | title': [
          'audits.charset.title'
        ],
        'lighthouse-core/audits/dobetterweb/charset.js | description': [
          'audits.charset.description'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | title': [
          'audits[dom-size].title'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | description': [
          'audits[dom-size].description'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | displayValue': [
          { values: { itemCount: 319 }, path: 'audits[dom-size].displayValue' }
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | columnStatistic': [
          'audits[dom-size].details.headings[0].text'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | columnValue': [
          'audits[dom-size].details.headings[2].text'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | statisticDOMElements': [
          'audits[dom-size].details.items[0].statistic'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | statisticDOMDepth': [
          'audits[dom-size].details.items[1].statistic'
        ],
        'lighthouse-core/audits/dobetterweb/dom-size.js | statisticDOMWidth': [
          'audits[dom-size].details.items[2].statistic'
        ],
        'lighthouse-core/audits/dobetterweb/external-anchors-use-rel-noopener.js | title': [
          'audits[external-anchors-use-rel-noopener].title'
        ],
        'lighthouse-core/audits/dobetterweb/external-anchors-use-rel-noopener.js | description': [
          'audits[external-anchors-use-rel-noopener].description'
        ],
        'lighthouse-core/audits/dobetterweb/geolocation-on-start.js | title': [
          'audits[geolocation-on-start].title'
        ],
        'lighthouse-core/audits/dobetterweb/geolocation-on-start.js | description': [
          'audits[geolocation-on-start].description'
        ],
        'lighthouse-core/audits/dobetterweb/no-document-write.js | title': [
          'audits[no-document-write].title'
        ],
        'lighthouse-core/audits/dobetterweb/no-document-write.js | description': [
          'audits[no-document-write].description'
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | failureTitle': [
          'audits[no-vulnerable-libraries].title'
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | description': [
          'audits[no-vulnerable-libraries].description'
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | displayValue': [
          {
            values: { itemCount: 3 },
            path: 'audits[no-vulnerable-libraries].displayValue'
          }
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | columnVersion': [
          'audits[no-vulnerable-libraries].details.headings[0].text'
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | columnVuln': [
          'audits[no-vulnerable-libraries].details.headings[1].text'
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | columnSeverity': [
          'audits[no-vulnerable-libraries].details.headings[2].text'
        ],
        'lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | rowSeverityMedium': [
          'audits[no-vulnerable-libraries].details.items[0].highestSeverity'
        ],
        'lighthouse-core/audits/dobetterweb/js-libraries.js | title': [
          'audits[js-libraries].title'
        ],
        'lighthouse-core/audits/dobetterweb/js-libraries.js | description': [
          'audits[js-libraries].description'
        ],
        'lighthouse-core/lib/i18n/i18n.js | columnName': [
          'audits[js-libraries].details.headings[0].text'
        ],
        'lighthouse-core/audits/dobetterweb/js-libraries.js | columnVersion': [
          'audits[js-libraries].details.headings[1].text'
        ],
        'lighthouse-core/audits/dobetterweb/notification-on-start.js | title': [
          'audits[notification-on-start].title'
        ],
        'lighthouse-core/audits/dobetterweb/notification-on-start.js | description': [
          'audits[notification-on-start].description'
        ],
        'lighthouse-core/audits/dobetterweb/password-inputs-can-be-pasted-into.js | title': [
          'audits[password-inputs-can-be-pasted-into].title'
        ],
        'lighthouse-core/audits/dobetterweb/password-inputs-can-be-pasted-into.js | description': [
          'audits[password-inputs-can-be-pasted-into].description'
        ],
        'lighthouse-core/audits/dobetterweb/uses-http2.js | title': [
          'audits[uses-http2].title'
        ],
        'lighthouse-core/audits/dobetterweb/uses-http2.js | description': [
          'audits[uses-http2].description'
        ],
        'lighthouse-core/audits/dobetterweb/uses-passive-event-listeners.js | title': [
          'audits[uses-passive-event-listeners].title'
        ],
        'lighthouse-core/audits/dobetterweb/uses-passive-event-listeners.js | description': [
          'audits[uses-passive-event-listeners].description'
        ],
        'lighthouse-core/audits/seo/meta-description.js | failureTitle': [
          'audits[meta-description].title'
        ],
        'lighthouse-core/audits/seo/meta-description.js | description': [
          'audits[meta-description].description'
        ],
        'lighthouse-core/audits/seo/http-status-code.js | title': [
          'audits[http-status-code].title'
        ],
        'lighthouse-core/audits/seo/http-status-code.js | description': [
          'audits[http-status-code].description'
        ],
        'lighthouse-core/audits/seo/font-size.js | title': [
          'audits[font-size].title'
        ],
        'lighthouse-core/audits/seo/font-size.js | description': [
          'audits[font-size].description'
        ],
        'lighthouse-core/audits/seo/link-text.js | title': [
          'audits[link-text].title'
        ],
        'lighthouse-core/audits/seo/link-text.js | description': [
          'audits[link-text].description'
        ],
        'lighthouse-core/audits/seo/crawlable-anchors.js | title': [
          'audits[crawlable-anchors].title'
        ],
        'lighthouse-core/audits/seo/crawlable-anchors.js | description': [
          'audits[crawlable-anchors].description'
        ],
        'lighthouse-core/audits/seo/is-crawlable.js | title': [
          'audits[is-crawlable].title'
        ],
        'lighthouse-core/audits/seo/is-crawlable.js | description': [
          'audits[is-crawlable].description'
        ],
        'lighthouse-core/audits/seo/robots-txt.js | title': [
          'audits[robots-txt].title'
        ],
        'lighthouse-core/audits/seo/robots-txt.js | description': [
          'audits[robots-txt].description'
        ],
        'lighthouse-core/audits/seo/tap-targets.js | title': [
          'audits[tap-targets].title'
        ],
        'lighthouse-core/audits/seo/tap-targets.js | description': [
          'audits[tap-targets].description'
        ],
        'lighthouse-core/audits/seo/hreflang.js | title': [
          'audits.hreflang.title'
        ],
        'lighthouse-core/audits/seo/hreflang.js | description': [
          'audits.hreflang.description'
        ],
        'lighthouse-core/audits/seo/plugins.js | title': [
          'audits.plugins.title'
        ],
        'lighthouse-core/audits/seo/plugins.js | description': [
          'audits.plugins.description'
        ],
        'lighthouse-core/audits/seo/canonical.js | title': [
          'audits.canonical.title'
        ],
        'lighthouse-core/audits/seo/canonical.js | description': [
          'audits.canonical.description'
        ],
        'lighthouse-core/audits/seo/manual/structured-data.js | title': [
          'audits[structured-data].title'
        ],
        'lighthouse-core/audits/seo/manual/structured-data.js | description': [
          'audits[structured-data].description'
        ],
        'lighthouse-core/config/default-config.js | performanceCategoryTitle': [
          'categories.performance.title'
        ],
        'lighthouse-core/config/default-config.js | a11yCategoryTitle': [
          'categories.accessibility.title'
        ],
        'lighthouse-core/config/default-config.js | a11yCategoryDescription': [
          'categories.accessibility.description'
        ],
        'lighthouse-core/config/default-config.js | a11yCategoryManualDescription': [
          'categories.accessibility.manualDescription'
        ],
        'lighthouse-core/config/default-config.js | bestPracticesCategoryTitle': [
          'categories[best-practices].title'
        ],
        'lighthouse-core/config/default-config.js | seoCategoryTitle': [
          'categories.seo.title'
        ],
        'lighthouse-core/config/default-config.js | seoCategoryDescription': [
          'categories.seo.description'
        ],
        'lighthouse-core/config/default-config.js | seoCategoryManualDescription': [
          'categories.seo.manualDescription'
        ],
        'lighthouse-core/config/default-config.js | metricGroupTitle': [
          'categoryGroups.metrics.title'
        ],
        'lighthouse-core/config/default-config.js | loadOpportunitiesGroupTitle': [
          'categoryGroups[load-opportunities].title'
        ],
        'lighthouse-core/config/default-config.js | loadOpportunitiesGroupDescription': [
          'categoryGroups[load-opportunities].description'
        ],
        'lighthouse-core/config/default-config.js | budgetsGroupTitle': [
          'categoryGroups.budgets.title'
        ],
        'lighthouse-core/config/default-config.js | budgetsGroupDescription': [
          'categoryGroups.budgets.description'
        ],
        'lighthouse-core/config/default-config.js | diagnosticsGroupTitle': [
          'categoryGroups.diagnostics.title'
        ],
        'lighthouse-core/config/default-config.js | diagnosticsGroupDescription': [
          'categoryGroups.diagnostics.description'
        ],
        'lighthouse-core/config/default-config.js | pwaFastReliableGroupTitle': [
          'categoryGroups[pwa-fast-reliable].title'
        ],
        'lighthouse-core/config/default-config.js | pwaInstallableGroupTitle': [
          'categoryGroups[pwa-installable].title'
        ],
        'lighthouse-core/config/default-config.js | pwaOptimizedGroupTitle': [
          'categoryGroups[pwa-optimized].title'
        ],
        'lighthouse-core/config/default-config.js | a11yBestPracticesGroupTitle': [
          'categoryGroups[a11y-best-practices].title'
        ],
        'lighthouse-core/config/default-config.js | a11yBestPracticesGroupDescription': [
          'categoryGroups[a11y-best-practices].description'
        ],
        'lighthouse-core/config/default-config.js | a11yColorContrastGroupTitle': [
          'categoryGroups[a11y-color-contrast].title'
        ],
        'lighthouse-core/config/default-config.js | a11yColorContrastGroupDescription': [
          'categoryGroups[a11y-color-contrast].description'
        ],
        'lighthouse-core/config/default-config.js | a11yNamesLabelsGroupTitle': [
          'categoryGroups[a11y-names-labels].title'
        ],
        'lighthouse-core/config/default-config.js | a11yNamesLabelsGroupDescription': [
          'categoryGroups[a11y-names-labels].description'
        ],
        'lighthouse-core/config/default-config.js | a11yNavigationGroupTitle': [
          'categoryGroups[a11y-navigation].title'
        ],
        'lighthouse-core/config/default-config.js | a11yNavigationGroupDescription': [
          'categoryGroups[a11y-navigation].description'
        ],
        'lighthouse-core/config/default-config.js | a11yAriaGroupTitle': [
          'categoryGroups[a11y-aria].title'
        ],
        'lighthouse-core/config/default-config.js | a11yAriaGroupDescription': [
          'categoryGroups[a11y-aria].description'
        ],
        'lighthouse-core/config/default-config.js | a11yLanguageGroupTitle': [
          'categoryGroups[a11y-language].title'
        ],
        'lighthouse-core/config/default-config.js | a11yLanguageGroupDescription': [
          'categoryGroups[a11y-language].description'
        ],
        'lighthouse-core/config/default-config.js | a11yAudioVideoGroupTitle': [
          'categoryGroups[a11y-audio-video].title'
        ],
        'lighthouse-core/config/default-config.js | a11yAudioVideoGroupDescription': [
          'categoryGroups[a11y-audio-video].description'
        ],
        'lighthouse-core/config/default-config.js | a11yTablesListsVideoGroupTitle': [
          'categoryGroups[a11y-tables-lists].title'
        ],
        'lighthouse-core/config/default-config.js | a11yTablesListsVideoGroupDescription': [
          'categoryGroups[a11y-tables-lists].description'
        ],
        'lighthouse-core/config/default-config.js | seoMobileGroupTitle': [
          'categoryGroups[seo-mobile].title'
        ],
        'lighthouse-core/config/default-config.js | seoMobileGroupDescription': [
          'categoryGroups[seo-mobile].description'
        ],
        'lighthouse-core/config/default-config.js | seoContentGroupTitle': [
          'categoryGroups[seo-content].title'
        ],
        'lighthouse-core/config/default-config.js | seoContentGroupDescription': [
          'categoryGroups[seo-content].description'
        ],
        'lighthouse-core/config/default-config.js | seoCrawlingGroupTitle': [
          'categoryGroups[seo-crawl].title'
        ],
        'lighthouse-core/config/default-config.js | seoCrawlingGroupDescription': [
          'categoryGroups[seo-crawl].description'
        ],
        'lighthouse-core/config/default-config.js | bestPracticesTrustSafetyGroupTitle': [
          'categoryGroups[best-practices-trust-safety].title'
        ],
        'lighthouse-core/config/default-config.js | bestPracticesUXGroupTitle': [
          'categoryGroups[best-practices-ux].title'
        ],
        'lighthouse-core/config/default-config.js | bestPracticesBrowserCompatGroupTitle': [
          'categoryGroups[best-practices-browser-compat].title'
        ],
        'lighthouse-core/config/default-config.js | bestPracticesGeneralGroupTitle': [
          'categoryGroups[best-practices-general].title'
        ]
      }
    },
    stackPacks: []
  },
  url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html'
}
