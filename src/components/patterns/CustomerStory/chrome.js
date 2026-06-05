import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const EyebrowBase = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

export const Eyebrow = ({ accent, css, ...rest }) => (
  <EyebrowBase {...rest} css={[theme({ color: accent.text }), css]} />
)

const StoryTagBase = styled(Box)`
  display: inline-flex;
  align-items: center;
  ${theme({
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    textTransform: 'uppercase'
  })}
`

export const StoryTag = ({ accent, css, ...rest }) => (
  <StoryTagBase
    {...rest}
    css={[theme({ bg: accent.bgSoft, color: accent.text }), css]}
  />
)
