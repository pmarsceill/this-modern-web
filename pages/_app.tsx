import { AppProps } from 'next/dist/shared/lib/router/router'
import { DefaultSeo } from 'next-seo'
import GlobalStyles from '../components/global/global-styles'
import { ThemeProvider } from 'theme-ui'
import theme from '../lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
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
