import {
  theme,
  transition,
  accentBand,
  accentBorderHover,
  accentIcon
} from 'theme'
import { ArrowRight } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import styled from 'styled-components'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import React from 'react'

import { getSkillIcon } from './catalog'
import { SKILL_ICON_TILE_SIZE } from './constants'

const CardLink = styled(Link)`
  transition: border-color ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.medium};

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  > a {
    ${theme({ p: 3, gap: 3 })};
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
`

const SkillCard = ({ skill, accent, fallbackIcon }) => (
  <Flex as='li' css={theme({ minWidth: 0 })}>
    <CardLink
      href={`/skills/${skill.slug}`}
      css={theme({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: 0,
        bg: 'white',
        color: 'black',
        border: 1,
        borderColor: 'black10',
        borderRadius: 3,
        boxShadow: 1,
        textDecoration: 'none',
        '&:hover': {
          borderColor: accentBorderHover(accent),
          boxShadow: 3
        }
      })}
    >
      <Flex css={theme({ gap: 3, alignItems: 'flex-start', minWidth: 0 })}>
        <Flex
          aria-hidden='true'
          css={theme({
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: SKILL_ICON_TILE_SIZE,
            height: SKILL_ICON_TILE_SIZE,
            borderRadius: 3,
            bg: accentBand(accent)
          })}
        >
          <FeatherIcon
            icon={getSkillIcon(skill.slug, fallbackIcon)}
            size={1}
            color={accentIcon(accent)}
          />
        </Flex>
        <Flex css={theme({ flexDirection: 'column', gap: 2, minWidth: 0 })}>
          <Text
            as='h3'
            css={theme({
              color: 'black',
              fontWeight: 'bold',
              fontSize: 0,
              fontFamily: 'mono',
              m: 0,
              overflowWrap: 'break-word'
            })}
          >
            {skill.name}
          </Text>
          <Text
            css={theme({
              color: 'black60',
              fontSize: 0,
              lineHeight: 1,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            })}
          >
            {skill.summary}
          </Text>
        </Flex>
      </Flex>
      <Flex css={theme({ justifyContent: 'flex-end', mt: 'auto' })}>
        <FeatherIcon
          icon={ArrowRight}
          size={1}
          aria-hidden='true'
          color={accentIcon(accent)}
        />
      </Flex>
    </CardLink>
  </Flex>
)

export default SkillCard
