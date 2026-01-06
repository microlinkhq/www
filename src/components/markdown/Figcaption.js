import styled from 'styled-components'
import { theme } from 'theme'
import Text from 'components/elements/Text'
import { withContainer } from 'helpers/hoc/with-container'

const FigcaptionBase = styled(Text)`
  ${theme({ fontSize: 0, color: 'black50' })}
  text-align: center;
`

export const Figcaption = withContainer(FigcaptionBase)
