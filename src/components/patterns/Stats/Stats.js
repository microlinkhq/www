import useSWR from 'swr'

const API = 'https://microlink-stats-api.now.sh'

const ApiStatus = ({ children, ...opts }) => {
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

export default ApiStatus
