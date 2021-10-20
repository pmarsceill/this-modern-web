/** @jsxImportSource theme-ui */

import GlobalFooter from './global-footer'
import GlobalHeader from './global-header'

type Props = {
  children: React.ReactNode
  fullWidth?: boolean
}

const GlobalLayout = ({ children, fullWidth }: Props) => {
  return (
    <>
      <div sx={{ maxWidth: 'container', mx: 'auto', px: [4, 6, 7, 5] }}>
        <GlobalHeader />
      </div>
      <main
        sx={{
          maxWidth: fullWidth ? 'none' : 'container',
          mx: 'auto',
          px: fullWidth ? [4, 6, 0] : [4, 6, 7, 5],
        }}
      >
        {children}
      </main>
      <div sx={{ maxWidth: 'container', mx: 'auto', px: [4, 6, 7, 5] }}>
        <GlobalFooter />
      </div>
    </>
  )
}

export default GlobalLayout
