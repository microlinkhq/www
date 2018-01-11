import {keyframes} from 'styled-components'

import Section from './Section'

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
`

export default Section.extend`
background: ${props => props.gradient};
background-size: 300% 300%;
animation: ${gradientAnimation} 15s ease infinite;
`
