import FeatherIcon from 'components/icons/Feather'
import { Link } from 'components/elements/Link/base'
import Flex from 'components/elements/Flex'
import { useHover } from 'components/hook/use-hover'
import React from 'react'
import { ArrowRight, ChevronRight } from 'react-feather'

const ArrowLink = ({ children, ...props }) => {
  const [ref, isHover] = useHover()
  const icon = isHover ? ArrowRight : ChevronRight

  return (
    <Flex ref={ref}>
      <Link
        css={`
          > a {
            display: flex;
            align-items: center;
          }
        `}
        icon={false}
        {...props}
      >
        {children} <FeatherIcon icon={icon} />
      </Link>
    </Flex>
  )
}

export default ArrowLink
