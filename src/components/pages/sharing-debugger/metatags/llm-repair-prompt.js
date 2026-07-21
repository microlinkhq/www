import React from 'react'
import { theme, space, layout } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { ChevronDown, ChevronUp } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

export const LlmRepairPrompt = ({
  llmRepairPrompt,
  isPromptExpanded,
  setIsPromptExpanded
}) => (
  <Box css={theme({ mt: [3, 4], px: [2, 0] })}>
    <Box
      css={theme({
        mx: 'auto',
        width: '100%',
        maxWidth: layout.small
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'flex-start',
          mb: 2,
          gap: 2
        })}
      >
        <Box>
          <Text
            css={theme({
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black'
            })}
          >
            Fix with an LLM
          </Text>
          <Text
            css={theme({
              fontSize: 0,
              color: 'black60',
              mt: 1
            })}
          >
            Copy this prompt or edit it before pasting it into your preferred
            model.
          </Text>
        </Box>

        <Flex
          css={theme({
            width: '100%',
            justifyContent: 'flex-start'
          })}
        >
          <Text
            as='button'
            type='button'
            onClick={() => setIsPromptExpanded(value => !value)}
            css={theme({
              bg: 'transparent',
              border: 0,
              color: 'black60',
              fontSize: 0,
              fontWeight: 'bold',
              p: 0,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              flexShrink: 0,
              _hover: {
                color: 'black'
              },
              _focusVisible: {
                outline: '2px solid',
                outlineColor: 'link',
                outlineOffset: '2px',
                borderRadius: 2
              }
            })}
          >
            <FeatherIcon
              icon={isPromptExpanded ? ChevronUp : ChevronDown}
              color='currentColor'
              size='14px'
            />
            {isPromptExpanded ? 'Collapse prompt' : 'Show full prompt'}
          </Text>
        </Flex>
      </Flex>

      <Box
        css={theme({
          width: '100%',
          maxWidth: layout.small
        })}
      >
        <CodeEditor
          language='markdown'
          css={theme({
            width: [
              `calc(100vw - ${space[4]})`,
              `calc(100vw - ${space[5]})`,
              '100%',
              '100%'
            ],
            maxWidth: '100%',
            maxHeight: isPromptExpanded ? 'none' : '180px'
          })}
        >
          {llmRepairPrompt}
        </CodeEditor>
      </Box>
    </Box>
  </Box>
)
