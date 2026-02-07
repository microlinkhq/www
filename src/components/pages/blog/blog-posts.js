import { textGradient, theme, transition, breakpoints } from 'theme'
import { Link } from 'components/elements/Link'
import { formatDate } from 'helpers/format-date'
import { title as titleize } from 'helpers/title'
import { H2 } from 'components/markdown'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Image from 'components/elements/Image/Image'
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
      '&:hover h2': textGradient
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

export const BlogPostList = ({
  title,
  date,
  slug,
  excerpt,
  isLastPost,
  authorAvatars,
  authorNames
}) => {
  const dateLabel =
    authorNames && authorNames.length > 0
      ? `${authorNames.join(', ')} · ${formatDate(date)}`
      : formatDate(date)

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
          <H2
            slug={false}
            css={theme({
              mt: 0,
              mb: 0,
              fontWeight: 'bold',
              display: 'inline-block'
            })}
          >
            {titleize(title)}
          </H2>
          <Flex
            css={theme({
              alignItems: 'center',
              gap: 2,
              pt: 2
            })}
          >
            {authorAvatars && authorAvatars.length > 0 && (
              <Flex css={theme({ alignItems: 'center' })}>
                {authorAvatars.map((avatar, index) => (
                  <Image
                    key={`${avatar}-${index}`}
                    src={avatar}
                    alt={
                      authorNames?.[index]
                        ? `Avatar of ${authorNames[index]}`
                        : 'Author avatar'
                    }
                    width='22px'
                    height='22px'
                    css={theme({
                      borderRadius: 999,
                      border: '1px solid',
                      borderColor: 'black05',
                      ml: index === 0 ? 0 : '-8px',
                      position: 'relative',
                      zIndex: authorAvatars.length - index
                    })}
                  />
                ))}
              </Flex>
            )}
            <Text
              css={theme({
                fontSize: 1,
                color: 'black60',
                whiteSpace: 'nowrap'
              })}
            >
              {dateLabel}
            </Text>
          </Flex>
        </Flex>
        <Text css={theme({ color: 'black60', my: 2 })}>{excerpt}</Text>
      </ListFlex>
    </BlogLink>
  )
}
