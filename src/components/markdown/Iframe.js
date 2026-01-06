import styled from 'styled-components'
import IframeBase from 'components/elements/Iframe/Iframe'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import { withContainer } from 'helpers/hoc/with-container'
import { layout } from '../../theme'

const _IframeBase = styled(IframeBase)`
  width: ${CodeEditor.width};
  height: ${CodeEditor.height};
  max-width: ${layout.small};
`

export const Iframe = withContainer(_IframeBase)
