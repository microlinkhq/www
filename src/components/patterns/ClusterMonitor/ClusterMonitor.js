import useSWR from 'swr'

const SEPARATOR = '┌'

const parseData = (data, isLoading) => {
  if (isLoading) return { resume: '', info: '' }
  const [resume, info] = data.split(`\n${SEPARATOR}`)
  return { resume, info: `${SEPARATOR}${info}` }
}

const ClusterMonitor = ({ children, endpoint, ...opts }) => {
  const { data, isLoading } = useSWR(
    endpoint,
    () => window.fetch(endpoint).then(res => res.text()),
    opts
  )

  return children({ ...parseData(data, isLoading), isLoading })
}

ClusterMonitor.defaultProps = {
  refreshInterval: 3000
}

export default ClusterMonitor
