import useSWR from 'swr'

const API = 'https://k8s.microlink.io'

const KubernetesMonitor = ({ children, ...opts }) => {
  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.text()),
    opts
  )

  return children({
    data,
    isLoading: !!data
  })
}

KubernetesMonitor.defaultProps = {
  refreshInterval: 2000
}

export default KubernetesMonitor
