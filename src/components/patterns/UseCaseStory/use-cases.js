import { VERTICALS } from './registry/verticals'
import { WEBSITE_SCREENSHOT } from './registry/website-screenshot'
import { WEBSITE_TO_PDF } from './registry/website-to-pdf'
import { WEBSITE_TO_MARKDOWN } from './registry/website-to-markdown'
import { WEBSITE_METADATA } from './registry/website-metadata'

export const ACCENT = {
  text: 'link',
  bgSoft: 'blue0',
  bgEdge: 'blue1',
  highlight: 'blue5'
}

const PARTNER_RECIPES = [
  {
    slug: 'upscale-extracted-images',
    name: 'Microlink + Magnific',
    partner: 'Magnific',
    partnerUrl: 'https://magnific.com',
    blurb:
      'Extract the main image from any URL and upscale it to print-ready resolution with AI.',
    icon: '/images/use-cases/magnific.svg',
    category: 'Metadata + AI Upscaling',
    summary:
      "Microlink pulls the main image — and its real dimensions — out of any web page. When it isn't sharp enough, Magnific upscales it with AI, straight from the hosted URL."
  }
]

export const USE_CASES = [
  ...PARTNER_RECIPES,
  ...WEBSITE_SCREENSHOT,
  ...WEBSITE_TO_PDF,
  ...WEBSITE_TO_MARKDOWN,
  ...WEBSITE_METADATA
]

export { VERTICALS }

export const useCasePath = slug => `/use-cases/${slug}`

export const getUseCase = slug => USE_CASES.find(entry => entry.slug === slug)

export const getVertical = slug =>
  VERTICALS.find(vertical => vertical.slug === slug)

export const useCasesByVertical = vertical =>
  USE_CASES.filter(entry => entry.vertical === vertical)

export const partnerUseCases = () => USE_CASES.filter(entry => !entry.vertical)
