import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { theme, fonts } from 'theme'
import React from 'react'
import styled from 'styled-components'

const INK = '#0A0A0A'
const VIOLET = '#9B26D6'
const MUTED = '#9A9AA0'
const BODY = '#3D3D42'
const BORDER = '#EFEFF1'
const CODE_BG = '#F6F6F7'
const MONO = fonts.mono

/* ------------------------------ media renderers ----------------------------- */

// neutral stage that lets a screenshot / logo breathe and sit centered
const Stage = styled(Flex)`
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(#f4f4f6 0% 25%, #fafafb 0% 50%) 50% /
    22px 22px;
`

const ImageOutput = ({ url, alt, contain }) => (
  <Stage css={theme({ p: 4, maxHeight: '480px', overflow: 'auto' })}>
    <Box
      as='img'
      src={url}
      alt={alt}
      loading='lazy'
      css={theme({
        maxWidth: '100%',
        maxHeight: '440px',
        objectFit: contain ? 'contain' : 'initial',
        borderRadius: 4,
        boxShadow: '0 18px 50px -22px rgba(40,10,60,.45)'
      })}
    />
  </Stage>
)

const Swatch = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
`

const LogoOutput = ({ logo, palette }) => (
  <Box>
    <Stage css={theme({ p: 5, minHeight: '220px' })}>
      <Box
        as='img'
        src={logo}
        alt='logo'
        loading='lazy'
        css={theme({
          maxWidth: '160px',
          maxHeight: '160px',
          objectFit: 'contain'
        })}
      />
    </Stage>
    {Array.isArray(palette) && palette.length > 0 && (
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          p: 3,
          borderTop: `1px solid ${BORDER}`
        })}
      >
        {palette.map(color => (
          <Flex key={color} css={theme({ alignItems: 'center', gap: 2 })}>
            <Swatch css={{ background: color }} />
            <Box
              as='span'
              css={theme({ fontFamily: 'mono', fontSize: 0, color: MUTED })}
            >
              {color}
            </Box>
          </Flex>
        ))}
      </Flex>
    )}
  </Box>
)

const PdfOutput = ({ url }) => (
  <Box
    as='iframe'
    src={url}
    title='PDF output'
    css={theme({ width: '100%', height: '520px', border: 0, display: 'block' })}
  />
)

/* ------------------------------ preview card ------------------------------- */

const Card = ({ data, fallbackUrl }) => {
  const image = data.image?.url || data.screenshot?.url
  const logo = data.logo?.url
  const title = data.title || data.publisher || fallbackUrl
  const link = data.url || fallbackUrl

  return (
    <Box css={theme({ p: 4 })}>
      <Box
        css={theme({
          maxWidth: '520px',
          mx: 'auto',
          border: `1px solid ${BORDER}`,
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 18px 50px -28px rgba(40,10,60,.4)'
        })}
      >
        {image && (
          <Box
            as='img'
            src={image}
            alt={title}
            loading='lazy'
            css={theme({
              width: '100%',
              maxHeight: '260px',
              objectFit: 'cover',
              display: 'block',
              borderBottom: `1px solid ${BORDER}`
            })}
          />
        )}
        <Box css={theme({ p: 3 })}>
          <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
            {logo && (
              <Box
                as='img'
                src={logo}
                alt=''
                loading='lazy'
                css={theme({ width: '18px', height: '18px', borderRadius: 2 })}
              />
            )}
            <Box
              as='span'
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                color: MUTED,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              })}
            >
              {link}
            </Box>
          </Flex>
          {title && (
            <Box
              as='span'
              css={theme({
                display: 'block',
                fontSize: 2,
                fontWeight: 'bold',
                color: INK,
                letterSpacing: '-.01em',
                mb: data.description ? 2 : 0
              })}
            >
              {title}
            </Box>
          )}
          {data.description && (
            <Box
              as='p'
              css={theme({ m: 0, fontSize: 1, color: BODY, lineHeight: 1.5 })}
            >
              {data.description}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

/* ------------------------------- markdown -------------------------------- */

// inline spans: image, link, bold, italic, inline code
const INLINE =
  /(!?)\[([^\]]*)\]\(([^)\s]+)[^)]*\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\s][^*]*?)\*|`([^`]+)`/g

const renderInline = (text, keyBase) => {
  const nodes = []
  let last = 0
  let i = 0
  let m

  INLINE.lastIndex = 0
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    const key = `${keyBase}-${i++}`

    if (m[2] !== undefined && m[3]) {
      if (m[1] === '!') {
        nodes.push(
          <Box
            as='img'
            key={key}
            src={m[3]}
            alt={m[2]}
            loading='lazy'
            css={theme({ maxWidth: '100%', borderRadius: 4, my: 2 })}
          />
        )
      } else {
        nodes.push(
          <Box
            as='a'
            key={key}
            href={m[3]}
            target='_blank'
            rel='noopener noreferrer'
            css={theme({ color: VIOLET, textDecoration: 'none' })}
          >
            {m[2]}
          </Box>
        )
      }
    } else if (m[4] !== undefined || m[5] !== undefined) {
      nodes.push(<strong key={key}>{m[4] !== undefined ? m[4] : m[5]}</strong>)
    } else if (m[6] !== undefined) {
      nodes.push(<em key={key}>{m[6]}</em>)
    } else if (m[7] !== undefined) {
      nodes.push(
        <Box
          as='code'
          key={key}
          css={theme({
            fontFamily: 'mono',
            fontSize: '13px',
            background: CODE_BG,
            borderRadius: 3,
            px: 1,
            py: '1px'
          })}
        >
          {m[7]}
        </Box>
      )
    }
    last = INLINE.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

const Prose = styled(Box)`
  max-height: 480px;
  overflow: auto;
  color: ${BODY};

  h1,
  h2,
  h3,
  h4 {
    color: ${INK};
    line-height: 1.25;
    margin: 1.4em 0 0.5em;
    letter-spacing: -0.01em;
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 17px;
  }
  h4 {
    font-size: 15px;
  }
  p {
    margin: 0 0 0.9em;
    line-height: 1.65;
  }
  ul,
  ol {
    margin: 0 0 0.9em;
    padding-left: 1.3em;
    line-height: 1.65;
  }
  li {
    margin: 0.2em 0;
  }
  blockquote {
    margin: 0 0 0.9em;
    padding-left: 14px;
    border-left: 3px solid ${BORDER};
    color: ${MUTED};
  }
  pre {
    margin: 0 0 0.9em;
    padding: 14px 16px;
    background: ${CODE_BG};
    border-radius: 8px;
    overflow: auto;
    font-family: ${MONO};
    font-size: 13px;
    line-height: 1.6;
  }
  hr {
    border: 0;
    border-top: 1px solid ${BORDER};
    margin: 1.4em 0;
  }
  a {
    color: ${VIOLET};
  }
  & > *:first-child {
    margin-top: 0;
  }
`

// strip a leading YAML frontmatter block (Microlink prepends page metadata)
const stripFrontmatter = src =>
  src.replace(/^\s*---\n[\s\S]*?\n---\n?/, '').trimStart()

const Markdown = ({ source }) => {
  const lines = stripFrontmatter(source.replace(/\r\n/g, '\n')).split('\n')
  const blocks = []
  let i = 0
  let key = 0

  const flushList = (items, ordered) => {
    const Tag = ordered ? 'ol' : 'ul'
    blocks.push(
      <Tag key={`b-${key++}`}>
        {items.map((item, idx) => (
          <li key={idx}>{renderInline(item, `li-${key}-${idx}`)}</li>
        ))}
      </Tag>
    )
  }

  while (i < lines.length) {
    const line = lines[i]

    // fenced code block
    const fence = line.match(/^\s*```/)
    if (fence) {
      const buf = []
      i++
      while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++])
      i++ // closing fence
      blocks.push(
        <pre key={`b-${key++}`}>
          <code>{buf.join('\n')}</code>
        </pre>
      )
      continue
    }

    // blank line
    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    // heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const level = Math.min(heading[1].length, 4)
      const Tag = `h${level}`
      blocks.push(
        <Tag key={`b-${key++}`}>{renderInline(heading[2], `h-${key}`)}</Tag>
      )
      i++
      continue
    }

    // horizontal rule
    if (/^\s*(\*\*\*|---|___)\s*$/.test(line)) {
      blocks.push(<hr key={`b-${key++}`} />)
      i++
      continue
    }

    // blockquote
    if (/^\s*>\s?/.test(line)) {
      const buf = []
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      blocks.push(
        <blockquote key={`b-${key++}`}>
          {renderInline(buf.join(' '), `q-${key}`)}
        </blockquote>
      )
      continue
    }

    // unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ''))
        i++
      }
      flushList(items, false)
      continue
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      flushList(items, true)
      continue
    }

    // paragraph: gather consecutive plain lines
    const buf = []
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^\s*(#{1,6}\s|>|[-*+]\s|\d+\.\s|```)/.test(lines[i]) &&
      !/^\s*(\*\*\*|---|___)\s*$/.test(lines[i])
    ) {
      buf.push(lines[i])
      i++
    }
    blocks.push(
      <p key={`b-${key++}`}>{renderInline(buf.join(' '), `p-${key}`)}</p>
    )
  }

  return <Prose css={theme({ p: 4, fontSize: 1 })}>{blocks}</Prose>
}

/* ------------------------------- dispatcher ------------------------------- */

const Empty = ({ children }) => (
  <Box css={theme({ p: 4 })}>
    <Box
      as='span'
      css={theme({ fontFamily: 'mono', fontSize: 0, color: MUTED })}
    >
      {children}
    </Box>
  </Box>
)

const Output = ({ req }) => {
  const data = req.body?.data || {}
  const vertical = req.D.vertical

  switch (vertical) {
    case 'screenshot':
      return data.screenshot?.url
        ? (
          <ImageOutput url={data.screenshot.url} alt='screenshot' />
          )
        : (
          <Empty>No screenshot in this response.</Empty>
          )

    case 'pdf':
      return data.pdf?.url
        ? (
          <PdfOutput url={data.pdf.url} />
          )
        : (
          <Empty>No PDF in this response.</Empty>
          )

    case 'logo':
      return data.logo?.url
        ? (
          <LogoOutput
            logo={data.logo.url}
            palette={data.logo.palette || data.palette || data.image?.palette}
          />
          )
        : (
          <Empty>No logo in this response.</Empty>
          )

    case 'markdown':
      return data.markdown
        ? (
          <Markdown source={data.markdown} />
          )
        : (
          <Empty>No markdown in this response.</Empty>
          )

    default:
      return <Card data={data} fallbackUrl={req.D.fullUrl} />
  }
}

export default Output
