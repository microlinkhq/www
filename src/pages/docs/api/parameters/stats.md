---
title: 'stats'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

Get perfomance metrics over the website powered by [lighthouse](https://developers.google.com/web/tools/lighthouse).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://zeit.co&stats`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://zeit.co', {
    stats: true
  })
  console.log(status, data)
}
  `
  }} 
/>

Enabling it adds a new field  `stats` present into the data payload with a set of perfomance metrics oriented to detect bottlenecks and improve the perceive page load.

These metrics are:

- [**first-contentful-paint**](https://web.dev/first-contentful-paint): First Contentful Paint marks the time at which the first text or image is painted.
- [**first-meaningful-paint**](https://web.dev/first-meaningful-paint): First Meaningful Paint measures when the primary content of a page is visible.
- [**speed-index**](https://web.dev/speed-index): Speed Index shows how quickly the contents of a page are visibly populated.
- [**estimated-input-latency**](https://web.dev/estimated-input-latency): Estimated Input Latency is an estimate of how long your app takes to respond to user input, in milliseconds, during the busiest 5s window of page load. If your latency is higher than 50 ms, users may perceive your app as laggy.
- **total-blocking-time**: Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.
- [**max-potential-fid**](https://developers.google.com/web/updates/2018/05/first-input-delay): The maximum potential First Input Delay that your users could experience is the duration, in milliseconds, of the longest task.
- [**errors-in-console**](https://web.dev/errors-in-console): Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns.
- [**time-to-first**](https://web.dev/time-to-first-byte): Time To First Byte identifies the time at which your server sends a response.
- [**first-cpu-idle**](https://web.dev/first-cpu-idle): First CPU Idle marks the first time at which the page's main thread is quiet enough to handle input..
- [**interactive**](https://web.dev/interactive): Time to interactive is the amount of time it takes for the page to become fully interactive.
- [**redirects**](https://web.dev/redirects): Redirects introduce additional delays before the page can be loaded.
- [**bootup-time**](https://web.dev/bootup-time): Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this.
- [**uses-rel-preload**](https://web.dev/uses-rel-preload): Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load.
- [**uses-rel-preconnect**](https://web.dev/uses-rel-preconnect): Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins.
- [**network-rtt**](https://hpbn.co/primer-on-latency-and-bandwidth/): Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance.
- [**network-server-latency**](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall): Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance.
- [**resource-summary**](https://developers.google.com/web/tools/lighthouse/audits/budgets): To set budgets for the quantity and size of page resources, add a budget.json file.
- [**image-alt**](https://web.dev/image-alt/): Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute.
- [**dom-size**](https://web.dev/dom-size): A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow).
- [**uses-http2**](https://web.dev/uses-http2): HTTP/2 offers many benefits over HTTP/1.1, including binary headers, multiplexing, and server push.
- [**meta-description**](https://web.dev/meta-description): Meta descriptions may be included in search results to concisely summarize page content.
