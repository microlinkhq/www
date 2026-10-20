const CLIENT_UAT_COOKIE = '__client_uat'

const isClientUatCookie = name =>
  name === CLIENT_UAT_COOKIE || name.startsWith(`${CLIENT_UAT_COOKIE}_`)

const isSignedInTimestamp = value => Number.parseInt(value, 10) > 0

export const hasDashboardSession = (cookies = '') =>
  cookies.split(';').some(cookie => {
    const [name, value = ''] = cookie.trim().split('=')
    return isClientUatCookie(name) && isSignedInTimestamp(value)
  })
