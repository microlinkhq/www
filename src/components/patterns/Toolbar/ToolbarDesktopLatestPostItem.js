import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Image from 'components/elements/Image/Image'
import React from 'react'
import { formatDate } from 'helpers/format-date'

import { fontWeights, theme } from 'theme'

import { ResourcesLatestPostLink } from './ToolbarDesktopStyles'

const ToolbarDesktopLatestPostItem = ({ post, onItemClick }) => (
  <ResourcesLatestPostLink
    forwardedAs='li'
    href={post.slug}
    data-event-location='Toolbar'
    data-event-name={`Blog Post: ${post.title}`}
    onClick={onItemClick}
  >
    <Text
      as='span'
      className='menu-item-title'
      css={theme({
        display: 'block',
        color: 'black80',
        fontSize: 0,
        lineHeight: 1,
        fontFamily: 'sans',
        fontWeight: fontWeights.regular,
        mb: 1
      })}
    >
      {post.title}
    </Text>
    <Flex
      as='span'
      css={theme({
        display: 'flex',
        alignItems: 'center',
        gap: 1
      })}
    >
      {post.authorAvatars?.[0] && (
        <Image
          src={post.authorAvatars[0]}
          alt={
            post.authorNames?.[0]
              ? `Avatar of ${post.authorNames[0]}`
              : 'Author avatar'
          }
          width='18px'
          height='18px'
          css={theme({
            borderRadius: 999,
            border: '1px solid',
            borderColor: 'black10'
          })}
        />
      )}
      <Text
        as='span'
        css={theme({
          color: 'black60',
          fontSize: 0,
          lineHeight: 1
        })}
      >
        {post.authorNames?.join(', ') || 'Microlink'} · {formatDate(post.date)}
      </Text>
    </Flex>
  </ResourcesLatestPostLink>
)

export default ToolbarDesktopLatestPostItem
