import React from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import List from 'components/patterns/List/List'
import TimeAgo from 'react-timeago'
import { formatDate } from 'helpers/format-date'
import humanizeUrl from 'humanize-url'

const getFlag = (value = '') => {
  const [lang, country] = value.split('-')
  const code = (country || lang).toUpperCase()
  if (code.length !== 2) return

  const common = {
    EN: '🇺🇸',
    ES: '🇪🇸',
    FR: '🇫🇷',
    DE: '🇩🇪',
    IT: '🇮🇹',
    PT: '🇵🇹',
    JA: '🇯🇵',
    ZH: '🇨🇳',
    KO: '🇰🇷',
    RU: '🇷🇺'
  }

  if (common[code]) return common[code]

  return String.fromCodePoint(...[...code].map(c => c.charCodeAt(0) + 127397))
}

const truncateUrl = (url, maxLength = 30) => {
  if (!url) return url
  const humanized = humanizeUrl(url)
  if (humanized.length <= maxLength) return humanized
  return `${humanized.substring(0, maxLength)}...`
}

export const Metatags = ({ metadata }) => {
  const fields = [
    {
      name: 'title',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-title/src/index.js',
      value: metadata.title
    },
    {
      name: 'description',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-description/src/index.js',
      value: metadata.description
    },
    {
      type: 'url',
      name: 'image',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-image/src/index.js',
      value: metadata.image?.url,
      width: metadata.image?.width,
      height: metadata.image?.height,
      size: metadata.image?.size_pretty
    },
    {
      type: 'url',
      name: 'logo',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-logo/src/index.js',
      value: metadata.logo?.url,
      width: metadata.logo?.width,
      height: metadata.logo?.height,
      size: metadata.logo?.size_pretty
    },
    {
      type: 'url',
      name: 'url',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-url/src/index.js',
      value: metadata.url
    },
    {
      name: 'publisher',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-publisher/src/index.js',
      value: metadata.publisher
    },
    {
      name: 'locale',
      type: 'locale',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-lang/src/index.js',
      value: metadata.lang
    },
    {
      name: 'author',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-author/src/index.js',
      value: metadata.author
    },
    {
      name: 'date',
      type: 'date',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-date/src/index.js',
      value: metadata.date
    }
  ]
    .map(field => ({
      ...field,
      isNullable: field.value === null || field.value === undefined
    }))
    .sort((a, b) => {
      if (a.isNullable && !b.isNullable) return -1
      if (!a.isNullable && b.isNullable) return 1
      return 0
    })

  return (
    <List css={theme({ pl: 0, m: 0 })}>
      {fields.map((field, index) => {
        const type = field.isNullable ? 'no' : 'yes'
        const value = field.value || 'n/a'
        const length = field.value?.length || 0

        return (
          <List.Item
            key={index}
            type={type}
            alignItems='flex-start'
            css={theme({
              color: field.isNullable ? 'red7' : 'black'
            })}
          >
            <Box
              css={theme({
                display: 'flex',
                flexDirection: 'column'
              })}
            >
              <Box
                css={theme({
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1
                })}
              >
                <Text
                  css={theme({
                    fontFamily: 'mono',
                    fontSize: 0,
                    fontWeight: 'bold'
                  })}
                >
                  {field.name}
                </Text>
                {!field.isNullable && (
                  <Text
                    css={theme({
                      fontFamily: 'mono',
                      fontSize: 0,
                      color: 'black40',
                      mx: 1
                    })}
                  >
                    {field.type !== 'url' && `${length} length`}
                    {field.width &&
                      field.height &&
                      `${field.type !== 'url' && length ? ' • ' : ''}${
                        field.width
                      }x${field.height}`}
                    {field.size && ` • ${field.size}`}
                  </Text>
                )}
              </Box>
              <Text
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: field.isNullable ? 'red7' : 'black60',
                  wordBreak: 'break-all'
                })}
              >
                {field.isNullable
                  ? (
                    <Link
                      href={field.validatorUrl}
                      logoIcon
                      css={theme({
                        color: 'red7',
                        fontSize: 0,
                        fontFamily: 'mono',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      })}
                    >
                      click to fix
                    </Link>
                    )
                  : field.type === 'url'
                    ? (
                      <Link
                        href={value}
                        logoIcon
                        css={theme({
                          color: 'black60',
                          fontSize: 0,
                          fontFamily: 'mono',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        })}
                      >
                        {truncateUrl(value)}
                      </Link>
                      )
                    : field.type === 'date'
                      ? (
                        <>
                          {formatDate(value)} (<TimeAgo date={value} />)
                        </>
                        )
                      : field.type === 'locale'
                        ? (
                          <>
                            {getFlag(value)} {value}
                          </>
                          )
                        : (
                            value
                          )}
              </Text>
            </Box>
          </List.Item>
        )
      })}
    </List>
  )
}
