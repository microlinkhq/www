import { createGlobalStyle } from 'styled-components'
import { colors, fonts, shadows } from 'theme'

import isoCss from '../figures/iso-css.json'

export const IsoStyle = createGlobalStyle`
  ${isoCss.css}

  .manifesto-figure.iso[data-theme='light'] {
    --anatomy-card: ${colors.white};
    --anatomy-mono: ${fonts.mono};
  }

  .manifesto-figure .iso-figure {
    margin: 0;
  }

  .manifesto-figure .iso-plate {
    padding: 44px 8px;
    box-shadow: ${shadows[0]};
  }

  @media (max-width: 560px) {
    .manifesto-figure .iso-plate {
      padding: 40px 0 64px;
    }
  }

  .manifesto-figure .iso-stage {
    outline: none;
    touch-action: manipulation;
    cursor: ew-resize;
  }

  .manifesto-figure .iso-stage:focus-visible {
    box-shadow: 0 0 0 2px ${colors.link};
  }
`
