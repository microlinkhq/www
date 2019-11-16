import { useQueryState } from 'components/hook'
import { useState, useEffect } from 'react'
import mql from '@microlink/mql'

export default ({ children }) => {
  const [status, setStatus] = useState('initial')
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async url => {
    try {
      setQuery({ url })
      setError(null)
      setStatus('fetching')
      const { data } = await mql(url, {
        palette: true
      })
      setData(data)
      setStatus('fetched')
    } catch (err) {
      setStatus('error')
      setError(err)
    }
  }

  const doFetch = url => {
    setWarning(null)
    if (url) return fetchData(url)
    setTimeout(
      () => setWarning({ children: 'You need to provide a valid URL.' }),
      0
    )
  }

  useEffect(() => {
    const { url } = query
    if (url) fetchData(url)
  }, [query.url])

  return children({ status, doFetch, data, error, warning })
}
