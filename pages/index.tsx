/** @jsxImportSource theme-ui */

import type { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Button } from '@theme-ui/components'
import GlobalLayout from '../components/global/global-layout'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/nav'
import PostType from '../types/post'
import TwoColLayout from '../components/two-col-layout'
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
  isFirst?: boolean
}

const CurrentPost = ({ post, isFirst }: PostProps) => {
  return (
    <article
      sx={{ mb: 5, pb: 5, borderBottom: '1px solid', borderColor: 'muted' }}
    >
      <Link
        href={`/${post.year}/${post.month}/${post.day}/${post.slug}`}
        passHref
      >
        <a
          sx={{
            color: 'primary',
            display: 'flex',
            '&:hover': {
              color: 'accent',
            },
          }}
        >
          <div sx={{ maxWidth: '660px' }}>
            <h3
              sx={{
                display: 'inline',
                fontFamily: 'heading',
                fontSize: isFirst ? [4, 5, 7] : [4, 5],
                letterSpacing: 'heading',
                lineHeight: 'heading',
              }}
            >
              {post.title}
            </h3>
            <p
              sx={{
                fontFamily: 'heading',
                display: 'inline',
                fontSize: isFirst ? [4, 5, 7] : [4, 5],
                color: 'secondary',
                fontWeight: 'bold',
                letterSpacing: 'heading',
                lineHeight: 'heading',
                hyphens: 'auto',
                ml: 2,
              }}
            >
              {post.description}
            </p>
            <time
              sx={{
                fontFamily: 'body',
                display: 'block',
                fontSize: [0],
                color: 'secondary',
                mt: 3,
              }}
            >
              {post.date}
            </time>
          </div>
          {post.frontmatter.featuredImage && (
            <div
              sx={{
                position: 'relative',
                width: '180px',
                height: '180px',
                backgroundColor: 'muted',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <Image
                src={post.frontmatter.featuredImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                objectPosition="right center"
              />
            </div>
          )}
        </a>
      </Link>
    </article>
  )
}

const MicroBlog = ({ post, mdxContent }: MicroBlogProps) => {
  const fallBackBody = post.title || post.slug

  return (
    <article
      sx={{
        mb: 5,
        pb: 5,
        borderBottom: '1px solid',
        borderColor: 'muted',
      }}
      id={post.slug}
    >
      <div sx={{ fontFamily: 'monospace', fontSize: [1], lineHeight: 'body' }}>
        {mdxContent ? <MDXRemote {...mdxContent} /> : fallBackBody}
      </div>
      <Link
        href={`/${post.year}/${post.month}/${post.day}/${post.slug}`}
        passHref
      >
        <a
          sx={{
            color: 'secondary',
            fontSize: 0,
            mt: 3,
            fontFamily: 'monospace',
          }}
        >
          ⌘ <time>{post.date}</time>
        </a>
      </Link>
    </article>
  )
}

const Home: NextPage<Props> = ({ currentPosts, microBlogs }) => {
  return (
    <GlobalLayout>
      <TwoColLayout>
        <Nav />
        <div>
          {currentPosts.map(
            (post, i) =>
              i === 0 && (
                <CurrentPost post={post} key={post.slug} isFirst={true} />
              )
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
          <Link href="/archive" passHref>
            <Button>Everything Archive</Button>
          </Link>
        </div>
      </TwoColLayout>
    </GlobalLayout>
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
