import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import Caption from 'components/patterns/Caption/Caption'
import { FeaturedToolCard, ToolCard } from 'components/patterns/Tools/ToolCards'

const CategorySection = ({ category, description, tools }) => {
  const featured = tools.find(t => t.featured)
  const rest = tools.filter(t => !t.featured)
  const slug = category.toLowerCase().replace(/\s+/g, '-')

  return (
    <Box as='section' css={theme({ mb: [4, 4, 5, 5] })}>
      <Box css={theme({ mb: [3, 3, 4, 4] })}>
        <Subhead
          id={slug}
          css={theme({ scrollMarginTop: 4, textAlign: 'left' })}
        >
          {category}
        </Subhead>
        <Caption
          forwardedAs='p'
          css={theme({
            mt: 2,
            textAlign: 'left',
            maxWidth: layout.normal
          })}
        >
          {description}
        </Caption>
      </Box>

      {featured && (
        <Box css={theme({ mb: 3 })}>
          <FeaturedToolCard {...featured} />
        </Box>
      )}

      {rest.length > 0 && (
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: [
              '1fr',
              '1fr',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)'
            ],
            gap: 3
          })}
        >
          {rest.map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default CategorySection
