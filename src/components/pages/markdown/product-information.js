import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'
import { Link } from 'components/elements/Link'
import LineBreak from 'components/elements/LineBreak'
import Faq from 'components/patterns/Faq/Faq'

export const ProductInformation = () => {
  return (
    <Faq
      title='Product Information'
      caption={
        <>
          Everything you need to know about <LineBreak /> Microlink URL to
          markdown API.
        </>
      }
      css={theme({
        py: SECTION_VERTICAL_SPACING,
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'What is Microlink Markdown?',
          answer: (
            <>
              <div>
                Microlink Markdown is an extraction API that takes any URL and
                returns clean markdown content ready for AI workflows. It is
                built on the same{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>{' '}
                surface your team already uses for metadata, screenshots, and
                PDFs.
              </div>
              <div>
                Use it for{' '}
                <Link href='/docs/guides/content-conversion/url-to-markdown'>
                  crawling, summarization, and RAG ingestion
                </Link>{' '}
                where clean text beats noisy HTML.
              </div>
            </>
          )
        },
        {
          question: 'Why do AI agents prefer markdown over HTML?',
          answer: (
            <>
              <div>
                HTML pages are padded with navigation bars, script tags, class
                attributes, and styling that carry zero semantic value for AI.
                Markdown's explicit structure lets AI models focus on meaning,
                not markup, which improves comprehension and reduces LLM API
                costs at scale.
              </div>
              <div>
                You can further tune extraction with{' '}
                <Link href='/docs/guides/content-conversion/url-to-markdown#scope-noisy-pages'>
                  CSS selector scoping
                </Link>{' '}
                to target only the content your agents need.
              </div>
            </>
          )
        },
        {
          question: 'How much do I save on tokens by converting to markdown?',
          answer: (
            <>
              <div>
                On average, markdown reduces token usage by 80% compared to raw
                HTML. A page costing 20,000 tokens as HTML costs around 4,000
                tokens as markdown. Giving you 5x more content per context
                window.
              </div>
              <div>
                This directly lowers your LLM API costs and increases how much
                information you can process per request. Try it instantly in the{' '}
                <Link href='/tools/'>interactive HTML to Markdown tool</Link>.
              </div>
            </>
          )
        },
        {
          question: 'Does it work on any website?',
          answer: (
            <>
              <div>
                Yes. Microlink extracts markdown from any public URL. The target
                website does not need to natively serve markdown or have any
                special CDN or server-level configuration.
              </div>
              <div>
                Unlike solutions that require opt-in at the infrastructure
                layer, Microlink works on the entire web immediately. See{' '}
                <Link href='/docs/guides/data-extraction/delivery-and-response'>
                  delivery and response
                </Link>{' '}
                for production configuration options.
              </div>
            </>
          )
        },
        {
          question: 'Can I control what content is extracted?',
          answer: (
            <>
              <div>
                Absolutely. Use the{' '}
                <Link href='/docs/guides/content-conversion/url-to-markdown#scope-noisy-pages'>
                  selector parameter
                </Link>{' '}
                to target specific DOM elements — narrow to main, article, or
                any CSS selector. You can also use fallback arrays that try
                selectors in order.
              </div>
              <div>
                Omit the selector entirely to convert the whole page, or combine
                multiple fields to extract different sections of the same page
                in a single API call.
              </div>
            </>
          )
        },
        {
          question: 'Can I get metadata alongside the markdown?',
          answer: (
            <>
              <div>
                Yes. Set <i>meta: true</i> to prepend a YAML frontmatter block
                with normalized metadata — title, description, author,
                publisher, date, word count, and reading time.
              </div>
              <div>
                This structure supports LLM and RAG pipelines by providing
                source context without additional requests. See{' '}
                <Link href='/metadata'>structured metadata extraction</Link> for
                details.
              </div>
            </>
          )
        },
        {
          question: 'How do I integrate it?',
          answer: (
            <>
              <div>
                In minutes. Visit our{' '}
                <Link href='/docs/guides/content-conversion/url-to-markdown'>
                  documentation
                </Link>{' '}
                for interactive playground examples, official{' '}
                <Link href='/docs/mql/getting-started/overview'>
                  MQL client
                </Link>{' '}
                (Node.js, Python, Ruby, Go, etc.), and copy-paste code snippets.
              </div>
              <div>
                Or use the shortcut endpoint markdown.microlink.io/{'<url>'} for
                the simplest possible integration — just an HTTP GET.
              </div>
            </>
          )
        },
        {
          question: 'Where can I see all parameters?',
          answer: (
            <>
              <div>
                Visit the{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API documentation
                </Link>{' '}
                for parameter details, request examples, and SDK usage guides.
              </div>
              <div>
                Key parameters include{' '}
                <Link href='/docs/api/parameters/embed'>embed</Link> for raw
                markdown output,{' '}
                <Link href='/docs/api/parameters/ttl'>ttl</Link> for cache
                control, and the data extraction rules for{' '}
                <Link href='/docs/guides/data-extraction/page-preparation'>
                  CSS selector scoping
                </Link>
                .
              </div>
            </>
          )
        },
        {
          question: 'Is the URL to markdown API free?',
          answer: (
            <>
              <div>
                Yes. The URL to markdown API is free to use with
                25&nbsp;requests per day — no login, no credit card, and no
                setup required. Just call the endpoint and get clean markdown
                back.
              </div>
              <div>
                For production workloads that need higher volume, automatic
                proxy rotation, and priority support, see our{' '}
                <Link href='/pricing'>Pro plans</Link>.
              </div>
            </>
          )
        },
        {
          question: 'What is a URL to markdown service and how does it work?',
          answer: (
            <>
              <div>
                A URL to markdown service takes any web page URL as input,
                fetches the page with a full headless browser, strips away HTML
                noise (ads, navigation, scripts), and returns clean, structured
                markdown text.
              </div>
              <div>
                Microlink&rsquo;s URL to markdown API does this in a single REST
                call:{' '}
                <i>
                  https://api.microlink.io?url=example.com&data.markdown.attr=markdown
                </i>
                . The result is ready for AI agents, RAG pipelines, or any
                downstream text processing.
              </div>
            </>
          )
        },
        {
          question: 'How do I convert a web page to markdown for AI or LLMs?',
          answer: (
            <>
              <div>
                Send the page URL to the Microlink API with the markdown data
                extraction rule. The API renders the page, removes clutter, and
                returns clean markdown with up to 80% fewer tokens than raw
                HTML.
              </div>
              <div>
                You can also use the shortcut endpoint{' '}
                <code>markdown.microlink.io/&#123;url&#125;</code> for quick
                scripts and pipeline prototyping. Try it live in our{' '}
                <Link href='/tools/url-to-markdown'>
                  interactive URL to Markdown tool
                </Link>
                .
              </div>
            </>
          )
        }
      ]}
    />
  )
}
