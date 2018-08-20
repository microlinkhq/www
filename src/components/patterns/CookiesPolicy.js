/* global localStorage */

import React, { Component } from 'react'
import { X } from 'react-feather'
import { Flex, Small, Box, Link } from 'components/elements'
import styled from 'styled-components'
import { colors } from 'theme'

const ID = 'cookie_policy'

const CookiesWrapper = styled(Box)`
  position: fixed;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 2;
`

const CloseButton = styled(Box)`
  display: inline-flex;
  position: relative;
  cursor: pointer;
  transition: all 0.15s ease;
  color: ${colors.lightGray900};

  &:hover {
    color: ${colors.lightGray500};
  }
`
export default class extends Component {
  state = { show: false }

  render () {
    return (
      <CookiesWrapper>
        {this.state.show && (
          <Flex
            alignItems='center'
            bg='white95'
            py={2}
            px={3}
            borderRadius={3}
            boxShadow='rgba(206, 212, 218, 0.5) 0 8px 13px 0'
          >
            <Small fontSize={['10px', 1]} color='black80'>
              <span>By using this website you agree to our </span>
              <Link
                fontSize={0}
                ml={1}
                href={'process.env.LOCALE.footer.cookies.link'}
                children='cookie policy'
              />
            </Small>
            <CloseButton ml={1} onClick={this.hide}>
              <X size={12} color={colors.black80} />
            </CloseButton>
          </Flex>
        )}
      </CookiesWrapper>
    )
  }

  componentDidMount () {
    let show = !(localStorage && localStorage.getItem(ID))
    this.setState({ show })
  }

  hide = event => {
    event.preventDefault()
    this.setState(
      { show: false },
      () => localStorage && localStorage.setItem(ID, false)
    )
  }
}
