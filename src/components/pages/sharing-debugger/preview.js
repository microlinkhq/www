import React from 'react'
import { theme, layout } from 'theme'
import { MoreVertical, Grid } from 'react-feather'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+'

const GoogleIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
  </Box>
)

const XIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </Box>
)

const SlackIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z' />
  </Box>
)

const FacebookIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z' />
  </Box>
)

const LinkedInIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </Box>
)

const DiscordIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z' />
  </Box>
)

const WhatsAppIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
  </Box>
)

const TelegramIcon = ({ size, ...props }) => (
  <Box
    as='svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    css={theme({ width: size, height: size, fill: 'currentColor' })}
    {...props}
  >
    <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
  </Box>
)

const GooglePreview = ({ metadata }) => {
  const domain = (() => {
    try {
      return new URL(metadata.url).hostname
    } catch (e) {
      return ''
    }
  })()

  return (
    <Box>
      <Flex css={theme({ alignItems: 'center', mb: 2 })}>
        {metadata.logo && (
          <Flex
            css={theme({
              bg: 'white',
              borderRadius: '50%',
              p: '2px',
              border: 1,
              borderColor: 'black10',
              mr: 3,
              width: '28px',
              height: '28px',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            })}
          >
            <Image
              src={metadata.logo.url}
              alt={domain}
              width='18px'
              height='18px'
            />
          </Flex>
        )}
        <Box>
          <Text
            css={theme({
              color: 'rgb(32, 33, 36)',
              fontSize: '14px',
              fontFamily: 'sans',
              lineHeight: '20px'
            })}
          >
            {domain}
          </Text>
          <Flex css={theme({ alignItems: 'center' })}>
            <Text
              css={theme({
                color: 'rgb(95, 99, 104)',
                fontSize: '12px',
                fontFamily: 'sans',
                lineHeight: '18px'
              })}
            >
              {metadata.url}
            </Text>
            <Flex css={theme({ ml: 1, color: 'black40' })}>
              <MoreVertical size={14} />
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Text
        css={theme({
          color: '#1a0dab',
          fontSize: 2,
          mb: 1,
          '&:hover': { textDecoration: 'underline' },
          cursor: 'pointer',
          fontFamily: 'sans'
        })}
      >
        {metadata.title.includes(' — ')
          ? metadata.title.split(' — ')[1]
          : metadata.title}
      </Text>
      <Text
        css={theme({
          color: 'black60',
          fontSize: '14px',
          lineHeight: 1.5,
          fontFamily: 'sans'
        })}
      >
        {metadata.description}
      </Text>
    </Box>
  )
}

const XPreview = ({ metadata }) => (
  <Box css={theme({ maxWidth: layout.small, mx: 'auto' })}>
    <Box
      css={theme({
        border: 1,
        borderRadius: '12px',
        overflow: 'hidden',
        bg: 'white',
        borderColor: 'black10',
        position: 'relative'
      })}
    >
      <Image
        src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
        alt={metadata.title}
        css={theme({
          width: '100%',
          height: '325px',
          display: 'block',
          objectFit: 'scale-down'
        })}
      />
      <Box
        css={theme({
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          px: '8px',
          bg: 'rgba(0, 0, 0, 0.77)',
          borderRadius: '4px',
          maxWidth: 'calc(100% - 24px)'
        })}
      >
        <Text
          css={theme({
            color: 'white',
            fontSize: '13px',
            fontFamily: 'sans',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 'regular'
          })}
        >
          {metadata.title}
        </Text>
      </Box>
    </Box>
    <Text
      css={theme({
        fontSize: '13px',
        color: 'black40',
        mt: 2,
        fontFamily: 'sans'
      })}
    >
      From {metadata.url ? new URL(metadata.url).hostname : ''}
    </Text>
  </Box>
)

const FacebookPreview = ({ metadata }) => (
  <Flex
    css={theme({
      border: 1,
      overflow: 'hidden',
      bg: 'white',
      borderColor: 'black10',
      maxWidth: layout.small,
      mx: 'auto',
      height: '400px',
      flexDirection: 'column'
    })}
  >
    <Box css={theme({ height: '310px', bg: 'white' })}>
      <Image
        src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
        alt={metadata.title}
        css={theme({
          width: '100%',
          height: '100%',
          objectFit: 'scale-down',
          display: 'block'
        })}
      />
    </Box>
    <Flex
      css={theme({
        px: 3,
        bg: '#F2F3F5',
        borderTop: 1,
        borderColor: 'black10',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      })}
    >
      <Text
        css={theme({
          color: '#606770',
          fontSize: '12px',
          textTransform: 'uppercase',
          maxWidth: '80%',
          mb: 1
        })}
      >
        {metadata.url ? new URL(metadata.url).hostname : ''}
      </Text>
      <Text
        css={theme({
          fontWeight: 'bold',
          color: '#1d2129',
          fontSize: '16px',
          maxWidth: '80%',
          lineHeight: '20px'
        })}
      >
        {metadata.title}
      </Text>
    </Flex>
  </Flex>
)

const LinkedInPreview = ({ metadata }) => (
  <Box
    css={theme({
      border: 1,
      borderRadius: '12px',
      overflow: 'hidden',
      borderColor: 'black10',
      maxWidth: layout.small,
      mx: 'auto'
    })}
  >
    <Box css={theme({ height: '310px', bg: 'white' })}>
      <Image
        src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
        alt={metadata.title}
        css={theme({
          width: '100%',
          height: '100%',
          objectFit: 'scale-down',
          display: 'block'
        })}
      />
    </Box>
    <Box css={theme({ p: 3, bg: 'white' })}>
      <Text
        css={theme({
          fontWeight: 'bold',
          fontSize: '14px',
          color: 'black',
          mb: '4px',
          fontFamily: 'sans',
          overflow: 'hidden'
        })}
      >
        {metadata.title}
      </Text>
      <Text
        css={theme({ color: 'black60', fontSize: '12px', fontFamily: 'sans' })}
      >
        {metadata.url ? new URL(metadata.url).hostname : ''}
      </Text>
    </Box>
  </Box>
)

const SlackPreview = ({ metadata }) => (
  <Box
    css={theme({
      borderLeft: '4px solid',
      borderColor: '#e8e8e8',

      pl: 3,
      py: 1
    })}
  >
    <Flex css={theme({ alignItems: 'center', mb: 1, gap: 2 })}>
      {metadata.logo && (
        <Image
          src={metadata.logo.url}
          alt={metadata.publisher}
          width='16px'
          height='16px'
          borderRadius='2px'
        />
      )}
      <Text
        css={theme({
          fontWeight: 900,
          color: 'rgb(29, 28, 29)',
          fontSize: '15px',
          fontFamily: 'sans'
        })}
      >
        {metadata.publisher}
      </Text>
    </Flex>
    <Text
      css={theme({
        fontWeight: 700,
        color: 'rgb(18, 100, 163)',
        fontSize: '15px',
        mb: '2px',
        fontFamily: 'sans'
      })}
    >
      {metadata.title}
    </Text>
    <Box css={theme({ mb: 2 })}>
      <Text
        css={theme({
          color: 'rgb(29, 28, 29)',
          fontSize: '15px',
          fontFamily: 'sans'
        })}
      >
        {metadata.description}{' '}
        {metadata.image &&
          metadata.image.size_pretty &&
          `(${metadata.image.size_pretty})`}
      </Text>
    </Box>
    <Image
      src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
      alt={metadata.title}
      css={theme({
        maxWidth: '280px',
        maxHeight: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: 1,
        borderColor: 'black10'
      })}
    />
  </Box>
)

const WhatsAppPreview = ({ metadata }) => {
  const domain = metadata.url ? new URL(metadata.url).hostname : ''
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return (
    <Box
      css={theme({
        bg: '#154D38',
        p: '8px',
        borderRadius: '8px',
        maxWidth: `calc(${layout.small} * 0.6)`,
        mx: 'auto'
      })}
    >
      <Box
        css={theme({
          bg: '#113E2D',
          borderRadius: '6px',
          overflow: 'hidden',
          mb: 2
        })}
      >
        <Image
          src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
          alt={metadata.title}
          css={theme({ width: '100%', height: 'auto', display: 'block' })}
        />
        <Box css={theme({ p: '10px' })}>
          <Text
            css={theme({
              fontWeight: 'bold',
              lineHeight: '19px',
              fontSize: '13.6px',
              color: '#F7F7F7',
              mb: 1
            })}
          >
            {metadata.title}
          </Text>
          <Text
            css={theme({
              fontSize: '12px',
              color: '#F6F6F6',
              mb: 1
            })}
          >
            {metadata.description}
          </Text>
          <Text
            css={theme({
              fontSize: '12px',
              color: '#9DADA6',
              textTransform: 'lowercase'
            })}
          >
            {domain}
          </Text>
        </Box>
      </Box>

      <Flex
        css={theme({
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          px: 1,
          mt: 2,
          gap: 2
        })}
      >
        <Text
          css={theme({
            fontSize: '14px',
            color: '#55eb90',
            textDecoration: 'underline',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          {metadata.url}
        </Text>

        <Flex
          css={theme({
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
            pb: '2px'
          })}
        >
          <Text
            css={theme({
              fontSize: '11px',
              color: '#8696a0'
            })}
          >
            Edited {time}
          </Text>
          <Text
            css={theme({
              fontSize: '11px',
              color: '#8696a0'
            })}
          >
            ✓
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

const TelegramPreview = ({ metadata }) => (
  <Box
    css={theme({
      bg: '#766BC8',
      p: 2,
      borderRadius: '12px',
      maxWidth: `calc(${layout.small} * 0.75)`,
      mx: 'auto',
      color: 'white',
      fontFamily: 'sans'
    })}
  >
    <Text
      css={theme({
        fontSize: '14px',
        mb: 2,
        textDecoration: 'underline',
        cursor: 'pointer',
        display: 'block'
      })}
    >
      {metadata.url}
    </Text>

    <Box
      css={theme({
        borderRadius: '3px',
        borderLeft: '.1875rem solid white',
        bg: '#8775DA',
        color: 'white',
        p: 2
      })}
    >
      {metadata.publisher && (
        <Text
          css={theme({
            fontWeight: 'bold',
            fontSize: '14px',
            mb: '2px'
          })}
        >
          {metadata.publisher}
        </Text>
      )}
      <Text
        css={theme({
          fontWeight: 'bold',
          fontSize: '14px',
          mb: '2px'
        })}
      >
        {metadata.title}
      </Text>
      <Box css={theme({ mb: 2 })}>
        <Text
          css={theme({
            fontSize: '14px',
            lineHeight: 1.4
          })}
        >
          {metadata.description}
        </Text>
      </Box>
      <Image
        src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
        alt={metadata.title}
        css={theme({
          borderRadius: '4px',
          display: 'block'
        })}
      />
    </Box>

    <Flex
      css={theme({
        justifyContent: 'flex-end',
        alignItems: 'center',
        mt: 1,
        opacity: 0.8
      })}
    >
      <Text
        css={theme({
          fontSize: '11px',
          mr: 1
        })}
      >
        edited{' '}
        {new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </Text>
      <Text
        css={theme({
          fontSize: '11px',
          fontWeight: 'bold'
        })}
      >
        ✓✓
      </Text>
    </Flex>
  </Box>
)

const DiscordPreview = ({ metadata }) => (
  <Box
    css={theme({
      bg: '#313338',
      p: 3,
      borderRadius: 4,
      maxWidth: '432px',
      fontFamily: 'sans',
      mx: 'auto'
    })}
  >
    <Text
      css={theme({
        color: '#00A8FC',
        fontSize: 1,
        mb: 2,
        '&:hover': { textDecoration: 'underline' },
        cursor: 'pointer'
      })}
    >
      {metadata.url}
    </Text>
    <Box
      css={theme({
        bg: '#2B2D31',
        p: 3,
        borderRadius: 1,
        maxWidth: 'fit-content'
      })}
    >
      {metadata.publisher && (
        <Text
          css={theme({
            color: '#B5BAC1',
            fontSize: '12px',
            fontWeight: 500,
            mb: 1
          })}
        >
          {metadata.publisher}
        </Text>
      )}
      <Text
        css={theme({
          color: '#00A8FC',
          fontSize: 1,
          fontWeight: 'bold',
          mb: 2,
          '&:hover': { textDecoration: 'underline' },
          cursor: 'pointer'
        })}
      >
        {metadata.title}
      </Text>
      <Text
        css={theme({
          color: '#DBDEE1',
          fontSize: 0,
          lineHeight: '18px',
          mb: 3
        })}
      >
        {metadata.description}
      </Text>
      <Image
        src={metadata.image ? metadata.image.url : FALLBACK_IMAGE}
        alt={metadata.title}
        css={theme({
          borderRadius: 4,
          maxWidth: '100%',
          mt: 3
        })}
      />
    </Box>
  </Box>
)

export const PREVIEWS = {
  all: { name: 'All', component: null, icon: Grid },
  x: { name: 'X (Twitter)', component: XPreview, icon: XIcon },
  google: { name: 'Google', component: GooglePreview, icon: GoogleIcon },
  slack: { name: 'Slack', component: SlackPreview, icon: SlackIcon },
  facebook: {
    name: 'Facebook',
    component: FacebookPreview,
    icon: FacebookIcon
  },
  linkedin: {
    name: 'LinkedIn',
    component: LinkedInPreview,
    icon: LinkedInIcon
  },
  discord: { name: 'Discord', component: DiscordPreview, icon: DiscordIcon },
  whatsapp: {
    name: 'WhatsApp',
    component: WhatsAppPreview,
    icon: WhatsAppIcon
  },
  telegram: { name: 'Telegram', component: TelegramPreview, icon: TelegramIcon }
}
