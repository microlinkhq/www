export const MICROLINK_TYPES = `
declare module 'microlink.io' {
  import { HTTPResponse, Page } from 'puppeteer-core'
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
