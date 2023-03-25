import FeatherIcon from 'components/icons/Feather'
import { Link, Flex } from 'components/elements'
import { Caption } from 'components/patterns'
import React, { useState } from 'react'

const ArrowLink = ({ children, ...props }) => {
  const [isHover, setIsHover] = useState(false)
  const icon = isHover ? 'ArrowRight' : 'ChevronRight'

  return (
    <Flex>
      <Link
        css={`
          > a {
            display: flex;
            align-items: center;
          }
        `}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        fontSize={Caption.defaultProps.fontSize}
        icon={false}
        {...props}
      >
        {children} <FeatherIcon icon={icon} />
      </Link>
    </Flex>
  )
}

export default ArrowLink
