import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('IMHOLRVE', {
      includedDomains: ['www.thismodernweb.com'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}

export default useAnalytics
