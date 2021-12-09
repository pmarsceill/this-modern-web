import { useColorMode } from '@theme-ui/color-modes'
import { theme } from '../../lib/theme'

const GlobalMeta = () => {
  const [colorMode] = useColorMode()

  return (
    <>
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
    </>
  )
}

export default GlobalMeta
