import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import Microlink from 'react-microlink'
import ReactJson from 'react-json-view'

import { lineHeights, fontSizes, fonts, colors } from 'theme'
import { Hide, Box } from 'components/elements'

import { CARD_WIDTH_DESKTOP, CARD_WIDTH_MOBILE } from './theme'

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
    flex: 0 0 105px;
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

export default ({ preview, children }) => {
  return preview === 'SDK' ? (
    <Fragment>
      <Hide breakpoints={[0, 1]}>
        <MicrolinkCardDesktop size='large' noFetch video data={children} />
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <MicrolinkCardMobile size='large' noFetch video data={children} />
      </Hide>
    </Fragment>
  ) : (
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
}
