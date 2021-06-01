import useSWR from 'swr'

const ClusterMonitor = ({ children, endpoint, ...opts }) => {
  const { data } = useSWR(
    endpoint,
    () => window.fetch(endpoint).then(res => res.text()),
    opts
  )

  return children({
    data,
    isLoading: !data
  })
}

ClusterMonitor.defaultProps = {
  refreshInterval: 3000
}

export default ClusterMonitor
