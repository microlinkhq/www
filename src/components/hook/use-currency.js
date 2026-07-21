import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const detectCurrency = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    return tz.startsWith('Europe/') ? 'EUR' : 'USD'
  } catch (_) {
    return 'USD'
  }
}

const SSR_SAFE_DEFAULT = 'USD'

const CurrencyContext = createContext([SSR_SAFE_DEFAULT])
export const useCurrencyContext = () => useContext(CurrencyContext)

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(SSR_SAFE_DEFAULT)
  useEffect(() => setCurrency(detectCurrency()), [])
  const value = useMemo(() => [currency], [currency])

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}
