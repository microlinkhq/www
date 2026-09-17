import { MICROLINK_DTS } from './monaco-dts'

const asAmbient = (name, dts) =>
  `declare module '${name}' {\n${dts
    .replace(/\s+with\s+\{[\s\S]*?\}/g, '')
    .replace(/^export declare /gm, 'export ')
    .replace(/^declare /gm, '')}\n}`

export const MICROLINK_TYPES = asAmbient('microlink.io', MICROLINK_DTS)

export const GOOGLE_TYPES = `declare module '@microlink/google' {
  const createGoogleClient: (...args: any[]) => any
  export default createGoogleClient
}`

export const PUPPETEER_CORE_TYPES = `declare module 'puppeteer-core' {
  export interface HTTPResponse {
    status(): number
    statusText(): string
    url(): string
    ok(): boolean
    headers(): Record<string, string>
    text(): Promise<string>
    json(): Promise<unknown>
  }
  export interface Page {
    title(): Promise<string>
    url(): string
    content(): Promise<string>
    $(selector: string): Promise<unknown>
    $$(selector: string): Promise<unknown[]>
    $eval<T>(selector: string, fn: (el: Element) => T): Promise<Awaited<T>>
    $$eval<T>(selector: string, fn: (els: Element[]) => T): Promise<Awaited<T>>
    evaluate<T>(fn: string | ((...args: any[]) => T), ...args: any[]): Promise<Awaited<T>>
    click(selector: string): Promise<void>
    type(selector: string, text: string): Promise<void>
    hover(selector: string): Promise<void>
    focus(selector: string): Promise<void>
    select(selector: string, ...values: string[]): Promise<string[]>
    waitForSelector(selector: string, options?: { visible?: boolean; hidden?: boolean; timeout?: number }): Promise<unknown>
    waitForFunction(fn: string | ((...args: any[]) => unknown), options?: { timeout?: number }): Promise<unknown>
    waitForNavigation(options?: { waitUntil?: string; timeout?: number }): Promise<HTTPResponse | null>
    waitForNetworkIdle(options?: { idleTime?: number; timeout?: number }): Promise<void>
    goto(url: string, options?: { waitUntil?: string; timeout?: number }): Promise<HTTPResponse | null>
    cookies(): Promise<unknown[]>
    keyboard: { type(text: string): Promise<void>; press(key: string): Promise<void> }
    mouse: { click(x: number, y: number): Promise<void>; move(x: number, y: number): Promise<void> }
  }
}`
