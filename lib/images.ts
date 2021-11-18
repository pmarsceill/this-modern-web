// Similiar structure to:
// https://github.com/JS-DevTools/rehype-inline-svg/blob/master/src/inline-svg.ts
import path from 'path'
import sharp from 'sharp'
import { Processor } from 'unified'
import { Data, Node } from 'unist'
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'

// BaseUrl is used to generate absolute URLs for RSS feed
const BASE_URL = 'https://thismodernweb.com'

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Node {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    'placeholder-data'?: string
    'is-remote'?: string
  }
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

/**
 * Filters out non absolute paths from the public folder.
 */
function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith('/')
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const sharpImage = sharp(
    path.join(process.cwd(), 'public', node.properties.src)
  )
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

  if (!sharpImage)
    throw Error(`Invalid image with src "${node.properties.src}"`)

  node.properties.width = metadata.width
  node.properties.height = metadata.height
  node.properties['placeholder-data'] = imgBase64
}

async function addRemoteMetadata(node: ImageNode): Promise<void> {
  node.properties['is-remote'] = 'true'
}

/**
 * Adds the image's absolute URL for RSS feed
 */
async function addAbsoluteUrl(node: ImageNode): Promise<void> {
  const path = node.properties.src
  node.properties.src = `${BASE_URL}${path}`
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export function imageMetadata(this: Processor) {
  return async function transformer(tree: Node, file: VFile): Promise<Node> {
    const imgNodes: ImageNode[] = []
    const remoteImages: ImageNode[] = []

    visit(tree, 'element', (node: Node<Data>) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node)
      } else if (isImageNode(node) && !filterImageNode(node)) {
        remoteImages.push(node)
      }
    })

    for (const node of imgNodes) {
      await addMetadata(node)
    }

    for (const node of remoteImages) {
      await addRemoteMetadata(node)
    }

    return tree
  }
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and replaces their paths with their absolute URL.
 */
export function imageAbsoluteUrls(this: Processor) {
  return async function transformer(tree: Node, file: VFile): Promise<Node> {
    const imgNodes: ImageNode[] = []

    visit(tree, 'element', (node: Node<Data>) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node)
      }
    })

    for (const node of imgNodes) {
      await addAbsoluteUrl(node)
    }

    return tree
  }
}
