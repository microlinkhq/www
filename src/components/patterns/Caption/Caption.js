import { Subhead } from 'components/elements'
import styled from 'styled-components'
import { theme } from 'theme'

const Caption = styled(Subhead)(
  theme({
    lineHeight: 2,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: [2, 2, 3, 3]
  })
)

Caption.defaultProps = {
  forwardedAs: 'h3'
}

export default Caption
