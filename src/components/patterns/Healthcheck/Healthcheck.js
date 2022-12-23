import useSWR from 'swr'

const API = 'https://healthcheck.microlink.io'

const Healthcheck = ({ children, ...opts }) => {
  const { data, isLoading } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    opts
  )

  const isHealthy = data && data.status === 'healthy'

  return children({ isLoading, isHealthy })
}

export default Healthcheck
