import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  DEFAULT_PLAN,
  PLANS,
  pricePerThousand
} from '../../src/helpers/pro-plans'

const SRC = path.join(process.cwd(), 'src')
const DATED_RECORDS = [
  path.join(SRC, 'content', 'fragments', 'changelog.md'),
  path.join(SRC, 'content', 'blog')
]
const CURRENCY = { '€': 'EUR', $: 'USD' }

const PRICE_FOR_REQUESTS =
  /([€$])(\d+(?:\.\d+)?)(?!\d)(?:\/month| (?:per|a) month)? (?:for|buys|covers) ([\d,]+)\b(?!,\d)/g
const REQUESTS_FOR_PRICE =
  /\b([\d,]+) (?:API )?requests,? (?:for|from|at) ([€$])(\d+(?:\.\d+)?)(?!\d)/g
const STARTING_PRICE =
  /\bPro(?: plans?)? (?:start(?:s|ing)? at|from) ([€$])(\d+(?:\.\d+)?)(?!\d)/g
const CARD_PRICE =
  /([€$])(\d+(?:\.\d+)?)(?!\d)\s*\/(?:mo|month)\s+([\d,]+)\s*requests/g
const SAME_PRICE =
  /same ([€$])(\d+(?:\.\d+)?)(?!\d), (?:Microlink gives you )?([\d,]+) requests/g
const PRO_ROW =
  /([€$])(\d+(?:\.\d+)?)(?!\d) Pro plan\b[^€$]{0,80}?([\d,]+) requests/g
const NAMED_TIER =
  /Microlink Pro, ([€$])(\d+(?:\.\d+)?)(?!\d)[^€$]{0,40}?([\d,]+) requests/g
const SAME_LABEL = /same ([€$])(\d+(?:\.\d+)?)(?!\d) (?:plan\b|per month)/g
const MICROLINK_TIER = /\b(?:Microlink['’]s|its) ([€$])(\d+) tier\b/g
const SOURCE_SUFFIX = /\.(jsx?|md)$/
const RATE = /\$(\d+\.\d\d) per (?:1,000|thousand)\b/g
const MICROLINK_RATE_SUBJECT = /Microlink|self-serve|rate holds at|^\s*At $/i
const SENTENCE_START = /(?:[.!?:;]\s|['"`(])(?=[^.!?:;'"`(]*$)/

const toPlainText = source =>
  source
    .replace(/\{'\\u2019'\}/g, '’')
    .replace(/\{' '\}/g, ' ')
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    .replace(/&nbsp;|\\u00a0/g, ' ')
    .replace(/&euro;/g, '€')
    .replace(/\\u20ac/g, '€')
    .replace(/\s+/g, ' ')

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return SOURCE_SUFFIX.test(entry.name) ? [full] : []
  })

const isDatedRecord = file =>
  DATED_RECORDS.some(
    record => file === record || file.startsWith(record + path.sep)
  )

const SOURCES = walk(SRC)
  .filter(file => !isDatedRecord(file))
  .map(file => ({
    file: path.relative(process.cwd(), file),
    text: toPlainText(fs.readFileSync(file, 'utf8'))
  }))

const toCount = digits => Number(digits.replace(/,/g, ''))
const planFor = requests =>
  PLANS.find(plan => plan.reqsPerMonthTotal === requests)

const sentenceBefore = (text, index) => {
  const head = text.slice(Math.max(0, index - 200), index)
  const start = head.search(SENTENCE_START)
  return start === -1 ? head : head.slice(start + 1)
}

const planPriceClaims = text => [
  ...[...text.matchAll(PRICE_FOR_REQUESTS)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: planFor(toCount(match[3]))
  })),
  ...[...text.matchAll(REQUESTS_FOR_PRICE)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[2]],
    price: Number(match[3]),
    plan: planFor(toCount(match[1]))
  })),
  ...[...text.matchAll(STARTING_PRICE)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: DEFAULT_PLAN
  })),
  ...[...text.matchAll(MICROLINK_TIER)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: DEFAULT_PLAN
  })),
  ...[...text.matchAll(CARD_PRICE)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: planFor(toCount(match[3]))
  })),
  ...[...text.matchAll(SAME_PRICE)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: planFor(toCount(match[3]))
  })),
  ...[...text.matchAll(PRO_ROW)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: planFor(toCount(match[3]))
  })),
  ...[...text.matchAll(NAMED_TIER)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: planFor(toCount(match[3]))
  })),
  ...[...text.matchAll(SAME_LABEL)].map(match => ({
    quote: match[0],
    currency: CURRENCY[match[1]],
    price: Number(match[2]),
    plan: DEFAULT_PLAN
  }))
]

const rateClaims = text =>
  [...text.matchAll(RATE)]
    .filter(match =>
      MICROLINK_RATE_SUBJECT.test(sentenceBefore(text, match.index))
    )
    .map(match => ({ quote: match[0], rate: match[1] }))

const PLAN_CLAIMS = SOURCES.flatMap(({ file, text }) =>
  planPriceClaims(text)
    .filter(claim => claim.plan)
    .map(claim => ({ file, ...claim }))
)

const RATE_CLAIMS = SOURCES.flatMap(({ file, text }) =>
  rateClaims(text).map(claim => ({ file, ...claim }))
)

const USD_RATE = pricePerThousand(DEFAULT_PLAN, 'USD')

describe('pro plan price', () => {
  test('every self-serve plan bills the same USD rate per 1,000 requests', () => {
    expect(PLANS.map(plan => pricePerThousand(plan, 'USD'))).toEqual(
      PLANS.map(() => USD_RATE)
    )
  })

  test('dated records are the changelog file and files inside the blog', () => {
    const changelog = path.join(SRC, 'content', 'fragments', 'changelog.md')
    const post = path.join(SRC, 'content', 'blog', 'post.md')
    expect(isDatedRecord(changelog)).toBe(true)
    expect(isDatedRecord(post)).toBe(true)
    expect(isDatedRecord(`${changelog}x`)).toBe(false)
    expect(
      isDatedRecord(path.join(SRC, 'content', 'blog-extra', 'post.md'))
    ).toBe(false)
    expect(isDatedRecord(path.join(SRC, 'pages', 'pricing.js'))).toBe(false)
  })

  test('the guard reads js, jsx, and markdown sources', () => {
    expect(
      ['a.js', 'a.jsx', 'a.md'].filter(name => SOURCE_SUFFIX.test(name))
    ).toEqual(['a.js', 'a.jsx', 'a.md'])
  })

  test('the guard sees the plan prices the copy states', () => {
    const currencies = new Set(PLAN_CLAIMS.map(claim => claim.currency))
    expect(PLAN_CLAIMS.length).toBeGreaterThan(40)
    expect([...currencies].sort()).toEqual(['EUR', 'USD'])
    expect(RATE_CLAIMS.length).toBeGreaterThan(10)
  })

  test('copy quotes each plan at the price helpers/pro-plans gives it', () => {
    const wrong = PLAN_CLAIMS.filter(
      claim => claim.plan.monthlyPrice[claim.currency] !== claim.price
    ).map(
      claim =>
        `${claim.file} → "${claim.quote}" but ${
          claim.plan.reqsPerMonth
        } requests cost ${claim.plan.monthlyPrice[claim.currency]} ${
          claim.currency
        }, read DEFAULT_PLAN or PLANS from helpers/pro-plans`
    )
    expect(wrong).toEqual([])
  })

  test('copy quotes the Microlink rate per 1,000 requests from the plans', () => {
    const wrong = RATE_CLAIMS.filter(claim => claim.rate !== USD_RATE).map(
      claim =>
        `${claim.file} → "${claim.quote}" but every plan bills $${USD_RATE} per 1,000 requests`
    )
    expect(wrong).toEqual([])
  })

  test('the guard tells Microlink prices from competitor ones', () => {
    const flaggedPlan = sentence =>
      planPriceClaims(toPlainText(sentence)).some(
        claim =>
          claim.plan && claim.plan.monthlyPrice[claim.currency] !== claim.price
      )
    const flaggedRate = sentence =>
      rateClaims(toPlainText(sentence)).some(claim => claim.rate !== USD_RATE)

    expect(
      [
        'Microlink is $59/month for 46,000 requests',
        '46,000 requests for €49',
        'Pro plans start at €45/month',
        "<Link href='/pricing'>Pro plans</Link> starting at $39/month.",
        'Microlink’s $39 tier',
        "Microlink{'\\u2019'}s $39 tier",
        'from $49 for 46,000 to $400 for 420,000',
        '46,000 requests for $59.',
        '46,000 requests for $49.99',
        '€45 for 46,000, with proxy included',
        'includes 46,000 requests at $59',
        'tier is &euro;45/month for 46,000 requests',
        'comparison tier is \\u20ac45/month for 46,000 requests',
        '$59/month covers 46,000 requests',
        'Microlink $59 /mo 46,000 requests/month',
        'Pro €45 /month 46,000 requests/month',
        'for the same $59, 46,000 requests',
        'For the same $59, Microlink gives you 46,000 requests',
        'the $59 Pro plan on pricing: 46,000 requests',
        "Microlink Pro, $59', cells: ['46,000 requests'",
        'into the same $59 plan',
        'volume for the same $59 per month',
        '$59 per month for 46,000 requests',
        '$59 a month for 46,000 requests',
        '$59 buys 46,000 requests',
        '46,000 API requests for $59',
        '46,000 requests, for $59',
        '46,000 requests from $59',
        '46,000&nbsp;requests for $59',
        '46,000\\u00a0requests for $59',
        "46,000 requests{' '}for $59",
        '46,000\u00a0requests for $59',
        'Pro plan starts at €45/month',
        'Pro starts at €45/month',
        'Pro plans starts at €45/month',
        'Pro plans from €45',
        "Microlink's $39 tier",
        'on its €45 tier',
        'Microlink $59/mo 46,000 requests/month'
      ].filter(sentence => !flaggedPlan(sentence))
    ).toEqual([])
    expect(
      [
        'Iframely Business is $49/month for 25,000 hits.',
        'Urlbox Hi-Fi is $49/month for 5,000 renders',
        'Screenshot Machine Pro is listed at €59/month for 20,000 fresh screenshots',
        'Logo.dev Startup is $33 for 1,000,000 images',
        '46,000 requests at ~$0.00107 each',
        'Iframely gives you 25,000 hits at $49',
        'Thum.io $20 /mo then 10,000 screenshot hits',
        '$59.99 /mo for 30,000 snapshots',
        '46,000 requests for $49.00',
        'SerpApi Production, $150 with 15,000 searches'
      ].filter(flaggedPlan)
    ).toEqual([])
    expect(
      [
        'Microlink costs $1.25 per 1,000 requests',
        'Self-serve Pro plans cost $0.99 per 1,000 requests',
        'At $2.00 per 1,000 requests, the API bill grows',
        'Microlink costs $1.25 per thousand requests',
        'The rate holds at $1.25 per 1,000 requests'
      ].filter(sentence => !flaggedRate(sentence))
    ).toEqual([])
    expect(
      [
        'SerpApi costs $25.00 per 1,000 on Starter',
        'Urlbox Ultra is $99/month for 15,000 renders ($6.60 per 1,000).',
        'Fetch starts at $0.50 per 1,000 calls',
        'The Pro plan works out to about $0.75 per 1,000 markdown pages'
      ].filter(flaggedRate)
    ).toEqual([])
  })
})
