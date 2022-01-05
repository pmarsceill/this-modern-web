import Box from './primitives/box'

type Props = {
  isExtended?: boolean
  children: React.ReactNode
}

const TwoColLayout = ({ isExtended, children }: Props) => {
  const smallColSize = '136px'
  const largeColSize = '154px'

  return (
    <Box
      css={{
        display: 'block',
        '@3': {
          display: 'grid',
          gridGap: '$6',
          gridTemplateColumns: `${smallColSize} minmax(0, 1fr) ${
            isExtended ? smallColSize : ''
          }`,
        },
        '@4': {
          gridGap: '$6',
          gridTemplateColumns: `${largeColSize} minmax(0, 1fr) ${
            isExtended ? largeColSize : ''
          }`,
        },
      }}
    >
      {children}
    </Box>
  )
}

export default TwoColLayout
