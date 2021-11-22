import { Global } from '@emotion/react'
import { Theme } from '@theme-ui/css'

type Props = {
  theme?: Theme
}

const GlobalStyles = ({}: Props) => {
  const styles = [
    {
      '@font-face': {
        fontFamily: 'Freight Text Pro',
        fontStyle: 'normal',
        fontWeight: 400,
        fontDisplay: 'fallback',
        src: `url(/fonts/Freight-Text-Pro-Book.woff2) format('woff2'), url(/fonts/Freight-Text-Pro-Book.woff) format('woff')`,
      },
    },
    {
      '@font-face': {
        fontFamily: 'Freight Text Pro',
        fontStyle: 'italic',
        fontWeight: 400,
        fontDisplay: 'fallback',
        src: `url(/fonts/Freight-Text-Pro-Book-Italic.woff2) format('woff2'), url(/fonts/Freight-Text-Pro-Book-Italic.woff) format('woff')`,
      },
    },
  ]

  return <Global styles={styles} />
}

export default GlobalStyles
