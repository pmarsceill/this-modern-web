/** @jsxImportSource theme-ui */

import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { theme } from '../../lib/theme'
import { useColorMode } from '@theme-ui/color-modes'
import { useRouter } from 'next/dist/client/router'

type SiteTitleProps = {
  isHome?: boolean
  children: ReactNode
}

const SiteTitle = ({ children, isHome }: SiteTitleProps) => {
  const Contents = () => {
    if (isHome) {
      return <h1 sx={{ color: 'primary' }}>{children}</h1>
    }

    return (
      <>
        <Link href="/">
          <a>
            <span sx={{ color: 'secondary' }}>{children}</span>
          </a>
        </Link>
      </>
    )
  }

  return (
    <div
      sx={{
        display: 'block',
        fontSize: '0',
        lineHeight: '0',
      }}
    >
      <Contents />
    </div>
  )
}

const GlobalHeader = () => {
  const router = useRouter()

  const isHome = router.pathname === '/'

  const [colorMode] = useColorMode()

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
        <meta
          name="msapplication-TileColor"
          content={`${theme.colors?.background}`}
        />
        <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
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
        <SiteTitle isHome={isHome}>
          <>
            <svg
              width="1592"
              height="116"
              viewBox="0 0 1592 116"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="SiteTitle"
              sx={{
                fill: 'currentColor',
                width: isHome ? ['262px', '465px'] : '262px',
                mb: 1,
                height: 'auto',
              }}
            >
              <title id="SiteTitle">This Modern Web</title>
              <path
                d="M0.799988 22.8001H44.8V113H66.8V22.8001H110.8V3.00006H0.799988V22.8001Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M142.717 3.00006H120.717V113H142.717V67.9001H208.717V113H230.717V3.00006H208.717V48.1001H142.717V3.00006Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M270.403 113V3.00006H248.403V113H270.403Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M335.303 95.4001C316.823 95.4001 304.503 89.2401 304.503 80.0001H282.503C282.503 101.12 303.623 115.2 335.303 115.2C369.623 115.2 388.103 102.66 388.103 79.3401C388.103 56.9001 372.703 47.0001 336.403 47.0001C315.503 47.0001 306.703 43.7001 306.703 35.3401C306.703 25.6601 316.603 20.6001 335.303 20.6001C352.463 20.6001 363.903 26.7601 363.903 36.0001H385.903C385.903 14.8801 365.663 0.800049 335.303 0.800049C302.303 0.800049 284.703 12.9001 284.703 35.3401C284.703 57.5601 299.663 66.8001 334.423 66.8001C356.423 66.8001 366.103 70.5401 366.103 79.3401C366.103 89.6801 355.323 95.4001 335.303 95.4001Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M459.62 3.00006H439.82V113H461.82V36.0001H462.26C462.26 36.0001 464.46 43.0401 468.42 48.3201L483.82 69.0001H505.82L521.22 48.3201C525.18 43.0401 527.38 36.0001 527.38 36.0001H527.82V113H549.82V3.00006H530.02L495.7 49.2001H494.16L459.62 3.00006Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M619.206 0.800049C586.206 0.800049 562.006 25.0001 562.006 58.0001C562.006 91.0001 586.206 115.2 619.206 115.2C652.206 115.2 676.406 91.0001 676.406 58.0001C676.406 25.0001 652.206 0.800049 619.206 0.800049ZM619.206 94.3001C599.406 94.3001 585.106 78.9001 585.106 58.0001C585.106 37.1001 599.406 21.7001 619.206 21.7001C639.006 21.7001 653.306 37.1001 653.306 58.0001C653.306 78.9001 639.006 94.3001 619.206 94.3001Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M743.532 3.00006H688.532V113H743.532C776.532 113 800.732 89.6801 800.732 58.0001C800.732 26.1001 776.532 3.00006 743.532 3.00006ZM710.532 22.8001H743.532C763.332 22.8001 777.632 37.7601 777.632 58.0001C777.632 78.4601 763.332 93.2001 743.532 93.2001H710.532V22.8001Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M920.58 22.8001V3.00006H812.78V113H920.58V93.2001H834.78V67.9001H898.58V48.1001H834.78V22.8001H920.58Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M934.88 113H956.88V67.9001H994.281L1022.22 113H1047.08L1022.22 72.9601C1021.34 71.4201 1019.8 69.4401 1018.26 67.6801C1035.64 65.9201 1047.08 53.6001 1047.08 36.0001C1047.08 16.2001 1033.88 3.00006 1014.08 3.00006H934.88V113ZM956.88 48.1001V22.8001H1014.08C1020.68 22.8001 1025.08 27.2001 1025.08 33.8001V37.1001C1025.08 43.7001 1020.68 48.1001 1014.08 48.1001H956.88Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M1150.4 113H1170.2V3.00006H1148.2V78.9001L1080 3.00006H1060.2V113H1082.2V37.1001L1150.4 113Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M1241.35 3.00006H1219.79L1232.99 113H1256.09L1275.67 68.7801C1282.49 53.6001 1284.47 44.8001 1284.47 44.8001H1284.91C1284.91 44.8001 1286.89 53.6001 1293.71 68.7801L1313.29 113H1336.39L1349.59 3.00006H1328.03L1318.57 84.4001C1318.35 84.4001 1315.93 70.9801 1309.99 57.7801L1295.69 25.0001H1273.69L1259.17 57.7801C1253.45 71.2001 1251.03 84.4001 1251.03 84.4001H1250.81L1241.35 3.00006Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M1467.27 22.8001V3.00006H1359.47V113H1467.27V93.2001H1381.47V67.9001H1445.27V48.1001H1381.47V22.8001H1467.27Z"
                sx={{ fill: 'currentColor' }}
              />
              <path
                d="M1481.57 113H1558.57C1578.37 113 1591.57 99.8001 1591.57 80.0001C1591.57 69.4401 1586.29 61.3001 1577.27 56.6801C1583.43 51.8401 1587.17 44.5801 1587.17 36.0001C1587.17 16.2001 1573.97 3.00006 1554.17 3.00006H1481.57V113ZM1503.57 67.9001H1558.57C1565.17 67.9001 1569.57 72.3001 1569.57 78.9001V82.2001C1569.57 88.8001 1565.17 93.2001 1558.57 93.2001H1503.57V67.9001ZM1503.57 48.1001V22.8001H1554.17C1560.77 22.8001 1565.17 27.2001 1565.17 33.8001V37.1001C1565.17 43.7001 1560.77 48.1001 1554.17 48.1001H1503.57Z"
                sx={{ fill: 'currentColor' }}
              />
            </svg>
          </>
        </SiteTitle>
        <p sx={{ color: 'secondary', fontSize: isHome ? [0, 1, 2] : 0 }}>
          The personal website of Patrick Marsceill
        </p>
      </div>
    </>
  )
}

export default GlobalHeader
