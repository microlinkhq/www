import React from 'react'
import styled from 'styled-components'
import { textGradient, theme, transition } from 'theme'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link/base'
import { formatDate } from 'helpers/format-date'

const BlogLink = styled(Link)`
  cursor: pointer;
  color: inherit;
  &:hover {
    h3,
    h4 {
      ${textGradient};
    }
  }
`

export const BlogPostGrid = ({ title, date, slug }) => {
  return (
    <BlogLink href={slug} css={{ width: '100%' }}>
      <Flex
        css={theme({
          flexDirection: 'column',
          height: '100%',
          p: 4,
          border: 1,
          borderColor: 'black05',
          borderRadius: 3,
          transition: `all ${transition.short}`,
          _hover: {
            borderColor: 'black10',
            boxShadow: 0,
            transform: 'translateY(-4px)'
          }
        })}
      >
        <Text
          css={theme({
            fontSize: 0,
            color: 'black60',
            mb: 2
          })}
        >
          {formatDate(date)}
        </Text>
        <Text
          as='h4'
          css={theme({
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            m: 0,
            mb: 2
          })}
        >
          {title}
        </Text>
      </Flex>
    </BlogLink>
  )
}

export const BlogPostList = ({ title, date, slug, isLastPost }) => {
  return (
    <BlogLink href={slug} css={{ width: '100%' }}>
      <Flex
        css={theme({
          py: 4,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isLastPost ? 0 : 1,
          borderColor: 'black05',
          transition: `background-color ${transition.medium}`,
          _hover: {
            bg: 'gray0',
            px: 3,
            mx: -3,
            borderRadius: 2
          }
        })}
      >
        <Text
          as='h4'
          css={theme({
            fontSize: 2,
            fontWeight: 'bold',
            m: 0
          })}
        >
          {title}
        </Text>
        <Text
          css={theme({
            fontSize: 1,
            color: 'black60'
          })}
        >
          {formatDate(date)}
        </Text>
      </Flex>
    </BlogLink>
  )
}
