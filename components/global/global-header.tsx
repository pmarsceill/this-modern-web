/** @jsxImportSource theme-ui */

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useColorMode } from 'theme-ui'
import { theme } from '../../lib/theme'
import GlobalFavicon from './global-favicon'
import GlobalMeta from './global-meta'
import GlobalMicropub from './global-micropub'
import SiteTitle from './global-site-title'

const GlobalHeader = () => {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const [colorMode] = useColorMode()

  return (
    <>
      <Head>
        <GlobalFavicon />
        <GlobalMicropub />
        <GlobalMeta />

        {colorMode === 'dark' ? (
          <meta
            name="theme-color"
            content={`${theme.colors?.modes?.dark?.background}`}
          />
        ) : (
          <meta name="theme-color" content={`${theme.colors?.background}`} />
        )}
      </Head>
      <div
        sx={{
          mt: [4, 6, ''],
          mb: [5, '', 6],
          pb: 5,
          position: 'relative',
          height: ['auto', '12vh', '', '25vh'],
          minHeight: '120px',
        }}
      >
        <SiteTitle isHome={isHome} />
      </div>
    </>
  )
}

export default GlobalHeader
