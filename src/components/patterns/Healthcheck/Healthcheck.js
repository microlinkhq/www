import useSWR from 'swr'

const API = 'https://healthcheck.microlink.io'

const Healthcheck = ({ children, ...opts }) => {
  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    opts
  )

  const isLoading = data === undefined
  const isHealthy = data && data.status === 'healthy'

  return children({ isLoading, isHealthy })
}

export default Healthcheck
