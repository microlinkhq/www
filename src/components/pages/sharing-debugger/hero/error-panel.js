import React from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import { Link } from 'components/elements/Link'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { getErrorMeta } from 'helpers/api-error'

export const ErrorPanel = ({
  error,
  submitUrl,
  inputUrl,
  currentAnalyzedUrl,
  query
}) => (
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
          fallback={
            error?.description ||
            error?.message ||
            "We couldn't fetch metadata for this URL."
          }
        />
      </Text>
      <Flex
        css={theme({
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        })}
      >
        {getErrorMeta(error?.code).showRetry && (
          <Button
            type='button'
            variant='black'
            onClick={() => {
              submitUrl(inputUrl || currentAnalyzedUrl || query.url || '')
            }}
          >
            <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
          </Button>
        )}
        {error?.more && (
          <Link href={error.more} logoIcon>
            Report it
          </Link>
        )}
      </Flex>
    </Box>
  </Flex>
)
