import useSWR from 'swr'

const API = 'https://checkly-status.microlink.io'

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

export default KubernetesMonitor
