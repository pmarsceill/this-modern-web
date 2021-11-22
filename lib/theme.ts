import { Theme } from '@theme-ui/css'

export const theme: Theme = {
  config: {
    initialColorModeName: 'light',
    useColorSchemeMediaQuery: false,
  },
  colors: {
    background: '#f4f4f9',
    text: '#182027',
    primary: '#182027',
    secondary: '#777b94',
    muted: '#dadcea',
    inset: '#fff',
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
        inset: '#171a1f',
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
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.4,
    heading: 1.1,
    content: 1.5,
  },
  letterSpacings: {
    heading: '-0.03em',
  },
  shadows: {
    default:
      '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
  },
  radii: [0, 4, 8, 12],
  fontSizes: [13, 15, 17, 22, 26, 32, 36, 42, 64, 72, 78],
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
      boxShadow: (theme: Theme) => `0 0 0 1px ${theme.colors?.secondary}`,
      color: 'primary',
      '&:hover': {
        color: 'accent',
        boxShadow: (theme: Theme) => `0 0 0 1px ${theme.colors?.accent}`,
      },
    },
  },
  text: {
    anchor: {
      default: {
        color: 'primary',
        textDecoration: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipses',
        whitespace: 'nowrap',

        '&:hover': {
          color: 'accent',
        },
      },
      prose: {
        color: 'primary',
        textDecoration: 'none',
        overflow: 'hidden',
        textOverflow: 'ellipses',
        whitespace: 'nowrap',

        '&:hover': {
          color: 'accent',
        },
        backgroundImage: (theme: Theme) =>
          `linear-gradient(${theme.colors?.accentMuted} 0%, ${theme.colors?.accentMuted} 100%)`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 92%',
        backgroundSize: '1px 1px',
      },
    },
    pageHeading: {
      fontSize: [5, 6, 7],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      letterSpacing: 'heading',
    },
  },
  styles: {
    // MDX styles
    a: {
      variant: 'text.anchor.prose',
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
          top: ['0.5em', '', '0.68em'],
          left: ['0.25em', '-1.6em'],
          color: 'secondary',
          content: 'counter(step-counter)',
          counterIncrement: 'step-counter',
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
        width: (theme: Theme) => `${theme.space && theme.space[7]}px`,
        height: '2px',
        left: (theme: Theme) =>
          `calc(50% - ${theme.space && theme.space[6]}px)`,
        top: 'calc(50% - 2px)',
        backgroundColor: 'muted',
        content: '""',
      },
    },
    p: {
      my: '1em',
    },
    img: {
      width: '100%',
      height: 'auto',
    },
    pre: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'muted',
      marginBottom: 4,
      lineHeight: '1',
      p: 3,
      borderRadius: '4px',
      overflowX: 'auto',
      maxWidth: '100%',

      code: {
        whiteSpace: 'pre',
      },

      '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
        color: 'gray',
      },
      '.comment': {
        fontStyle: 'italic',
      },
      '.property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable':
        {
          color: 'accent',
        },
      '.atrule, .attr-value, .keyword': {
        color: 'primary',
      },
      '.selector, .attr-name, .string, .char, .builtin, .inserted': {
        color: 'secondary',
      },
    },
    root: {
      // HTML element styles
      lineHeight: 'body',
      fontFamily: 'serif',
      fontSize: ['19px', '', '21px'],
      a: {
        variant: 'text.anchor.default',
      },
      'h1, h2, h3, h4, h5, ol, ul, p, button, input, textarea, hr': {
        m: 0,
        p: 0,
      },
      '.prose': {
        lineHeight: 'content',
        a: {
          variant: 'text.anchor.prose',
        },
        p: {
          my: '1em',
        },
      },
      '.large-image': {
        position: 'relative',
        ml: ['', '', '', -6],
        mr: ['', '', '', -6],
        width: ['', '', '', 'calc(100% + 128px) !important'],
      },
      '.small-image': {
        mx: 'auto',
        maxWidth: '420px',
      },
      code: {
        fontFamily: 'monospace',
        background: 'transparent',
        whiteSpace: 'pre-wrap',
        wordBreak: 'normal',
        fontSize: 1,
      },
    },
  },
}
