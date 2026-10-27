;(function (root) {
  'use strict'
  const api = {
    width: 420,
    height: 297,
    margin: 28,
    labelMargin: 78,
    axisDash: '6 1 1 1',
    linework: {
      technical: {
        outline: 0.35,
        edge: 0.22,
        detail: 0.13,
        texture: 0.09,
        axis: 0.13
      },
      patent: {
        outline: 0.24,
        edge: 0.15,
        detail: 0.1,
        texture: 0.065,
        axis: 0.1
      },
      service: {
        outline: 0.5,
        edge: 0.28,
        detail: 0.16,
        texture: 0,
        axis: 0.16
      }
    },
    linecap: role => (role === 'axis' ? 'butt' : 'round'),
    css: preset =>
      Object.entries(api.linework[preset])
        .map(
          ([role, width]) =>
            `[data-line-role="${role}"]{stroke-width:${width};stroke-linecap:${api.linecap(
              role
            )}}`
        )
        .join('') + `[data-line-role="axis"]{stroke-dasharray:${api.axisDash}}`,
    slug: name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = api
  root.TechnicalSheet = api
})(globalThis)
