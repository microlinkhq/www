export const PUPPETEER_TYPES = `
declare module 'puppeteer-core' {
  type WaitUntil = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
  export interface WaitForOptions {
    timeout?: number
    waitUntil?: WaitUntil | WaitUntil[]
  }
  export interface ClickOptions {
    button?: 'left' | 'right' | 'middle'
    clickCount?: number
    delay?: number
  }
  export interface Viewport {
    width: number
    height: number
    deviceScaleFactor?: number
    isMobile?: boolean
    hasTouch?: boolean
    isLandscape?: boolean
  }
  export interface Cookie {
    name: string
    value: string
    url?: string
    domain?: string
    path?: string
    expires?: number
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
  }
  export interface Keyboard {
    type(text: string, options?: { delay?: number }): Promise<void>
    press(key: string, options?: { delay?: number; text?: string }): Promise<void>
    down(key: string): Promise<void>
    up(key: string): Promise<void>
  }
  export interface Mouse {
    click(x: number, y: number, options?: ClickOptions): Promise<void>
    move(x: number, y: number, options?: { steps?: number }): Promise<void>
    down(options?: { button?: ClickOptions['button']; clickCount?: number }): Promise<void>
    up(options?: { button?: ClickOptions['button']; clickCount?: number }): Promise<void>
    wheel(options?: { deltaX?: number; deltaY?: number }): Promise<void>
  }
  export interface HTTPResponse {
    status(): number
    statusText(): string
    url(): string
    ok(): boolean
    headers(): Record<string, string>
    text(): Promise<string>
    json(): Promise<unknown>
    fromCache(): boolean
    fromServiceWorker(): boolean
  }
  export interface ElementHandle {
    $(selector: string): Promise<ElementHandle | null>
    $$(selector: string): Promise<ElementHandle[]>
    $eval<T>(selector: string, pageFunction: (element: Element, ...args: any[]) => T, ...args: any[]): Promise<T>
    $$eval<T>(selector: string, pageFunction: (elements: Element[], ...args: any[]) => T, ...args: any[]): Promise<T>
    click(options?: ClickOptions): Promise<void>
    type(text: string, options?: { delay?: number }): Promise<void>
    hover(): Promise<void>
    focus(): Promise<void>
    tap(): Promise<void>
    boundingBox(): Promise<{ x: number; y: number; width: number; height: number } | null>
    evaluate<T>(pageFunction: (element: Element, ...args: any[]) => T, ...args: any[]): Promise<T>
  }
  export interface Locator {
    click(options?: ClickOptions): Promise<void>
    fill(value: string): Promise<void>
    hover(): Promise<void>
    wait(): Promise<void>
  }
  export interface Page {
    title(): Promise<string>
    url(): string
    content(): Promise<string>
    setContent(html: string, options?: WaitForOptions): Promise<void>
    $(selector: string): Promise<ElementHandle | null>
    $$(selector: string): Promise<ElementHandle[]>
    $eval<T>(selector: string, pageFunction: (element: Element, ...args: any[]) => T, ...args: any[]): Promise<T>
    $$eval<T>(selector: string, pageFunction: (elements: Element[], ...args: any[]) => T, ...args: any[]): Promise<T>
    evaluate<T>(pageFunction: string | ((...args: any[]) => T), ...args: any[]): Promise<T>
    evaluateHandle(pageFunction: string | ((...args: any[]) => unknown), ...args: any[]): Promise<unknown>
    click(selector: string, options?: ClickOptions): Promise<void>
    type(selector: string, text: string, options?: { delay?: number }): Promise<void>
    hover(selector: string): Promise<void>
    focus(selector: string): Promise<void>
    tap(selector: string): Promise<void>
    select(selector: string, ...values: string[]): Promise<string[]>
    waitForSelector(selector: string, options?: { visible?: boolean; hidden?: boolean; timeout?: number }): Promise<ElementHandle | null>
    waitForFunction(pageFunction: string | ((...args: any[]) => unknown), options?: { polling?: string | number; timeout?: number }, ...args: any[]): Promise<unknown>
    waitForNavigation(options?: WaitForOptions): Promise<HTTPResponse | null>
    waitForNetworkIdle(options?: { idleTime?: number; timeout?: number }): Promise<void>
    waitForTimeout(milliseconds: number): Promise<void>
    goto(url: string, options?: WaitForOptions): Promise<HTTPResponse | null>
    reload(options?: WaitForOptions): Promise<HTTPResponse | null>
    goBack(options?: WaitForOptions): Promise<HTTPResponse | null>
    goForward(options?: WaitForOptions): Promise<HTTPResponse | null>
    setViewport(viewport: Viewport): Promise<void>
    viewport(): Viewport | null
    setUserAgent(userAgent: string): Promise<void>
    setExtraHTTPHeaders(headers: Record<string, string>): Promise<void>
    setCookie(...cookies: Cookie[]): Promise<void>
    cookies(...urls: string[]): Promise<Cookie[]>
    deleteCookie(...cookies: Cookie[]): Promise<void>
    screenshot(options?: Record<string, unknown>): Promise<Uint8Array | string>
    pdf(options?: Record<string, unknown>): Promise<Uint8Array>
    addScriptTag(options: { url?: string; path?: string; content?: string; type?: string }): Promise<ElementHandle>
    addStyleTag(options: { url?: string; path?: string; content?: string }): Promise<ElementHandle>
    setRequestInterception(value: boolean): Promise<void>
    setJavaScriptEnabled(enabled: boolean): Promise<void>
    setOfflineMode(enabled: boolean): Promise<void>
    setDefaultTimeout(timeout: number): void
    setDefaultNavigationTimeout(timeout: number): void
    authenticate(credentials: { username: string; password: string } | null): Promise<void>
    exposeFunction(name: string, pptrFunction: (...args: any[]) => unknown): Promise<void>
    emulateMediaType(type?: string): Promise<void>
    frames(): unknown[]
    mainFrame(): unknown
    isClosed(): boolean
    bringToFront(): Promise<void>
    close(options?: { runBeforeUnload?: boolean }): Promise<void>
    on(event: string, handler: (...args: any[]) => void): Page
    once(event: string, handler: (...args: any[]) => void): Page
    off(event: string, handler: (...args: any[]) => void): Page
    locator(selector: string): Locator
    keyboard: Keyboard
    mouse: Mouse
    touchscreen: { tap(x: number, y: number): Promise<void> }
  }
}
`
