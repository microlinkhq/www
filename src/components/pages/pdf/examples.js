import {
  Box,
  Button,
  Caps,
  CodeEditor,
  Container,
  Flex,
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

import { Block, SubHeadline } from 'components/patterns'
import { pdfUrl, aspectRatio, getDomain } from 'helpers'
import { HourGlass } from 'components/icons'
import React, { useState } from 'react'
import debounce from 'lodash/debounce'
import prependHttp from 'prepend-http'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import { navigate } from 'gatsby'
import isUrl from 'is-url-http'
import { colors } from 'theme'
import get from 'dlv'
import ms from 'ms'

import { screenshotHeight } from 'components/pages/home/screenshots'
import { Timings } from 'components/pages/screenshot/examples'

const LiveDemo = ({ isLoading, suggestions, onSubmit, query, data }) => {
  const [mqlOpts, setMqlOpts] = useState(query)
  const dataPdfUrl = get(data, 'pdf.url')
  const [isIframeLoading, setIframeLoading] = useState(false)

  const previewUrl = React.useMemo(() => {
    if (isEmpty(mqlOpts)) return undefined
    const { url, ...opts } = mqlOpts
    return pdfUrl(url, opts)
  }, [mqlOpts])

  const handleSubmit = debounce(opts => {
    const { url, waitFor, ...args } = { ...mqlOpts, ...opts }
    const preprendUrl = prependHttp(url)
    const mergedOpts = pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      waitFor: ms(waitFor || '0'),
      ...args
    })
    setMqlOpts(mergedOpts)
    const { url: targetUrl, ...rest } = mergedOpts
    if (url) onSubmit(targetUrl, rest)
  }, 300)

  return (
    <Container id='demo' py={[4, 5]} px={4}>
      <SubHeadline
        title='Get a PDF from any website'
        caption='Turn websites into a document'
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
              iconComponent={
                <InputIcon
                  value={mqlOpts.url}
                  domain={getDomain(mqlOpts.url)}
                />
              }
              id='pdf-demo-url'
              mr='6px'
              placeholder='Visit URL'
              suggestions={suggestions}
              type='text'
              value={mqlOpts.url}
              onChange={event => handleSubmit({ url: event.target.value })}
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
              value={mqlOpts.waitFor}
              onChange={event => handleSubmit({ waitFor: event.target.value })}
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
              value={mqlOpts.margin}
              onChange={event => handleSubmit({ margin: event.target.value })}
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
              value={mqlOpts.format}
              onChange={event => handleSubmit({ format: event.target.value })}
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
              value={mqlOpts.scale}
              onChange={event => handleSubmit({ scale: event.target.value })}
              iconComponent={<SearchIcon color={colors.black50} width='16px' />}
              suggestions={[
                { value: '0.5' },
                { value: '1' },
                { value: '1.5' },
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
              value={mqlOpts.media}
              onChange={event => handleSubmit({ media: event.target.value })}
              iconComponent={<FileIcon color={colors.black50} width='16px' />}
              suggestions={[{ value: 'screen' }, { value: 'print' }]}
            />
          </Box>

          <Button ml={[0, 0, 2, 2]} loading={isLoading || isIframeLoading}>
            <Caps fontSize={1} children='Get it' />
          </Button>
        </Flex>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        <Text fontSize={2} pb={3}>
          into a PDF
        </Text>
        {dataPdfUrl ? (
          <Box>
            <Iframe
              height={screenshotHeight.map(n => `calc(${n} * 0.85)`)}
              width={aspectRatio.width.map(n => `calc(${n} * 0.85)`)}
              src={dataPdfUrl}
              onLoading={() => setIframeLoading(false)}
              onLoaded={() => setIframeLoading(false)}
            />
            <Flex
              justifyContent='center
            '
            >
              <CodeEditor
                mt={4}
                language='html'
                children={`<iframe src="${previewUrl}"></iframe>`}
              />
            </Flex>
            <Flex pt={4} alignItems='center' justifyContent='center'>
              <a href={previewUrl}>
                <Button bg='black' color='white'>
                  Download File
                </Button>
              </a>
              <Link ml={3} onClick={() => navigate('/docs/api/parameters/pdf')}>
                <Caps fontWeight='regular' fontSize={0} children='See docs' />
              </Link>
            </Flex>
          </Box>
        ) : (
          <Flex
            border={3}
            borderColor='gray5'
            alignItems='center'
            justifyContent='center'
            height={screenshotHeight.map(n => `calc(${n} * 0.85)`)}
            width={aspectRatio.width.map(n => `calc(${n} * 0.85)`)}
          >
            <Text color='gray7'>Paste your URL</Text>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}

const Features = props => (
  <Container id='features' {...props}>
    <Box pt={[0, 0, 4, 4]}>
      <SubHeadline title='Easy Peasy PDF as a service' />
      <Text
        textAlign='center'
        mr='auto'
        ml='auto'
        maxWidth={[9, 9, 10, 10]}
        pb={3}
      >
        <b>Microlink for PDF</b> turns any website into a PDF. Even if the
        target URL hasn't been prepared to be exported, microlink can create a
        PDF version of the URL, with a lot of customizable extra things.
      </Text>
    </Box>

    <Block
      as='section'
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
            children='Background refresh'
            pb={3}
          />
          <Text
            px={[5, 5, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Every screenshot has a{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link> associated. After
            expiration, they will be automatically refreshed, reflecting any
            change present on the website.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[6, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Background refresh'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
    />

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      flexDirection='row-reverse'
      pt={0}
      pb={0}
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
            px={[5, 5, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Such as set the paper{' '}
            <Link href='/docs/api/parameters/pdf/format'>format</Link>,
            establish a document{' '}
            <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
            the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, CSS/JS
            injection,{' '}
            <Link href='/docs/api/parameters/screenshot/scroll-to'>scroll</Link>{' '}
            or <Link href='/docs/api/parameters/screenshot/click'>click</Link>{' '}
            events, and a lot more.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[6, 6, 7, 8]}
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
            pl={[5, 5, 0, 0]}
            maxWidth={8}
            pr={[5, 5, 4, 4]}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Consume{' '}
            <Link href='/docs/api/getting-started/overview'>Microlik API</Link>{' '}
            directly from your HTML markup using{' '}
            <Link href='/docs/api/parameters/embed'>embed</Link> mode, creating
            PDFs on demand without being worried about them.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[6, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Universal Embed'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
    />
  </Container>
)

export default ({
  isLoading,
  onSubmit,
  refBackground,
  refOverlay,
  refUrl,
  refWaitFor,
  suggestions,
  query,
  data
}) => (
  <>
    <LiveDemo
      data={data}
      isLoading={isLoading}
      onSubmit={onSubmit}
      refBackgroundthi={refBackground}
      refOverlay={refOverlay}
      refUrl={refUrl}
      refWaitFor={refWaitFor}
      suggestions={suggestions}
      query={query}
    />
    <Timings />
    <Features />
  </>
)
