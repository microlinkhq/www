import { GOOGLE_DTS, MICROLINK_DTS, PUPPETEER_DTS } from './monaco-dts'

const asAmbient = (name, dts) =>
  `declare module '${name}' {\n${dts
    .replace(/\s+with\s+\{[\s\S]*?\}/g, '')
    .replace(/^export declare /gm, 'export ')
    .replace(/^declare /gm, '')}\n}`

export const MICROLINK_TYPES = asAmbient('microlink.io', MICROLINK_DTS)

export const GOOGLE_TYPES = asAmbient('@microlink/google', GOOGLE_DTS)

export const PUPPETEER_CORE_TYPES = asAmbient('puppeteer-core', PUPPETEER_DTS)
