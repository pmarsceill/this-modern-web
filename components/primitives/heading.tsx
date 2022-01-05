import { styled } from '../../stitches.config'

const Heading = styled('h2', {
  fontFamily: '$heading',
  letterSpacing: '$heading',
  lineHeight: '$heading',
  fontWeight: '$heading',

  variants: {
    context: {
      pageHeading: {
        color: '$primary',
        fontSize: '$5',
        mb: '1em',

        '@1': {
          fontSize: '$6',
        },
        '@2': {
          fontSize: '$7',
        },
      },
    },
  },
})

export default Heading
