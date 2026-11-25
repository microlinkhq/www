import { accountLoad } from './dashboard-account'
import { signedInMarker } from './dashboard-session'

const TOO_MANY_REQUESTS = 429
const PAID_PLAN_ERRORS = new Set(['CodeSizeError', 'OutgoingRequestError'])

const cookiesOf = document => (document ? document.cookie : '')

export const accountApiKeys = async (
  document = globalThis.document,
  load = accountLoad
) => {
  const marker = signedInMarker(cookiesOf(document))
  if (marker === null) return []
  const account = await load(marker).account.catch(() => null)
  return Array.isArray(account?.apiKeys) ? account.apiKeys : []
}

export const requestKeys = (apiKey, accountKeys = []) => [
  ...new Set(
    [apiKey, ...accountKeys]
      .filter(key => typeof key === 'string' && key.trim() !== '')
      .map(key => key.trim())
  )
]

const isRateLimited = failure =>
  failure?.statusCode === TOO_MANY_REQUESTS || failure?.code === 'ERATE'

export const shouldTryNextKey = failure =>
  isRateLimited(failure) || failure?.code === 'EAUTH'

export const hitsPlanLimit = body => {
  const result = body?.data?.function
  return (
    result?.isFulfilled === false && PAID_PLAN_ERRORS.has(result.value?.name)
  )
}

const settle = async (attempt, key, bodyOf) => {
  try {
    const result = await attempt(key)
    return { result, planLimited: hitsPlanLimit(bodyOf(result)) }
  } catch (failure) {
    if (!shouldTryNextKey(failure)) throw failure
    return { failure }
  }
}

const unwrap = outcome => {
  if (outcome.failure) throw outcome.failure
  return outcome.result
}

const movesOn = outcome => Boolean(outcome.failure || outcome.planLimited)

export const runWithKeys = async (keys, attempt, bodyOf = result => result) => {
  let last
  let rateLimited
  let planLimited
  for (const key of keys) {
    last = await settle(attempt, key, bodyOf)
    if (isRateLimited(last.failure)) rateLimited = last
    if (last.planLimited) planLimited = last
    if (!movesOn(last)) return last.result
  }
  if (planLimited) return unwrap(rateLimited ?? last)
  const keyless = await settle(attempt, undefined, bodyOf)
  return unwrap(last && movesOn(keyless) ? last : keyless)
}

class SpentKeyResponse extends Error {
  constructor (answer) {
    super(`Microlink API responded ${answer.response.status}`)
    this.statusCode = answer.response.status
    this.code = answer.body?.code
    this.answer = answer
  }
}

const readJson = response =>
  response
    .clone()
    .json()
    .catch(() => null)

const answerOf = async response => {
  const answer = { response, body: await readJson(response) }
  if (
    shouldTryNextKey({ statusCode: response.status, code: answer.body?.code })
  ) {
    throw new SpentKeyResponse(answer)
  }
  return answer
}

export const fetchWithKeys = async (keys, send) => {
  try {
    return await runWithKeys(
      keys,
      async key => answerOf(await send(key)),
      answer => answer.body
    )
  } catch (failure) {
    if (failure instanceof SpentKeyResponse) return failure.answer
    throw failure
  }
}
