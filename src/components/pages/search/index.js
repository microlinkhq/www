import styled from 'styled-components'
import { borders, colors, layout, radii, theme, transition } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { truncateLineCss } from './utils'

export const SEARCH_LAYOUT_WIDE_MAX_WIDTH = `calc(${layout.large} * 1.36)`

const VERTICAL_EXAMPLE_GRID_MAX_WIDTH = [
  '100%',
  '100%',
  '100%',
  SEARCH_LAYOUT_WIDE_MAX_WIDTH
]

export const ActionRow = styled(Flex)`
  ${theme({
    gap: [2, 2, 3, 3],
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    justifyContent: ['center', 'center', 'center', 'flex-start']
  })};
`

export const HeroResultBrand = styled(Flex)
  .withConfig({
    shouldForwardProp: prop => !['$size', '$tint'].includes(prop)
  })
  .attrs({ as: 'span', 'aria-hidden': 'true' })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '9999px',
    bg: 'white',
    overflow: 'hidden'
  })};
  width: ${({ $size }) => $size || '20px'};
  height: ${({ $size }) => $size || '20px'};
  border: 1px solid ${colors.black10};
  background-color: ${({ $tint }) => $tint || colors.white};

  img {
    width: 62%;
    height: 62%;
    object-fit: contain;
    display: block;
  }
`

export const HeroResultMonogram = styled('span').withConfig({
  shouldForwardProp: prop => !['$tint', '$color'].includes(prop)
})`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'sans',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 1
  })};
  background-color: ${({ $tint }) => $tint || colors.black80};
  color: ${({ $color }) => $color || colors.white};
  text-transform: uppercase;
`

export const HeroResultBreadcrumb = styled(Flex).attrs({ as: 'div' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    fontSize: [0, 0, 1, 1]
  })};
  min-width: 0;
`

export const HeroResultSite = styled(Text).attrs({ as: 'span' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: [1, 1, 1, 1],
    fontWeight: 'normal',
    lineHeight: 1
  })};
`

export const HeroResultPath = styled(Text).attrs({ as: 'span' })`
  ${theme({
    m: 0,
    color: 'black60',
    fontSize: [1, 1, 1, 1],
    lineHeight: 1,
    ...truncateLineCss
  })};
  min-width: 0;
`

export const HeroResultTitle = styled(Text).attrs({ as: 'span' })`
  ${theme({
    m: 0,
    mt: 2,
    display: 'block',
    maxWidth: '100%',
    color: 'link',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'left',
    ...truncateLineCss
  })};
`

export const HeroResultDescription = styled(Text).attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: 2,
    color: 'black80',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2
  })};
`

export const HeroResultMeta = styled(Flex).attrs({ as: 'div' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    mt: 2,
    color: 'black60',
    fontSize: [0, 0, 1, 1],
    flexWrap: 'wrap'
  })};
`

export const HeroResultBadge = styled(Text).attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: '9999px',
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1
  })};
  border: 1px solid ${colors.black10};
`

export const HeroResultBadgeSmall = styled(Text).attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: '9999px',
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: '11px',
    lineHeight: 1,
    letterSpacing: 0
  })};
  border: 1px solid ${colors.black10};

  svg {
    width: 12px;
    height: 12px;
  }
`

export const HeroResultList = styled(Box).attrs({ as: 'ul', role: 'list' })`
  ${theme({
    m: 0,
    p: 0,
    listStyle: 'none',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    mx: [-3, -3, -4, -4]
  })};
  scrollbar-width: thin;
  scrollbar-color: ${colors.black20} transparent;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    ${colors.black} 12px,
    ${colors.black} calc(100% - 20px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    ${colors.black} 12px,
    ${colors.black} calc(100% - 20px),
    transparent 100%
  );

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.black20};
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`

export const HeroResultListItem = styled(Box).attrs({ as: 'li' })`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    px: [3, 3, 4, 4],
    py: [2, 2, 3, 3]
  })};
  border-bottom: 1px solid ${colors.black05};
  transition: background-color ${transition.short};

  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background-color: ${colors.gray0};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const HeroResultListTitle = styled(Text).attrs({ as: 'span' })`
  ${theme({
    m: 0,
    display: 'block',
    maxWidth: '100%',
    color: 'link',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'left',
    ...truncateLineCss,
    flex: 1,
    minWidth: 0
  })};
`

export const VerticalExampleShell = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$accentColor'
})`
  ${theme({
    mt: [4, 4, 5, 5],
    overflow: ['visible', 'visible', 'visible', 'hidden'],
    minWidth: 0
  })};
  position: relative;
`

export const VerticalExampleGrid = styled(Box)`
  ${theme({
    display: 'grid',
    gridTemplateColumns: [
      '1fr',
      '1fr',
      '1fr',
      'minmax(0, 0.98fr) minmax(0, 1.02fr)'
    ],
    gap: [3, 3, 4, 4],
    pt: 4,
    width: '100%',
    maxWidth: VERTICAL_EXAMPLE_GRID_MAX_WIDTH,
    mx: 'auto',
    height: ['auto', 'auto', 'auto', '100%']
  })};
`

export const VerticalExamplePanel = styled(Box)`
  ${theme({
    bg: 'white',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    borderRadius: 4,
    overflow: 'hidden'
  })};
`

export const VerticalPreviewContent = styled(Box)`
  ${theme({ minWidth: 0 })};

  ${HeroResultList} {
    max-height: none;
    height: auto;
    flex: none;
  }
`

export const VerticalResultList = styled(Box).attrs({ as: 'ol' })`
  ${theme({
    m: 0,
    px: 0,
    py: [3, 3, 4, 4],
    display: 'grid',
    gap: [3, 3, 4, 4],
    flex: 'none',
    minHeight: 0,
    alignContent: 'flex-start',
    listStyle: 'none'
  })};
`

export const VerticalExampleOptionIcon = styled(Flex)
  .attrs({ as: 'span' })
  .withConfig({
    shouldForwardProp: prop => prop !== '$active'
  })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    width: ['44px', '44px', '48px', '48px'],
    height: ['44px', '44px', '48px', '48px'],
    flexShrink: 0,
    borderRadius: '9999px',
    bg: 'white',
    border: 1,
    lineHeight: 1
  })};

  svg {
    width: 18px;
    height: 18px;
  }

  ${({ $active }) =>
    theme({
      color: $active ? 'link' : 'black70',
      borderColor: $active ? 'link' : 'black20'
    })};
`

export const VerticalExampleOption = styled('button').withConfig({
  shouldForwardProp: prop => prop !== '$active'
})`
  ${theme({
    appearance: 'none',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3,
    p: [3, 3, 4, 4],
    bg: 'transparent',
    border: 1,
    borderColor: 'transparent',
    borderRadius: 3,
    color: 'black',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative'
  })};
  background-color: ${({ $active }) => ($active ? colors.blue0 : colors.white)};
  border-color: ${({ $active }) => ($active ? colors.link : colors.black10)};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color ${transition.short}, color ${transition.short},
    border-color ${transition.short};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? colors.blue0 : colors.gray0};
    border-color: ${({ $active }) => ($active ? colors.link : colors.black20)};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: -2px;
  }
`

export const VerticalOutputTab = styled('button').withConfig({
  shouldForwardProp: prop => prop !== '$active'
})`
  ${theme({
    appearance: 'none',
    px: 2,
    py: 1,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    borderRadius: 4,
    letterSpacing: 0,
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    cursor: 'pointer'
  })};
  background: ${({ $active }) => ($active ? colors.black : 'transparent')};
  color: ${({ $active }) => ($active ? colors.white : colors.black70)};
  border: ${borders[1]}
    ${({ $active }) => ($active ? colors.black : colors.black10)};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.short}, color ${transition.short},
    border-color ${transition.short};

  &:hover {
    color: ${({ $active }) => ($active ? colors.white : colors.black)};
    border-color: ${({ $active }) => ($active ? colors.black : colors.black40)};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

export const VerticalTabButton = styled('button').withConfig({
  shouldForwardProp: prop => !['$active', '$activeColor'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    position: 'relative',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    bg: 'transparent',
    py: 2,
    px: 3,
    minHeight: '40px',
    color: 'black80',
    fontFamily: 'sans',
    fontWeight: 'normal',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: 'pointer',
    flexShrink: 0
  })};
  ${({ $active }) =>
    theme({
      borderColor: $active ? 'black' : 'black10',
      bg: $active ? 'black' : 'transparent',
      color: $active ? 'white' : 'black80',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, border-color ${transition.short},
    background-color ${transition.short};

  &:hover {
    border-color: ${colors.black20};
    background-color: ${colors.gray0};
    color: ${colors.black};
  }
  ${({ $active }) =>
    $active
      ? `
    &:hover {
      border-color: ${colors.black};
      background-color: ${colors.black};
      color: ${colors.white};
    }
  `
      : ''};

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const TutorialTimeline = styled(Box)`
  ${theme({
    mt: 0,
    position: 'relative',
    maxWidth: '100%',
    mx: 'auto'
  })};

  &::before {
    content: '';
    ${theme({
      display: ['none', 'none', 'block', 'block'],
      position: 'absolute',
      top: '22px',
      bottom: '22px',
      left: '35px',
      width: '2px',
      bg: 'black10'
    })};
  }
`

export const PricingCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    borderRadius: 4,
    bg: 'white',
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    flex: [0, 0, 1, 1],
    minWidth: 0,
    width: '100%',
    maxWidth: ['320px', '360px', '520px', '520px'],
    mx: ['auto', 'auto', 0, 0],
    alignSelf: ['center', 'center', 'stretch', 'stretch'],
    border: 1,
    borderColor: 'orange5'
  })};
`

export const BulletItem = styled(Flex).attrs({ as: 'li' })`
  ${theme({
    alignItems: 'flex-start',
    gap: 2,
    color: 'black80',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2
  })};

  &:not(:first-of-type) {
    ${theme({ mt: 3 })};
  }
`

export const TutorialStepContainer = styled(Box).attrs({ as: 'section' })`
  ${theme({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '72px 1fr', '72px 1fr'],
    columnGap: [0, 0, 4, 4],
    pb: 5
  })};

  &:last-child {
    padding-bottom: 0;

    &::after {
      content: '';
      ${theme({
        display: ['none', 'none', 'block', 'block'],
        position: 'absolute',
        top: '44px',
        bottom: 0,
        left: '35px',
        width: '2px',
        bg: 'white',
        zIndex: 1
      })};
    }
  }
`
