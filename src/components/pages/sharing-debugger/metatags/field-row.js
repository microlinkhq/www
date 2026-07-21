import React from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import TimeAgo from 'react-timeago'
import { formatDate } from 'helpers/format-date'
import truncateUrl from 'truncate-url'
import {
  VALIDATOR_STATUS,
  VALIDATOR_STATUS_ERROR,
  VALIDATOR_STATUS_OK
} from './validators'
import { CodeInline } from 'components/markdown/CodeInline'
import Choose from 'components/elements/Choose'
import { CheckCircle, XCircle } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'

export const FieldRow = ({
  name,
  isNullable,
  value,
  displayValue,
  status,
  description,
  resume,
  index,
  TRUNCATE_URL_LENGTH
}) => {
  const length = value?.length || 0
  const color = VALIDATOR_STATUS[status].color
  const bg = VALIDATOR_STATUS[status].bg
  const renderedValue = displayValue ?? value
  const severity =
    status === VALIDATOR_STATUS_ERROR ? 'Required' : 'Recommended'

  return (
    <Box
      key={name}
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
                      Add an <CodeInline>og:image</CodeInline> meta tag inside
                      your page <CodeInline>head</CodeInline> so social
                      platforms can render a preview image.
                    </>
                  )}
                />
                <Choose.When
                  condition={name === 'logo'}
                  render={() => (
                    <>
                      Add standard favicon assets to your site so browsers and
                      link previews can identify your brand more reliably.
                    </>
                  )}
                />
                <Choose.Otherwise
                  render={() => (
                    <>
                      Add a <CodeInline>{name}</CodeInline> meta tag inside your
                      page <CodeInline>head</CodeInline>.
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
            condition={name === 'date' && status === VALIDATOR_STATUS_OK}
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
