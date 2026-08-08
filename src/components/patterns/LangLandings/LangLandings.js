import React from 'react'
import { theme } from 'theme'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

export const LangLandingsNav = ({ langs, current, label, accent }) => {
  const siblings = langs.filter(item => item.lang !== current)
  if (siblings.length === 0) return null

  return (
    <Flex
      as='nav'
      aria-label={label}
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2,
        fontSize: [1, 1, 2, 2],
        color: 'black60'
      })}
    >
      <Text as='span' css={theme({ fontSize: 'inherit' })}>
        {`${label}:`}
      </Text>
      {siblings.map(({ lang, label: langLabel, href }, index) => (
        <Flex key={lang} css={theme({ alignItems: 'center', gap: 2 })}>
          {index > 0 && (
            <Text
              as='span'
              css={theme({ fontSize: 'inherit', color: 'black30' })}
            >
              ·
            </Text>
          )}
          <Link href={href} style={{ color: accent }}>
            {langLabel}
          </Link>
        </Flex>
      ))}
    </Flex>
  )
}

export default LangLandingsNav
