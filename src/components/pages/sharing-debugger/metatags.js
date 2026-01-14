import React from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import TimeAgo from 'react-timeago'
import { formatDate } from 'helpers/format-date'
import { slug as slugger } from 'github-slugger'

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

const getLanguageName = (locale = '') => {
  const [lang] = locale.split('-')
  const code = (lang || '').toLowerCase()
  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    ru: 'Russian'
  }

  return languageNames[code]
}

const checkIfUrlLooksLikeSlug = url => {
  if (!url) return null

  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname

    // Get the last meaningful segment (excluding trailing slashes and empty segments)
    const segments = pathname.split('/').filter(segment => segment.length > 0)
    if (segments.length === 0) return null

    const lastSegment = segments[segments.length - 1]

    // Decode URL-encoded characters (e.g., %20 -> space, %C3%A9 -> é)
    const decodedSegment = decodeURIComponent(lastSegment)

    // Remove file extensions for comparison (e.g., .html, .md)
    const segmentWithoutExt = decodedSegment.replace(/\.[^/.]+$/, '')

    // If the segment is empty after removing extension, skip
    if (!segmentWithoutExt) return null

    // Create a slug from the decoded segment
    const slugged = slugger(segmentWithoutExt)

    // Check if the original segment (without extension) matches the slugged version
    // This indicates it's already in slug format
    const isSlug = segmentWithoutExt === slugged

    return {
      isSlug,
      segment: lastSegment,
      slugged
    }
  } catch (error) {
    // Invalid URL or decoding error, return null
    return null
  }
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
      size: metadata.image?.size_pretty,
      sizeBytes: metadata.image?.size
    },
    {
      type: 'url',
      name: 'logo',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-logo/src/index.js',
      value: metadata.logo?.url,
      width: metadata.logo?.width,
      height: metadata.logo?.height,
      size: metadata.logo?.size_pretty,
      sizeBytes: metadata.logo?.size
    },
    {
      type: 'url',
      name: 'url',
      validatorUrl:
        'https://github.com/microlinkhq/metascraper/blob/master/packages/metascraper-url/src/index.js',
      value: metadata.url,
      size: metadata.url?.size_pretty,
      sizeBytes: metadata.url?.size
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
    <Box css={theme({ m: 0 })}>
      {fields.map((field, index) => {
        const value = field.value || 'n/a'
        const length = field.value?.length || 0
        const slugInfo =
          field.type === 'url' && field.name === 'url'
            ? checkIfUrlLooksLikeSlug(field.value)
            : null
        let isIsoLocale = false

        // Validation checks
        const validations = []

        // Logo: bigger than 100x100
        if (field.name === 'logo' && field.width && field.height) {
          if (field.width > 100 && field.height > 100) {
            validations.push({
              message: 'optimal size',
              color: 'green7',
              tooltip:
                'Logos larger than 100x100 pixels ensure better visibility and quality across different platforms and devices, especially on high-resolution displays.'
            })
          }
        }

        // Image: less than 200 kB
        if (field.name === 'image' && field.sizeBytes) {
          const sizeInKB = field.sizeBytes / 1024
          if (sizeInKB < 200) {
            validations.push({
              message: 'optimal size',
              color: 'green7',
              tooltip:
                'Images under 200 kB load faster, improving user experience and SEO. Social platforms also prefer smaller images for better performance.'
            })
          }
        }

        // Description: between 140 and 240 chars
        if (field.name === 'description' && length > 0) {
          if (length >= 140 && length <= 240) {
            validations.push({
              message: 'optimal length',
              color: 'green7',
              tooltip:
                'Descriptions between 140-240 characters are ideal for social media previews. They provide enough context without being truncated on most platforms.'
            })
          }
        }

        // Title: less than 100 chars
        if (field.name === 'title' && length > 0) {
          if (length < 100) {
            validations.push({
              message: 'optimal length',
              color: 'green7',
              tooltip:
                'Titles under 100 characters display fully in search results and social media previews, improving click-through rates and readability.'
            })
          }
        }

        // Publisher: present
        if (field.name === 'publisher' && !field.isNullable) {
          validations.push({
            message: 'valid',
            color: 'green7',
            tooltip:
              'Publisher field helps establish brand identity and improves credibility in search results and social media previews.'
          })
        }

        // Author: present
        if (field.name === 'author' && !field.isNullable) {
          validations.push({
            message: 'valid',
            color: 'green7',
            tooltip:
              'Author field helps establish content attribution and improves credibility, especially for articles and blog posts.'
          })
        }

        // Locale: ISO 639-1 format
        if (field.name === 'locale' && !field.isNullable) {
          isIsoLocale = /^[a-z]{2}(-[A-Z]{2})?$/.test(field.value)
          validations.push({
            message: isIsoLocale ? 'valid' : 'invalid locale',
            color: isIsoLocale ? 'green7' : 'orange7',
            tooltip: isIsoLocale
              ? "Locale field specifies the content language using ISO 639-1 format, helping search engines and social platforms understand your content's language."
              : "Locale should be in ISO 639-1 format (2-letter language code, e.g., 'en', 'es'). Optionally include country code (e.g., 'en-US')."
          })
        }

        // Date: present and valid
        if (field.name === 'date' && !field.isNullable) {
          const dateValue = new Date(field.value)
          const isValidDate = !Number.isNaN(dateValue.getTime())
          validations.push({
            message: isValidDate ? 'valid' : 'invalid date',
            color: isValidDate ? 'green7' : 'orange7',
            tooltip: isValidDate
              ? 'Date field helps search engines understand content freshness and improves SEO. Use ISO 8601 format for best compatibility.'
              : 'Date should be in a valid format (ISO 8601 recommended). Invalid dates can cause issues with search engines and social platforms.'
          })
        }

        const statusItems = []

        if (field.isNullable) {
          statusItems.push({
            message: 'missing',
            color: 'red7',
            tooltip: 'This field is missing and should be added.'
          })
        }

        // Filter out "optimal length" and "optimal size" from display, but keep for validation
        const displayValidations = validations.filter(
          v => v.message !== 'optimal length' && v.message !== 'optimal size'
        )
        displayValidations.forEach(validation => statusItems.push(validation))

        // Track slug-friendly status for color, but don't display the message
        const isSlugFriendly = slugInfo?.isSlug
        const isNotSlugFriendly = slugInfo && !slugInfo.isSlug

        if (isNotSlugFriendly) {
          statusItems.push({
            message: 'not slug-friendly',
            color: 'orange7',
            tooltip:
              'URLs with special characters, spaces, or uppercase letters can cause issues with SEO, sharing, and compatibility. Consider using slug-friendly URLs with lowercase letters and hyphens for better results.'
          })
        }

        // Filter out "ok" and "slug-friendly" messages from display
        const displayStatusItems = statusItems.filter(
          s =>
            s.message !== 'ok' &&
            s.message !== 'slug-friendly' &&
            s.message !== 'valid'
        )

        // Determine if field is "correct" - has optimal validations and no errors
        const hasOptimalValidation = validations.some(
          v => v.message === 'optimal length' || v.message === 'optimal size'
        )
        const hasPositiveValidation = validations.some(
          v => v.color === 'green7'
        )
        const hasErrors =
          field.isNullable ||
          statusItems.some(s => s.color === 'red7' || s.color === 'orange7')
        const isCorrect =
          (hasOptimalValidation || hasPositiveValidation || isSlugFriendly) &&
          !field.isNullable &&
          !hasErrors

        const primaryStatus = displayStatusItems[0] || statusItems[0]

        let renderedValue = 'n/a'

        if (!field.isNullable) {
          if (field.type === 'url') {
            renderedValue = (
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
                {value}
              </Link>
            )
          } else if (field.type === 'date') {
            renderedValue = (
              <>
                {formatDate(value)} (<TimeAgo date={value} />)
              </>
            )
          } else if (field.type === 'locale') {
            const languageName = isIsoLocale
              ? getLanguageName(field.value)
              : null
            const localeLabel =
              languageName ? `${field.value} (${languageName})` : field.value
            renderedValue = (
              <>
                {getFlag(value)} {localeLabel}
              </>
            )
          } else {
            renderedValue = value
          }
        }

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
            <Text
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                fontWeight: 'bold',
                color: isCorrect ? 'green7' : field.isNullable ? 'red7' : 'black'
              })}
            >
              {field.name}
              <Text
                as='span'
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 0,
                  color: isCorrect ? 'green7' : 'black40',
                  fontWeight: 'normal'
                })}
              >
                {' • '}
                {length} length
                {field.type === 'url' &&
                  field.size &&
                  ` • ${field.size}`}
                {field.name === 'image' &&
                  field.width &&
                  field.height &&
                  ` • ${field.width}x${field.height}`}
                {field.name === 'image' &&
                  field.size &&
                  ` • ${field.size}`}
                {displayStatusItems.length > 0 && ' • '}
              </Text>
              {displayStatusItems.map((status, statusIndex) => (
                <Text
                  as='span'
                  key={`${status.message}-${statusIndex}`}
                  css={theme({
                    fontFamily: 'mono',
                    fontSize: 0,
                    color: status.color
                  })}
                >
                  {status.message}
                  {statusIndex < displayStatusItems.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </Text>
            <Text
              css={theme({
                fontSize: 0,
                color: isCorrect ? 'green7' : primaryStatus?.color || 'black40'
              })}
            >
              {isCorrect
                ? validations.find(
                  v => v.message === 'optimal length' || v.message === 'optimal size'
                )?.tooltip ||
                  (isSlugFriendly
                    ? 'Slug-friendly URLs use lowercase letters, hyphens, and no special characters. This improves SEO, readability, and ensures URLs work consistently across all platforms and systems.'
                    : primaryStatus?.tooltip)
                : primaryStatus?.tooltip}
              {field.isNullable && (
                <>
                  {' '}
                  <Link
                    href={field.validatorUrl}
                    logoIcon
                    css={theme({
                      color: 'red7',
                      fontSize: 0,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    })}
                  >
                    click to fix
                  </Link>
                </>
              )}
            </Text>
            <Text
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                color: field.isNullable ? 'red7' : 'black60',
                wordBreak: 'break-all',
                mt: 2
              })}
            >
              {renderedValue}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
