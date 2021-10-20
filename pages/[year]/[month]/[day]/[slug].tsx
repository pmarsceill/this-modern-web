/** @jsxImportSource theme-ui */

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { format, parseISO } from 'date-fns'
import {
  getAllPosts,
  getNextPost,
  getPostBySlug,
  getPreviousPost,
} from '../../../../lib/posts'

import { Link } from '@theme-ui/components'
import { NextPage } from 'next'
import PostType from '../../../../types/post'
import { serialize } from 'next-mdx-remote/serialize'

type PostProps = {
  post: PostType
  content: MDXRemoteSerializeResult
  nextPost: PostType
  previousPost: PostType
}

const Post: NextPage<PostProps> = ({
  post,
  content,
  nextPost,
  previousPost,
}) => {
  if (post.tags?.includes('microblog')) {
    return (
      <>
        <MDXRemote {...content} />
      </>
    )
  } else {
    return (
      <>
        {post.title ? <h1 sx={{ color: 'primary' }}>{post.title}</h1> : null}
        {post.description ? <span>{post.description}</span> : null}
        <time>{format(parseISO(post.date), 'PPP')}</time>
        <MDXRemote {...content} />

        {previousPost ? (
          <Link
            href={`/${previousPost.year}/${previousPost.month}/${previousPost.day}/${previousPost.slug}`}
          >
            {previousPost.title || previousPost.date}
          </Link>
        ) : null}
        {nextPost ? (
          <Link
            href={`/${nextPost.year}/${nextPost.month}/${nextPost.day}/${nextPost.slug}`}
          >
            {nextPost.title || nextPost.date}
          </Link>
        ) : null}
      </>
    )
  }
}

type Params = {
  params: { slug: string; year: string; month: string; day: string }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    `${params.year}-${params.month}-${params.day}-${params.slug}`
  )
  const mdxSource = await serialize(post.content, {
    // Optionally pass remark/rehype plugins
    // mdxOptions: {
    //   remarkPlugins: [require('remark-code-titles')],
    //   rehypePlugins: [mdxPrism, rehypeSlug, rehypeAutolinkHeadings],
    // },
    scope: post.frontmatter,
  })

  const nextPost = getNextPost(post.slug)
  const previousPost = getPreviousPost(post.slug)

  return {
    props: {
      post: {
        ...post,
      },
      content: mdxSource,
      nextPost,
      previousPost,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
          year: post.year,
          month: post.month,
          day: post.day,
        },
      }
    }),
    fallback: false,
  }
}

export default Post
