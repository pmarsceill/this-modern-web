import { AppProps } from 'next/dist/shared/lib/router/router'
import GlobalStyles from '../components/global-styles'
import { ThemeProvider } from 'theme-ui'
import theme from '../lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
