import { theme } from 'theme'
import { trackEvent } from 'helpers/gtag'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import {
  DPA_LEAD_REF,
  DPA_MAILTO
} from 'components/pages/enterprise/lead-mailto'

import { BLOCK_STYLE } from './shared'

const REQUEST_DPA_HREF = `/enterprise?ref=${DPA_LEAD_REF}`

const RELATED_LINKS = [
  { href: '/enterprise', label: 'Business & Enterprise' },
  { href: '/subprocessors', label: 'Subprocessors' },
  { href: '/terms', label: 'Terms of service' }
]

const RequestDpaButton = ({ location }) => (
  <Button
    as='a'
    href={REQUEST_DPA_HREF}
    variant='black'
    onClick={() => trackEvent('dpa request', { location })}
  >
    <Caps css={theme({ fontSize: 0 })}>Request a signed DPA</Caps>
  </Button>
)

const CtaCard = ({ id, title, body, actions, children }) => (
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
    <Text as='h2' id={`${id}-title`} css={theme({ fontWeight: 'bold', m: 0 })}>
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
      {actions}
    </Flex>
    {children}
  </Box>
)

export const RequestCta = () => (
  <CtaCard
    id='request'
    title='Need a countersigned DPA?'
    body='Legal or procurement needs a signed copy, Annex I filled in for your use case, the SCCs, the UK Addendum or the Swiss amendments? We handle it end to end, security questionnaires and vendor onboarding included.'
    actions={
      <Link href={DPA_MAILTO} externalIcon={false}>
        Or email us
      </Link>
    }
  />
)

export const RequestSignedCta = () => (
  <CtaCard
    id='request-signed'
    title='Need it signed?'
    body='We countersign, fill in Annex I for your use case and handle the paperwork your vendor process asks for.'
  >
    <Flex
      as='nav'
      aria-label='Related'
      css={theme({ pt: 3, gap: 3, flexWrap: 'wrap' })}
    >
      {RELATED_LINKS.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </Flex>
  </CtaCard>
)
