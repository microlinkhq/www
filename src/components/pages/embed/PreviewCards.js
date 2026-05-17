import React, { useEffect, useState } from 'react'
import { colors, fonts } from 'theme'
import {
  Heart as HeartIcon,
  MessageCircle as MessageIcon,
  Repeat as RepeatIcon
} from 'react-feather'

export const STRIPE_DEMO_DATA = {
  title: 'Financial Infrastructure to Grow Your Revenue',
  description:
    'Join the millions of companies of all sizes that use Stripe online and in person to accept payments, send payouts, automate financial processes, and ultimately grow revenue.',
  url: 'https://stripe.com',
  publisher: 'Stripe',
  author: 'Stripe',
  image: {
    url: 'https://api.microlink.io/?url=https%3A%2F%2Fstripe.com&embed=image.url',
    palette: ['#635BFF', '#0A2540', '#F6F9FC']
  },
  logo: {
    url: 'https://api.microlink.io/?url=https%3A%2F%2Fstripe.com&embed=logo.url'
  }
}

const getHostname = url => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const PreviewMedia = ({ src, palette, alt = '', style }) => {
  const [errored, setErrored] = useState(false)
  useEffect(() => {
    setErrored(false)
  }, [src])
  const fallbackBg = palette?.[0] || colors.black05
  if (!src || errored) {
    return <div style={{ ...style, background: fallbackBg }} />
  }
  return (
    <div style={{ ...style, overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  )
}

export const HeroCard = ({ data = STRIPE_DEMO_DATA }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 460,
      background: '#fff',
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${colors.black10}`,
      boxShadow: `0 8px 32px ${colors.black10}`,
      fontFamily: fonts.sans
    }}
  >
    <PreviewMedia
      src={data.image?.url}
      palette={data.image?.palette}
      style={{ width: '100%', aspectRatio: '16 / 9' }}
    />
    <div style={{ padding: '14px 16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 6
        }}
      >
        {data.logo?.url && (
          <img
            src={data.logo.url}
            alt=''
            style={{ width: 16, height: 16, borderRadius: 4 }}
          />
        )}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: colors.black60,
            letterSpacing: 1,
            textTransform: 'uppercase'
          }}
        >
          {data.publisher}
        </span>
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.3,
          marginBottom: 4
        }}
      >
        {data.title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: colors.black70,
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {data.description}
      </div>
    </div>
  </div>
)

export const OneLineCard = ({ data = STRIPE_DEMO_DATA }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 460,
      background: '#fff',
      padding: '10px 14px',
      borderRadius: 10,
      border: `1px solid ${colors.black10}`,
      boxShadow: `0 4px 16px ${colors.black10}`,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: fonts.sans
    }}
  >
    {data.logo?.url
      ? (
        <img
          src={data.logo.url}
          alt=''
          style={{ width: 20, height: 20, borderRadius: 4, flexShrink: 0 }}
        />
        )
      : (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            flexShrink: 0,
            background: data.image?.palette?.[0] || colors.black10
          }}
        />
        )}
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: colors.black,
        whiteSpace: 'nowrap',
        flexShrink: 0
      }}
    >
      {data.publisher}
    </span>
    <span
      style={{
        fontSize: 13,
        color: colors.black70,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        minWidth: 0
      }}
    >
      {data.title}
    </span>
    <span
      style={{
        fontSize: 12,
        color: colors.black50,
        fontFamily: fonts.mono,
        flexShrink: 0
      }}
    >
      {getHostname(data.url) || 'stripe.com'}
    </span>
  </div>
)

export const TelegramCard = ({ data = STRIPE_DEMO_DATA }) => {
  const accent = data.image?.palette?.[0] || '#635BFF'
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 380,
        background: '#fff',
        borderRadius: 18,
        padding: '12px 14px 12px 22px',
        position: 'relative',
        border: `1px solid ${colors.black10}`,
        boxShadow: `0 4px 18px ${colors.black10}`,
        fontFamily: fonts.sans
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 14,
          bottom: 14,
          width: 3,
          borderRadius: 2,
          background: accent
        }}
      />
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: accent,
              marginBottom: 2
            }}
          >
            {data.publisher}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.black,
              lineHeight: 1.3,
              marginBottom: 4
            }}
          >
            {data.title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: colors.black70,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {data.description}
          </div>
        </div>
        <PreviewMedia
          src={data.image?.url}
          palette={data.image?.palette}
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            flexShrink: 0
          }}
        />
      </div>
    </div>
  )
}

export const TwitterCard = ({ data = STRIPE_DEMO_DATA }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 460,
      background: '#fff',
      borderRadius: 14,
      overflow: 'hidden',
      border: `1px solid ${colors.black10}`,
      boxShadow: `0 4px 16px ${colors.black10}`,
      display: 'flex',
      minHeight: 140,
      fontFamily: fonts.sans
    }}
  >
    <PreviewMedia
      src={data.image?.url}
      palette={data.image?.palette}
      style={{ width: 140, flexShrink: 0, alignSelf: 'stretch' }}
    />
    <div
      style={{
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: 1,
        minWidth: 0,
        justifyContent: 'center'
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: colors.black60,
          fontFamily: fonts.mono
        }}
      >
        {getHostname(data.url) || 'stripe.com'}
      </span>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {data.title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: colors.black70,
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {data.description}
      </div>
    </div>
  </div>
)

export const NotificationCard = ({ data = STRIPE_DEMO_DATA }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 380,
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${colors.black10}`,
      boxShadow: `0 12px 40px ${colors.black20}`,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontFamily: fonts.sans
    }}
  >
    {data.logo?.url
      ? (
        <img
          src={data.logo.url}
          alt=''
          style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }}
        />
        )
      : (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            flexShrink: 0,
            background: data.image?.palette?.[0] || colors.black10
          }}
        />
        )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
          gap: 8
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.black }}>
          {data.publisher}
        </span>
        <span style={{ fontSize: 11, color: colors.black50 }}>now</span>
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: colors.black,
          lineHeight: 1.3,
          marginBottom: 2
        }}
      >
        {data.title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: colors.black70,
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {data.description}
      </div>
    </div>
  </div>
)

export const ChatBubbleCard = ({ data = STRIPE_DEMO_DATA }) => {
  const accent = data.image?.palette?.[0] || '#635BFF'
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 320,
        fontFamily: fonts.sans
      }}
    >
      <div
        style={{
          background: '#d9fdd3',
          borderRadius: 12,
          borderTopRightRadius: 4,
          padding: 5,
          boxShadow: '0 1px 1.5px rgba(0, 0, 0, 0.13)',
          position: 'relative'
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.06)',
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 2,
            paddingLeft: 8,
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: accent
            }}
          />
          <PreviewMedia
            src={data.image?.url}
            palette={data.image?.palette}
            style={{ width: '100%', aspectRatio: '2 / 1' }}
          />
          <div style={{ padding: '6px 10px 8px 8px' }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.black,
                lineHeight: 1.3,
                marginBottom: 2,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {data.title}
            </div>
            <div
              style={{
                fontSize: 11,
                color: colors.black70,
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {data.description}
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '4px 8px 0 8px',
            fontSize: 14,
            color: colors.black,
            lineHeight: 1.4
          }}
        >
          Check this webpage!{' '}
          <span style={{ color: '#027eb5', textDecoration: 'underline' }}>
            {getHostname(data.url) || 'stripe.com'}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 3,
            padding: '0 8px 2px',
            fontSize: 10,
            color: 'rgba(0, 0, 0, 0.45)'
          }}
        >
          <span>12:34</span>
          <span style={{ color: '#53bdeb', fontSize: 12, lineHeight: 1 }}>
            ✓✓
          </span>
        </div>
      </div>
    </div>
  )
}

export const TweetCard = ({ data = STRIPE_DEMO_DATA }) => {
  const accent = '#1d9bf0'
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 480,
        fontFamily: fonts.sans,
        background: '#fff',
        borderRadius: 16,
        border: `1px solid ${colors.black10}`,
        boxShadow: `0 4px 16px ${colors.black10}`,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#000',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1
            }}
          >
            m
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap',
            minWidth: 0,
            flex: 1
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: colors.black }}>
            Microlink
          </span>
          <span style={{ fontSize: 14, color: colors.black50 }}>
            @microlinkhq · 2h
          </span>
        </div>
      </div>
      <div style={{ fontSize: 14, color: colors.black, lineHeight: 1.4 }}>
        Embed any URL with rich previews — try it with{' '}
        <span style={{ color: accent }}>stripe.com</span>
      </div>
      <div
        style={{
          borderRadius: 14,
          overflow: 'hidden',
          border: `1px solid ${colors.black10}`
        }}
      >
        <PreviewMedia
          src={data.image?.url}
          palette={data.image?.palette}
          style={{ width: '100%', aspectRatio: '2 / 1' }}
        />
        <div style={{ padding: '10px 12px', background: '#fff' }}>
          <div style={{ fontSize: 12, color: colors.black50, marginBottom: 2 }}>
            {getHostname(data.url) || 'stripe.com'}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.black,
              lineHeight: 1.3,
              marginBottom: 2,
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {data.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: colors.black70,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {data.description}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12,
          color: colors.black50,
          paddingTop: 2,
          gap: 12
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <MessageIcon size={14} aria-hidden='true' /> 24
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <RepeatIcon size={14} aria-hidden='true' /> 188
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <HeartIcon size={14} aria-hidden='true' /> 1.2k
        </span>
      </div>
    </div>
  )
}
