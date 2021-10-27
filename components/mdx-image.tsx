/** @jsxImportSource theme-ui */

import NextImage from 'next/image'

type Props = {
  src: string
  alt?: string
  className?: string
  title?: string
  height: number
  width: number
  placeholder?: string
  remote?: boolean
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
  remote,
}: Props) => {
  let classNameList = className

  if (alt || title) {
    return (
      <figure
        className={classNameList}
        sx={{
          position: 'relative',
          p: 0,
          my: 6,
          mx: 0,
          width: remote ? '100%' : undefined,
          height: remote ? '468px' : undefined,
        }}
      >
        <NextImage
          src={src}
          alt={title ? alt : ''}
          sx={{
            p: 0,
            m: 0,
          }}
          layout={!remote ? 'responsive' : 'fill'}
          width={width}
          height={height}
          placeholder={placeholder ? 'blur' : undefined}
          blurDataURL={placeholder}
          objectFit={remote ? 'cover' : undefined}
        />
        <figcaption
          sx={{
            fontSize: 1,
            fontStyle: 'italic',
            color: 'secondary',
            textAlign: 'center',
            mt: 2,
            position: remote ? 'absolute' : undefined,
            bottom: remote ? -5 : undefined,
            width: remote ? '100%' : undefined,
          }}
        >
          {title || alt}
        </figcaption>
      </figure>
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
  return <div className="small-image">{children}</div>
}

const LargeImage = ({ children }: LargeImageProps) => {
  return <div className="large-image">{children}</div>
}

const ImageRow = ({ children, imgWidth = 200 }: ImageRowProps) => {
  return (
    <div
      sx={{
        position: 'relative',
        display: ['', 'flex'],
        ml: ['', -6],
        mr: ['', -6],
        '> *': {
          flexGrow: 1,
          width: ['', `${imgWidth}px`],
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

export default MdxImage
export { SmallImage, LargeImage, ImageRow }
