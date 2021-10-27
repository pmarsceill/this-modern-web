/** @jsxImportSource theme-ui */

type Props = {
  src: string
  alt?: string
  className?: string
}

const Video = ({ src, alt, className, ...props }: Props) => {
  if (alt) {
    return (
      <figure
        className={className}
        sx={{
          width: '100%',
          height: 'auto',
          p: 0,
          my: 6,
          mx: 0,
        }}
      >
        <video {...props} sx={{ width: '100%', height: 'auto', p: 0, m: 0 }}>
          <source src={src} type="video/mp4" />
          Your browser does not support this video type.
        </video>
        <figcaption
          sx={{
            fontSize: 1,
            fontStyle: 'italic',
            color: 'secondary',
            textAlign: 'center',
            mt: 2,
          }}
        >
          {alt}
        </figcaption>
      </figure>
    )
  }
  return (
    <video {...props} sx={{ width: '100%', height: 'auto', p: 0, m: 0 }}>
      <source src={src} type="video/mp4" />
      Your browser does not support this video type.
    </video>
  )
}

export default Video
