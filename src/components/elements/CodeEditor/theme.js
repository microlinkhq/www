import { fontSizes, lineHeights, fonts, cx } from 'theme'
import { css } from 'styled-components'

const base = ({ background, primary, secondary }) => css`
  margin: 0;
  code {
    font-family: ${fonts.mono};
    font-size ${fontSizes[0]};
    line-height ${lineHeights[2]};
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size 2;
    hyphens: none;
    background ${background};
    color: ${primary};
  }
  pre {
    padding: 0px 1em 0px 0px;
    margin: .5em 0;
    overflow: auto;
  };

  .keyword,
  .attr-name,
  .arrow,
  .punctuation,
  .operator {
    color: ${secondary};
  }
  .keyword,
  .template-string {
    color: ${primary};
  }
`

const theme = {
  light: {
    background: cx('white'),
    primary: cx('black'),
    secondary: cx('black50')
  },
  dark: {
    background: cx('black'),
    primary: cx('white'),
    secondary: cx('white50')
  }
}

export default {
  theme,
  light: base(theme.light),
  dark: base(theme.dark)
}
