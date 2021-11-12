import { Data, Node } from 'unist'

import { Processor } from 'unified'
import { VFile } from 'vfile'
import { visit } from 'unist-util-visit'

const BASE_URL = 'https://thismodernweb.com'

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Node {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
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
 * Adds the image's absolute URL for RSS feed
 */
async function addAbsoluteUrl(node: ImageNode): Promise<void> {
  const path = node.properties.src
  node.properties.src = `${BASE_URL}${path}`
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and replaces their paths with their absolute URL.
 */
export default function imageAbsoluteUrls(this: Processor) {
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
