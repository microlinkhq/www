import React from 'react'
import { Link, Flex } from 'components/elements'
import styled from 'styled-components'

const CustomLink = styled(Link)``

const Announcement = ({ href, children }) => (
  <Flex as='section' px='12px' justifyContent='center' alignItems='center'>
    <CustomLink
      color='black'
      href={href}
      children={
        <>
          {children}
          {' →'}
        </>
      }
    />
  </Flex>
)

export default Announcement
