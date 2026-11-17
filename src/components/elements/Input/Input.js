import { transition, colors, theme } from 'theme'
import { fieldChrome, fieldChromeTokens } from '../field-chrome'
import { applyExampleKey, exampleHint } from './example'
import { useFocusOnMount } from 'components/hook/use-focus-on-mount'
import React, { forwardRef, useId, useMemo } from 'react'
import styled from 'styled-components'

import Text from '../Text'
import Flex from '../Flex'
import Box from '../Box'

const RAISED_LABEL_SCALE = 0.92
const ICON_SLOT_WIDTH = 24
const FIELD_TEXT_INSET = 8
const LABEL_PADDING_X = 2
const RAISED_LABEL_INSET = -FIELD_TEXT_INSET + LABEL_PADDING_X
const RAISED_LABEL_RIGHT_GAP = 4
const RAISED_LABEL_EXTRA_ROOM =
  FIELD_TEXT_INSET * 2 - RAISED_LABEL_INSET - RAISED_LABEL_RIGHT_GAP
const FIELD_PADDING_Y = '12px'
const EMPTY_PLACEHOLDER = ' '
const INVALID_FIELD = "input[aria-invalid='true']"

export const URL_FIELD_WIDTH = '400px'

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
  }),
  ({ $floating }) =>
    $floating && {
      flex: 1,
      minWidth: 0,
      paddingTop: FIELD_PADDING_Y,
      paddingBottom: FIELD_PADDING_Y
    }
)

const InputBase = forwardRef((props, ref) => (
  <StyledInputBase as='input' type='text' ref={ref} {...props} />
))

InputBase.displayName = 'InputBase'

const InputWrapper = styled(Flex)(
  fieldChromeTokens,
  fieldChrome({
    focus: '&:focus-within',
    invalid: `&:has(${INVALID_FIELD})`,
    disabled: '&:has(input:disabled)'
  }),
  {
    position: 'relative',
    textAlign: 'left',
    '&:focus-within svg': {
      stroke: colors.black80,
      color: colors.black80
    }
  }
)

const FloatingLabelText = styled(Text).attrs({ as: 'span' })(
  theme({
    fontSize: 1,
    lineHeight: 0,
    bg: 'white',
    color: 'black60'
  }),
  {
    '&&&': {
      paddingLeft: `${LABEL_PADDING_X}px`,
      paddingRight: `${LABEL_PADDING_X}px`
    },
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

const labelRestInset = hasIcon =>
  (hasIcon ? ICON_SLOT_WIDTH : 0) + FIELD_TEXT_INSET - LABEL_PADDING_X

const FloatingLabelLayer = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== 'hasIcon'
})(({ hasIcon }) => ({
  '--label-rest-inset': `${labelRestInset(hasIcon)}px`,
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 'var(--label-rest-inset)',
  paddingRight: `${FIELD_TEXT_INSET}px`,
  pointerEvents: 'none',
  containerType: 'size'
}))

const raisedLabel = `${FloatingLabelLayer} > ${FloatingLabelText}`

const raisedLabelStyle = {
  color: colors.black70,
  flexShrink: 0,
  maxWidth: `calc((100% + var(--label-rest-inset) + ${RAISED_LABEL_EXTRA_ROOM}px) / ${RAISED_LABEL_SCALE})`,
  transform: `translate(calc(${RAISED_LABEL_INSET}px - var(--label-rest-inset)), calc(-50cqh - 0.5px)) scale(${RAISED_LABEL_SCALE})`
}

const IconSlot = styled(Flex)({
  flex: `0 0 ${ICON_SLOT_WIDTH}px`,
  justifyContent: 'center',
  alignItems: 'center'
})

const alwaysRaised = {
  'input::placeholder': { opacity: 1 },
  [raisedLabel]: raisedLabelStyle
}

const FloatingLabelField = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== 'raised'
})(({ raised }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  alignSelf: 'stretch',
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
  },
  ...(raised && alwaysRaised)
}))

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
  labelCss,
  autoComplete,
  inputMode,
  label,
  raised = false,
  hint,
  placeholder,
  example,
  onKeyDown,
  autoFocus = false,
  ...props
}) => {
  const id = useId()
  const ref = useFocusOnMount(autoFocus, innerRef)
  const hintId = `${id}-hint`
  const labelId = `${id}-label`

  const handleKeyDown = event => {
    applyExampleKey(event, example, onKeyDown)
  }

  const shownPlaceholder = placeholder ?? (example && exampleHint(example))

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
      ref={ref}
      autoComplete={autoComplete}
      inputMode={inputMode}
      placeholder={
        label ? shownPlaceholder || EMPTY_PLACEHOLDER : shownPlaceholder
      }
      onKeyDown={handleKeyDown}
      $floating={Boolean(label)}
      aria-labelledby={label && !props['aria-label'] ? labelId : undefined}
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
      {label
        ? (
          <FloatingLabelField raised={raised}>
            {Icon && <IconSlot>{Icon}</IconSlot>}
            {input}
            <FloatingLabelLayer hasIcon={Boolean(Icon)}>
              <FloatingLabelText id={labelId}>{label}</FloatingLabelText>
            </FloatingLabelLayer>
          </FloatingLabelField>
          )
        : (
          <>
            {Icon && <Flex>{Icon}</Flex>}
            {input}
          </>
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
