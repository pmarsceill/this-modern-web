import * as Fathom from 'fathom-client'

import { AppProps } from 'next/dist/shared/lib/router/router'
import { DefaultSeo } from 'next-seo'
import GlobalStyles from '../components/global/global-styles'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../lib/theme'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('IMHOLRVE', {
      includedDomains: ['thismodernweb.com'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <DefaultSeo
        title="This Modern Web"
        description="The personal website of Patrick Marsceill"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://www.thismodernweb.com',
          site_name: 'This Modern Web',
          images: [
            {
              url: 'https://www.thismodernweb.com/tmw-og.png',
              width: 1200,
              height: 1200,
              alt: 'This Modern Web, the personal website of Patrick Marsceill',
            },
          ],
        }}
        twitter={{
          handle: '@pmarsceill',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
