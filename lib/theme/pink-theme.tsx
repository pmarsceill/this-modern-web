import { createTheme } from '../../stitches.config'

const pinkTheme = createTheme('pink-theme', {
  colors: {
    background: '#FBD5D3',
    text: '#0D2234',
    primary: '#0D2234',
    secondary: '#766F88',
    muted: '#e7bdba',
    inset: '#fbd5d3',
    accent: '#EA4F4F',
    accentMuted: '#F16464',
  },
  shadows: {
    default:
      '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
  },
})

export default pinkTheme
