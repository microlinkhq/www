import FeatherIcon from 'components/icons/Feather'
import { Link, Flex } from 'components/elements'
import { Caption } from 'components/patterns'
import { useHover } from 'components/hook'
import React from 'react'

const ArrowLink = ({ children, ...props }) => {
  const [ref, isHover] = useHover()
  const icon = isHover ? 'ArrowRight' : 'ChevronRight'

  return (
    <Flex ref={ref}>
      <Link
        css={`
          > a {
            display: flex;
            align-items: center;
          }
        `}
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
