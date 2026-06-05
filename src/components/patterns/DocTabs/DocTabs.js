import { Link } from 'components/elements/Link'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme, transition } from 'theme'
import Box from 'components/elements/Box'
import styled from 'styled-components'
import React from 'react'

import { DOC_TABS } from 'components/patterns/Aside/constants'

const TabButton = styled(Link)`
  transition: color ${transition.medium}, border-color ${transition.medium};

  ${theme({
    px: 3,
    py: 3,
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    borderBottom: 2,
    borderBottomColor: 'transparent'
  })}

  &:hover {
    ${theme({ color: 'black80' })}
  }

  &.active {
    ${theme({
      borderBottomColor: 'black',
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
