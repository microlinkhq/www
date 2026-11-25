import LucideIcon from 'components/icons/Lucide'
import { Link } from 'components/elements/Link'
import Flex from 'components/elements/Flex'
import { useHover } from 'components/hook/use-hover'
import React from 'react'
import { theme } from 'theme'
import { ArrowRight, ChevronRight } from 'lucide-react'

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
        externalIcon={false}
        {...props}
      >
        {children} <LucideIcon icon={icon} />
      </Link>
    </Flex>
  )
}

export const ArrowLinkLabel = ({ children, ...props }) => (
  <Flex
    as='span'
    aria-hidden='true'
    css={theme({
      alignItems: 'center',
      color: 'link',
      fontFamily: 'sans',
      fontSize: 1,
      lineHeight: 2
    })}
    {...props}
  >
    {children} <LucideIcon icon={ChevronRight} size={1} />
  </Flex>
)

export default ArrowLink
