import { ChevronRight, ArrowRight } from 'react-feather'
import { Link, Flex } from 'components/elements'
import { Caption } from 'components/patterns'
import React, { useState } from 'react'

const ArrowIcon = React.memo(function ArrowIcon ({ isHover }) {
  return (
    <Flex alignItems='center' as='span'>
      {isHover ? <ArrowRight /> : <ChevronRight />}{' '}
    </Flex>
  )
})

const ArrowLink = ({ children, ...props }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <Flex alignItems='center' justifyContent='center'>
      <Link
        linkProps={{ style: { display: 'flex' } }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        fontSize={Caption.defaultProps.fontSize}
        icon={props.href.startsWith('/')}
        {...props}
      >
        {children} <ArrowIcon isHover={isHover} />
      </Link>
    </Flex>
  )
}

export default ArrowLink
