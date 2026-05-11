import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'

import CaptionBase from 'components/patterns/Caption/Caption'

import { withTitle } from 'helpers/hoc/with-title'

export const Caption = withTitle(CaptionBase)

export const SECTION_PX = [3, 3, 4, 4]
export const SECTION_PY = [3, 3, 4, 5]
export const SECTION_MAX_WIDTH = layout.large

export const Section = styled(Box)`
  ${theme({
    py: SECTION_PY,
    px: SECTION_PX,
    width: '100%'
  })}
`

export const SectionInner = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: SECTION_MAX_WIDTH,
    mx: 'auto'
  })}
`

export const BodyText = props => (
  <Caption
    forwardedAs='p'
    titleize={false}
    {...props}
    css={[
      theme({
        fontSize: [1, 2, 2, 2],
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black'
      }),
      props.css
    ]}
  />
)

export const Figure = styled('figure')`
  ${theme({
    m: 0,
    py: [4, 4, 5, 5]
  })}
`

export const FigureImage = styled('img')`
  ${theme({
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    mx: 'auto',
    borderRadius: 3,
    boxShadow: 1
  })}
`
