export default {
  initialColorMode: 'light',
  colors: {
    background: '#f4f4f9',
    text: '#182027',
    primary: '#182027',
    secondary: '#888ba0',
    muted: '#dadcea',
    accent: '#ea2020',
    accentMuted: '#ffbdbd',
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
      }
    },
  },
  fonts: {
    body: "-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
    heading: "-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
    monospace: "SFMono-Regular,Consolas,Menlo,Andale,monospace;",
    title: "Optician Sans, system-ui, sans-serif",
    serif: "Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif"
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
    body: 1.5,
    heading: 1.125,
    title: 0.7,
    content: 1.7,
  },
  letterSpacings: {
    heading: '-0.03em',
  },
  fontSizes: [12, 14, 16, 17, 21, 28, 36, 48, 64, 72, 78],
  space: [0, 4, 8, 12, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: 1168,
    content: 924,
  },
  styles: {
    root: {
      fontFamily: 'serif',
      fontSize: [2, '', '', 3],
      lineHeight: 'content',

      a: {
        color: 'primary',
        textDecoration: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipses',
        whitespace: 'nowrap',
        backgroundImage: theme => `linear-gradient(${theme.colors.accentMuted} 0%, ${theme.colors.accentMuted} 100%)`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 100%',
        backgroundSize: '1px 1px',
        '&:hover': {
          color: 'accent',
        }
      }
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipses',
      whitespace: 'nowrap',
      backgroundImage: theme => `linear-gradient(${theme.colors.accentMuted} 0%, ${theme.colors.accentMuted} 100%)`,
      backgroundRepeat: 'repeat-x',
      backgroundPosition: '0 100%',
      backgroundSize: '1px 1px',
      '&:hover': {
        color: 'accent',
      }
    },
    img: {
      borderRadius: '6px',
      boxShadow: 'none',
    },
    h1: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: 0,
      fontSize: 4,
    },
    h2: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 4,
    },
    h3: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 4,
    },
    h4: {
      lineHeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: 'heading',
      mt: '2em',
      mb: '1em',
      fontSize: 4,
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
    p: {
      mt: 0,
      mb: 4,
    },
    blockquote: {
      ml: 0,
      pl: 4,
      borderLeft: '1px solid',
      borderColor: 'secondary',
      fontStyle: 'italic',
    },
    ul: {
      listStyle: 'none',
      pl: 0,
      li: {
        position: 'relative',
        pl: ['1.3em', 0],
        '::before': {
          position: 'absolute',
          left: [0, '-1.3em'],
          content: '"—"',
          fontWeight: 'normal',
          color: 'secondary',
        }
      },
      ul: {
        pl: [0, '1.3em'],
      }
    },
    dl: {
      listStyle: 'none',
      pl: 0,
      dt: {
        fontWeight: 'bold',
      },
    },
    ol: {
      listStyle: 'none',
      counterReset: 'step-counter',
      pl: 0,
      "> li": {
        position: 'relative',
        pl: ['1.6em', 0],
        "&::before": {
          position: 'absolute',
          top: '0.15em',
          left: [0, '-1.6em'],
          color: 'secondary',
          content: 'counter(step-counter)',
          'counter-increment': 'step-counter',
          fontSize: 1,
          fontFamily: 'body',
        }
      },
      ol: {
	pl: [0, '1.3em'],
      }
    },
    hr: {
      borderStyle: 'solid',
      border: 'none',
      py: 5,
      position: 'relative',
      '&::after': {
        position: 'absolute',
	width: theme => `${theme.space[7]}px`,
        height: '2px',
        left: theme =>`calc(50% - ${theme.space[7] / 2}px)`,
        top: 'calc(50% - 2px)',
        backgroundColor: 'muted',
        content: '""',
      }
    },
    code: {
      fontSize: 1,
      background: 'transparent',
      '&[class*="language-"]': {
        fontSize: 1,
        background: 'transparent',
      },
      '*:not(pre) > &[class*="language-"]': {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }
    },
    pre: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'muted',
      marginBottom: 4,
      '&[class*="language-"]': {
        background: 'transparent',
        marginBottom: 4,
      }
    },
  }
}
