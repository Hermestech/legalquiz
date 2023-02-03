/* eslint-disable @typescript-eslint/no-empty-function */
import React, { PropsWithChildren } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { useCDNUrl, useWriteKey } from '../hooks/useConfig'

const AnalyticsContext = React.createContext<{
  analytics: AnalyticsBrowser
  writeKey: string | undefined
  setWriteKey:(key: string) => void
  cdnURL: string
  setCDNUrl: (url: string) => void
}>({
    analytics: new AnalyticsBrowser(),
    writeKey: '',
    setWriteKey: () => { },
    cdnURL: '',
    setCDNUrl: () => { }
})

    

export const AnalyticsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [writeKey, setWriteKey] = useWriteKey()
  const [cdnURL, setCDNUrl] = useCDNUrl()

  const analytics = React.useMemo(() => {
    return AnalyticsBrowser.load({ writeKey: writeKey || '', cdnURL })
  }, [writeKey, cdnURL])
  return (
    <AnalyticsContext.Provider
      value={{ analytics, writeKey, setWriteKey, cdnURL, setCDNUrl }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

// Create an analytics hook that we can use with other components.
export const useAnalytics = () => {
  const result = React.useContext(AnalyticsContext)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}
