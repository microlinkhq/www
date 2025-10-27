import Choose from 'components/elements/Choose'
import Toolbar from 'components/elements/Toolbar'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { useLocation } from '@gatsbyjs/reach-router'
import { GitHub } from 'components/icons/GitHub'
import { Twitter } from 'components/icons/Twitter'
import { colors, theme } from 'theme'
import React, { useState } from 'react'
import { css } from 'styled-components'
import { rgba } from 'polished'

import NavContainer from './NavContainer'

import {
  NavBlog,
  NavChangelog,
  NavCommunity,
  NavCompany,
  NavDevelopers,
  NavDocs,
  NavFormats,
  NavGitHub,
  NavInsights,
  NavLogo,
  NavMeta,
  NavMicrolinkLogo,
  NavNewsletter,
  NavOpenSource,
  NavPdf,
  NavPricing,
  NavProducts,
  NavRecipes,
  NavScreenshot,
  NavSDK,
  NavTwitter,
  NavUserAgents
} from '../Toolbar/ToolbarLinks'

const iconLight = css`
  color: ${colors.black50};
  &:hover {
    color: ${colors.black80};
  }
`

const iconDark = css`
  color: ${colors.white50};
  &:hover {
    color: ${colors.white80};
  }
`

const ToolbarSecondary = ({ isDark, children }) => (
  <Toolbar as='nav' type='secondary' aria-label='Secondary Navigation'>
    <Flex
      css={`
        ul > li {
          font-size: 13px;
        }
        ${theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          m: 0,
          p: 0
        })}
      `}
    >
      <NavContainer as='ul' css={theme({ pl: 0, py: 2 })} isDark={isDark}>
        {children}
      </NavContainer>
    </Flex>
  </Toolbar>
)

const ToolbarDesktop = ({ isDark }) => {
  const location = useLocation()

  const [secondary, setSecondary] = useState(() => {
    const { pathname } = location

    if (NavProducts.pages.some(pagePath => pathname.startsWith(pagePath))) {
      return 'products'
    }

    if (NavDevelopers.pages.some(pagePath => pathname.startsWith(pagePath))) {
      return 'developers'
    }

    if (NavCompany.pages.some(pagePath => pathname.startsWith(pagePath))) {
      return 'company'
    }

    return ''
  })

  const setToolbar = name => () => setSecondary(name)

  return (
    <Box
      as='header'
      className='hidden-print'
      css={theme({
        position: 'fixed',
        zIndex: 101,
        top: 0,
        left: 0,
        right: 0,
        'backdrop-filter': 'blur(8px)',
        'background-color': rgba(isDark ? 'black' : 'white', 0.5)
      })}
    >
      <Box css={theme({ px: 3 })}>
        <Toolbar
          forwardedAs='nav'
          aria-label='Primary Navigation'
          css={theme({
            justifyContent: 'space-between',
            mb: secondary ? '-16px' : 'inherit'
          })}
        >
          <NavContainer as='span'>
            <NavMicrolinkLogo css={theme({ p: 2 })} />
          </NavContainer>
          <NavContainer>
            <Flex
              as='ul'
              css={theme({
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                m: 0
              })}
            >
              <NavProducts
                isDark={isDark}
                css={theme({ pl: 0 })}
                onMouseEnter={setToolbar('products')}
              >
                Products
              </NavProducts>
              <NavDevelopers
                isDark={isDark}
                onMouseEnter={setToolbar('developers')}
              />
              <NavPricing isDark={isDark} />
              <NavCompany
                isDark={isDark}
                onMouseEnter={setToolbar('company')}
              />
            </Flex>
          </NavContainer>
          <NavContainer as='div'>
            <NavTwitter
              css={`
                ${theme({ pl: 0 })};
                ${isDark ? iconDark : iconLight};
              `}
            >
              <Twitter />
            </NavTwitter>
            <NavGitHub
              css={`
                ${theme({ pl: 3 })};
                ${isDark ? iconDark : iconLight};
              `}
            >
              <GitHub />
            </NavGitHub>
          </NavContainer>
        </Toolbar>
        <Choose>
          <Choose.When condition={secondary === 'products'}>
            <ToolbarSecondary>
              <NavFormats
                css={theme({ pl: 0, fontSize: '13px' })}
                isDark={isDark}
              />
              <NavInsights isDark={isDark} />
              <NavLogo isDark={isDark} />
              <NavMeta isDark={isDark} />
              <NavPdf isDark={isDark} />
              <NavScreenshot isDark={isDark} />
              <NavSDK isDark={isDark} />
            </ToolbarSecondary>
          </Choose.When>
          <Choose.When condition={secondary === 'developers'}>
            <ToolbarSecondary>
              <NavChangelog css={theme({ pl: 0 })} isDark={isDark} />
              <NavCommunity isDark={isDark} />
              <NavDocs isDark={isDark} />
              <NavRecipes isDark={isDark} />
              <NavUserAgents isDark={isDark} />
            </ToolbarSecondary>
          </Choose.When>
          <Choose.When condition={secondary === 'company'}>
            <ToolbarSecondary>
              <NavBlog css={theme({ pl: 0 })} isDark={isDark} />
              <NavNewsletter isDark={isDark} />
              <NavOpenSource isDark={isDark} />
            </ToolbarSecondary>
          </Choose.When>
        </Choose>
      </Box>
    </Box>
  )
}

export default ToolbarDesktop
