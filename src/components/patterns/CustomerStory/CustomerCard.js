import { theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { customerPath } from './customers'

const AUTHOR_AVATAR_SIZE = 28

export const CompanyName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

export const CompanyLogo = styled('img')`
  ${theme({
    display: 'block',
    borderRadius: 2
  })}
  object-fit: cover;
`

export const Avatar = styled('img')`
  ${theme({
    borderRadius: '50%',
    flex: '0 0 auto',
    display: 'block'
  })}
  object-fit: cover;
`

export const Initials = styled(Box).withConfig({
  shouldForwardProp: prop => !['size'].includes(prop)
})`
  ${theme({
    borderRadius: '50%',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-size: ${({ size }) => Math.round(size * 0.36)}px;
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: ${shadows[1]};
`

const CardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const CardQuote = styled(Text)`
  ${theme({
    color: 'black60',
    fontSize: 0,
    fontStyle: 'italic',
    lineHeight: 2
  })}
`

const Author = ({ author, role, company, avatar, initials }) => (
  <Flex css={theme({ alignItems: 'center', gap: 2 })}>
    {avatar
      ? (
        <Avatar
          src={avatar}
          alt={author}
          width={AUTHOR_AVATAR_SIZE}
          height={AUTHOR_AVATAR_SIZE}
          loading='lazy'
          decoding='async'
          css={theme({
            width: `${AUTHOR_AVATAR_SIZE}px`,
            height: `${AUTHOR_AVATAR_SIZE}px`
          })}
        />
        )
      : (
        <Initials
          size={AUTHOR_AVATAR_SIZE}
          aria-hidden='true'
          css={theme({ bg: 'black05', color: 'black60' })}
        >
          {initials}
        </Initials>
        )}
    <Box>
      <Text
        css={theme({
          color: 'black',
          fontSize: 0,
          fontWeight: 'bold',
          lineHeight: 1
        })}
      >
        {author}
      </Text>
      <Text css={theme({ color: 'black60', fontSize: '11px' })}>
        {role}, {company}
      </Text>
    </Box>
  </Flex>
)

export const CustomerCard = ({ entry }) => {
  const { slug, name, blurb, icon, quote, author, role, initials, avatar } =
    entry

  return (
    <Card>
      <Flex css={theme({ alignItems: 'center', gap: 2 })}>
        <CompanyLogo
          src={icon}
          alt=''
          width='40'
          height='40'
          loading='lazy'
          decoding='async'
          css={theme({ width: '40px', height: '40px' })}
        />
        <CompanyName as='h3' css={theme({ m: 0 })}>
          {name}
        </CompanyName>
      </Flex>
      <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
        {blurb}
      </Text>
      <CardQuote>“{quote}”</CardQuote>
      <Author
        author={author}
        role={role}
        company={name}
        avatar={avatar}
        initials={initials}
      />
      <CardLink href={customerPath(slug)} css={theme({ color: 'link' })}>
        Read the {name} story&nbsp;→
      </CardLink>
    </Card>
  )
}
