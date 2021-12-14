import Box from './primitives/box'
import Text from './primitives/text'

type Props = {
  src: string
  alt?: string
  className?: string
}

const Video = ({ src, alt, className, ...props }: Props) => {
  if (alt) {
    return (
      <Box
        as="figure"
        className={className}
        css={{
          width: '100%',
          height: 'auto',
          p: '$0',
          my: '$6',
          mx: '$0',
        }}
      >
        <Box
          as="video"
          {...props}
          css={{ width: '100%', height: 'auto', p: 0, m: 0 }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support this video type.
        </Box>
        <Text
          css={{
            fontSize: '$1',
            fontStyle: 'italic',
            color: '$secondary',
            textAlign: 'center',
            mt: '$2',
          }}
          as="figcaption"
        >
          {alt}
        </Text>
      </Box>
    )
  }
  return (
    <Box
      as="video"
      {...props}
      css={{ width: '100%', height: 'auto', p: 0, m: 0 }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support this video type.
    </Box>
  )
}

export default Video
