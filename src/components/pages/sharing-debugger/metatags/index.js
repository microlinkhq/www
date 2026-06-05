import React, { useState } from 'react'
import { theme, space, layout } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import TimeAgo from 'react-timeago'
import { formatDate } from 'helpers/format-date'
import truncateUrl from 'truncate-url'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { useClipboard } from 'components/hook/use-clipboard'
import {
  VALIDATOR_STATUS,
  VALIDATOR_STATUS_ERROR,
  VALIDATOR_STATUS_OK,
  buildFixSnippet,
  buildLlmRepairPrompt,
  validate
} from './validators'
import { CodeInline } from 'components/markdown/CodeInline'
import Choose from 'components/elements/Choose'
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import { Clipboard as ClipboardIcon } from 'components/icons/Clipboard'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

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
        {fields.map(
          (
            {
              name,
              isNullable,
              value,
              displayValue,
              status,
              description,
              resume
            },
            index
          ) => {
            const length = value?.length || 0
            const color = VALIDATOR_STATUS[status].color
            const bg = VALIDATOR_STATUS[status].bg
            const renderedValue = displayValue ?? value
            const severity =
              status === VALIDATOR_STATUS_ERROR ? 'Required' : 'Recommended'

            return (
              <Box
                key={index}
                css={theme({
                  mt: index > 0 ? 3 : 0,
                  mx: 'auto',
                  px: [2, 0],
                  bg,
                  p: [2, 3]
                })}
              >
                <Flex css={theme({ gap: 2 })}>
                  <FeatherIcon
                    icon={
                      status === VALIDATOR_STATUS_OK ? CheckCircle : XCircle
                    }
                    color={color}
                  />
                  <Text
                    as='span'
                    css={theme({
                      fontFamily: 'mono',
                      fontSize: 0,
                      fontWeight: 'bold'
                    })}
                  >
                    {name}
                  </Text>
                  <Text
                    as='span'
                    css={theme({
                      fontFamily: 'mono',
                      fontSize: 0,
                      color,
                      fontWeight: 'bold'
                    })}
                  >
                    {' • '}
                    {severity}
                  </Text>
                  <Text
                    as='span'
                    css={theme({
                      fontFamily: 'mono',
                      fontSize: 0,
                      color: 'black40',
                      fontWeight: 'normal'
                    })}
                  >
                    {' • '}
                    {resume || `${length} length`}
                  </Text>
                </Flex>
                {description && (
                  <Text
                    as='p'
                    css={theme({
                      fontSize: 0,
                      color,
                      mt: 1,
                      mb: 0
                    })}
                  >
                    {description}
                  </Text>
                )}
                <Text
                  css={theme({
                    fontFamily: 'mono',
                    fontSize: 0,
                    color: 'black60',
                    wordBreak: 'break-all',
                    mt: 2
                  })}
                >
                  <Choose>
                    <Choose.When
                      condition={isNullable}
                      render={() => (
                        <Choose>
                          <Choose.When
                            condition={name === 'image'}
                            render={() => (
                              <>
                                Add an <CodeInline>og:image</CodeInline> meta
                                tag inside your page{' '}
                                <CodeInline>head</CodeInline> so social
                                platforms can render a preview image.
                              </>
                            )}
                          />
                          <Choose.When
                            condition={name === 'logo'}
                            render={() => (
                              <>
                                Add standard favicon assets to your site so
                                browsers and link previews can identify your
                                brand more reliably.
                              </>
                            )}
                          />
                          <Choose.Otherwise
                            render={() => (
                              <>
                                Add a <CodeInline>{name}</CodeInline> meta tag
                                inside your page <CodeInline>head</CodeInline>.
                              </>
                            )}
                          />
                        </Choose>
                      )}
                    />
                    <Choose.When
                      condition={['logo', 'image', 'url'].includes(name)}
                      render={() => (
                        <Link
                          href={value}
                          logoIcon
                          css={theme({
                            color: 'black60',
                            fontSize: 0,
                            fontFamily: 'mono'
                          })}
                        >
                          {truncateUrl(value, TRUNCATE_URL_LENGTH)}
                        </Link>
                      )}
                    />
                    <Choose.When
                      condition={
                        name === 'date' && status === VALIDATOR_STATUS_OK
                      }
                      render={() => (
                        <>
                          {formatDate(value)} (<TimeAgo date={value} />)
                        </>
                      )}
                    />
                    <Choose.Otherwise
                      render={() => renderedValue || `${length} length`}
                    />
                  </Choose>
                </Text>
              </Box>
            )
          }
        )}

        {llmRepairPrompt && (
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
                    Copy this prompt or edit it before pasting it into your
                    preferred model.
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
        )}

        {shareResultUrl && (
          <Box css={theme({ mt: [3, 4], px: [2, 0] })}>
            <Flex
              css={theme({
                mx: 'auto',
                width: '100%',
                maxWidth: layout.small,
                flexDirection: 'column',
                gap: 1,
                bg: 'gray0',
                border: 1,
                borderColor: 'black10',
                borderRadius: 3,
                p: [2, 3]
              })}
            >
              <Flex
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2
                })}
              >
                <Text
                  css={theme({
                    fontSize: 1,
                    fontWeight: 'bold',
                    color: 'black'
                  })}
                >
                  Share this result
                </Text>

                <Tooltip
                  type='copy'
                  tabIndex={-1}
                  tooltipsOpts={Tooltip.TEXT.OPTIONS}
                  content={
                    <Tooltip.Content>
                      {Tooltip.TEXT.COPY('URL')}
                    </Tooltip.Content>
                  }
                >
                  <Flex
                    as='button'
                    type='button'
                    aria-label='Copy share URL'
                    onClick={() => {
                      toClipboard({
                        copy: shareResultUrl,
                        text: 'Share URL copied'
                      })
                    }}
                    css={theme({
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '44px',
                      minWidth: '44px',
                      p: 1,
                      border: 0,
                      bg: 'transparent',
                      color: 'black50',
                      cursor: 'pointer',
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
                    <ClipboardIcon css={theme({ color: 'currentColor' })} />
                  </Flex>
                </Tooltip>
              </Flex>

              <Text
                css={theme({
                  fontSize: 0,
                  color: 'black80',
                  fontFamily: 'mono',
                  wordBreak: 'break-all'
                })}
              >
                {truncateUrl(
                  shareResultDisplayUrl || shareResultUrl,
                  breakpoint === 0 ? 60 : 90
                )}
              </Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  )
}
