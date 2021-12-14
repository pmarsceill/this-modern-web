import NextImage from 'next/image'
import Box from './box'

const Image = ({ ...props }) => {
  return (
    <Box css={props.css}>
      <NextImage src={props.src} {...props} />
    </Box>
  )
}

export default Image
