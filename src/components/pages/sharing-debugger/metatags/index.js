import React, { useState } from 'react'
import { theme, space, layout } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { useClipboard } from 'components/hook/use-clipboard'
import {
  VALIDATOR_STATUS_ERROR,
  VALIDATOR_STATUS_OK,
  buildFixSnippet,
  buildLlmRepairPrompt,
  validate
} from './validators'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import { FieldRow } from './field-row'
import { LlmRepairPrompt } from './llm-repair-prompt'
import { ShareResult } from './share-result'

const ISSUE_WEIGHTS = {
  title: 25,
  description: 20,
  image: 20,
  url: 15,
  logo: 10,
  publisher: 5,
  locale: 5,
  author: 5,
  date: 5
}

export const Metatags = ({
  metadata,
  shareResultUrl,
  shareResultDisplayUrl
}) => {
  const breakpoint = useBreakpoint()
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [isPromptExpanded, setIsPromptExpanded] = useState(false)
  const TRUNCATE_URL_LENGTH = breakpoint === 0 ? 45 : 75
  const fields = validate(metadata)
  const issues = fields.filter(({ status }) => status !== VALIDATOR_STATUS_OK)

  const score = Math.max(
    0,
    100 -
      issues.reduce((total, issue) => {
        const weight = ISSUE_WEIGHTS[issue.name] || 5

        return (
          total +
          (issue.status === VALIDATOR_STATUS_ERROR
            ? weight
            : Math.ceil(weight / 2))
        )
      }, 0)
  )
  const fixSnippet = buildFixSnippet({ issues, metadata })
  const llmRepairPrompt = buildLlmRepairPrompt({ issues, metadata })

  return (
    <Box css={theme({ m: 0 })}>
      <ClipboardComponent />
      {issues.length > 0 && (
        <Box css={theme({ pt: 4 })}>
          <Box css={theme({ textAlign: 'center', pb: 3 })}>
            <Text
              css={theme({
                fontSize: 3,
                fontWeight: 'bold'
              })}
            >
              Found {issues.length} issues
            </Text>
            <Text
              css={theme({
                fontSize: 2,
                color: 'black60'
              })}
            >
              {breakpoint === 0
                ? 'Fix the highest-impact tags first, then run it again.'
                : 'Review the suggested tags, apply the fixes, then run the debugger again.'}
            </Text>
          </Box>

          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'center'
            })}
          >
            <CodeEditor
              language='html'
              css={theme({
                width: [`calc(100vw - ${space[4]})`, layout.small]
              })}
            >
              {fixSnippet}
            </CodeEditor>
          </Flex>
        </Box>
      )}

      <Box css={theme({ pt: [3, 4] })}>
        <Box css={theme({ textAlign: 'center', pb: [3, 4] })}>
          <Text
            css={theme({
              fontSize: 3,
              fontWeight: 'bold'
            })}
          >
            {score === 100
              ? 'Your site is fully optimized'
              : 'Your site needs improvement'}
          </Text>
        </Box>
        {fields.map((field, index) => (
          <FieldRow
            key={field.name}
            {...field}
            index={index}
            TRUNCATE_URL_LENGTH={TRUNCATE_URL_LENGTH}
          />
        ))}

        {llmRepairPrompt && (
          <LlmRepairPrompt
            llmRepairPrompt={llmRepairPrompt}
            isPromptExpanded={isPromptExpanded}
            setIsPromptExpanded={setIsPromptExpanded}
          />
        )}

        {shareResultUrl && (
          <ShareResult
            shareResultUrl={shareResultUrl}
            shareResultDisplayUrl={shareResultDisplayUrl}
            toClipboard={toClipboard}
            breakpoint={breakpoint}
          />
        )}
      </Box>
    </Box>
  )
}
