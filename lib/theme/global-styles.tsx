import { globalCss } from '../../stitches.config'

const useGlobalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Freight Text Pro',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `url(/fonts/Freight-Text-Pro-Book.woff2) format('woff2'), url(/fonts/Freight-Text-Pro-Book.woff) format('woff')`,
    },
    {
      fontFamily: 'Freight Text Pro',
      fontStyle: 'italic',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `url(/fonts/Freight-Text-Pro-Book-Italic.woff2) format('woff2'), url(/fonts/Freight-Text-Pro-Book-Italic.woff) format('woff')`,
    },
  ],
  '*': {
    boxSizing: 'border-box',
    m: 0,
    p: 0,
  },
  body: {
    margin: 0,
    bgColor: '$background',
  },
  a: {
    textDecoration: 'none',
  },
})

export default useGlobalStyles
