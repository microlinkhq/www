import {
  Box,
  Button,
  Caps,
  CodeEditor,
  Container,
  Flex,
  Hide,
  Iframe,
  Image,
  Input,
  InputIcon,
  Link,
  Subhead,
  Text
} from 'components/elements'

import {
  Minimize as MinimizeIcon,
  Book as BookIcon,
  Search as SearchIcon,
  File as FileIcon
} from 'react-feather'

import { Faq, Block, SubHeadline } from 'components/patterns'
import React, { useCallback, useMemo, useState } from 'react'
import { pdfUrl, aspectRatio } from 'helpers'
import { useFeaturesPdf } from 'components/hook'
import { HourGlass } from 'components/icons'
import isUrl from 'is-url-http/lightweight'
import { colors, borders } from 'theme'
import prependHttp from 'prepend-http'
import pickBy from 'lodash/pickBy'
import { getDomain } from 'tldts'
import { navigate } from 'gatsby'
import get from 'dlv'
import ms from 'ms'

import { Average, Timings } from 'components/pages/screenshot/examples'
import { screenshotHeight } from 'components/pages/home/screenshots'
import { Features } from 'components/pages/screenshot/template'

const LiveDemo = ({ isLoading, suggestions, onSubmit, query, data }) => {
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [inputWaitFor, setInputWaitFor] = useState(query.waitFor || '')
  const [inputMargin, setInputMargin] = useState(query.margin || '')
  const [inputFormat, setInputFormat] = useState(query.format || '')
  const [inputScale, setInputScale] = useState(query.scale || '')
  const [inputMediaType, setInputMediaType] = useState(query.media || '')

  const domain = useMemo(() => getDomain(inputUrl), [inputUrl])
  const dataPdfUrl = useMemo(() => get(data, 'pdf.url'), [data])

  const getValues = useCallback(() => {
    const preprendUrl = prependHttp(inputUrl)
    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      waitFor: ms(inputWaitFor || '0'),
      margin: inputMargin,
      format: inputFormat,
      scale: inputScale,
      mediaType: inputMediaType
    })
  }, [
    inputUrl,
    inputWaitFor,
    inputMargin,
    inputFormat,
    inputScale,
    inputMediaType
  ])

  const handleSubmit = event => {
    event.preventDefault()
    const { url, ...opts } = getValues()
    return onSubmit(url, opts)
  }

  const previewUrl = React.useMemo(() => {
    const { url, ...opts } = getValues()
    if (!url) return undefined
    onSubmit(url, opts)
    return pdfUrl(url, opts)
  }, [
    inputUrl,
    inputWaitFor,
    inputMargin,
    inputFormat,
    inputScale,
    inputMediaType
  ])

  return (
    <Container id='demo' py={[4, 4, 5, 5]} px={4}>
      <SubHeadline
        title='Generate PDF from any website'
        caption='Turn websites into a PDF'
      />

      <Flex justifyContent='center' alignItems='center'>
        <Flex
          pt={2}
          pb={3}
          as='form'
          mx={[0, 0, 'auto', 'auto']}
          justifyContent='center'
          onSubmit={handleSubmit}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={<InputIcon domain={domain} />}
              id='pdf-demo-url'
              mr='6px'
              placeholder='Visit URL'
              suggestions={suggestions}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '84px', '84px']}
              autoFocus
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Wait'
              id='pdf-demo-waitfor'
              type='text'
              fontSize={2}
              width={['100%', '100%', '48px', '48px']}
              mr='6px'
              value={inputWaitFor}
              onChange={event => setInputWaitFor(event.target.value)}
              iconComponent={<HourGlass color={colors.black50} width='11px' />}
              suggestions={[
                { value: '0s' },
                { value: '1.5s' },
                { value: '3s' }
              ]}
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Margin'
              id='pdf-demo-margin'
              type='text'
              fontSize={2}
              width={['100%', '100%', '67px', '67px']}
              mr='6px'
              value={inputMargin}
              onChange={event => setInputMargin(event.target.value)}
              iconComponent={
                <MinimizeIcon color={colors.black50} width='16px' />
              }
              suggestions={[
                { value: '0' },
                { value: '0.35cm' },
                { value: '4mm' }
              ]}
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Format'
              id='pdf-demo-paper-size'
              type='text'
              fontSize={2}
              width={['100%', '100%', '69px', '69px']}
              mr='6px'
              value={inputFormat}
              onChange={event => setInputFormat(event.target.value)}
              iconComponent={<BookIcon color={colors.black50} width='16px' />}
              suggestions={[
                { value: 'Letter' },
                { value: 'Legal' },
                { value: 'Tabloid' },
                { value: 'A0' },
                { value: 'A1' },
                { value: 'A2' },
                { value: 'A3' },
                { value: 'A4' },
                { value: 'A5' },
                { value: 'A6' }
              ]}
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Scale'
              id='pdf-demo-scale'
              type='text'
              fontSize={2}
              width={['100%', '100%', '57px', '57px']}
              mr='6px'
              value={inputScale}
              onChange={event => setInputScale(event.target.value)}
              iconComponent={<SearchIcon color={colors.black50} width='16px' />}
              suggestions={[
                { value: '0.5' },
                { value: '1' },
                { value: '1.5' },
                { value: '2' }
              ]}
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Media'
              id='pdf-demo-media'
              type='text'
              fontSize={2}
              width={['100%', '100%', '61px', '61px']}
              mr='6px'
              value={inputMediaType}
              onChange={event => setInputMediaType(event.target.value)}
              iconComponent={<FileIcon color={colors.black50} width='16px' />}
              suggestions={[{ value: 'screen' }, { value: 'print' }]}
            />
          </Box>
          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1} children='Get it' />
          </Button>
        </Flex>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        <Text fontSize={2} pb={3}>
          into PDF
        </Text>
        {dataPdfUrl ? (
          <Box>
            <Subhead pb={[2, 2, 3, 3]} textAlign='left' fontSize={[2, 2, 4, 4]}>
              Preview
            </Subhead>
            <Iframe src={dataPdfUrl} />
            <Flex justifyContent='center'>
              <Box mt={4}>
                <Subhead
                  pb={[2, 2, 3, 3]}
                  textAlign='left'
                  fontSize={[2, 2, 4, 4]}
                >
                  Embed
                </Subhead>
                <CodeEditor
                  width={aspectRatio.width}
                  language='html'
                  children={`<iframe src="${previewUrl}"></iframe>`}
                />
              </Box>
            </Flex>
            <Flex pt={4} alignItems='center' justifyContent='center'>
              <Button
                bg='black'
                color='white'
                children='Download file'
                onClick={() => {
                  const link = document.createElement('a')
                  link.download = `${Date.now()}.pdf`
                  link.href = previewUrl
                  window.open(link)
                }}
              />
              <Link ml={3} onClick={() => navigate('/docs/api/parameters/pdf')}>
                <Caps fontWeight='regular' fontSize={0} children='See docs' />
              </Link>
            </Flex>
          </Box>
        ) : (
          <Flex
            border={3}
            borderColor='black20'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            height={screenshotHeight.map(n => `calc(${n} * 0.85)`)}
            width={aspectRatio.width.map(n => `calc(${n} * 0.85)`)}
          >
            <Image
              width={[3, 3, '60%', '60%']}
              style={{ opacity: 0.3, filter: 'grayscale(100%)' }}
              alt='Paste your URL'
              src='https://cdn.microlink.io/illustrations/abstract-no-messages.svg'
            />
            <Text pt={[2, 2, 4, 4]} fontSize={[2, 2, 4, 4]} color='black40'>
              Paste your URL
            </Text>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}

const Resume = props => (
  <Container id='resume' {...props} pt={[4, 4, 0, 0]}>
    <Box pt={[0, 0, 4, 4]}>
      <SubHeadline title='Easy Peasy PDF as service' />
      <Text textAlign='center' mr='auto' ml='auto' maxWidth={9} pb={3}>
        <b>Microlink for PDF</b> turns any website into PDF. Even if the target
        URL hasn't been prepared to be exported, microlink can create a PDF
        version of the URL, with a lot of customizable extra things.
      </Text>
    </Box>

    <Block
      as='section'
      pt={5}
      px={[0, 0, 6, 6]}
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
          pr={[0, 0, 4, 4]}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Always up to date'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Every PDF has a <Link href='/docs/api/parameters/ttl'>ttl</Link>{' '}
            associated. After expiration, they will be automatically refreshed,
            reflecting any change present on the website.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Always up to date'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
    />

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          pl={[0, 0, 4, 4]}
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'end']}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Fully Customizable'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Such as set the paper{' '}
            <Link href='/docs/api/parameters/pdf/format'>format</Link>,
            establish a{' '}
            <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
            the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
            <Link href='/docs/api/parameters/pdf/page-ranges'>page ranges</Link>
            , use{' '}
            <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
            orientation, and a lot more.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Fully Customizable'
          src='https://cdn.microlink.io/illustrations/abstract-2.svg'
        />
      }
    />

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      pb={0}
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Universal Embed'
            pb={3}
          />
          <Text
            pr={[2, 3, 4, 4]}
            pl={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Consume{' '}
            <Link href='/docs/api/getting-started/overview'>Microlik API</Link>{' '}
            directly from your HTML markup using{' '}
            <Link href='/docs/api/parameters/embed'>embed</Link> mode, creating
            PDFs on demand without being worried about code or infrastructure.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Universal Embed'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
    />
  </Container>
)

const Information = props => (
  <Faq
    id='information'
    title='Product Information'
    caption='All you need to know.'
    questions={[
      {
        question: 'How does it work?',
        answer: [
          <>
            <Text as='span' fontWeight='bold' color='black'>
              Microlink for PDF
            </Text>{' '}
            takes any URL as an input and returns a PDF back, hosted at{' '}
            <Link icon href='/blog/edge-cdn/'>
              Microlink CDN
            </Link>
            .
          </>,
          <>
            It supports most of the common PDF tweaks, like paper{' '}
            <Link href='/docs/api/parameters/pdf/format'>format</Link>,
            establish a{' '}
            <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
            the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
            <Link href='/docs/api/parameters/pdf/page-ranges'>page ranges</Link>
            , use{' '}
            <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
            orientation, etc, making it a more complete tool.
          </>
        ]
      },
      {
        question: 'How is it built?',
        answer: [
          <>
            The service is built on top of{' '}
            <Link icon href='https://github.com/puppeteer/puppeteer'>
              puppeteer
            </Link>{' '}
            using Chrome headless browser.
          </>,
          <>
            The browser management is handled by our own driver called{' '}
            <Link icon href='https://browserless.js.org'>
              browserless
            </Link>
            .
          </>,
          <>(Yes, it's open source!).</>
        ]
      },
      {
        question: 'Why not run my own solution?',
        answer: [
          <>
            The service aims to avoid headaches, preventing you for running and
            maintaining your own infrastructure.
          </>,
          <>
            Every URL on the Internet are different and browser are a complex
            piece of software, with unpredictable resources usage.
          </>,
          <>
            The fact of resolve any URL at scale in{' '}
            <Average size='tiny' queryParam='pdf' /> is not a trivial thing.
          </>
        ]
      },
      {
        question: 'Do you have a Service-Level Agreements (SLA)?',
        answer: [
          <>
            You can see our SLA level on{' '}
            <Link display='inline' href='/status' children='status' />
            {' page.'}
          </>
        ]
      },
      {
        question: 'Can I ask a question?',
        answer: [
          <>
            We're always available at{' '}
            <Link
              display='inline'
              href='mailto:hello@microlink.io'
              children='hello@microlink.io'
            />
            .
          </>
        ]
      }
    ]}
    {...props}
  />
)

export default ({ isLoading, onSubmit, suggestions, query, data }) => (
  <>
    <LiveDemo
      data={data}
      isLoading={isLoading}
      onSubmit={onSubmit}
      suggestions={suggestions}
      query={query}
    />
    <Timings queryParam='pdf' />
    <Hide breakpoints={[0, 1]}>
      <Features children={useFeaturesPdf()} />
    </Hide>
    <Resume />
    <Information
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    />
  </>
)
