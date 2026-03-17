import React from 'react'
import styled from 'styled-components'
import { ArrowRight, ChevronRight } from 'react-feather'
import { theme, transition, space } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Image from 'components/elements/Image/Image'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import Video from 'components/elements/Video/Video'

const CardBase = styled(Box)(
  theme({
    borderRadius: 3,
    border: 1,
    borderColor: 'black05',
    bg: 'white',
    overflow: 'hidden',
    transition: `border-color ${transition.medium}, box-shadow ${transition.medium}`,
    _hover: {
      borderColor: 'black20',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
    }
  })
)

const Tag = styled(Text)(
  theme({
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'black70',
    bg: 'black05',
    px: 2,
    py: 1,
    borderRadius: 1,
    lineHeight: 1,
    display: 'inline-block'
  })
)

const ImagePreview = styled(Box)(
  theme({
    bg: 'black025',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
)

const ArrowIndicator = ({ isHover, size = 18, containerCss = {} }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'center',
      width: space[4],
      height: space[4],
      borderRadius: '50%',
      bg: isHover ? 'black05' : 'black025',
      color: isHover ? 'black80' : 'black50',
      transition: `background ${transition.medium}, color ${transition.medium}`,
      flexShrink: 0,
      ...containerCss
    })}
  >
    {isHover ? <ArrowRight size={size} /> : <ChevronRight size={size} />}
  </Flex>
)

const TOOL_ICON_CHIP_VARIANTS = {
  featured: { iconSize: 20 },
  default: { iconSize: 12 }
}

const ToolIconChip = ({ icon: Icon, variant = 'default' }) => {
  const { iconSize } = TOOL_ICON_CHIP_VARIANTS[variant]

  return (
    <Flex
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black60',
        flexShrink: 0
      })}
    >
      <Icon width={`${iconSize}px`} height={`${iconSize}px`} />
    </Flex>
  )
}

const renderToolImage = ({ image, title, styles, transform }) => {
  const mediaCss = theme({
    ...styles,
    transform
  })

  return image.endsWith('.mp4')
    ? (
      <Video src={image} title={title} css={mediaCss} />
      )
    : (
      <Image src={image} alt={title} css={mediaCss} />
      )
}

export const FeaturedToolCard = ({
  title,
  description,
  href,
  icon: Icon,
  image,
  tags,
  styles = {},
  animation = [],
  linkCss = {},
  cardCss = {},
  previewCss = {},
  titleCss = {},
  descriptionCss = {},
  arrowCss = {}
}) => {
  const [isHover, setIsHover] = React.useState(false)
  const transform = isHover ? animation[0] : animation[1]

  return (
    <Link
      href={href}
      css={theme({
        textDecoration: 'none',
        color: 'inherit',
        _hover: { color: 'inherit' },
        display: 'block',
        height: '100%',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        ...linkCss
      })}
    >
      <CardBase
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        onTouchCancel={() => setIsHover(false)}
        css={theme({
          borderColor: 'black10',
          display: 'flex',
          flexDirection: 'column',
          ...cardCss
        })}
      >
        <ImagePreview
          css={theme({
            height: ['180px', '200px', '260px', '260px'],
            borderBottom: 1,
            borderColor: 'black05',
            ...previewCss
          })}
        >
          {renderToolImage({ image, title, styles, transform })}
        </ImagePreview>

        <Flex
          css={theme({
            p: [3, 3, 4, 4],
            flexDirection: 'column',
            gap: 3,
            flex: 1
          })}
        >
          <Flex
            css={theme({
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 3,
              flex: 1
            })}
          >
            <Box css={theme({ flex: 1, minWidth: 0 })}>
              <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
                <ToolIconChip icon={Icon} variant='featured' />
                <Text
                  css={theme({
                    fontSize: [2, 2, 3, 3],
                    fontWeight: 'bold',
                    color: 'black',
                    ...titleCss
                  })}
                >
                  {title}
                </Text>
              </Flex>
              <Text
                css={theme({
                  fontSize: [0, 0, 1, 1],
                  color: 'black80',
                  lineHeight: 2,
                  ...descriptionCss
                })}
              >
                {description}
              </Text>
              {tags && (
                <Flex css={theme({ gap: 2, mt: 3, flexWrap: 'wrap' })}>
                  {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Flex>
              )}
            </Box>
            <ArrowIndicator isHover={isHover} containerCss={arrowCss} />
          </Flex>
        </Flex>
      </CardBase>
    </Link>
  )
}

export const ToolCard = ({
  title,
  description,
  href,
  icon: Icon,
  image,
  animation = ['scale(1.05)', 'scale(1)'],
  styles = {},
  linkCss = {},
  cardCss = {},
  previewCss = {}
}) => {
  const [isHover, setIsHover] = React.useState(false)

  const transform = isHover ? animation[0] : animation[1]

  return (
    <Link
      href={href}
      css={theme({
        textDecoration: 'none',
        color: 'inherit',
        _hover: { color: 'inherit' },
        display: 'block',
        height: '100%',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        ...linkCss
      })}
    >
      <CardBase
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        onTouchCancel={() => setIsHover(false)}
        css={theme({
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...cardCss
        })}
      >
        <ImagePreview
          css={theme({
            height: ['120px', '140px', '150px', '150px'],
            borderBottom: 1,
            borderColor: 'black05',
            ...previewCss
          })}
        >
          {renderToolImage({ image, title, styles, transform })}
        </ImagePreview>

        <Flex
          css={theme({
            p: 3,
            flexDirection: 'column',
            flex: 1
          })}
        >
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            })}
          >
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <ToolIconChip icon={Icon} />
              <Text
                css={theme({
                  fontSize: 1,
                  fontWeight: 'bold',
                  color: 'black'
                })}
              >
                {title}
              </Text>
            </Flex>
            <ArrowIndicator isHover={isHover} size={14} />
          </Flex>
          <Text
            css={theme({
              fontSize: 0,
              color: 'black80',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </Flex>
      </CardBase>
    </Link>
  )
}
