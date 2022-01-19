import NextImage from 'next/image'
import Box from './primitives/box'
import Text from './primitives/text'

type Props = {
  src: string | StaticImageData
  alt?: string
  className?: string
  title?: string
  height: number
  width: number
  placeholder?: 'blur' | 'empty'
  'placeholder-data'?: string
  'is-remote'?: boolean | string
  shadow?: boolean
  rounded?: boolean
}

type SmallImageProps = {
  children: HTMLImageElement
}

type LargeImageProps = {
  children: HTMLImageElement
}

type ImageRowProps = {
  imgWidth?: number
  children: [HTMLImageElement]
}

const MdxImage = ({
  src,
  alt,
  title,
  height,
  width,
  className,
  placeholder,
  'placeholder-data': placeholderData,
  shadow,
  rounded,
  'is-remote': isRemote,
}: Props) => {
  const classNameList = className

  if (alt || title) {
    return (
      <Box
        as="figure"
        className={classNameList}
        css={{
          position: 'relative',
          p: '$0',
          my: '$6',
          mx: '$0',
          width: isRemote ? '100%' : undefined,
          height: isRemote ? '468px' : undefined,
        }}
      >
        <Box
          css={{
            boxShadow: shadow ? '$default' : undefined,
            borderRadius: rounded ? '$1' : undefined,
            overflow: 'hidden',
          }}
        >
          <NextImage
            src={src}
            alt={title ? alt : ''}
            layout={!isRemote ? 'responsive' : 'fill'}
            width={width}
            height={height}
            placeholder={placeholderData ? 'blur' : placeholder}
            blurDataURL={placeholderData ? placeholderData : undefined}
            objectFit={isRemote ? 'cover' : undefined}
          />
        </Box>
        <Text
          as="figcaption"
          css={{
            fontSize: '$1',
            fontStyle: 'italic',
            color: '$secondary',
            textAlign: 'center',
            mt: '$2',
            position: isRemote ? 'absolute' : undefined,
            bottom: isRemote ? -5 : undefined,
            width: isRemote ? '100%' : undefined,
          }}
        >
          {title || alt}
        </Text>
      </Box>
    )
  }
  return (
    <NextImage
      src={src}
      className={classNameList}
      alt=""
      layout="responsive"
      width={width}
      height={height}
    />
  )
}

const SmallImage = ({ children }: SmallImageProps) => {
  return (
    <Box
      css={{
        mx: 'auto',
        maxWidth: '420px',
      }}
    >
      {children}
    </Box>
  )
}

const LargeImage = ({ children }: LargeImageProps) => {
  return (
    <Box
      css={{
        position: 'relative',

        '@3': {
          ml: '-$6',
          mr: '-$6',
          width: 'calc(100% + 128px) !important',
        },
      }}
    >
      {children}
    </Box>
  )
}

const ImageRow = ({ children, imgWidth = 200 }: ImageRowProps) => {
  return (
    <Box
      css={{
        position: 'relative',
        '> *': {
          flexGrow: 1,
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

        '@1': {
          d: 'flex',
          ml: '-$6',
          mr: '-$6',

          '> *': {
            width: `${imgWidth}px`,
          },
        },
      }}
    >
      {children}
    </Box>
  )
}

export default MdxImage
export { SmallImage, LargeImage, ImageRow }
