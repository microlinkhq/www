import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'components/elements/Link'
import Image from 'components/elements/Image/Image'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme } from 'theme'
import React from 'react'

const getTwitterLabel = url => {
  if (!url) return null
  try {
    const { pathname } = new URL(url)
    const handle = pathname.split('/').filter(Boolean).pop()
    return handle ? `@${handle}` : url
  } catch (_) {
    return url
  }
}

export const PostAuthor = ({ authorIds = [] }) => {
  const data = useStaticQuery(graphql`
    query BlogAuthorsData {
      allAuthorsYaml {
        nodes {
          key
          name
          avatar
          twitter
        }
      }
    }
  `)

  const authors =
    data?.allAuthorsYaml?.nodes?.filter(node => authorIds.includes(node.key)) ||
    []

  if (authors.length === 0) return null

  return (
    <Flex
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        mt: 2,
        mb: 3
      })}
    >
      {authors.map(author => (
        <Flex
          key={author.key}
          css={theme({ alignItems: 'center', gap: 2 })}
        >
          <Image
            src={author.avatar}
            alt={`Avatar of ${author.name}`}
            width='40px'
            height='40px'
            css={theme({
              borderRadius: 999,
              border: '1px solid',
              borderColor: 'black05'
            })}
          />
          <Flex
            css={theme({ flexDirection: 'column', alignItems: 'flex-start' })}
          >
            <Text css={theme({ fontWeight: 'bold', lineHeight: 1.2 })}>
              {author.name}
            </Text>
            {author.twitter && (
              <Link
                href={author.twitter}
                externalIcon
                css={theme({ fontSize: 1 })}
              >
                {getTwitterLabel(author.twitter)}
              </Link>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
