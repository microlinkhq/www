export const MICROLINK_TYPES = `
declare module 'microlink.io' {
  interface HTTPResponse {
    status(): number
    statusText(): string
    url(): string
    ok(): boolean
    headers(): Record<string, string>
    text(): Promise<string>
    json(): Promise<unknown>
  }
  interface Page {
    title(): Promise<string>
    url(): string
    content(): Promise<string>
    $(selector: string): Promise<unknown>
    $$(selector: string): Promise<unknown[]>
    $eval<T>(selector: string, fn: (el: Element) => T): Promise<T>
    $$eval<T>(selector: string, fn: (els: Element[]) => T): Promise<T>
    evaluate<T>(fn: string | ((...args: any[]) => T), ...args: any[]): Promise<T>
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
  export type FunctionArgs = {
    page: Page
    response: HTTPResponse
    headers: Record<string, string>
    url: string
    [key: string]: any
  }
  export type FunctionInput = (args: FunctionArgs) => any
  interface FunctionResult<T = unknown> {
    isFulfilled: boolean
    value: T
    profiling: Record<string, unknown>
    logging: Record<string, unknown>
  }
  interface MicrolinkClient {
    metadata(url: string, options?: Record<string, unknown>): Promise<Record<string, unknown>>
    function<T = unknown>(url: string, code: FunctionInput, options?: Record<string, unknown>): Promise<FunctionResult<T>>
    function<T = unknown>(url: string, code: string, options?: Record<string, unknown>): Promise<FunctionResult<T>>
  }
  function createClient(options?: { apiKey?: string; [key: string]: unknown }): MicrolinkClient
  export default createClient
}
`
