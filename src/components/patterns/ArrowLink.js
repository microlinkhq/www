import { ChevronRight, ArrowRight } from 'react-feather'
import React, { createElement, useState } from 'react'
import { Link, Flex } from 'components/elements'
import { Caption } from 'components/patterns'
import { fontSizes } from 'theme'

const ArrowIcon = React.memo(function ArrowIcon ({ isHover }) {
  return (
    <Flex
      width={[fontSizes[1], fontSizes[1], fontSizes[2], fontSizes[2]]}
      height='100%'
      as='span'
    >
      {createElement(isHover ? ArrowRight : ChevronRight, { size: '100%' })}
    </Flex>
  )
})

const ArrowLink = ({ children, ...props }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <Flex>
      <Link
        linkProps={{ style: { display: 'flex', alignItems: 'center' } }}
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
