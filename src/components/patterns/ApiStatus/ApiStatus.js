import useSWR from 'swr'
import get from 'dlv'

const API = 'https://kubernetes-monitor-api.now.sh'

const ApiStatus = ({ children, ...opts }) => {
  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    opts
  )

  return children({
    apiStatus: get(data, 'apiStatus'),
    isLoading: data === undefined
  })
}

export default ApiStatus
