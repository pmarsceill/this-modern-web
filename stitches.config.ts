import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      background: '#f4f4f9',
      text: '#182027',
      primary: '#182027',
      secondary: '#777b94',
      muted: '#dadcea',
      inset: '#fff',
      accent: '#ea2020',
      accentMuted: '#ef8585',
    },
    space: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '32px',
      6: '64px',
      7: '128px',
      8: '256px',
      9: '512px',
    },
    sizes: {
      container: '1168px',
      content: '924px',
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '32px',
      6: '64px',
      7: '128px',
      8: '256px',
      9: '512px',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
      heading:
        '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
      monospace:
        'IBM Plex Mono, SFMono-Regular,Consolas,Menlo,Andale,monospace',
      serif:
        'Freight Text Pro,-apple-system-ui-serif, ui-serif,Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif',
    },
    fontSizes: {
      0: '13px',
      1: '15px',
      2: '17px',
      3: '22px',
      4: '26px',
      5: '32px',
      6: '36px',
      7: '42px',
      8: '64px',
      9: '72px',
      10: '78px',
    },
    lineHeights: {
      body: 1.4,
      heading: 1,
      content: 1.5,
    },
    letterSpacings: {
      heading: '-0.025em',
    },
    fontWeights: {
      body: 400,
      heading: 600,
      bold: 600,
    },
    shadows: {
      default:
        '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
    },
    radii: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
    },
  },
  media: {
    1: '(min-width: 40em)',
    2: '(min-width: 57em)',
    3: '(min-width: 64em)',
    4: '(min-width: 72em)',
  },
  utils: {
    d: (value: string) => ({ display: value }),
    m: (value: number | string) => ({ margin: value }),
    ml: (value: number | string) => ({ marginLeft: value }),
    mr: (value: number | string) => ({ marginRight: value }),
    mt: (value: number | string) => ({ marginTop: value }),
    mb: (value: number | string) => ({ marginBottom: value }),
    mx: (value: number | string) => ({ marginLeft: value, marginRight: value }),
    my: (value: number | string) => ({ marginTop: value, marginBottom: value }),
    p: (value: number | string) => ({ padding: value }),
    pl: (value: number | string) => ({ paddingLeft: value }),
    pr: (value: number | string) => ({ paddingRight: value }),
    pt: (value: number | string) => ({ paddingTop: value }),
    pb: (value: number | string) => ({ paddingBottom: value }),
    px: (value: number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: number | string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    bg: (value: string) => ({ backgroundColor: value }),
    bgImage: (value: string) => ({ backgroundImage: `url(${value})` }),
    bgSize: (value: string) => ({ backgroundSize: value }),
    bgPosition: (value: string) => ({ backgroundPosition: value }),
    bgRepeat: (value: string) => ({ backgroundRepeat: value }),
    bgAttachment: (value: string) => ({ backgroundAttachment: value }),
    bgClip: (value: string) => ({ backgroundClip: value }),
    bgOrigin: (value: string) => ({ backgroundOrigin: value }),
    bgColor: (value: string) => ({ backgroundColor: value }),
  },
})
