/** @jsxImportSource theme-ui */

type Props = {
  isExtended?: boolean
  children: React.ReactNode
}

const TwoColLayout = ({ isExtended, children }: Props) => {
  const smallColSize = '136px'
  const largeColSize = '154px'

  return (
    <div
      sx={{
        display: ['block', '', '', 'grid'],
        gridGap: ['', '', '', 5, 6],
        gridTemplateColumns: [
          '',
          '',
          '',
          `${smallColSize} minmax(0, 1fr) ${isExtended ? smallColSize : ''}`,
          `${largeColSize} minmax(0, 1fr) ${isExtended ? largeColSize : ''}`,
        ],
      }}
    >
      {children}
    </div>
  )
}

export default TwoColLayout
