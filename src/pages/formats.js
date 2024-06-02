import { DotsBackground, Faq, Caption, Layout } from 'components/patterns'
import {
  Box,
  Button,
  Caps,
  Container,
  Flex,
  Heading,
  Link,
  Subhead,
  Text
} from 'components/elements'

import { cx, colors, borders, layout, theme } from 'theme'
import { XCircle, CheckCircle } from 'react-feather'
import React, { createElement } from 'react'
import { issueUrl } from 'helpers'

import fileFormats from '../../data/formats'
const [{ score }, formats] = fileFormats

const SPACE = {
  SHORT: '82px',
  MEDIUM: '96px',
  LONG: '128px'
}

const SkipIcon = props => <Text {...props}>-</Text>

const StatusIcon = value => {
  const isOptional = value === undefined
  const condition = isOptional ? undefined : false
  const isPresent = value !== condition
  const Icon = isPresent ? CheckCircle : isOptional ? SkipIcon : XCircle
  const color = isPresent ? cx('close') : cx('gray')
  return createElement(
    props => (
      <Box css={theme({ pl: 2 })}>
        <Icon {...props} />
      </Box>
    ),
    { size: 20, color }
  )
}

const HEADER = [
  { children: 'format', style: { minWidth: SPACE.MEDIUM } },
  { children: 'type', style: { minWidth: SPACE.LONG } },
  { children: 'size', style: { minWidth: SPACE.SHORT } },
  { children: 'height', style: { minWidth: SPACE.SHORT } },
  { children: 'width', style: { minWidth: SPACE.SHORT } },
  { children: 'duration', style: { minWidth: SPACE.MEDIUM } },
  { children: 'palette', style: { minWidth: SPACE.MEDIUM } }
]

const FAQs = props => (
  <Faq
    id='information'
    title='FAQs'
    caption='Frequently asked questions.'
    questions={[
      {
        question: 'What is it?',
        answer: (
          <>
            <div>
              It’s a benchmark for measuring{' '}
              <Link href='/docs/api/getting-started/overview'>
                Microlink API
              </Link>{' '}
              capabilities for detecting file URLs when{' '}
              <Link href='/docs/api/parameters/meta'>meta</Link> is enabled
            </div>
          </>
        )
      },
      {
        question: 'Why is it important?',
        answer: (
          <>
            <div>
              The benchmark has two intentions: support as many formats as
              possible, and expand metadata fields properly according to the
              nature of the format.
            </div>
          </>
        )
      },
      {
        question: 'How does it work?',
        answer: (
          <>
            <div>
              There is not only one way, but different techniques are combined
              to resolve the field as fast as possible.
            </div>
            <div>
              These techniques use tools like{' '}
              <Link href='https://ffmpeg.org/'>ffmpeg</Link> or{' '}
              <Link href='https://github.com/Kikobeats/reachable-url'>
                reachable-url
              </Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'Why not run my own solution?',
        answer: (
          <>
            <div>
              You can always run your own solution; Most of our software is{' '}
              <Link href='/oss'>Open Source</Link>, so you can take them and
              hosted from scratch.
            </div>
            <div>
              What we offer as part of our value proposition is a production
              ready solution without the headaches of running your own
              infrastructure.
            </div>
            <div>
              No code to maintain, no servers to scale up, no dependencies to
              upgrade. Just an always ready{' '}
              <Link href='/docs/api/getting-started/overview'>API</Link> ready
              to use.
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
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
    {...props}
  />
)

const FormatsPage = () => (
  <DotsBackground>
    <Layout>
      <Container
        css={theme({
          pt: 2,
          pb: 3,
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Heading css={theme({ px: 5, maxWidth: layout.large })}>
          Supported formats
        </Heading>
        <Caption
          css={theme({
            pt: [3, 3, 4, 4],
            px: 4,
            maxWidth: [layout.small, layout.small, layout.small, layout.small]
          })}
          titleize={false}
        >
          Tested {formats.length} files, {score} resolved
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexDirection: 'column',
            maxWidth: ['95vw', '95vw', undefined, undefined],
            overflowX: 'auto'
          })}
        >
          <Flex as='header'>
            {HEADER.map(({ children, ...props }) => (
              <Text
                key={children}
                css={theme({ fontWeight: 'bold', p: 2 })}
                {...props}
              >
                {children}
              </Text>
            ))}
          </Flex>
          {formats.map(file => {
            return (
              <Flex
                key={file.url}
                css={theme({
                  borderTop: `${borders[1]} ${colors.black05}`,
                  py: 2,
                  _hover: {
                    bg: 'black025',
                    color: 'black'
                  }
                })}
              >
                <Text style={HEADER[0].style} css={theme({ p: 2 })}>
                  <Link href={file.url}>{file.extension}</Link>{' '}
                </Text>
                <Text style={HEADER[1].style} css={theme({ p: 2 })}>
                  {file.type}
                </Text>
                <Flex style={HEADER[2].style} css={theme({ p: 2 })}>
                  {StatusIcon(file.size)}
                </Flex>
                <Text style={HEADER[3].style} css={theme({ p: 2 })}>
                  <Flex>{StatusIcon(file.height)}</Flex>
                </Text>
                <Text style={HEADER[4].style} css={theme({ p: 2 })}>
                  <Flex>{StatusIcon(file.width)}</Flex>
                </Text>
                <Text style={HEADER[5].style} css={theme({ p: 2 })}>
                  <Flex>{StatusIcon(file.duration)}</Flex>
                </Text>
                <Text style={HEADER[6].style} css={theme({ p: 2 })}>
                  <Flex>{StatusIcon(file.palette)}</Flex>
                </Text>
              </Flex>
            )
          })}
        </Flex>
        <Flex
          css={theme({
            py: [5, 5, 6, 6],
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: ['column', 'column', 'row', 'row'],
            width: '100%',
            maxWidth: layout.large,
            px: 4
          })}
        >
          <Subhead>Anything else?</Subhead>
          <Box css={theme({ p: [4, 4, 0, 0] })}>
            <Button
              onClick={() =>
                window.open(issueUrl.bug(), '_blank', 'noopener noreferrer')}
            >
              <Caps>Request a format</Caps>
            </Button>
          </Box>
        </Flex>
      </Container>
      <FAQs
        css={theme({
          pb: [5, 5, 6, 6],
          bg: 'pinky',
          borderTop: `${borders[1]} ${colors.pinkest}`,
          borderBottom: `${borders[1]} ${colors.pinkest}`
        })}
      />
    </Layout>
  </DotsBackground>
)

export default FormatsPage
