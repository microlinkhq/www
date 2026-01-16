import React from 'react'
import { theme, layout } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import TimeAgo from 'react-timeago'
import { formatDate } from 'helpers/format-date'
import truncateUrl from 'truncate-url'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { VALIDATOR_STATUS, VALIDATOR_STATUS_OK, validate } from './validators'
import { CodeInline } from 'components/markdown/CodeInline'
import Choose from 'components/elements/Choose'
import { CheckCircle, XCircle } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

export const Metatags = ({ metadata }) => {
  const breakpoint = useBreakpoint()
  const TRUNCATE_URL_LENGTH = breakpoint === 0 ? 60 : 100
  const fields = validate(metadata)
  const issues = fields.filter(({ status }) => status !== VALIDATOR_STATUS_OK)

  const score = 100 - issues.length * 10

  return (
    <Box css={theme({ m: 0 })}>
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
              Copy the fix. Apply to your site & come back.
            </Text>
          </Box>

          <CodeEditor language='html'>
            {[
              '<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">',
              '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
              '<link rel="shortcut icon" href="/favicon.ico">',
              '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
              '<link rel="manifest" href="/site.webmanifest">',
              '<meta name="generator" content="Microlink">'
            ].join('\n')}
          </CodeEditor>
        </Box>
      )}

      <Box css={theme({ pt: 4 })}>
        <Box css={theme({ textAlign: 'center', pb: 3 })}>
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
          {/* <Text
            css={theme({
              fontSize: 2,
              color: 'black60'
            })}
          >
            {score === 100 ? 'Congratulations 🎉' : 'Understand the details'}
          </Text> */}
        </Box>
        {fields.map(
          ({ name, isNullable, value, status, description, resume }, index) => {
            const length = value?.length || 0
            const color = VALIDATOR_STATUS[status].color
            const bg = VALIDATOR_STATUS[status].bg

            return (
              <Box
                key={index}
                css={theme({
                  mt: index > 0 ? 3 : 0,
                  maxWidth: layout.small,
                  mx: 'auto',
                  bg,
                  p: 3
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
                                You should to add a{' '}
                                <CodeInline>og:image</CodeInline> meta tag
                                inside <CodeInline>head</CodeInline> tag in your
                                HTML markup.
                              </>
                            )}
                          />
                          <Choose.When
                            condition={name === 'logo'}
                            render={() => (
                              <>
                                You should to add a{' '}
                                <CodeInline>/favicon</CodeInline> in your site,
                                preferrable a png.
                              </>
                            )}
                          />
                          <Choose.When
                            condition={name === 'author'}
                            render={() => (
                              <>
                                You should to add a{' '}
                                <CodeInline>author</CodeInline> meta tag inside{' '}
                                <CodeInline>head</CodeInline> tag in your HTML
                                markup.
                              </>
                            )}
                          />
                          <Choose.Otherwise render={() => 'lol'} />
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
                      condition={name === 'date'}
                      render={() => (
                        <>
                          {formatDate(value)} (<TimeAgo date={value} />)
                        </>
                      )}
                    />
                    <Choose.Otherwise render={() => value} />
                  </Choose>
                </Text>
              </Box>
            )
          }
        )}
      </Box>
    </Box>
  )
}
