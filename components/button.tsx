import { styled } from '../stitches.config'

const Button = styled('button', {
  appearance: 'none',
  textAlign: 'center',
  lineHeight: 'inherit',
  textDecoration: 'none',
  fontWeight: 'bold',
  letterSpacing: '-0.02em',
  fontFamily: '$body',
  backgroundImage: 'none !important',
  m: '$0',
  px: '$3',
  py: '$2',
  border: '$0',
  borderRadius: '$2',

  variants: {
    variant: {
      primary: {
        color: '$background',
        bg: '$primary',
        '&:hover': {
          color: '$accent',
        },
      },
      secondary: {
        color: '$background',
        bg: '$secondary',
        '&:hover': {
          color: '$accent',
        },
      },
      outline: {
        bg: 'transparent',
        $$shadowColor: '$colors$secondary',
        boxShadow: '0 0 0 1px $$shadowColor',
        color: '$primary',
        '&:hover': {
          $$shadowColor: '$colors$accent',
          color: '$accent',
          boxShadow: '0 0 0 1px $$shadowColor',
        },
      },
    },
  },
})

export default Button
