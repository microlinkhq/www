import { ChevronRight, ArrowRight } from 'react-feather'
import { Link, Flex } from 'components/elements'
import React, { useState } from 'react'
import Caption from './Caption/Caption'

export default ({ children, ...props }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <Flex alignItems='center' justifyContent='center'>
      <Link
        linkProps={{ style: { display: 'flex' } }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        fontSize={Caption.defaultProps.fontSize}
        {...props}
      >
        {children}{' '}
        <Flex alignItems='center' as='span'>
          {isHover ? <ArrowRight /> : <ChevronRight />}{' '}
        </Flex>
      </Link>
    </Flex>
  )
}
