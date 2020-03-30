import useSWR from 'swr'

const API = 'https://checkly.microlink.io'

const KubernetesMonitor = ({ children, ...opts }) => {
  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    opts
  )

  return children({
    data,
    isLoading: !!data
  })
}

export default KubernetesMonitor
