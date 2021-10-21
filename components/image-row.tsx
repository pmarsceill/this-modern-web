/** @jsxImportSource theme-ui */

type Props = {
  children: React.ReactNode
}

const ImageRow = ({ children }: Props) => {
  return (
    <div
      sx={{
        width: ['', '', 'calc(100% + 64px)'],
        height: ['', '', 'calc(100% + 64px)'],
        marginLeft: ['', '', '-32px !important'],
        marginRight: ['', '', '-32px !important'],
        display: ['', 'flex'],
        '> *': {
          flexGrow: 1,
          width: ['', '200px'],
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
