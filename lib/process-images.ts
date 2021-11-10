import path from 'path'
import sharp from 'sharp'

type ProcessImageProps = {
  src: string
}

const processImage = async ({ src }: ProcessImageProps) => {
  const sharpImage = sharp(src)
  const metadata = await sharpImage.metadata()
  const imageAspectRatio = (metadata.width || 1) / (metadata.height || 1)
  const placeHolderWidth = 20
  const placeHolderHeight = Math.round(placeHolderWidth / imageAspectRatio)
  const imgBase64 = await sharpImage
    .resize(placeHolderWidth, placeHolderHeight)
    .toBuffer()
    .then(
      (buffer) =>
        `data:image/${metadata.format};base64,${buffer.toString('base64')}`
    )
  return {
    fileName: path.basename(src),
    relativePath: path.relative(process.cwd(), src).substring('public'.length),
    width: metadata.width,
    height: metadata.height,
    imgBase64,
  }
}
