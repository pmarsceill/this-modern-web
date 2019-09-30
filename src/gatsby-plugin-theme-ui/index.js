export default {
  initialColorMode: 'dark',
  colors: {
    greyLt0: "#b2b5cc",
    greyLt1: "#333548",
    text: '#fff',
    background: '#182027',
    primary: '#fff',
    secondary: '#b2b5cc',
    accent: '#fff',
    muted: '#333548',
    modes: {
      light: {
	background: '#f4f4f9',
        text: '#182027',
        primary: '#182027',
        secondary: '#888ba0',
        muted: '#dadcea',
        accent: '#182027',
      },
    },
  },
  fonts: {
    body: "-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
    heading: "-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
    monospace: "SFMono-Regular,Consolas,Menlo,Andale,monospace;",
    title: "Optician Sans, system-ui, sans-serif",
    serif: "Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif"
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
    title: 0.7,
    content: 1.8,
  },
  fontSizes: [12, 14, 16, 18, 21, 24, 36, 48, 64, 72, 78],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: 1168,
    content: 768,
  },
  styles: {
    root: {
      fontFamily: 'serif',
      fontSize: 3,
      lineHeight: 'content',
      '>*': {
        maxWidth: 'content',
      },
      a: {
        color: 'accent'
      }
    },
    h1: {
      lineHeight: 'heading',
      mt: 0,
      fontSize: 3,
    },
    h2: {
      lineHeight: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 3,
    },
    h3: {
      lineHeight: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 3,
    },
    h4: {
      lineHeight: 'heading',
      mt: '2em',
      mb: '1em',
    },
    h5: {
      lineHeight: 'heading',
      mt: '2em',
      mb: '1em',
    },
    h6: {
      lineHeight: 'heading',
      mt: '2em',
      mb: '1em',
    },
    p: {
      mt: 0,
    },
    blockquote: {
      ml: 0,
      pl: 4,
      borderLeft: '1px solid',
      borderColor: 'muted',
    },
    ul: {
      listStyle: 'none',
      pl: 0,
      li: {
        position: 'relative',
        '::before': {
          position: 'absolute',
          marginLeft: '-1.3em',
          content: '"—"',
          color: 'secondary',
        }
      }
    },
    ol: {
      listStyle: 'none',
      counterReset: 'step-counter',
      pl: 0,
      "> li": {
        position: 'relative',
        "&::before": {
          position: 'absolute',
          top: '0.1em',
          left: '-1.6em',
          color: 'secondary',
          content: 'counter(step-counter)',
          'counter-increment': 'step-counter',
          fontSize: 1,
        }
      }
    },
    code: {
      fontSize: 1,
      background: 'transparent',
      '&[class*="language-"]': {
        fontSize: 1,
        background: 'transparent',
      }
    },
    pre: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'muted',
      marginBottom: 3,
      '&[class*="language-"]': {
        background: 'transparent',
        marginBottom: 3,
      }
    }
  }
}
