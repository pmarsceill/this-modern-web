import { Theme } from '@theme-ui/css'

const theme = {
  config: {
    initialColorMode: 'light',
    useColorSchemeMediaQuery: false,
  },
  colors: {
    background: '#f4f4f9',
    text: '#182027',
    primary: '#182027',
    secondary: '#777b94',
    muted: '#dadcea',
    accent: '#ea2020',
    accentMuted: '#ef8585',
    modes: {
      dark: {
        text: '#fff',
        background: '#182027',
        primary: '#fff',
        secondary: '#b2b5cc',
        accent: '#20e9ea',
        accentMuted: '#79e4e4',
        muted: '#333548',
        medium: '#3f4e5a',
      },
    },
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
    monospace: 'SFMono-Regular,Consolas,Menlo,Andale,monospace',
    serif:
      'Freight Text Pro,-apple-system-ui-serif, ui-serif,Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif',
  },
  backgroundImages: {
    link: 'linear-gradient(#eeebee 0%, #eeebee 100%)',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.2,
    heading: 1.1,
    content: 1.5,
  },
  letterSpacings: {
    heading: '-0.03em',
  },
  borderRadius: [0, 12],
  contentPadding: [4, 7, 6],
  fontSizes: [13, 15, 17, 22, 28, 32, 36, 42, 64, 72, 78],
  space: [0, 4, 8, 12, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: 1268,
    content: 924,
  },
  breakpoints: ['40em', '57em', '64em', '72em'],
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        color: 'accent',
      },
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
      '&:hover': {
        color: 'accent',
      },
    },
    outline: {
      bg: 'transparent',
      boxShadow: (theme: any) => `0 0 0 1px ${theme.colors.secondary}`,
      color: 'primary',
      '&:hover': {
        color: 'accent',
        boxShadow: (theme: any) => `0 0 0 1px ${theme.colors.accent}`,
      },
    },
  },
  styles: {
    // MDX styles
    a: {
      backgroundImage: (theme: any) =>
        `linear-gradient(${theme.colors.accentMuted} 0%, ${theme.colors.accentMuted} 100%)`,
      backgroundRepeat: 'repeat-x',
      backgroundPosition: '0 92%',
      backgroundSize: '1px 1px',
    },
    h1: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: 0,
      fontSize: 3,
    },
    h2: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 3,
    },
    h3: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 3,
    },
    h4: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 3,
    },
    h5: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
    },
    h6: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
    },
    blockquote: {
      ml: 0,
      pl: 'calc(1.2em - 2px)',
      borderLeft: '2px solid',
      borderColor: 'muted',
      fontStyle: 'italic',
    },
    ul: {
      listStyle: 'none',
      pl: 0,
      li: {
        position: 'relative',
        mb: '0.33em',
        pl: ['1.2em', 0],
        '::before': {
          position: 'absolute',
          left: [0, '-1em'],
          content: '"–"',
          fontWeight: 'normal',
          color: 'secondary',
        },
      },
      ul: {
        pl: [0, '1.3em'],
      },
    },
    dl: {
      listStyle: 'none',
      pl: 0,
      dt: {
        fontWeight: 'bold',
      },
      dd: {
        mb: '0.25em',
      },
    },
    ol: {
      listStyle: 'none',
      counterReset: 'step-counter',
      li: {
        mb: '0.25em',
      },
      pl: 0,
      '> li': {
        position: 'relative',
        pl: ['1.6em', 0],
        '&::before': {
          position: 'absolute',
          top: ['0.5em', '', '0.6em'],
          left: ['0.25em', '-1.6em'],
          color: 'secondary',
          content: 'counter(step-counter)',
          'counter-increment': 'step-counter',
          fontSize: 1,
          fontFamily: 'body',
          lineHeight: 1,
        },
      },
      ol: {
        pl: [0, '1.3em'],
      },
    },
    hr: {
      borderStyle: 'solid',
      border: 'none',
      py: 5,
      position: 'relative',
      '&::after': {
        position: 'absolute',
        width: (theme: any) => `${theme.space[7]}px`,
        height: '2px',
        left: (theme: any) => `calc(50% - ${theme.space[7] / 2}px)`,
        top: 'calc(50% - 2px)',
        backgroundColor: 'muted',
        content: '""',
      },
    },
    p: {
      my: '1em',
    },
    root: {
      // HTML element styles
      lineHeight: 'body',
      fontFamily: 'serif',
      fontSize: ['19px', '', '21px'],
      a: {
        color: 'primary',
        textDecoration: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipses',
        whitespace: 'nowrap',

        '&:hover': {
          color: 'accent',
        },
      },
      'h1, h2, h3, h4, h5, ol, ul, p, button, input, textarea, hr': {
        m: 0,
        p: 0,
      },
      '.prose': {
        lineHeight: 'content',
      },
      //   code: {
      //     ':not(pre) > &[class*="language-"], &': {
      //       background: 'transparent',
      //       whiteSpace: 'pre-wrap',
      //       wordBreak: 'normal',
      //       background: 'transparent',
      //       fontSize: 1,
      //     },
      //   },
      //   pre: {
      //     background: 'transparent',
      //     border: '1px solid',
      //     borderColor: 'muted',
      //     marginBottom: 4,
      //     lineHeight: '1',

      //     '&[class*="language-"]': {
      //       background: 'transparent',
      //       marginBottom: 4,
      //       code: {
      //         whiteSpace: 'pre !important',
      //         fontSize: 0,
      //       },
      //     },
      //   },
      //   '.gatsby-resp-image-image': {
      //     boxShadow: 'none !important',
      //   },
      //   '.gatsby-resp-image-wrapper': {
      //     overflow: 'hidden',
      //     borderRadius: '12px',
      //   },
      //   '.gatsby-resp-image-link': {
      //     backgroundImage: 'none',
      //   },
      //   '.gatsby-resp-image-figure': {
      //     mx: 0,
      //     my: 5,
      //     pt: 5,

      //     '.gatsby-resp-image-figcaption': {
      //       fontSize: 1,
      //       fontStyle: 'italic',
      //       px: 3,
      //       py: 4,
      //       textAlign: 'center',
      //       color: 'secondary',
      //       lineHeight: 'heading',
      //     },
      //   },
      // },
      // code: {
      //   ':not(pre) > &[class*="language-"], &': {
      //     background: 'transparent !important',
      //     whiteSpace: 'pre-wrap !important',
      //     wordBreak: 'normal !important',
      //     background: 'transparent !important',
      //     fontSize: 1,
      //   },
      // },
      // pre: {
      //   background: 'transparent',
      //   border: '1px solid',
      //   borderColor: 'muted',
      //   marginBottom: 4,
      //   lineHeight: '1',

      //   '&[class*="language-"]': {
      //     background: 'transparent',
      //     marginBottom: 4,
      //     code: {
      //       whiteSpace: 'pre !important',
      //       fontSize: 0,
      //     },
      //   },
    },
  },
}

export default theme as Theme
