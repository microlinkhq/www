import React from 'react'
import { theme, touchTargets } from 'theme'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

export const EXAMPLES = [
  { label: 'microlink.io', url: 'https://microlink.io' },
  { label: 'vercel.com', url: 'https://vercel.com' },
  { label: 'x.ai', url: 'https://x.ai' }
]

export const ExampleLinks = ({ onPick }) => (
  <Text
    as='p'
    css={theme({
      mt: 3,
      fontSize: 1,
      color: 'black60',
      textAlign: 'center',
      px: 3
    })}
  >
    Try an example:{' '}
    {EXAMPLES.map((example, index) => (
      <React.Fragment key={example.url}>
        {index > 0 && (
          <Text as='span' css={theme({ color: 'black20', px: 2 })}>
            ·
          </Text>
        )}
        <Link
          href={`/tools/sitemap?url=${encodeURIComponent(example.url)}`}
          onMouseDown={event => event.preventDefault()}
          onClick={event => {
            if (
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              event.button !== 0
            ) {
              return
            }
            event.preventDefault()
            onPick(example.url)
          }}
          css={theme({
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: touchTargets.minHeight
          })}
        >
          {example.label}
        </Link>
      </React.Fragment>
    ))}
  </Text>
)
