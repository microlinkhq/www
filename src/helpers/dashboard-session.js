const CLIENT_UAT_COOKIE = '__client_uat'

const isClientUatCookie = name =>
  name === CLIENT_UAT_COOKIE || name.startsWith(`${CLIENT_UAT_COOKIE}_`)

const SIGNED_IN_TIMESTAMP = /^[1-9]\d*$/

const isSignedInTimestamp = value => SIGNED_IN_TIMESTAMP.test(value)

export const hasDashboardSession = (cookies = '') =>
  cookies.split(';').some(cookie => {
    const [name, value = ''] = cookie.trim().split('=')
    return isClientUatCookie(name) && isSignedInTimestamp(value)
  })
