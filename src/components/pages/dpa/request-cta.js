import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { RequestDpaButton } from './hero'
import { BLOCK_STYLE, DPA_MAILTO } from './shared'

const COPY = {
  full: {
    title: 'Need a countersigned DPA?',
    body: 'Legal or procurement needs a signed copy, Annex I filled in for your use case, the SCCs, the UK Addendum or the Swiss amendments? We handle it end to end, security questionnaires and vendor onboarding included.'
  },
  compact: {
    title: 'Need it signed?',
    body: 'We countersign, fill in Annex I for your use case and handle the paperwork your vendor process asks for.'
  }
}

const FOOTER_LINKS = [
  { href: '/enterprise', label: 'Business & Enterprise' },
  { href: '/subprocessors', label: 'Subprocessors' },
  { href: '/tos', label: 'Terms of service' }
]

const RequestCta = ({ variant = 'full', id = 'request' }) => {
  const { title, body } = COPY[variant]
  return (
    <Box
      as='section'
      id={id}
      aria-labelledby={`${id}-title`}
      css={theme({
        ...BLOCK_STYLE,
        my: 5,
        p: [3, 3, 4, 4],
        bg: 'white',
        border: 1,
        borderColor: 'black10',
        borderRadius: 4,
        boxShadow: 2
      })}
    >
      <Text
        as='h2'
        id={`${id}-title`}
        css={theme({ fontWeight: 'bold', m: 0 })}
      >
        {title}
      </Text>
      <Text css={theme({ pt: 2, color: 'black80' })}>{body}</Text>
      <Flex
        css={theme({
          pt: 3,
          gap: 3,
          flexDirection: ['column', 'row', 'row', 'row'],
          alignItems: ['flex-start', 'center', 'center', 'center']
        })}
      >
        <RequestDpaButton location={id} />
        {variant === 'full' && (
          <Link href={DPA_MAILTO} externalIcon={false}>
            Or email us
          </Link>
        )}
      </Flex>
      {variant === 'compact' && (
        <Flex
          as='nav'
          aria-label='Related'
          css={theme({ pt: 3, gap: 3, flexWrap: 'wrap' })}
        >
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default RequestCta
