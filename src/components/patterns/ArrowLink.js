import FeatherIcon from 'components/icons/Feather'
import { Link } from 'components/elements/Link/base'
import Flex from 'components/elements/Flex'
import { useHover } from 'components/hook/use-hover'
import React from 'react'

const ArrowLink = ({ children, ...props }) => {
  const [ref, isHover] = useHover()
  const icon = isHover ? 'arrow-right' : 'chevron-right'

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
