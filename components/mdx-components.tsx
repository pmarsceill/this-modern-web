import MdxImage, { ImageRow, LargeImage, SmallImage } from './mdx-image'

import Button from './button'
import Video from './video'

export const components = {
  Button: Button,
  ImageRow: ImageRow,
  SmallImage: SmallImage,
  LargeImage: LargeImage,
  img: MdxImage,
  Video: Video,
}

export const rssComponents = {
  Button: 'a',
  ImageRow: 'div',
  SmallImage: 'div',
  LargeImage: 'div',
  Video: 'video',
}
