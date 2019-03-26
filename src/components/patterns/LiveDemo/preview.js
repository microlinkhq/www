import React, { useState, Fragment } from 'react'
import styled, { css } from 'styled-components'
import Microlink from '@microlink/react'
import ReactJson from 'react-json-view'
import CodeCopy from 'react-codecopy'
import { serializeComponent } from 'helpers'

import { lineHeights, fontSizes, fonts, colors } from 'theme'
import { CARD_WIDTH_DESKTOP, CARD_WIDTH_MOBILE } from './theme'
import { Text, Select, Flex, Hide, Box } from 'components/elements'

import { LiveProvider, LiveEditor } from '../LiveCode'
import EDITOR from './editor'

const EDITORS = Object.keys(EDITOR)

const JSON_THEME = {
  base00: 'white',
  base01: '#654EA3',
  base02: colors.black05,
  base03: '#654EA3',
  base04: '#654EA3',
  base05: '#654EA3',
  base06: '#654EA3',
  base07: '#654EA3',
  base08: '#654EA3',
  base09: colors.secondary,
  base0A: colors.secondary,
  base0B: colors.secondary,
  base0C: colors.secondary,
  base0D: '#654EA3',
  base0E: '#654EA3',
  base0F: colors.secondary
}

const SelectLanguage = ({ children, value, onChange, ...props }) => {
  return (
    <Select
      value={value}
      onChange={event => {
        event.preventDefault()
        const language = event.target.value
        onChange(language)
      }}
      {...props}
    >
      {children.map(language => {
        return (
          <option
            key={language}
            children={language}
            fontSize={0}
            fontWeight='regular'
            mr={2}
          />
        )
      })}
    </Select>
  )
}

const cardCss = cardWidth => css`
  border: 0 !important;
  .microlink_card__media,
  .microlink_card__media_video_wrapper {
    flex: 0 0 165px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .microlink_card__content {
    flex: 0 0 140px;
  }

  .microlink_card__content_description,
  .microlink_card__content_url {
    color: ${colors.black90};
    font-size: 13px;
  }
`

const MicrolinkCardDesktop = styled(Microlink)`
  ${cardCss(CARD_WIDTH_DESKTOP)};
`
const MicrolinkCardMobile = styled(Microlink)`
  ${cardCss(CARD_WIDTH_MOBILE)};
`

const JSONViewer = styled(Box)`
  font-family: ${fonts.monospace};
  font-size: ${fontSizes[1]}px;
  line-height: ${lineHeights[3]};
`

const CustomCodeCopy = styled(CodeCopy)`
  position: inherit;
  right: 0px;
  top: -2px;
  margin-left: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border: 0;
`

const CodePreview = ({ children }) => {
  const [{ editorLang }, setState] = useState({ editorLang: 'React' })
  const editor = EDITOR[editorLang]
  const code = editor(children)

  return (
    <Fragment>
      <Flex flexDirection='column'>
        <Flex
          as='header'
          css={`
            align-self: flex-end;
            position: sticky;
            top: 0;
            right: 0;
            z-index: 1;

            div {
              position: inherit;
            }
          `}
        >
          <Text ml={1} fontSize={0}>
            <SelectLanguage
              mx='auto'
              width={'4.5rem'}
              mb={2}
              bg='white'
              children={EDITORS}
              value={editorLang}
              onChange={editorLang => setState({ editorLang })}
            />
          </Text>
          <CustomCodeCopy interactive text={serializeComponent(code)} />
        </Flex>

        <Box px={2}>
          <LiveProvider language={editor.language} code={code} disabled>
            <LiveEditor
              css={`
                ${editor.whiteSpace
                  ? `white-space: ${editor.whiteSpace} !important`
                  : ''};
              `}
            />
          </LiveProvider>
        </Box>
      </Flex>
    </Fragment>
  )
}

const CardPreview = ({ loading, children }) => (
  <Fragment>
    <Hide breakpoints={[0, 1]}>
      <MicrolinkCardDesktop
        url={children.url}
        loading={loading}
        size='large'
        noFetch
        setData={children}
      />
    </Hide>
    <Hide breakpoints={[2, 3]}>
      <MicrolinkCardMobile
        url={children.url}
        loading={loading}
        size='large'
        noFetch
        setData={children}
      />
    </Hide>
  </Fragment>
)

const JSONPreview = ({ children }) => (
  <JSONViewer>
    <ReactJson
      theme={JSON_THEME}
      collapseStringsAfterLength={18}
      indentWidth={4}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      name={null}
      src={children}
    />
  </JSONViewer>
)

export default ({ view, ...props }) => {
  if (view === 'preview') return <CardPreview {...props} />
  if (view === 'json') return <JSONPreview {...props} />
  if (view === 'code') return <CodePreview {...props} />
}
