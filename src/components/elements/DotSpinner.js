import { dots } from 'components/keyframes'
import styled from 'styled-components'

const DotSpinner = styled('span')`
  display: inline-block;
  overflow: hidden;
  height: 1.3em;
  margin-top: -0.3em;
  line-height: 1.5em;
  vertical-align: text-bottom;

  &::after {
    display: inline-table;
    white-space: pre;
    text-align: left;
    content: '${'\\A.\\A..\\A...'}';
    animation: ${dots} 2s steps(4) infinite;
  }
`
export default DotSpinner
