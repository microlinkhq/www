import React from 'react'
import styled from 'styled-components'
import VideoBase from 'components/elements/Video/Video'
import { withContainer } from 'helpers/hoc/with-container'
import { theme } from 'theme'

const mediaStyle = {
  borderRadius: '3px',
  textAlign: 'center'
}

const StyledVideoBase = styled(VideoBase)`
  ${theme(mediaStyle)}
  width: 100%;
`

const _VideoBase = props => <StyledVideoBase autoPlay {...props} />

export const Video = withContainer(_VideoBase)
