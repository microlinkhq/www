import { textGradient, theme, transition, breakpoints } from 'theme'
import { Link } from 'components/elements/Link'
import { formatDate } from 'helpers/format-date'
import { title as titleize } from 'helpers/title'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import styled from 'styled-components'
import React from 'react'
const BlogLink = styled(Link)(
  theme({
    cursor: 'pointer',
    color: 'inherit',
    '&:hover': {
      color: 'inherit'
    },
    [`@media screen and (min-width: ${breakpoints[0]})`]: {
      '&:hover h3, &:hover h4': textGradient
    }
  })
)

const ListFlex = styled(Flex)(
  theme({
    transition: `background-color ${transition.medium}`,
    [`@media screen and (min-width: ${breakpoints[0]})`]: {
      '&:hover': {
        bg: 'gray0',
        px: 3,
        mx: -3,
        borderRadius: 2
      }
    }
  })
)

export const BlogPostList = ({ title, date, slug, excerpt, isLastPost }) => {
  return (
    <BlogLink href={slug} title={title} css={{ width: '100%' }}>
      <ListFlex
        css={theme({
          py: 4,
          flexDirection: 'column',
          borderBottom: isLastPost ? 0 : 1,
          borderColor: 'black05'
        })}
      >
        <Flex
          css={theme({
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexDirection: 'column',
            mb: 2
          })}
        >
          <Text
            as='h3'
            css={theme({
              fontWeight: 'bold',
              mr: 3,
              display: 'inline-block'
            })}
          >
            {titleize(title)}
          </Text>
          <Text
            css={theme({
              pt: 2,
              fontSize: 1,
              color: 'black60',
              whiteSpace: 'nowrap'
            })}
          >
            {formatDate(date)}
          </Text>
        </Flex>
        <Text css={theme({ color: 'black60', my: 2 })}>{excerpt}</Text>
      </ListFlex>
    </BlogLink>
  )
}
