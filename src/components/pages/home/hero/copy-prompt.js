import Flex from 'components/elements/Flex'
import { transition, theme } from 'theme'
import React from 'react'
import styled, { css } from 'styled-components'

import { Copy as CopyIcon, Check as CheckIcon } from 'react-feather'

const HeroActions = styled(Flex)`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    mt: '22px',
    flexWrap: 'wrap'
  })};
`

const actionPill = css`
  cursor: pointer;
  transition: border-color ${transition.short}, color ${transition.short},
    background ${transition.short}, transform ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'sans',
    fontSize: '13px',
    fontWeight: 'regular',
    py: '9px',
    px: 3,
    borderRadius: '999px'
  })};

  &:active {
    transform: scale(0.97);
  }
`

const CopyPromptButton = styled.button`
  ${actionPill};
  ${theme({
    bg: 'white',
    color: 'gray7',
    border: 1,
    borderColor: 'gray2'
  })};

  &[data-copied='true'] {
    ${theme({ color: 'green8', borderColor: 'green8' })};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${theme({ borderColor: 'grape7', color: 'black' })};
    }
  }
`

export const CopyPromptAction = ({ promptCopied, copyPrompt, D }) => (
  <HeroActions>
    <CopyPromptButton
      type='button'
      data-copied={promptCopied}
      onClick={copyPrompt}
      aria-label={`Copy an agent prompt for the ${D.label} API`}
    >
      {promptCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      {promptCopied ? 'Copied' : 'Copy prompt'}
    </CopyPromptButton>
  </HeroActions>
)
