import * as mdComponents from 'components/markdown'
import { Chat, Layout } from 'components/patterns'
import { Text, Box } from 'components/elements'
import React, { Fragment } from 'react'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import MDX from 'mdx-scoped-runtime'
import Head from 'components/Head'
import slug from 'remark-slug'
import { omit } from 'lodash'

const { H1, H2, Paraph, Strong, Link, Blockquote } = mdComponents

const scopeComponents = omit(mdComponents, 'default')

const PostFooter = () => (
  <Fragment>
    <H2>Come chat with us</H2>
    <Chat />
    <Paraph>
      All of these improvements or features are{' '}
      <Strong>community driven</Strong>: We listen to your feedback and act
      accordingly.
    </Paraph>
    <Paraph>
      Whether you are are building a product and you need fancy previews, you’re
      an indie hacker or simply you like frontend stuff, come{' '}
      <Link href='https://chat.microlink.io/'>chat</Link> with us 🙂.
    </Paraph>
  </Fragment>
)

export default ({ isBlogPage, date, meta, content }) => (
  <Layout>
    <Box px={3}>
      <Head {...meta} />
      <Text as='header' textAlign='center' mb={5} maxWidth='900px' mx='auto'>
        <H1
          textAlign='center'
          children={meta.title}
          slug={false}
          variant='gradient'
        />
        {isBlogPage && (
          <Text fontSize={2} color='gray'>
            {formatDate(date)} ({<TimeAgo date={date} />})
          </Text>
        )}
      </Text>

      {!isBlogPage && date && (
        <Blockquote>
          <Paraph>
            Las Updated: {formatDate(date)} ({<TimeAgo date={date} />})
          </Paraph>
        </Blockquote>
      )}

      <MDX
        components={mdComponents.default}
        scope={scopeComponents}
        mdPlugins={[slug]}
      >
        {content}
      </MDX>
      {isBlogPage && <PostFooter />}
    </Box>
  </Layout>
)
