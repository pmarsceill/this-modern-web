/** @jsxImportSource theme-ui */

import type { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import GlobalHeader from '../components/global-header'
import { Link } from '@theme-ui/components'
import PostType from '../types/post'
import { getPostsByType } from '../lib/posts'
import { serialize } from 'next-mdx-remote/serialize'

type Props = {
  currentPosts: PostType[]
  microBlogs: MicroBlogProps[]
}

type MicroBlogProps = {
  post: PostType
  mdxContent: MDXRemoteSerializeResult
}

type PostProps = {
  post: PostType
}

const CurrentPost = ({ post }: PostProps) => {
  return (
    <article>
      <h2>
        <Link href={`/${post.year}/${post.month}/${post.date}/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
    </article>
  )
}

const MicroBlog = ({ post, mdxContent }: MicroBlogProps) => {
  return (
    <article>
      <time>{post.date}</time>
      {mdxContent ? <MDXRemote {...mdxContent} /> : null}
    </article>
  )
}

const Home: NextPage<Props> = ({ currentPosts, microBlogs }) => {
  return (
    <>
      <GlobalHeader />
      <main>
        {currentPosts.map(
          (post, i) => i === 0 && <CurrentPost post={post} key={post.slug} />
        )}
        {microBlogs.map(
          (microBlog, i) =>
            i < 5 && (
              <MicroBlog
                post={microBlog.post}
                key={microBlog.post.date}
                mdxContent={microBlog.mdxContent}
              />
            )
        )}
        {currentPosts.map(
          (post, i) =>
            i >= 1 && i < 5 && <CurrentPost post={post} key={post.slug} />
        )}
        {microBlogs.map(
          (microBlog, i) =>
            i >= 5 && (
              <MicroBlog
                post={microBlog.post}
                key={microBlog.post.date}
                mdxContent={microBlog.mdxContent}
              />
            )
        )}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const currentPosts = getPostsByType('current')
  const microBlogs = getPostsByType('microblog') || []

  const microBlogsWithContent = microBlogs.map(async (post) => {
    const mdxContent = await serialize(post.content)
    return { post: { ...post }, mdxContent: mdxContent }
  })

  const microBlogsWithContentResolved = await Promise.all(microBlogsWithContent)

  return {
    props: { currentPosts, microBlogs: microBlogsWithContentResolved },
  }
}
export default Home
