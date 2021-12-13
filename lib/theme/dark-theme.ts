import { createTheme } from '../../stitches.config'

const darkTheme = createTheme('dark-theme', {
  colors: {
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
  shadows: {
    default:
      '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
  },
})

export default darkTheme
