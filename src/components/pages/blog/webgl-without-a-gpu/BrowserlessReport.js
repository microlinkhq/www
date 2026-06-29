import React from 'react'

import CodeEditorBase from 'components/elements/CodeEditor/CodeEditor'
import TerminalBase from 'components/elements/Terminal/Terminal'
import JsonView from 'components/elements/JsonView/JsonView'
import Box from 'components/elements/Box'
import { withContainer } from 'helpers/hoc/with-container'
import { theme } from 'theme'

import report from './report.json'

const CALL_SNIPPET = [
  "const browserless = require('browserless')",
  'const report = await browserless.report()',
  'console.log(report)'
].join('\n')

const BrowserlessReportBase = props => (
  <Box css={theme({ width: '100%', maxWidth: '100%' })} {...props}>
    <CodeEditorBase
      language='js'
      autoHeight
      showFade={false}
      showTitle={false}
      blinkCursor={false}
      css={theme({ width: '100%', maxWidth: '100%', mb: 3 })}
      aria-label='Calling browserless.report()'
    >
      {CALL_SNIPPET}
    </CodeEditorBase>
    <TerminalBase
      title='report'
      text={JSON.stringify(report, null, 2)}
      autoHeight
      showFade={false}
      blinkCursor={false}
      css={theme({ width: '100%', maxWidth: '100%' })}
      aria-label='browserless.report() output for a production node'
    >
      <JsonView src={report} collapsed={2} />
    </TerminalBase>
  </Box>
)

export const BrowserlessReport = withContainer(BrowserlessReportBase)

export default BrowserlessReport
