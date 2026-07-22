import styled from 'styled-components'
import { borders, layout, colors, theme, transition, radii } from 'theme'
import Flex from 'components/elements/Flex'
import SubheadBase from 'components/elements/Subhead'
import { fadeInDown } from 'components/keyframes'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'

export const ACCENT = 'rgb(224, 0, 172)'

export const Subhead = withTitle(SubheadBase)
export const Caption = withTitle(CaptionBase)

export const FIRST_URL =
  'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing'

export const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}

export const PdfApiBar = styled(Flex)`
  background: white;
  min-width: 0;
  overflow: hidden;
  border-radius: 0 0 ${radii[5]} ${radii[5]};

  .codecopy__button {
    top: 0;
    opacity: 0.85;
    transition: opacity ${transition.short};

    &:hover {
      opacity: 1;
    }

    &::before,
    &::after {
      display: none !important;
    }
  }

  .codecopy__icon {
    fill: ${colors.black80} !important;
  }
`

export const CopyButton = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'black60'
  })};
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short};

  &:hover {
    color: ${colors.black};
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: color ${transition.short}, transform ${transition.short};

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[2]};
    border-radius: ${radii[2]};
  }

  svg.icon-check {
    animation: ${fadeInDown} 0.2s ease both;
    color: ${colors.green5};
  }
`
