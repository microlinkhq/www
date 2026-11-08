import React from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { getErrorMeta } from 'helpers/api-error'
import {
  SignupPrompt,
  hasSignupPrompt
} from 'components/patterns/ApiError/SignupPrompt'

export const ErrorPanel = ({ error, onRetry, url }) =>
  hasSignupPrompt(error?.code)
    ? (
      <Flex css={theme({ justifyContent: 'center', pt: [3, 4] })}>
        <SignupPrompt
          code={error.code}
          source='sitemap'
          product='links'
          url={url}
        />
      </Flex>
      )
    : (
      <Flex css={theme({ justifyContent: 'center', pt: [3, 4] })}>
        <Box
          css={theme({
            width: '100%',
            maxWidth: '640px',
            bg: 'red0',
            border: 1,
            borderColor: 'red2',
            borderRadius: 3,
            p: [3, 4],
            textAlign: 'center'
          })}
        >
          <Text
            css={theme({
              color: 'red8',
              fontSize: [1, 2],
              fontWeight: 'bold',
              mb: 2
            })}
          >
            <ApiErrorTitle code={error?.code} />
          </Text>
          <Text css={theme({ fontSize: 1, color: 'black60', mb: 3 })}>
            <ApiErrorBody
              code={error?.code}
              variant='tool'
              fallback={error?.message || "We couldn't read this site's sitemap."}
            />
          </Text>
          {getErrorMeta(error?.code).showRetry && (
            <Button type='button' variant='black' onClick={onRetry}>
              <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
            </Button>
          )}
        </Box>
      </Flex>
      )
