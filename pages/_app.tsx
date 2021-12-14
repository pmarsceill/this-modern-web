import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/dist/shared/lib/router/router'
import useAnalytics from '../lib/analytics'
import darkTheme from '../lib/theme/dark-theme'
import useGlobalStyles from '../lib/theme/global-styles'
import pinkTheme from '../lib/theme/pink-theme'

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics()
  useGlobalStyles()

  return (
    <ThemeProvider
      value={{
        light: 'light-theme',
        dark: darkTheme.className,
        pink: pinkTheme.className,
      }}
      enableSystem={false}
      attribute="class"
    >
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
