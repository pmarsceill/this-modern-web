import { useTheme } from 'next-themes'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import darkTheme from '../../lib/theme/dark-theme'
import { theme } from '../../stitches.config'
import Box from '../primitives/box'
import SiteTitle from './global-site-title'

const GlobalHeader = () => {
  const { theme: themeName, setTheme } = useTheme()

  const router = useRouter()
  const isHome = router.pathname === '/'

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon-76x76.png" />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* <meta
          name="msapplication-TileColor"
          content={`${theme.colors?.background}`}
        /> */}
        <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <link rel="manifest" href="/manifest.json" />

        <meta
          name="theme-color"
          content={
            themeName === 'dark'
              ? darkTheme.colors.background.value
              : theme.colors.background.value
          }
        />

        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/Freight-Text-Pro-Book.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Freight-Text-Pro-Book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Micropub  */}
        <link
          rel="authorization_endpoint"
          href="https://github-indieauth.herokuapp.com/auth"
        />
        <link
          rel="token_endpoint"
          href="https://github-indieauth.herokuapp.com/token"
        />
        <link rel="micropub" href="https://tmw-mp-enpoint.glitch.me/micropub" />
      </Head>
      <Box
        css={{
          mt: '$4',
          mb: '$5',
          pb: '$5',
          position: 'relative',
          height: 'auto',
          minHeight: '120px',

          '@1': {
            mt: '$6',
            height: '12vh',
          },
          '@2': {
            mb: '$6',
          },
          '@3': {
            height: '25vh',
          },
        }}
      >
        <SiteTitle isHome={isHome} />
      </Box>
    </>
  )
}

export default GlobalHeader
