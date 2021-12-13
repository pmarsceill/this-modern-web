import Box from '../primitives/box'
import GlobalFooter from './global-footer'
import GlobalHeader from './global-header'

type Props = {
  children: React.ReactNode
  fullWidth?: boolean
}

const GlobalLayout = ({ children, fullWidth }: Props) => {
  return (
    <>
      <Box
        css={{
          maxWidth: '$container',
          mx: 'auto',
          px: '$4',
          '@1': { px: '$6' },
          '@2': { px: '$7' },
          '@3': { px: '$5' },
        }}
      >
        <GlobalHeader />
      </Box>
      <Box
        as="main"
        css={{
          maxWidth: fullWidth ? 'none' : '$container',
          mx: 'auto',
          px: '$4',
          '@1': {
            px: '$6',
          },
          '@2': {
            px: fullWidth ? '$0' : '$7',
          },
          '@3': {
            px: fullWidth ? '$0' : '$5',
          },
        }}
      >
        {children}
      </Box>

      <Box
        css={{
          maxWidth: '$container',
          mx: 'auto',
          px: '$4',
          '@1': { px: '$6' },
          '@2': { px: '$7' },
          '@3': { px: '$5' },
        }}
      >
        <GlobalFooter />
      </Box>
    </>
  )
}

export default GlobalLayout
