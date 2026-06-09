/**
 * link-card — single source of truth for the link-preview card markup + config.
 *
 * Pure, dependency-free functions that turn a Microlink API `data` object plus a
 * `config` into a self-contained HTML string (100% inline styles, no external
 * CSS/JS). Shared by:
 *   - the `/tools/embed-url` tool (live preview + copyable HTML)
 *   - the `/integrations/builder` tool (live preview)
 *   - the per-framework code generators (via a runtime port — see
 *     components/pages/builder/generators.js, kept in sync by a vitest test)
 *
 * The builders honor three optional layout fields (`width`, `height`,
 * `imagePosition`). When absent they fall back to the original literals, so the
 * embed-url tool renders byte-identical output.
 */

/* ─── Constants ────────────────────────────────────────── */

export const FONT_FAMILIES = {
  sans: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  serif: "'Georgia','Times New Roman',serif",
  mono: "'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace"
}
export const FONT_FAMILY_OPTIONS = [
  { id: 'sans', label: 'Sans' },
  { id: 'serif', label: 'Serif' },
  { id: 'mono', label: 'Mono' }
]
export const FONT_WEIGHTS = { light: 300, regular: 400, medium: 500, bold: 700 }
export const FONT_WEIGHT_OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'regular', label: 'Regular' },
  { id: 'medium', label: 'Medium' },
  { id: 'bold', label: 'Bold' }
]
export const SHADOW_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'subtle', label: 'Subtle' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' }
]
export const THEME_OPTIONS = [
  { id: 'light', label: 'Light theme' },
  { id: 'dark', label: 'Dark theme' }
]

export const ELEMENT_GROUPS = [
  {
    id: 'identity',
    label: 'Identity',
    fields: [
      { id: 'siteIcon', label: 'Site icon' },
      { id: 'siteName', label: 'Site name' },
      { id: 'authorTopic', label: 'Author / topic' }
    ]
  },
  {
    id: 'content',
    label: 'Content',
    fields: [
      { id: 'description', label: 'Description' },
      { id: 'date', label: 'Date' }
    ]
  }
]

export const COLOR_FIELDS = [
  { id: 'headline', label: 'Headline' },
  { id: 'description', label: 'Description' },
  { id: 'meta', label: 'Website' },
  { id: 'background', label: 'Background' },
  { id: 'border', label: 'Border' }
]

export const DEFAULT_LIGHT_COLORS = {
  headline: '#000000',
  description: '#000000',
  meta: '#999999',
  website: '#999999',
  background: '#ffffff',
  border: '#dedede'
}

export const DEFAULT_DARK_COLORS = {
  headline: '#ffffff',
  description: '#ffffff',
  meta: '#808080',
  website: '#808080',
  background: '#000000',
  border: '#222222'
}

export const DEFAULT_CONFIG = {
  variant: 'large',
  elements: {
    description: true,
    siteIcon: true,
    siteName: true,
    authorTopic: false,
    date: false
  },
  metaBefore: true,
  border: 1,
  radius: 12,
  shadow: 'subtle',
  shadowColor: '#000000',
  fontBase: 'sans',
  fontWeight: 'regular',
  lineHeight: 1.4,
  headlineSize: 16,
  descriptionSize: 13,
  metaSize: 11,
  theme: 'light',
  lightColors: { ...DEFAULT_LIGHT_COLORS },
  darkColors: { ...DEFAULT_DARK_COLORS }
}

export const escAttr = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export const escText = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export const CARD_TEXT_LIMITS = {
  large: { title: 90, description: 220 },
  small: { title: 60, description: 140 }
}

export const truncate = (text, max) => {
  const str = String(text ?? '')
  if (str.length <= max) return str
  const slice = str.slice(0, max - 1)
  const trimmed = slice.replace(/\s+\S*$/, '')
  return `${trimmed || slice}…`
}

export const imageLogoFallbackAttr = logoUrl =>
  logoUrl
    ? `onerror="this.onerror=null;this.src='${logoUrl.replace(
      /'/g,
      '&#39;'
    )}';this.style.objectFit='contain';this.style.padding='15%'" `
    : ''

export const pickFallbackBg = data =>
  data?.image?.palette?.[0] || 'rgba(0,0,0,0.05)'

export const hexToRgba = (hex, alpha) => {
  const h = String(hex || '#000000').replace(/^#/, '')
  const full =
    h.length === 3
      ? h
        .split('')
        .map(c => c + c)
        .join('')
      : h
  const r = parseInt(full.slice(0, 2), 16) || 0
  const g = parseInt(full.slice(2, 4), 16) || 0
  const b = parseInt(full.slice(4, 6), 16) || 0
  return `rgba(${r},${g},${b},${alpha})`
}

export const resolveShadow = (kind, color) => {
  if (kind === 'none') return 'none'
  if (kind === 'large') return `0 12px 40px ${hexToRgba(color, 0.25)}`
  if (kind === 'medium') return `0 4px 16px ${hexToRgba(color, 0.18)}`
  return `0 1px 4px ${hexToRgba(color, 0.1)}`
}

export const formatDate = value => {
  if (!value) return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

export const resolveStyle = config => {
  const palette =
    config.theme === 'dark' ? config.darkColors : config.lightColors
  return {
    palette,
    fontFamily: FONT_FAMILIES[config.fontBase] || FONT_FAMILIES.sans,
    fontWeight: FONT_WEIGHTS[config.fontWeight] || 400,
    lineHeight: config.lineHeight,
    headlineSize: config.headlineSize,
    descriptionSize: config.descriptionSize,
    metaSize: config.metaSize,
    border: `${config.border}px solid ${palette.border}`,
    radius: `${config.radius}px`,
    shadow: resolveShadow(config.shadow, config.shadowColor),
    elements: config.elements,
    metaBefore: config.metaBefore,
    // Optional layout fields (builder only; embed-url leaves them undefined).
    width: config.width || null,
    mediaHeight: config.height || null,
    imagePosition: config.imagePosition || null
  }
}

const de = (s, kind) => (s.instrument ? ` data-element="${kind}"` : '')

export const buildMetaPieces = (data, s) => {
  const pieces = []
  if (s.elements.siteIcon && data?.logo?.url) {
    pieces.push(
      `<img${de(s, 'siteIcon')} src="${escAttr(
        data.logo.url
      )}" alt="" style="width:${s.metaSize + 4}px;height:${
        s.metaSize + 4
      }px;border-radius:4px;flex-shrink:0" />`
    )
  }
  if (s.elements.siteName && data?.publisher) {
    pieces.push(
      `<span${de(s, 'siteName')} style="font-size:${s.metaSize}px;font-weight:${
        s.fontWeight
      };color:${
        s.palette.meta
      };letter-spacing:0.5px;text-transform:uppercase">${escText(
        data.publisher
      )}</span>`
    )
  }
  if (s.elements.authorTopic && data?.author) {
    pieces.push(
      `<span${de(s, 'authorTopic')} style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">${escText(data.author)}</span>`
    )
  }
  if (s.elements.date && data?.date) {
    const dateStr = formatDate(data.date)
    if (dateStr) {
      pieces.push(
        `<span${de(s, 'date')} style="font-size:${s.metaSize}px;color:${
          s.palette.meta
        }">${escText(dateStr)}</span>`
      )
    }
  }
  if (!pieces.length) return ''
  return `<div${de(
    s,
    'meta'
  )} style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:${
    s.metaSize + 4
  }px">${pieces.join('')}</div>`
}

export const buildLargeCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const imageUrl = data?.image?.url ? escAttr(data.image.url) : ''
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(
    truncate(data?.title || '', CARD_TEXT_LIMITS.large.title)
  )
  const description = s.elements.description
    ? escText(
      truncate(data?.description || '', CARD_TEXT_LIMITS.large.description)
    )
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const metaHtml = buildMetaPieces(data, s)
  const maxWidth = s.width || 460
  const mediaBox = s.mediaHeight
    ? `width:100%;height:${s.mediaHeight}px;background:${fallbackBg};overflow:hidden`
    : `width:100%;aspect-ratio:16 / 9;background:${fallbackBg};overflow:hidden`

  const mediaInner = imageUrl
    ? `<img src="${imageUrl}" alt="" ${imageLogoFallbackAttr(
      logoUrl
    )}style="width:100%;height:100%;object-fit:cover;display:block" />`
    : ''

  const titleHtml = `<div${de(s, 'headline')} style="font-size:${
    s.headlineSize
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };margin:0">${title}</div>`
  const descriptionHtml = description
    ? `<div${de(s, 'description')} style="font-size:${
      s.descriptionSize
    }px;color:${s.palette.description};line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaHtml}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaHtml}`

  return `<a${de(
    s,
    'frame'
  )} href="${href}" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;color:inherit;width:100%;max-width:${maxWidth}px;background:${
    s.palette.background
  };border-radius:${s.radius};overflow:hidden;border:${s.border};box-shadow:${
    s.shadow
  };font-family:${s.fontFamily}">
  <div style="${mediaBox}">${mediaInner}</div>
  <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px">${body}</div>
</a>`
}

export const buildWideCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const imageUrl = data?.image?.url ? escAttr(data.image.url) : ''
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(data?.title || '')
  const description = s.elements.description
    ? escText(data?.description || '')
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const metaHtml = buildMetaPieces(data, s)
  const maxWidth = s.width || 460
  const minHeight = s.mediaHeight || 140
  const flexDirection =
    s.imagePosition === 'right' ? 'flex-direction:row-reverse;' : ''

  const mediaInner = imageUrl
    ? `<img src="${imageUrl}" alt="" ${imageLogoFallbackAttr(
      logoUrl
    )}style="width:100%;height:100%;object-fit:cover;display:block" />`
    : ''

  const titleHtml = `<div${de(s, 'headline')} style="font-size:${
    s.headlineSize
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${title}</div>`
  const descriptionHtml = description
    ? `<div${de(s, 'description')} style="font-size:${
      s.descriptionSize
    }px;color:${s.palette.description};line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaHtml}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaHtml}`

  return `<a${de(
    s,
    'frame'
  )} href="${href}" target="_blank" rel="noopener noreferrer" style="display:flex;${flexDirection}text-decoration:none;color:inherit;width:100%;max-width:${maxWidth}px;min-height:${minHeight}px;background:${
    s.palette.background
  };border-radius:${s.radius};overflow:hidden;border:${s.border};box-shadow:${
    s.shadow
  };font-family:${s.fontFamily}">
  <div style="width:140px;flex-shrink:0;align-self:stretch;background:${fallbackBg};overflow:hidden">${mediaInner}</div>
  <div style="padding:14px;display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;justify-content:center">${body}</div>
</a>`
}

export const buildSmallCard = (data, s) => {
  const href = escAttr(data?.url || '')
  const logoUrl = data?.logo?.url ? escAttr(data.logo.url) : ''
  const title = escText(
    truncate(data?.title || '', CARD_TEXT_LIMITS.small.title)
  )
  const description = s.elements.description
    ? escText(
      truncate(data?.description || '', CARD_TEXT_LIMITS.small.description)
    )
    : ''
  const fallbackBg = escAttr(pickFallbackBg(data))
  const maxWidth = s.width || 380

  const showIcon = s.elements.siteIcon
  const iconNode = !showIcon
    ? ''
    : logoUrl
      ? `<img${de(
        s,
        'siteIcon'
      )} src="${logoUrl}" alt="" style="width:36px;height:36px;border-radius:8px;flex-shrink:0" />`
      : `<div${de(
        s,
        'siteIcon'
      )} style="width:36px;height:36px;border-radius:8px;flex-shrink:0;background:${fallbackBg}"></div>`

  const publisherText =
    s.elements.siteName && data?.publisher
      ? `<span${de(s, 'siteName')} style="font-size:${
        s.metaSize + 1
      }px;font-weight:${s.fontWeight};color:${s.palette.meta}">${escText(
        data.publisher
      )}</span>`
      : ''
  const authorText =
    s.elements.authorTopic && data?.author
      ? `<span aria-hidden="true" style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">· </span><span${de(s, 'authorTopic')} style="font-size:${
        s.metaSize
      }px;color:${s.palette.meta}">${escText(data.author)}</span>`
      : ''
  const dateText =
    s.elements.date && data?.date
      ? `<span${de(s, 'date')} style="font-size:${s.metaSize}px;color:${
        s.palette.meta
      }">${escText(formatDate(data.date))}</span>`
      : ''

  const metaRow =
    publisherText || authorText
      ? `<div${de(
        s,
        'meta'
      )} style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;gap:8px">
      <span style="display:flex;align-items:center;gap:4px;min-width:0;overflow:hidden">${publisherText}${authorText}</span>
      ${dateText}
    </div>`
      : ''

  const titleHtml = `<div${de(s, 'headline')} style="font-size:${
    s.headlineSize - 3
  }px;font-weight:${s.fontWeight};color:${s.palette.headline};line-height:${
    s.lineHeight
  };margin-bottom:2px">${title}</div>`
  const descriptionHtml = description
    ? `<div${de(s, 'description')} style="font-size:${
      s.descriptionSize - 1
    }px;color:${s.palette.description};line-height:${
      s.lineHeight
    };display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${description}</div>`
    : ''

  const body = s.metaBefore
    ? `${metaRow}${titleHtml}${descriptionHtml}`
    : `${titleHtml}${descriptionHtml}${metaRow}`

  return `<a${de(
    s,
    'frame'
  )} href="${href}" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;gap:10px;align-items:flex-start;width:100%;max-width:${maxWidth}px;padding:12px 14px;border-radius:${
    s.radius
  };background:${
    s.palette.background
  };-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);border:${
    s.border
  };box-shadow:${s.shadow};font-family:${s.fontFamily}">
  ${iconNode}
  <div style="flex:1;min-width:0">${body}</div>
</a>`
}

export const CARD_VARIANTS = [
  { id: 'large', label: 'Standard cover', build: buildLargeCard },
  { id: 'wide', label: 'Wide cover', build: buildWideCard },
  { id: 'small', label: 'Compact cover', build: buildSmallCard }
]

export const buildCardHtml = (data, config, { instrument = false } = {}) => {
  const variant =
    CARD_VARIANTS.find(v => v.id === config.variant) || CARD_VARIANTS[0]
  const s = resolveStyle(config)
  s.instrument = instrument
  return variant.build(data, s)
}

export const isSameConfig = (a, b) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return false
  }
}

/**
 * Derive the card `variant` from the builder's two-axis layout model
 * (size preset + image position). Used by the builder UI; embed-url sets
 * `variant` directly.
 */
export const deriveVariant = ({ size, imagePosition }) => {
  if (size === 'small') return 'small'
  if (imagePosition === 'top') return 'large'
  return 'wide'
}
