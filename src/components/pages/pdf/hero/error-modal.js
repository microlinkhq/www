import React, { useRef } from 'react'
import styled from 'styled-components'
import {
  borders,
  colors,
  theme,
  transition,
  fontSizes,
  space,
  radii
} from 'theme'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { useErrorModalFocus } from 'components/hook/use-error-modal-focus'

const ErrorModalOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${colors.black60};
  backdrop-filter: blur(${space[1]});
  z-index: 2;
`

const ErrorModalWindow = styled('div')`
  ${theme({ bg: 'black95', borderRadius: 4 })};
  border: ${borders[1]} ${colors.red7};
  width: 340px;
  box-shadow: 0 24px 64px ${colors.black80}, 0 4px 16px ${colors.black40};
  overflow: hidden;
`

const ErrorModalHeader = styled('div')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  })};
  padding: ${space[3]} ${space[3]} ${space[2]};
  border-bottom: ${borders[1]} ${colors.white05};
`

const ErrorModalBody = styled('div')`
  ${theme({ p: 3 })};
`

const ErrorCloseButton = styled('button')`
  ${theme({
    bg: 'white10',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white50',
    flexShrink: 0,
    lineHeight: 0,
    fontSize: 0
  })};
  border: none;
  width: ${fontSizes[2]};
  height: ${fontSizes[2]};
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short};

  &:hover {
    background: ${colors.white20};
    color: ${colors.white90};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.white30};
    outline-offset: ${radii[1]};
  }
`

export const ErrorModal = ({ error, setError }) => {
  const errorModalRef = useRef(null)
  useErrorModalFocus({ error, setError, errorModalRef })

  return (
    <ErrorModalOverlay
      role='dialog'
      aria-modal='true'
      aria-label='Error'
      onClick={e => {
        if (e.target === e.currentTarget) setError(null)
      }}
    >
      <ErrorModalWindow ref={errorModalRef} tabIndex={-1}>
        <ErrorModalHeader>
          <Flex css={theme({ alignItems: 'center', gap: 2 })}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              aria-hidden='true'
            >
              <circle
                cx='8'
                cy='8'
                r='7'
                stroke={colors.red6}
                strokeWidth='1.5'
              />
              <path
                d='M8 5v3M8 10.5v.5'
                stroke={colors.red5}
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
            <Text
              as='span'
              css={theme({
                color: 'red5',
                fontSize: 0,
                fontWeight: 'bold',
                letterSpacing: 0
              })}
            >
              <ApiErrorTitle code={error.code} />
            </Text>
          </Flex>
          <ErrorCloseButton
            type='button'
            aria-label='Dismiss error'
            onClick={() => setError(null)}
          >
            &times;
          </ErrorCloseButton>
        </ErrorModalHeader>
        <ErrorModalBody>
          <Text
            as='p'
            css={theme({
              color: 'white90',
              fontSize: 1,
              lineHeight: 2,
              m: 0
            })}
          >
            <ApiErrorBody code={error.code} fallback={error.message} />
          </Text>
        </ErrorModalBody>
      </ErrorModalWindow>
    </ErrorModalOverlay>
  )
}
