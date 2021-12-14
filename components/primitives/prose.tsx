import { styled } from '../../stitches.config'
import Box from './box'

const Prose = styled(Box, {
  '& p': {
    my: '1em',
  },
  lineHeight: '$content',
  a: {
    color: '$primary',
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipses',
    whitespace: 'nowrap',

    '&:hover': {
      color: '$accent',
    },
    backgroundImage: 'linear-gradient($accentMuted 0%, $accentMuted 100%)',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '0 92%',
    backgroundSize: '1px 1px',
  },
  h1: {
    lineHeight: '$heading',
    fontFamily: '$heading',
    letterSpacing: '$heading',
    mt: '$0',
    fontSize: '$3',
  },
  h2: {
    lineHeight: '$heading',
    fontFamily: '$heading',
    letterSpacing: '$heading',
    mt: '2em',
    mb: '1em',
    fontSize: '$3',
  },
  h3: {
    lineHeight: '$heading',
    fontFamily: '$heading',
    letterSpacing: '$heading',
    mt: '2em',
    mb: '1em',
    fontSize: '$3',
  },
  h4: {
    lineHeight: '$heading',
    fontFamily: '$heading',
    letterSpacing: '$heading',
    mt: '2em',
    mb: '1em',
    fontSize: '$3',
  },
  h5: {
    lineHeight: '$heading',
    fontFamily: '$heading',
    letterSpacing: '$heading',
    mt: '2em',
    mb: '1em',
  },
  h6: {
    lineHeight: '$heading',
    fontFamily: '$heading',
    letterSpacing: '$heading',
    mt: '2em',
    mb: '1em',
  },
  blockquote: {
    ml: '$0',
    pl: 'calc(1.2em - 2px)',
    borderLeft: '2px solid',
    borderColor: '$muted',
    fontStyle: 'italic',
  },
  ul: {
    listStyle: 'none',
    pl: '$0',
    li: {
      position: 'relative',
      mb: '0.33em',
      pl: '1.2em',
      '&:before': {
        position: 'absolute',
        left: '$0',
        content: '–',
        fontWeight: 'normal',
        color: '$secondary',
      },

      '@1': {
        pl: '$0',

        '&:before': {
          left: '-1em',
        },
      },
    },
    ul: {
      pl: '$0',

      '@1': {
        pl: '1.3em',
      },
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
        color: '$secondary',
        content: 'counter(step-counter)',
        counterIncrement: 'step-counter',
        fontSize: 1,
        fontFamily: '$body',
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
      width: '$7',
      height: '2px',
      left: 'calc(50% - $6)',
      top: 'calc(50% - 2px)',
      backgroundColor: '$muted',
      content: '""',
    },
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  pre: {
    background: 'transparent',
    border: '1px solid',
    borderColor: '$muted',
    marginBottom: '$4',
    lineHeight: '1',
    p: '$3',
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
        color: '$accent',
      },
    '.atrule, .attr-value, .keyword': {
      color: '$primary',
    },
    '.selector, .attr-name, .string, .char, .builtin, .inserted': {
      color: '$secondary',
    },
  },

  variants: {
    type: {
      longform: {
        '> p:first-of-type': { mt: '$0' },
        fontFamily: '$serif',
        fontSize: '19px',
        color: '$primary',

        '@2': {
          fontSize: '21px',
        },
      },
    },
  },
})

export default Prose
