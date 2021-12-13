import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Box from '../primitives/box'
import GlobalFavicon from './global-favicon'
import GlobalMeta from './global-meta'
import GlobalMicropub from './global-micropub'
import SiteTitle from './global-site-title'

const GlobalHeader = () => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  // const [colorMode] = useColorMode()

  return (
    <>
      <Head>
        <GlobalFavicon />
        <GlobalMicropub />
        <GlobalMeta />

        {/* {colorMode === 'dark' ? (
          <meta
            name="theme-color"
            content={`${theme.colors?.modes?.dark?.background}`}
          />
        ) : (
          <meta name="theme-color" content={`${theme.colors?.background}`} />
        )} */}
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
