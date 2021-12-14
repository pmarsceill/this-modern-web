import { format, formatDistance, parseISO } from 'date-fns'
import type { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import rehypePrism from 'rehype-prism-plus'
import remarkUnwrapImages from 'remark-unwrap-images'
import AncillaryNav from '../components/ancillary-nav'
import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Nav from '../components/nav'
import Anchor from '../components/primitives/anchor'
import Box from '../components/primitives/box'
import Heading from '../components/primitives/heading'
import Prose from '../components/primitives/prose'
import Text from '../components/primitives/text'
import TwoColLayout from '../components/two-col-layout'
import { imageAbsoluteUrls } from '../lib/images'
import { getAllPosts, getPostsByType } from '../lib/posts'
import { PostType } from '../lib/types'
import { rssComponents } from '../pages/[year]/[month]/[day]/[slug]'
import generateRSSFeed from '../scripts/rss-generator'
import { styled } from '../stitches.config'

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

const Article = styled('article', {})

const CurrentPost = ({ post, isFirst }: PostProps) => {
  return (
    <Article
      css={{
        mb: '$5',
        pb: '$5',
        borderBottom: '1px solid',
        borderColor: '$muted',
      }}
    >
      <Link
        href={`/${post.year}/${post.month}/${post.day}/${post.slug}`}
        passHref
      >
        <Anchor
          css={{
            color: '$primary',
            display: 'flex',
            '&:hover': {
              color: '$accent',
            },
          }}
        >
          <Box css={{ maxWidth: '660px' }}>
            <Heading
              as="h2"
              css={{
                display: 'inline',
                fontFamily: '$heading',
                letterSpacing: '$heading',
                lineHeight: '$heading',
                fontSize: '$4',
                '@1': {
                  fontSize: '$5',
                },
                '@2': {
                  fontSize: isFirst ? '$7' : '$5',
                },
              }}
            >
              {post.title}
            </Heading>
            <Text
              css={{
                fontFamily: '$heading',
                display: 'inline',
                color: '$secondary',
                fontWeight: 'bold',
                letterSpacing: '$heading',
                lineHeight: '$heading',
                hyphens: 'auto',
                ml: '$2',
                fontSize: '$4',
                '@1': {
                  fontSize: '$5',
                },
                '@2': {
                  fontSize: isFirst ? '$7' : '$5',
                },
              }}
            >
              {post.description}
            </Text>
            <Text
              as="time"
              css={{
                fontFamily: '$body',
                display: 'block',
                fontSize: '$0',
                color: '$secondary',
                mt: '$3',
              }}
            >
              {format(parseISO(post.date), 'PP')}
            </Text>
          </Box>
          {post.frontmatter.featuredImage && (
            <Box
              css={{
                position: 'relative',
                flexShrink: '0',
                backgroundColor: '$muted',
                borderRadius: '$3',
                overflow: 'hidden',
                ml: '$3',
                width: '100px',
                height: '100px',
                '@1': {
                  ml: '$4',
                  width: '140px',
                  height: '140px',
                },
                '@2': {
                  width: isFirst ? '180px' : '140px',
                  height: isFirst ? '180px' : '140px',
                },
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
            </Box>
          )}
        </Anchor>
      </Link>
    </Article>
  )
}

const MicroBlog = ({ post, mdxContent }: MicroBlogProps) => {
  const fallBackBody = post.title || post.slug
  const formattedDate = formatDistance(parseISO(post.date), new Date(), {
    addSuffix: true,
  })

  return (
    <Article
      css={{
        mb: '$5',
        pb: '$5',
        borderBottom: '1px solid',
        borderColor: '$muted',
      }}
      id={post.slug}
    >
      <Prose type="microblog">
        {mdxContent ? <MDXRemote {...mdxContent} /> : fallBackBody}
      </Prose>
      <Link
        href={`/${post.year}/${post.month}/${post.day}/${post.slug}`}
        passHref
      >
        <Anchor
          css={{
            color: '$secondary',
            fontSize: '$0',
            mt: '$3',
            fontFamily: '$monospace',
          }}
        >
          ⌘ <Text as="time">{formattedDate}</Text>
        </Anchor>
      </Link>
    </Article>
  )
}

const Home: NextPage<Props> = ({ currentPosts, microBlogs }) => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  return (
    <GlobalLayout>
      <NextSeo title="This Modern Web — Patrick Marsceill" />
      <TwoColLayout isExtended>
        <Nav />
        <Box>
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
            <Button
              as="a"
              variant="outline"
              css={{ fontSize: '$2', d: 'block' }}
            >
              Everything Archive
            </Button>
          </Link>
        </Box>
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
        rehypePlugins: [rehypePrism, imageAbsoluteUrls as any],
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
