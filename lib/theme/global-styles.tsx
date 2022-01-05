import { globalCss } from '../../stitches.config'

const useGlobalStyles = globalCss({
  /* Web fonts */
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
    {
      fontFamily: 'IBM Plex Mono',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `url(/fonts/IBMPlexMono-Regular.woff2) format('woff2'), url(/fonts/IBMPlexMono-Regular.woff) format('woff')`,
    },
  ],

  /*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
  */
  '*': {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',

    '&:before, &:after': {
      boxSizing: 'border-box',
    },
  },
  'html, body': {
    height: '100%',
    '-webkit-font-smoothing': 'antialiased',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '#root, #__next': {
    isolation: 'isolate',
  },

  /* Theme specific global styles */
  body: {
    bgColor: '$background',
  },
  a: {
    textDecoration: 'none',
  },
})

export default useGlobalStyles
