import {
  theme,
  speed,
  toMs,
  timings,
  cx,
  colors,
  radii,
  borders,
  space
} from 'theme'
import {
  FadeBackground,
  FadeBackgroundProvider
} from '../FadeBackground/FadeBackground'
import { childrenTextAll } from 'helpers/children-text-all'
import styled, { css, keyframes } from 'styled-components'
import { aspectRatio } from 'helpers/aspect-ratio'
import { wordBreak } from 'helpers/style'
import { blinkCursorLayoutStyle, createBlinkCursorStyle } from './blink-cursor'
import React, { useRef } from 'react'

import CodeCopy from '../Codecopy'
import Text from '../Text'
import Box from '../Box'

export const TerminalWindow = styled(Box)`
  position: relative;
  overflow: auto;
  border-radius: ${radii[3]};
  border: ${borders[1]};
  border-color: ${props => cx(props.$theme === 'dark' ? 'black' : 'black10')};
  background: ${props => cx(props.$theme === 'dark' ? 'black' : 'white')};
  color: ${props => cx(props.$theme === 'dark' ? 'white70' : 'black')};
`

export const { width: TERMINAL_WIDTH, height: TERMINAL_HEIGHT } = aspectRatio([
  '100%',
  0.48,
  0.68,
  0.68
])

const createBgAnimation = color => keyframes`
from {
  background: transparent;
}
to {
  background: ${color};
}
`

const fromString = text => {
  if (Array.isArray(text)) return text

  const lines = text.split(/\r?\n/)

  return lines.map((item, index) => (
    <span key={index}>
      {item}
      {index < lines.length - 1 ? '\n' : null}
    </span>
  ))
}

const TerminalHeader = styled('div')`
  background: ${props => cx(props.$theme === 'dark' ? 'black95' : 'white')};
  border-top-right-radius: ${radii[3]};
  border-top-left-radius: ${radii[3]};
  border-bottom: ${props => (props.$theme === 'dark' ? borders[1] : 'none')};
  border-bottom-color: ${props =>
    props.$theme === 'dark' ? cx('white10') : 'transparent'};
  display: flex;
  align-items: center;
  padding: 1rem;
  position: sticky;
  height: 36px;
  top: 0;
  z-index: 1;
`

const animationStyle = css`
  background: transparent;
  animation-name: ${props => createBgAnimation(cx(props.color))};
  animation-timing-function: ${timings.long};
  animation-fill-mode: both;
  animation-direction: alternate;
  animation-iteration-count: infinite;
`

export const TerminalButton = styled('div')`
  border-radius: 50px;
  width: 12px;
  height: 12px;

  border: 1px solid;
  border-color: ${colors.black10};
  background: ${props => cx(props.color)};
  ${({ $loading }) => $loading && animationStyle}
`

const animationSpeed = speed.slowly
const animationDuration = toMs(animationSpeed)
const animationDelay = (n = 1) => `${(animationSpeed / 2) * n}ms`

const TerminalButtonRed = ({ loading, ...props }) => (
  <TerminalButton
    color='fullscreen'
    $loading={loading}
    style={
      loading
        ? {
            animationDelay: animationDelay(1),
            animationDuration
          }
        : undefined
    }
    {...props}
  />
)

const TerminalButtonYellow = ({ loading, ...props }) => (
  <TerminalButton
    $loading={loading}
    style={Object.assign(
      { margin: '0 4px' },
      loading && { animationDelay: animationDelay(2), animationDuration }
    )}
    color='minimize'
    {...props}
  />
)

const TerminalButtonGreen = ({ loading, ...props }) => (
  <TerminalButton
    $loading={loading}
    color='close'
    style={
      loading
        ? {
            animationDelay: animationDelay(3),
            animationDuration
          }
        : undefined
    }
    {...props}
  />
)

TerminalButton.Green = TerminalButtonGreen
TerminalButton.Yellow = TerminalButtonYellow
TerminalButton.Red = TerminalButtonRed

const TerminalTitleWrapper = styled('div')`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: ${props => (props.$showWindowButtons ? '-3rem' : 0)};
`

const TerminalHeaderSpacer = styled('div')`
  flex: 1;
`

const TerminalWindowButtons = styled('div')`
  display: flex;
  align-items: center;
`

export const TerminalTitle = ({
  children,
  showWindowButtons = true,
  $theme = 'light'
}) => (
  <TerminalTitleWrapper $showWindowButtons={showWindowButtons}>
    <Text
      css={theme({
        color: $theme === 'dark' ? 'white50' : 'black40',
        fontSize: 0
      })}
    >
      {children}
    </Text>
  </TerminalTitleWrapper>
)

export const TerminalText = styled('div')`
  padding: ${props =>
    props.$autoHeight ? `${space[3]} 8px` : '0 8px 8px 8px'};
  padding-top: ${props =>
    props.$compactAction || props.$autoHeight ? space[3] : 0};
  overflow: visible;
  font-size: 13px;
  line-height: 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  align-items: center;
  position: relative;

  code > span {
    padding: 0 8px;
  }

  > div {
    width: 100%;
  }

  ${theme({
    fontWeight: 'normal',
    fontFamily: 'mono'
  })}
`

const TerminalTextWrapper = styled('div')`
  ${wordBreak};
  overflow: auto;
  width: 100%;
  white-space: pre;
  &::before {
    content: ${props => (props.$shellSymbol ? `'${props.$shellSymbol} '` : '')};
  }
  ${props => props.$blinkCursor && blinkCursorLayoutStyle}
  ${props => props.$blinkCursor && createBlinkCursorStyle()}
`

const TerminalProvider = ({
  ActionComponent = CodeCopy,
  text,
  children,
  loading = false,
  title,
  header,
  showFade = true,
  showHeader = true,
  showWindowButtons = true,
  showTitle = true,
  showAction = true,
  autoHeight = false,
  theme: terminalTheme = 'light',
  ...props
}) => {
  const containerRef = useRef(null)
  const hasTitle = showTitle && title
  const useCompactAction =
    showHeader && !showWindowButtons && !hasTitle && showAction
  const renderHeader =
    showHeader &&
    !useCompactAction &&
    (showWindowButtons || hasTitle || showAction)
  const isDark = terminalTheme === 'dark'
  const fadeColor = isDark ? colors.black : colors.white

  return (
    <FadeBackgroundProvider containerRef={containerRef}>
      <TerminalWindow
        ref={containerRef}
        $theme={terminalTheme}
        css={theme({
          ...(autoHeight
            ? { width: '100%', height: 'auto', minHeight: 0 }
            : { width: TERMINAL_WIDTH }),
          ...(isDark
            ? { bg: 'black', color: 'white70', borderColor: 'black' }
            : { bg: 'white', color: 'black', borderColor: 'black10' })
        })}
        {...props}
      >
        {renderHeader && (
          <TerminalHeader
            $theme={terminalTheme}
            css={
              isDark
                ? theme({
                  bg: 'black95',
                  borderBottom: 1,
                  borderBottomColor: 'white10'
                })
                : undefined
            }
            {...header}
          >
            {showWindowButtons && (
              <TerminalWindowButtons>
                <TerminalButton.Red loading={loading} />
                <TerminalButton.Yellow loading={loading} />
                <TerminalButton.Green loading={loading} />
              </TerminalWindowButtons>
            )}
            {hasTitle && (
              <TerminalTitle
                $theme={terminalTheme}
                showWindowButtons={showWindowButtons}
              >
                {title}
              </TerminalTitle>
            )}
            {!hasTitle && showWindowButtons && (
              <TerminalHeaderSpacer aria-hidden='true' />
            )}
            {showAction && ActionComponent && <ActionComponent text={text} />}
          </TerminalHeader>
        )}

        {useCompactAction && ActionComponent && (
          <Box
            css={theme({
              position: 'absolute',
              top: 2,
              right: 2,
              zIndex: 2
            })}
          >
            <ActionComponent text={text} />
          </Box>
        )}

        {showFade && (
          <FadeBackground.Top
            $fadeColor={fadeColor}
            $offsetTop={useCompactAction ? 0 : undefined}
          />
        )}
        <TerminalText
          $compactAction={useCompactAction}
          $autoHeight={autoHeight}
        >
          {children}
        </TerminalText>
        {showFade && <FadeBackground.Bottom $fadeColor={fadeColor} />}
      </TerminalWindow>
    </FadeBackgroundProvider>
  )
}

const Terminal = ({
  children,
  shellSymbol = false,
  blinkCursor = true,
  colorScheme = 'light',
  autoHeight = false,
  ...props
}) => {
  const content = typeof children === 'string' ? fromString(children) : children
  const text = childrenTextAll(children)

  return (
    <TerminalProvider
      text={text}
      theme={colorScheme}
      autoHeight={autoHeight}
      {...props}
    >
      <TerminalTextWrapper
        $shellSymbol={shellSymbol}
        $blinkCursor={blinkCursor}
      >
        {content}
      </TerminalTextWrapper>
    </TerminalProvider>
  )
}

Terminal.width = TERMINAL_WIDTH
Terminal.height = TERMINAL_HEIGHT

export default Terminal
