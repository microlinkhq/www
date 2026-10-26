const CLIENT_UAT_COOKIE = '__client_uat'

const isClientUatCookie = name =>
  name === CLIENT_UAT_COOKIE || name.startsWith(`${CLIENT_UAT_COOKIE}_`)

const SIGNED_IN_TIMESTAMP = /^[1-9]\d*$/

const isSignedInTimestamp = value => SIGNED_IN_TIMESTAMP.test(value)

export const dashboardSessionMarker = (cookies = '') => {
  for (const cookie of cookies.split(';')) {
    const [name, value = ''] = cookie.trim().split('=')
    if (isClientUatCookie(name) && isSignedInTimestamp(value)) return value
  }
  return null
}

export const hasDashboardSession = cookies =>
  dashboardSessionMarker(cookies) !== null
