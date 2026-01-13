import { Link } from 'components/elements/Link'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'

import { DOC_TABS } from 'components/patterns/Aside/constants'

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
      borderBottom: 2,
      borderColor: 'black',
      fontWeight: 600
    })}
  }
`

const isActive = (activeRouteName, tab) =>
  activeRouteName.toLowerCase() === tab.name.toLowerCase()

const DocTabs = ({ activeRouteName }) => {
  return (
    <Box
      css={theme({
        pt: 3,
        pl: 3
      })}
    >
      <Flex>
        {DOC_TABS.map(tab => (
          <TabButton
            key={tab.name}
            href={tab.path}
            className={isActive(activeRouteName, tab) ? 'active' : ''}
            css={theme({
              color: isActive(activeRouteName, tab) ? 'black' : 'black50'
            })}
          >
            <Flex
              css={theme({
                alignItems: 'center',
                gap: 2
              })}
            >
              <Text
                css={theme({
                  fontSize: 0,
                  fontWeight: isActive(activeRouteName, tab)
                    ? 'bold'
                    : 'normal',
                  textTransform: 'uppercase',
                  letterSpacing: 2
                })}
              >
                {tab.name}
              </Text>
            </Flex>
          </TabButton>
        ))}
      </Flex>
    </Box>
  )
}

export default DocTabs
