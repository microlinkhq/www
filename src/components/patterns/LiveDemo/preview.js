import React, { Component } from 'react'
import Microlink, { fetchFromApi } from 'react-microlink'
import ReactJson from 'react-json-view'
import styled from 'styled-components'
import { lineHeights, fontSizes, fonts, colors } from 'theme'
import { Box } from 'components/elements'

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

const MicrolinkCard = styled(Microlink)`
  border: 0 !important;
  .microlink_card__media, .microlink_card__media_video_wrapper {
    flex: 0 0 135px;
  }
  .microlink_card__content {
    flex: 0 0 125px;
  }
`

const JSONViewer = styled(Box)`
  font-family: ${fonts.monospace};
  font-size: ${fontSizes[1]}px;
  line-height: ${lineHeights[3]};
`

export default class extends Component {
  state = { loading: true, data: {} }
  componentWillMount () {
    fetchFromApi(this.props).then(({ data }) =>
      this.setState({ data, loading: false })
    )
  }
  render () {
    const { loading, data } = this.state
    const { preview } = this.props
    return preview === 'SDK' ? (
      <MicrolinkCard
        loading={loading}
        size='large'
        data={data}
        noFetch
        video
        {...this.props}
      />
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
          src={data}
        />
      </JSONViewer>
    )
  }
}
