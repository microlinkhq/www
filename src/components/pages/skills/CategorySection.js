import { theme, layout, accentBand, accentIcon, accentTile } from 'theme'
import FeatherIcon from 'components/icons/Feather'
import SubheadBase from 'components/elements/Subhead'
import { withTitle } from 'helpers/hoc/with-title'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import React from 'react'

import SkillCard from './SkillCard'
import {
  CATEGORY_ICON_TILE_SIZE,
  CATEGORY_TITLE_FONT_SIZE,
  SECTION_SCROLL_MARGIN
} from './constants'

const Subhead = withTitle(SubheadBase)

const CategorySection = ({ category }) => (
  <Flex
    as='section'
    id={category.id}
    aria-labelledby={`${category.id}-title`}
    css={theme({
      flexDirection: ['column', 'column', 'row', 'row'],
      alignItems: 'stretch',
      gap: [3, 3, 4, 4],
      p: [3, 3, 4, 4],
      width: '100%',
      maxWidth: layout.large,
      borderRadius: 5,
      bg: accentBand(category.accent),
      scrollMarginTop: SECTION_SCROLL_MARGIN
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        flexShrink: 0,
        width: ['100%', '100%', '32%', '32%']
      })}
    >
      <Flex
        aria-hidden='true'
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: CATEGORY_ICON_TILE_SIZE,
          height: CATEGORY_ICON_TILE_SIZE,
          borderRadius: 4,
          bg: accentTile(category.accent)
        })}
      >
        <FeatherIcon
          icon={category.icon}
          size={[2, 2, 3, 3]}
          color={accentIcon(category.accent)}
        />
      </Flex>
      <Box>
        <Subhead
          titleize={false}
          forwardedAs='h2'
          id={`${category.id}-title`}
          css={theme({
            fontSize: CATEGORY_TITLE_FONT_SIZE,
            color: 'black',
            textAlign: 'left',
            m: 0
          })}
        >
          {category.title}
        </Subhead>
        <Text
          css={theme({
            color: 'black60',
            fontSize: 0,
            lineHeight: 1,
            pt: 2
          })}
        >
          {category.description}
        </Text>
      </Box>
    </Flex>
    <Box
      as='ul'
      css={theme({
        listStyle: 'none',
        m: 0,
        p: 0,
        width: '100%',
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)'],
        alignContent: 'flex-start',
        gap: 3
      })}
    >
      {category.skills.map(skill => (
        <SkillCard
          key={skill.slug}
          skill={skill}
          accent={category.accent}
          fallbackIcon={category.icon}
        />
      ))}
    </Box>
  </Flex>
)

export default CategorySection
