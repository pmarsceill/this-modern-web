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
}

const MdxImage = ({
  src,
  alt,
  title,
  height,
  width,
  className,
  placeholder,
}: Props) => {
  let classNameList = className

  if (src.includes('-big')) {
    classNameList = classNameList + ' big-image'
  } else if (src.includes('-small')) {
    classNameList = classNameList + ' small-image'
  }

  if (alt || title) {
    return (
      <figure
        className={classNameList}
        sx={{
          position: 'relative',
          p: 0,
          my: 6,
          mx: 0,
        }}
      >
        <NextImage
          src={src}
          alt={title ? alt : ''}
          sx={{
            p: 0,
            m: 0,
          }}
          layout="responsive"
          width={width}
          height={height}
          placeholder={placeholder ? 'blur' : undefined}
          blurDataURL={placeholder}
        />
        <figcaption
          sx={{
            fontSize: 1,
            fontStyle: 'italic',
            color: 'secondary',
            textAlign: 'center',
            mt: 2,
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

export default MdxImage
