const escapeHtml = text =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const stageOf = (figure, svg) =>
  `<div class="iso-stage" tabindex="0" role="group" aria-label="${escapeHtml(`${figure.title}: ${figure.hint.toLowerCase()}`)}">${svg}</div>`
