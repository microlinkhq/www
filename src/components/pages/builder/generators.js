/**
 * generators — turn a card `config` into copy-paste components for React, Vue,
 * Angular, Svelte, and Vanilla JS.
 *
 * Each generated component is ZERO-dependency: it fetches metadata from the
 * Microlink REST API itself (free `api.microlink.io`, or `pro.microlink.io`
 * when an `apiKey` is supplied) and renders the designed card.
 *
 * The card markup is produced at runtime by `RUNTIME_RENDERER` — a
 * dependency-free, ES2019-safe port of the `helpers/link-card` builders. It is
 * authored with string concatenation (no template literals / no optional
 * chaining) so it embeds cleanly into every framework and runs in older
 * browsers. A vitest test (`test/builder-generators.test.js`) asserts it stays
 * byte-identical to `buildCardHtml`, so the two never drift.
 */

import { resolveStyle } from 'helpers/link-card'

/* ─── Runtime card renderer (shipped verbatim into every snippet) ───────── */

export const RUNTIME_RENDERER = `function escA (v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function escT (v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function trunc (t, max) {
  var str = String(t == null ? '' : t)
  if (str.length <= max) return str
  var slice = str.slice(0, max - 1)
  var trimmed = slice.replace(/\\s+\\S*$/, '')
  return (trimmed || slice) + '…'
}
function fmtDate (v) {
  if (!v) return ''
  try {
    var d = new Date(v)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch (e) { return '' }
}
function fallbackBg (data) {
  return (data.image && data.image.palette && data.image.palette[0]) || 'rgba(0,0,0,0.05)'
}
function logoFallbackAttr (logoUrl) {
  return logoUrl ? 'onerror="this.onerror=null;this.src=\\'' + logoUrl.replace(/'/g, '&#39;') + '\\';this.style.objectFit=\\'contain\\';this.style.padding=\\'15%\\'" ' : ''
}
function buildMeta (data, s) {
  var pieces = []
  if (s.elements.siteIcon && data.logo && data.logo.url) {
    pieces.push('<img src="' + escA(data.logo.url) + '" alt="" style="width:' + (s.metaSize + 4) + 'px;height:' + (s.metaSize + 4) + 'px;border-radius:4px;flex-shrink:0" />')
  }
  if (s.elements.siteName && data.publisher) {
    pieces.push('<span style="font-size:' + s.metaSize + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.meta + ';letter-spacing:0.5px;text-transform:uppercase">' + escT(data.publisher) + '</span>')
  }
  if (s.elements.authorTopic && data.author) {
    pieces.push('<span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(data.author) + '</span>')
  }
  if (s.elements.date && data.date) {
    var dateStr = fmtDate(data.date)
    if (dateStr) {
      pieces.push('<span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(dateStr) + '</span>')
    }
  }
  if (!pieces.length) return ''
  return '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:' + (s.metaSize + 4) + 'px">' + pieces.join('') + '</div>'
}
function buildLarge (data, s) {
  var href = escA((data && data.url) || '')
  var imageUrl = (data.image && data.image.url) ? escA(data.image.url) : ''
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT(trunc((data && data.title) || '', 90))
  var description = s.elements.description ? escT(trunc((data && data.description) || '', 220)) : ''
  var bg = escA(fallbackBg(data))
  var metaHtml = buildMeta(data, s)
  var maxWidth = s.width || 460
  var mediaBox = s.mediaHeight ? 'width:100%;height:' + s.mediaHeight + 'px;background:' + bg + ';overflow:hidden' : 'width:100%;aspect-ratio:16 / 9;background:' + bg + ';overflow:hidden'
  var mediaInner = imageUrl ? '<img src="' + imageUrl + '" alt="" ' + logoFallbackAttr(logoUrl) + 'style="width:100%;height:100%;object-fit:cover;display:block" />' : ''
  var titleHtml = '<div style="font-size:' + s.headlineSize + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.headline + ';line-height:' + s.lineHeight + ';margin:0">' + title + '</div>'
  var descriptionHtml = description ? '<div style="font-size:' + s.descriptionSize + 'px;color:' + s.palette.description + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaHtml + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaHtml)
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;color:inherit;width:100%;max-width:' + maxWidth + 'px;background:' + s.palette.background + ';border-radius:' + s.radius + ';overflow:hidden;border:' + s.border + ';box-shadow:' + s.shadow + ';font-family:' + s.fontFamily + '">\\n  <div style="' + mediaBox + '">' + mediaInner + '</div>\\n  <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px">' + body + '</div>\\n</a>'
}
function buildWide (data, s) {
  var href = escA((data && data.url) || '')
  var imageUrl = (data.image && data.image.url) ? escA(data.image.url) : ''
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT((data && data.title) || '')
  var description = s.elements.description ? escT((data && data.description) || '') : ''
  var bg = escA(fallbackBg(data))
  var metaHtml = buildMeta(data, s)
  var maxWidth = s.width || 460
  var minHeight = s.mediaHeight || 140
  var flexDirection = s.imagePosition === 'right' ? 'flex-direction:row-reverse;' : ''
  var mediaInner = imageUrl ? '<img src="' + imageUrl + '" alt="" ' + logoFallbackAttr(logoUrl) + 'style="width:100%;height:100%;object-fit:cover;display:block" />' : ''
  var titleHtml = '<div style="font-size:' + s.headlineSize + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.headline + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + title + '</div>'
  var descriptionHtml = description ? '<div style="font-size:' + s.descriptionSize + 'px;color:' + s.palette.description + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaHtml + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaHtml)
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" style="display:flex;' + flexDirection + 'text-decoration:none;color:inherit;width:100%;max-width:' + maxWidth + 'px;min-height:' + minHeight + 'px;background:' + s.palette.background + ';border-radius:' + s.radius + ';overflow:hidden;border:' + s.border + ';box-shadow:' + s.shadow + ';font-family:' + s.fontFamily + '">\\n  <div style="width:140px;flex-shrink:0;align-self:stretch;background:' + bg + ';overflow:hidden">' + mediaInner + '</div>\\n  <div style="padding:14px;display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;justify-content:center">' + body + '</div>\\n</a>'
}
function buildSmall (data, s) {
  var href = escA((data && data.url) || '')
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT(trunc((data && data.title) || '', 60))
  var description = s.elements.description ? escT(trunc((data && data.description) || '', 140)) : ''
  var bg = escA(fallbackBg(data))
  var maxWidth = s.width || 380
  var iconNode = !s.elements.siteIcon ? '' : (logoUrl ? '<img src="' + logoUrl + '" alt="" style="width:36px;height:36px;border-radius:8px;flex-shrink:0" />' : '<div style="width:36px;height:36px;border-radius:8px;flex-shrink:0;background:' + bg + '"></div>')
  var publisherText = (s.elements.siteName && data.publisher) ? '<span style="font-size:' + (s.metaSize + 1) + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.meta + '">' + escT(data.publisher) + '</span>' : ''
  var authorText = (s.elements.authorTopic && data.author) ? '<span aria-hidden="true" style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">· </span><span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(data.author) + '</span>' : ''
  var dateText = (s.elements.date && data.date) ? '<span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(fmtDate(data.date)) + '</span>' : ''
  var metaRow = (publisherText || authorText) ? '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;gap:8px">\\n      <span style="display:flex;align-items:center;gap:4px;min-width:0;overflow:hidden">' + publisherText + authorText + '</span>\\n      ' + dateText + '\\n    </div>' : ''
  var titleHtml = '<div style="font-size:' + (s.headlineSize - 3) + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.headline + ';line-height:' + s.lineHeight + ';margin-bottom:2px">' + title + '</div>'
  var descriptionHtml = description ? '<div style="font-size:' + (s.descriptionSize - 1) + 'px;color:' + s.palette.description + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaRow + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaRow)
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;gap:10px;align-items:flex-start;width:100%;max-width:' + maxWidth + 'px;padding:12px 14px;border-radius:' + s.radius + ';background:' + s.palette.background + ';-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);border:' + s.border + ';box-shadow:' + s.shadow + ';font-family:' + s.fontFamily + '">\\n  ' + iconNode + '\\n  <div style="flex:1;min-width:0">' + body + '</div>\\n</a>'
}
function renderCard (data, s) {
  if (!data) return ''
  if (s.variant === 'small') return buildSmall(data, s)
  if (s.variant === 'wide') return buildWide(data, s)
  return buildLarge(data, s)
}`

/* ─── Shared fetch core (shipped verbatim into every snippet) ──────────── */

export const FETCH_CORE = `function microlinkFetch (url, apiKey) {
  var endpoint = apiKey ? 'https://pro.microlink.io/' : 'https://api.microlink.io/'
  var qs = new URLSearchParams({ url: url, palette: 'true' }).toString()
  var headers = apiKey ? { 'x-api-key': apiKey } : {}
  return fetch(endpoint + '?' + qs, { headers: headers })
    .then(function (r) { return r.json() })
    .then(function (res) { return res && res.data })
    .catch(function () { return null })
}`

/* ─── Helpers ──────────────────────────────────────────────────────────── */

// The serialized, runtime style object baked into each component. Includes the
// resolved `variant` so the renderer can pick the right layout.
const serializeStyle = config => {
  const style = { ...resolveStyle(config), variant: config.variant }
  return JSON.stringify(style, null, 2)
}

const indent = (src, pad) =>
  src
    .split('\n')
    .map(line => (line ? pad + line : line))
    .join('\n')

/* ─── Per-framework generators ─────────────────────────────────────────── */

export const generateReact = config => {
  const STYLE = serializeStyle(config)
  return `import { useEffect, useState } from 'react'

const STYLE = ${STYLE}

${RUNTIME_RENDERER}

${FETCH_CORE}

export default function LinkPreview ({ url, apiKey }) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let active = true
    microlinkFetch(url, apiKey).then(data => {
      if (active && data) setHtml(renderCard(data, STYLE))
    })
    return () => { active = false }
  }, [url, apiKey])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
`
}

export const generateVue = config => {
  const STYLE = serializeStyle(config)
  return `<template>
  <div v-html="html"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({ url: String, apiKey: String })

const STYLE = ${indent(STYLE, '')}

${RUNTIME_RENDERER}

${FETCH_CORE}

const html = ref('')

watchEffect(() => {
  if (!props.url) return
  microlinkFetch(props.url, props.apiKey).then(data => {
    if (data) html.value = renderCard(data, STYLE)
  })
})
</script>
`
}

export const generateAngular = config => {
  const STYLE = serializeStyle(config)
  return `import { Component, Input, OnChanges } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

const STYLE = ${STYLE}

${RUNTIME_RENDERER}

${FETCH_CORE}

@Component({
  selector: 'link-preview',
  standalone: true,
  template: '<div [innerHTML]="html"></div>'
})
export class LinkPreviewComponent implements OnChanges {
  @Input() url!: string
  @Input() apiKey?: string
  html: SafeHtml = ''

  constructor (private sanitizer: DomSanitizer) {}

  ngOnChanges () {
    if (!this.url) return
    microlinkFetch(this.url, this.apiKey).then(data => {
      if (data) this.html = this.sanitizer.bypassSecurityTrustHtml(renderCard(data, STYLE))
    })
  }
}
`
}

export const generateSvelte = config => {
  const STYLE = serializeStyle(config)
  return `<script>
  export let url
  export let apiKey = undefined

  const STYLE = ${indent(STYLE, '  ').trimStart()}

${indent(RUNTIME_RENDERER, '  ')}

${indent(FETCH_CORE, '  ')}

  let html = ''
  $: if (url) {
    microlinkFetch(url, apiKey).then(data => {
      if (data) html = renderCard(data, STYLE)
    })
  }
</script>

<div>{@html html}</div>
`
}

export const generateVanilla = config => {
  const STYLE = serializeStyle(config)
  return `/*
 * Link preview — generated by microlink.io/integrations/builder
 * Zero dependencies. Targets ES2019+.
 *
 *   microlink('a')                              // replace every <a> with a card
 *   microlink('.link-previews')                 // replace matched elements
 *   microlink('.link-previews', { size: 'large', apiKey: 'YOUR_KEY' })
 */
;(function (global) {
  var BAKED_STYLE = ${indent(STYLE, '  ').trimStart()}

${indent(RUNTIME_RENDERER, '  ')}

${indent(FETCH_CORE, '  ')}

  function applyOptions (style, options) {
    var next = {}
    for (var k in style) next[k] = style[k]
    if (options.size === 'small') next.variant = 'small'
    else if (options.size === 'large') next.variant = 'large'
    else if (options.size === 'medium') next.variant = 'wide'
    return next
  }

  function microlink (selector, options) {
    options = options || {}
    var style = applyOptions(BAKED_STYLE, options)
    var nodes = document.querySelectorAll(selector)
    Array.prototype.forEach.call(nodes, function (el) {
      var url = el.getAttribute('href') || el.getAttribute('data-url')
      if (!url) return
      microlinkFetch(url, options.apiKey).then(function (data) {
        if (!data) return
        var wrapper = document.createElement('div')
        wrapper.innerHTML = renderCard(data, style)
        var card = wrapper.firstElementChild
        if (card) el.replaceWith(card)
      })
    })
  }

  global.microlink = microlink
})(typeof window !== 'undefined' ? window : this)
`
}

export const GENERATORS = {
  React: generateReact,
  Vue: generateVue,
  Angular: generateAngular,
  Svelte: generateSvelte,
  Vanilla: generateVanilla
}
