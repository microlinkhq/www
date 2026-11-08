import React from 'react'
import { theme } from 'theme'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ApiErrorBody,
  ApiErrorTitle
} from 'components/patterns/ApiError/ApiError'
import {
  SignupPrompt,
  signupCodeFor
} from 'components/patterns/ApiError/SignupPrompt'
import { ToolSurface } from 'components/patterns/Tools/ToolSurface'
import { getErrorMeta } from 'helpers/api-error'

const DEFAULT_FALLBACK = 'Something went wrong. Please try again.'

const ErrorMessage = ({ error, onRetry, fallback, children }) => {
  const showRetry = Boolean(onRetry) && getErrorMeta(error?.code).showRetry

  return (
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '520px'
      })}
    >
      <Text css={theme({ color: 'fullscreen', fontSize: 3 })}>
        <ApiErrorTitle code={error?.code} />
      </Text>
      <Text css={theme({ pt: 2, fontSize: 2, color: 'black60' })}>
        <ApiErrorBody
          code={error?.code}
          variant='tool'
          fallback={fallback || error?.message || DEFAULT_FALLBACK}
        />
      </Text>
      {(showRetry || children) && (
        <Flex
          css={theme({
            pt: 3,
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          })}
        >
          {showRetry && (
            <Button type='button' onClick={onRetry}>
              <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
            </Button>
          )}
          {children}
        </Flex>
      )}
    </Flex>
  )
}

const Frame = ({ children }) => (
  <Flex css={theme({ justifyContent: 'center', pt: [3, 4] })}>
    <ToolSurface
      css={theme({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '640px',
        px: [3, 4],
        py: [4, 5]
      })}
    >
      {children}
    </ToolSurface>
  </Flex>
)

export const ToolError = ({
  error,
  onRetry,
  fallback,
  source,
  product,
  url,
  framed = false,
  children
}) => {
  const signupCode = signupCodeFor(error)
  const content = signupCode
    ? (
      <SignupPrompt
        code={signupCode}
        source={source}
        product={product}
        url={url ?? error.url}
      />
      )
    : (
      <ErrorMessage error={error} onRetry={onRetry} fallback={fallback}>
        {children}
      </ErrorMessage>
      )

  return framed ? <Frame>{content}</Frame> : content
}
