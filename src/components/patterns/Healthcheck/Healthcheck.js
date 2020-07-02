import useSWR from 'swr'

const API = 'https://healthcheck.microlink.io'

export default ({ children, ...opts }) => {
  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    opts
  )

  const isLoading = data === undefined
  const isHealthy = data && data.status === 'healthy'

  return children({ isLoading, isHealthy })
}
