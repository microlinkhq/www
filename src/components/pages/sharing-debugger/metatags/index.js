import React from 'react'
import { theme } from 'theme'
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

export const Metatags = ({ metadata }) => {
  const breakpoint = useBreakpoint()
  const TRUNCATE_URL_LENGTH = breakpoint === 0 ? 60 : 100
  const fields = validate(metadata)

  return (
    <Box css={theme({ m: 0 })}>
      {fields.map(
        ({ name, isNullable, value, status, description, resume }, index) => {
          const length = value?.length || 0
          const color = VALIDATOR_STATUS[status].color

          return (
            <Box
              key={index}
              css={theme({
                borderTop: index ? 1 : 0,
                borderColor: 'black10',
                pt: index ? 3 : 0,
                pb: 3
              })}
            >
              <Flex css={theme({ gap: 2 })}>
                <FeatherIcon
                  icon={status === VALIDATOR_STATUS_OK ? CheckCircle : XCircle}
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
                              <CodeInline>og:image</CodeInline> meta tag inside{' '}
                              <CodeInline>head</CodeInline> tag in your HTML
                              markup.
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
  )
}
