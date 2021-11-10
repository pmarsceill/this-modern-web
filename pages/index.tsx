/** @jsxImportSource theme-ui */

import type { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { format, formatDistance, parseISO } from 'date-fns'
import { getAllPosts, getPostsByType } from '../lib/posts'

import AncillaryNav from '../components/ancillary-nav'
import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Image from 'next/image'
import Link from 'next/link'
import { MDXProvider } from '@theme-ui/mdx'
import Nav from '../components/nav'
import { NextSeo } from 'next-seo'
import PostType from '../types/post'
import ReactDOMServer from 'react-dom/server'
import TwoColLayout from '../components/two-col-layout'
import generateRSSFeed from '../lib/rss-generator'
import imageMetadata from '../lib/image-metadata'
import mdxPrism from 'mdx-prism'
import remarkUnwrapImages from 'remark-unwrap-images'
import { rssComponents } from '../pages/[year]/[month]/[day]/[slug]'
import { serialize } from 'next-mdx-remote/serialize'
import { useColorMode } from 'theme-ui'

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
  const [colorMode, setColorMode] = useColorMode()
  setColorMode('dark')

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
              {format(parseISO(post.date), 'PP')}
            </time>
          </div>
          {post.frontmatter.featuredImage && (
            <div
              sx={{
                position: 'relative',
                flexShrink: 0,
                width: isFirst
                  ? ['100px', '140px', '180px']
                  : ['100px', '140px'],
                height: isFirst
                  ? ['100px', '140px', '180px']
                  : ['100px', '140px'],
                backgroundColor: 'muted',
                borderRadius: 3,
                overflow: 'hidden',
                ml: [3, 4],
              }}
            >
              <Image
                src={post.frontmatter.featuredImage}
                alt={post.title}
                layout="responsive"
                width={180}
                height={180}
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
  const formattedDate = formatDistance(parseISO(post.date), new Date(), {
    addSuffix: true,
  })

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
      <div
        sx={{ fontFamily: 'monospace', fontSize: [1], lineHeight: 'content' }}
      >
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
          ⌘ <time>{formattedDate}</time>
        </a>
      </Link>
    </article>
  )
}

const Home: NextPage<Props> = ({ currentPosts, microBlogs }) => {
  return (
    <GlobalLayout>
      <NextSeo title="This Modern Web — Patrick Marsceill" />
      <TwoColLayout isExtended>
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
              i < 4 && (
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
              i >= 4 && (
                <MicroBlog
                  post={microBlog.post}
                  key={microBlog.post.date}
                  mdxContent={microBlog.mdxContent}
                />
              )
          )}
          <Link href="/archive" passHref>
            <Button as="a" block variant="outline" sx={{ fontSize: 2 }}>
              Everything Archive
            </Button>
          </Link>
        </div>
        <AncillaryNav />
      </TwoColLayout>
    </GlobalLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const currentPosts = getPostsByType('current')
  const microBlogs = getPostsByType('microblog') || []
  const allPosts = getAllPosts('desc')

  const microBlogsWithContent = microBlogs.map(async (post) => {
    const mdxContent = await serialize(post.content)
    return { post: { ...post }, mdxContent: mdxContent }
  })

  const allPostsWithContent = allPosts.map(async (post) => {
    const mdxContent = await serialize(post.content, {
      // Optionally pass remark/rehype plugins
      mdxOptions: {
        remarkPlugins: [remarkUnwrapImages],
        rehypePlugins: [mdxPrism, imageMetadata],
      },
      scope: post.frontmatter,
    })
    const mdx = <MDXRemote components={rssComponents} {...mdxContent} />
    const html = ReactDOMServer.renderToStaticMarkup(mdx)
    return { post: { ...post }, html }
  })

  const microBlogsWithContentResolved = await Promise.all(microBlogsWithContent)
  const allPostsWithContentResolved = await Promise.all(allPostsWithContent)

  generateRSSFeed(allPostsWithContentResolved)

  return {
    props: { currentPosts, microBlogs: microBlogsWithContentResolved },
  }
}
export default Home
