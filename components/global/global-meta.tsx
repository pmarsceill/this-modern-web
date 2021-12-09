import { theme } from '../../lib/theme'

const GlobalMeta = () => {
  return (
    <>
      <meta
        name="msapplication-TileColor"
        content={`${theme.colors?.background}`}
      />
      <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <link rel="manifest" href="/manifest.json" />
    </>
  )
}

export default GlobalMeta
