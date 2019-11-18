import styled, { css } from 'styled-components'

import Microlink from '@microlink/react'
import React from 'react'

import { CARD_WIDTH_DESKTOP, CARD_WIDTH_MOBILE } from './theme'
import { breakpoints } from 'theme'

import { Box, MultiCodeEditor, CodeEditor, Hide } from 'components/elements'

import languages from './languages'

const cardCss = cardWidth => css`
  border: 0 !important;

  .microlink_card__media,
  .microlink_card__media_video_wrapper {
    flex: 0 0 200px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .microlink_card__content {
    flex: 0 0 105px;
  }

  @media screen and (max-width: ${breakpoints[0]}) {
    .microlink_card__media,
    .microlink_card__media_video_wrapper {
      flex: 0 0 165px;
    }
    .microlink_card__content {
      flex: 0 0 130px;
    }
  }
`

const MicrolinkCardDesktop = styled(Microlink)`
  ${cardCss(CARD_WIDTH_DESKTOP)};
`
const MicrolinkCardMobile = styled(Microlink)`
  ${cardCss(CARD_WIDTH_MOBILE)};
`

const CodeEditorWrapper = styled(Box)`
  section,
  pre {
    height: 260px;
  }
`

const CodePreview = ({ children, ...props }) => {
  return (
    <CodeEditorWrapper>
      <MultiCodeEditor languages={languages} />
    </CodeEditorWrapper>
  )
}

const CardPreview = ({ loading, children }) => (
  <>
    <Hide breakpoints={[0, 1]}>
      <MicrolinkCardDesktop
        url={children.url}
        loading={loading}
        size='large'
        setData={() => children}
      />
    </Hide>
    <Hide breakpoints={[2, 3]}>
      <MicrolinkCardMobile
        url={children.url}
        loading={loading}
        size='large'
        setData={() => children}
      />
    </Hide>
  </>
)

const JSONPreview = ({ children, ...props }) => (
  <CodeEditor language='json'>{JSON.stringify(children, null, 2)}</CodeEditor>
)

export default ({ view, ...props }) => {
  if (view === 'preview') return <CardPreview {...props} />
  if (view === 'json') return <JSONPreview {...props} />
  if (view === 'code') return <CodePreview {...props} />
}
