import styled from 'styled-components'
import { theme, layout } from 'theme'
import { withContainer } from 'helpers/hoc/with-container'
import ImageBase from 'components/elements/Image/Image'

const _ImageBase = styled(ImageBase)(
  theme({
    borderRadius: '3px',
    textAlign: 'center'
  })
)

export const Image = withContainer(_ImageBase, {
  css: { maxWidth: layout.small }
})
