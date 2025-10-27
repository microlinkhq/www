import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link/base'
import Text from 'components/elements/Text'

const TabButton = styled(Link)`
  ${theme({
    px: 3,
    py: 3,
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease'
  })}

  &:hover {
    ${theme({ color: 'black80' })}
  }

  &.active {
    ${theme({
      borderColor: 'black80',
      fontWeight: 600
    })}
  }
`

const isActive = (activeRouteName, tab) =>
  activeRouteName.toLowerCase() === tab.name.toLowerCase()

const DocTabs = ({ activeRouteName }) => {
  const tabs = [
    { name: 'API', path: '/docs/api/getting-started/overview' },
    { name: 'MQL', path: '/docs/mql/getting-started/overview' },
    { name: 'CARDS', path: '/docs/cards/getting-started/overview' }
  ]

  console.log(activeRouteName)

  return (
    <Box
      css={theme({
        pt: 3,
        pl: 3
      })}
    >
      <Flex>
        {tabs.map(tab => (
          <TabButton
            key={tab.name}
            href={tab.path}
            className={isActive(activeRouteName, tab) ? 'active' : ''}
            css={theme({
              color: isActive(activeRouteName, tab) ? 'black' : 'black50'
            })}
          >
            <Text
              css={theme({
                fontSize: 0,
                fontWeight: isActive(activeRouteName, tab) ? 'bold' : 'normal',
                textTransform: 'uppercase',
                letterSpacing: 2
              })}
            >
              {tab.name}
            </Text>
          </TabButton>
        ))}
      </Flex>
    </Box>
  )
}

export default DocTabs
