import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrism from 'rehype-prism-plus'
import remarkSmartypants from 'remark-smartypants'
import remarkUnwrapImages from 'remark-unwrap-images'
import { imageMetadata } from './lib/images'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/*.md`,
  bodyType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    featuredImage: {
      type: 'string',
      description: 'The featured image of the post',
      required: false,
    },
    colorMode: {
      type: 'string',
      description: 'The color mode of the post, default to light',
      required: false,
    },
  },
  computedFields: {
    day: {
      type: 'string',
      description: 'The day of the post derived from the filename.',
      resolve: (source) => source._raw.sourceFileName.substring(8, 10),
    },
    month: {
      type: 'string',
      description: 'The month of the post derived from the filename.',
      resolve: (source) => source._raw.sourceFileName.substring(5, 7),
    },
    year: {
      type: 'string',
      description: 'The year of the post derived from the filename.',
      resolve: (source) => source._raw.sourceFileName.substring(0, 4),
    },
    slug: {
      type: 'string',
      description: 'The slug of the post derived from the filename.',
      resolve: (source) =>
        source._raw.sourceFileName.replace(/\.md$/, '').substring(11),
    },
  },
}))

export const MicroBlog = defineDocumentType(() => ({
  name: 'MicroBlog',
  filePathPattern: `microblog/*.md`,
  bodyType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    day: {
      type: 'string',
      description: 'The day of the post derived from the filename.',
      resolve: (source) => source._raw.sourceFileName.substring(8, 10),
    },
    month: {
      type: 'string',
      description: 'The month of the post derived from the filename.',
      resolve: (source) => source._raw.sourceFileName.substring(5, 7),
    },
    year: {
      type: 'string',
      description: 'The year of the post derived from the filename.',
      resolve: (source) => source._raw.sourceFileName.substring(0, 4),
    },
    slug: {
      type: 'string',
      description: 'The slug of the post derived from the filename.',
      resolve: (source) =>
        source._raw.sourceFileName.replace(/\.md$/, '').substring(11),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, MicroBlog],
  mdx: {
    remarkPlugins: [remarkUnwrapImages, remarkSmartypants],
    rehypePlugins: [rehypePrism, imageMetadata],
  },
})
