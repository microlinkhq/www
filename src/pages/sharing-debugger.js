import React from 'react'
import { theme } from 'theme'
import Flex from 'components/elements/Flex'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import Meta from 'components/elements/Meta/Meta'
import { cdnUrl } from 'helpers/cdn-url'
import { Hero } from 'components/pages/sharing-debugger/hero'
import Faq from 'components/patterns/Faq/Faq'
import { Link } from 'components/elements/Link/base'
import InputIcon from 'components/elements/Input/InputIcon'

export const Head = () => (
  <Meta
    description='Test how your website will look like on social networks.'
    image={cdnUrl('banner/sharing-debugger.jpeg')}
  />
)

const SharingDebugger = () => {
  return (
    <Layout footer={false}>
      <Hero />
      {/* <Timings /> */}
      <Faq
        css={theme({ pt: 5 })}
        questions={[
          {
            question: 'How it works?',
            answer: (
              <>
                <div>
                  Microlink uses their own meta tags parser called{' '}
                  <Link href='https://metascraper.js.org/#/'>
                    <Flex
                      as='span'
                      alignItems='center'
                      css={{ display: 'inline-flex' }}
                    >
                      <InputIcon
                        width='16px'
                        height='16px'
                        mr={1}
                        query='metascraper.js.org'
                      />
                      metascraper
                    </Flex>
                  </Link>
                  .{' '}
                </div>
                <div>
                  It's a flexible rule-based system for getting unified metatags
                  from any website. A library to easily get unified metadata
                  from websites using{' '}
                  <Link href='https://ogp.me/'>Open Graph</Link>,{' '}
                  <Link href='https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata'>
                    Microdata
                  </Link>
                  ,{' '}
                  <Link href='https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards'>
                    Twitter Cards
                  </Link>
                  , <Link href='https://www.w3.org/RDFa/'>RDFa</Link>,{' '}
                  <Link href='https://json-ld.org/'>JSON-LD</Link>, and more.
                </div>
              </>
            )
          },
          {
            question: 'What are meta tags?',
            answer: (
              <>
                <div>
                  Meta tags are snippets of text that describe a page's content;
                  the meta tags don't appear on the page itself, but only in the
                  page's source code. Meta tags are essentially little content
                  descriptors that help tell search engines and social media
                  platforms what a web page is about, such as the title, image,
                  and description.
                </div>
              </>
            )
          },
          {
            question: 'What is Open Graph?',
            answer: (
              <>
                <div>
                  <Link href='https://opengraphexamples.com/posts/open-graph/'>
                    The Open Graph protocol
                  </Link>{' '}
                  allows web pages to become rich objects in a social graph,
                  enabling any web page to have the same functionality as any
                  other object on social media platforms like Facebook,
                  LinkedIn, and Twitter.
                </div>
                <div css={theme({ pt: 3 })}>
                  Before Open Graph, social media platforms had to guess which
                  content to display from standard meta tags like{' '}
                  <code>description</code> or <code>keywords</code>, which were
                  originally designed for search engines. Open Graph introduced
                  a standardized way to explicitly define rich media elements
                  like preview images and titles, ensuring a consistent and
                  engaging presentation across different social networks.
                </div>
                <div css={theme({ pt: 3 })}>
                  It works by allowing web pages to include specific metadata
                  tags in the HTML that can influence how the page is
                  represented when shared or liked on social platforms.
                </div>
              </>
            )
          },
          {
            question: 'Can I use website screenshots as Open Graph images?',
            answer: (
              <>
                <div>
                  Yes, you can{' '}
                  <Link href='https://takescreenshot.app/'>
                    render website screenshots manually with TakeScreenshot.app
                  </Link>{' '}
                  or use{' '}
                  <Link href='https://screenshotone.com/'>
                    one of the best screenshot APIs
                  </Link>{' '}
                  to automate rendering website screenshots and put them in your
                  meta tags to display in social media previews. It is one of
                  best ways to keep your open graph images up to date and save
                  time on crafting templates.
                </div>
              </>
            )
          },
          {
            question: 'Other questions?',
            answer: (
              <>
                <div>
                  We’re always available at{' '}
                  <Link href='mailto:hello@microlink.io'>
                    hello@microlink.io
                  </Link>
                  .
                </div>
              </>
            )
          }
        ]}
      />
    </Layout>
  )
}

export default withTitle(SharingDebugger)
