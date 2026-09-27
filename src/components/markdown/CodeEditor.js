import CodeEditorBase from 'components/elements/CodeEditor/CodeEditor'
import { withContainer } from 'helpers/hoc/with-container'

export const CodeEditor = withContainer(
  CodeEditorBase,
  {},
  {
    autoHeight: true,
    blinkCursor: false
  }
)
