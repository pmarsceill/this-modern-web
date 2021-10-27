/** @jsxImportSource theme-ui */

type Props = {
  children: [HTMLImageElement]
}

const ImageRow = ({ children }: Props) => {
  return (
    <div
      sx={{
        position: 'relative',
        display: ['', 'flex'],
        ml: ['', -6],
        mr: ['', -6],
        '> *': {
          flexGrow: 1,
          width: ['', '200px'],
          m: 0,
          p: 0,
        },
        '> * + *': {
          ml: 2,
        },
        '> *:not(img), > *:not(figure)': {
          my: 5,
          pt: 5,
          px: 3,
        },
      }}
    >
      {children}
    </div>
  )
}
export default ImageRow
