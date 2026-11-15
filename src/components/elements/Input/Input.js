import { transition, colors, theme, touchTargets } from 'theme'
import React, { useId, useMemo } from 'react'
import styled from 'styled-components'

import Text from '../Text'
import Flex from '../Flex'
import Box from '../Box'

const RAISED_LABEL_SCALE = 0.92
const RAISED_LABEL_SHIFT_X = '-12px'
const FOCUS_RING_WIDTH = '3px'
const DISABLED_OPACITY = 0.55
const EMPTY_PLACEHOLDER = ' '
const INVALID_FIELD = "input[aria-invalid='true']"

const focusRing = color =>
  `0 0 0 ${FOCUS_RING_WIDTH} color-mix(in oklch, ${color} 20%, transparent)`

const StyledInputBase = styled(Text)(
  {
    lineHeight: 'inherit',
    background: 'transparent',
    maxWidth: '100%',
    display: 'inline-block',
    verticalAlign: 'middle',
    appearance: 'none',
    color: 'inherit',
    '&:focus-visible': {
      outline: 'none'
    },
    '&:disabled': {
      cursor: 'not-allowed'
    }
  },
  theme({
    border: 0,
    p: 0,
    mx: 2
  })
)

const InputBase = props => <StyledInputBase as='input' type='text' {...props} />

const InputWrapper = styled(Flex)(
  theme({
    bg: 'white',
    color: 'black80',
    border: 1,
    borderColor: 'black10',
    borderRadius: 4
  }),
  {
    position: 'relative',
    minHeight: touchTargets.minHeight,
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    transition: ['border-color', 'box-shadow', 'opacity']
      .map(property => `${property} ${transition.short}`)
      .join(', '),
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none'
    },
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover': {
        borderColor: colors.black20
      }
    },
    '&:focus-within': {
      borderColor: colors.link,
      boxShadow: focusRing(colors.link),
      svg: {
        stroke: colors.black80,
        color: colors.black80
      }
    },
    [`&:has(${INVALID_FIELD})`]: {
      borderColor: colors.red8
    },
    [`&:has(${INVALID_FIELD}):focus-within`]: {
      boxShadow: focusRing(colors.red8)
    },
    '&:has(input:disabled)': {
      opacity: DISABLED_OPACITY,
      cursor: 'not-allowed'
    }
  }
)

const FloatingLabelText = styled(Text).attrs({ as: 'span' })(
  theme({
    fontSize: 1,
    lineHeight: 0,
    bg: 'white',
    color: 'black60',
    px: '2px'
  }),
  {
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    transformOrigin: 'left center',
    transition: `color ${transition.short}`,
    '@media (prefers-reduced-motion: no-preference)': {
      transition: ['color', 'transform']
        .map(property => `${property} ${transition.short}`)
        .join(', ')
    }
  }
)

const FloatingLabelLayer = styled(Box)(theme({ px: '6px' }), {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
  containerType: 'size'
})

const raisedLabel = `${FloatingLabelLayer} > ${FloatingLabelText}`

const raisedLabelStyle = {
  color: colors.black70,
  transform: `translate(${RAISED_LABEL_SHIFT_X}, calc(-50cqh - 0.5px)) scale(${RAISED_LABEL_SCALE})`
}

const FloatingLabelField = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  alignSelf: 'stretch',
  input: {
    flex: 1,
    minWidth: 0,
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  'input::placeholder': {
    opacity: 0
  },
  'input:focus::placeholder': {
    opacity: 1
  },
  [`input:focus ~ ${raisedLabel}, input:not(:placeholder-shown) ~ ${raisedLabel}`]:
    raisedLabelStyle,
  [`input:autofill ~ ${raisedLabel}`]: raisedLabelStyle,
  [`input:focus ~ ${raisedLabel}`]: {
    color: colors.link
  },
  [`${INVALID_FIELD} ~ ${raisedLabel}`]: {
    color: colors.red8
  }
})

const InputHint = styled(Text)(
  theme({
    fontSize: 0,
    lineHeight: 1,
    color: 'black60',
    pt: 1
  })
)

const joinIds = (...ids) => ids.filter(Boolean).join(' ') || undefined

const Input = ({
  innerRef,
  iconComponent: Icon,
  suggestions,
  children,
  labelCss,
  autoComplete,
  inputMode,
  label,
  hint,
  placeholder,
  ...props
}) => {
  const hintId = `${useId()}-hint`

  const list = useMemo(() => {
    if (!suggestions) return undefined
    if (!props.id) {
      throw new Error(
        'Need to provide an id to be associated with suggestions list.'
      )
    }
    return `${props.id}-suggestions`
  }, [props.id, suggestions])

  const input = (
    <InputBase
      list={list}
      ref={innerRef}
      autoComplete={autoComplete}
      inputMode={inputMode}
      placeholder={label ? placeholder || EMPTY_PLACEHOLDER : placeholder}
      {...props}
      aria-describedby={joinIds(props['aria-describedby'], hint && hintId)}
    />
  )

  const field = (
    <InputWrapper
      as='label'
      css={theme({
        pr: suggestions ? 0 : 2,
        py: label ? 0 : '12px',
        pl: 2,
        alignItems: 'center',
        ...labelCss
      })}
    >
      {Icon && <Flex>{Icon}</Flex>}
      {label
        ? (
          <FloatingLabelField>
            {input}
            <FloatingLabelLayer>
              <FloatingLabelText>{label}</FloatingLabelText>
            </FloatingLabelLayer>
          </FloatingLabelField>
          )
        : (
            input
          )}

      {suggestions && (
        <datalist id={list}>
          {suggestions.map(props => (
            <option key={`${list}_${props.value}`} {...props} />
          ))}
        </datalist>
      )}
    </InputWrapper>
  )

  if (!hint) return field

  return (
    <Box>
      {field}
      <InputHint id={hintId}>{hint}</InputHint>
    </Box>
  )
}

export default Input
