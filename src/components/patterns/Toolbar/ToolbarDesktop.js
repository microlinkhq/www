import { Choose, Toolbar, Flex, Box, Fixed } from 'components/elements'
import { GitHub, Twitter } from 'components/icons'
import { useLocation } from '@gatsbyjs/reach-router'
import React, { useState } from 'react'
import { rgba } from 'polished'
import { colors } from 'theme'
import { css } from 'styled-components'

import NavContainer from './NavContainer'

import {
  NavBlog,
  NavChangelog,
  NavCommunity,
  NavCompany,
  NavDevelopers,
  NavDocs,
  NavGitHub,
  NavInsights,
  NavFormatsSupported,
  NavLogo,
  NavMeta,
  NavNewsletter,
  NavOpenSource,
  NavPdf,
  NavPricing,
  NavProducts,
  NavRecipes,
  NavScreenshot,
  NavSDK,
  NavTwitter
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
  <Toolbar type='secondary' aria-label='Secondary Navigation'>
    <Flex as='ul' alignItems='center' justifyContent='center' m={0} p={0}>
      <NavContainer as='li' py={2} pr={3} isDark={isDark}>
        {children}
      </NavContainer>
    </Flex>
  </Toolbar>
)

const ToolbarDesktop = ({ theme }) => {
  const isDark = theme === 'dark'
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
    <Fixed
      as='header'
      zIndex={101}
      top={0}
      left={0}
      right={0}
      className='hidden-print'
      css={`
        backdrop-filter: blur(8px);
        background-color: ${rgba(isDark ? 'black' : 'white', 0.5)};
      `}
    >
      <Box px={3}>
        <Toolbar
          aria-label='Primary Navigation'
          justifyContent='space-between'
          mb={secondary && '-16px'}
        >
          <NavContainer as='span'>
            <NavLogo p={1} />
          </NavContainer>
          <NavContainer>
            <Flex
              as='ul'
              alignItems='center'
              justifyContent='center'
              p={0}
              m={0}
            >
              <NavProducts
                as='li'
                pl={0}
                isDark={isDark}
                onMouseEnter={setToolbar('products')}
              />
              <NavDevelopers
                as='li'
                isDark={isDark}
                onMouseEnter={setToolbar('developers')}
              />
              <NavPricing as='li' isDark={isDark} />
              <NavCompany
                as='li'
                isDark={isDark}
                onMouseEnter={setToolbar('company')}
              />
            </Flex>
          </NavContainer>
          <NavContainer as='div'>
            <NavTwitter css={isDark ? iconDark : iconLight}>
              <Twitter />
            </NavTwitter>
            <NavGitHub pl={3} css={isDark ? iconDark : iconLight}>
              <GitHub />
            </NavGitHub>
          </NavContainer>
        </Toolbar>
        <Choose>
          <Choose.When condition={secondary === 'products'}>
            <ToolbarSecondary>
              <NavMeta pl={0} isDark={isDark} fontSize='12px' />
              <NavSDK isDark={isDark} fontSize='12px' />
              <NavPdf isDark={isDark} fontSize='12px' />
              <NavScreenshot isDark={isDark} fontSize='12px' />
              <NavInsights isDark={isDark} fontSize='12px' />
              <NavFormatsSupported isDark={isDark} fontSize='12px' />
            </ToolbarSecondary>
          </Choose.When>
          <Choose.When condition={secondary === 'developers'}>
            <ToolbarSecondary>
              <NavDocs pl={0} isDark={isDark} fontSize='12px' />
              <NavRecipes isDark={isDark} fontSize='12px' />
              <NavCommunity isDark={isDark} fontSize='12px' />
              <NavChangelog isDark={isDark} fontSize='12px' />
            </ToolbarSecondary>
          </Choose.When>
          <Choose.When condition={secondary === 'company'}>
            <ToolbarSecondary>
              <NavBlog isDark={isDark} fontSize='12px' />
              <NavOpenSource isDark={isDark} fontSize='12px' />
              <NavNewsletter isDark={isDark} fontSize='12px' />
            </ToolbarSecondary>
          </Choose.When>
        </Choose>
      </Box>
    </Fixed>
  )
}

export default ToolbarDesktop
