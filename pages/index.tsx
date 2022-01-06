import { format, formatDistance, parseISO } from 'date-fns'
import type { GetStaticProps, NextPage } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { allMicroBlogs, allPosts } from '../.contentlayer/data'
import { MicroBlog, Post } from '../.contentlayer/types'
import AncillaryNav from '../components/ancillary-nav'
import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Nav from '../components/nav'
import Anchor from '../components/primitives/anchor'
import Box from '../components/primitives/box'
import Heading from '../components/primitives/heading'
import Prose from '../components/primitives/prose'
import Text from '../components/primitives/text'
import Spinner from '../components/spinner'
import TwoColLayout from '../components/two-col-layout'
import { styled } from '../stitches.config'

type Props = {
  currentPosts: Post[]
  microBlogs: MicroBlog[]
}

type MicroBlogProps = {
  post: MicroBlog
}

type PostProps = {
  post: Post
  isFirst?: boolean
}

const Article = styled('article')

const CurrentPost = ({ post, isFirst }: PostProps) => {
  const spinnerRef = useRef<HTMLSpanElement>(null)
  const handleImageLoad = () => {
    if (spinnerRef.current) {
      spinnerRef.current.style.display = 'none'
    }
  }

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
                fontWeight: '$heading',
                '@1': {
                  fontSize: '$5',
                },
                '@2': {
                  fontSize: isFirst ? '$7' : '$5',
                },
              }}
            >
              {post.title || post.slug}
            </Heading>
            {post.description && (
              <Text
                css={{
                  fontFamily: '$heading',
                  display: 'inline',
                  color: '$secondary',
                  fontWeight: '$heading',
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
            )}
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
          {post.featuredImage && (
            <Box
              css={{
                position: 'relative',
                flexShrink: '0',
                backgroundColor: '$muted',
                borderRadius: '$3',
                overflow: 'hidden',
                ml: '$4',
                width: '100px',
                height: '100px',
                '@1': {
                  width: isFirst ? '180px' : '140px',
                  height: isFirst ? '180px' : '140px',
                },
              }}
            >
              <Box
                ref={spinnerRef}
                as="span"
                css={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Spinner />
              </Box>
              <Image
                src={post.featuredImage}
                alt={post.title}
                layout="responsive"
                width={180}
                height={180}
                objectFit="cover"
                objectPosition="right center"
                priority={isFirst}
                onLoadingComplete={() => {
                  handleImageLoad()
                }}
              />
            </Box>
          )}
        </Anchor>
      </Link>
    </Article>
  )
}

const MicroBlog = ({ post }: MicroBlogProps) => {
  const formattedDate = formatDistance(parseISO(post.date), new Date(), {
    addSuffix: true,
  })

  const MdxContent = useMDXComponent(post.body.code) || ''

  return (
    <Article
      css={{
        mb: '$5',
        pb: '$5',
        borderBottom: '1px solid',
        borderColor: '$muted',
      }}
      id={post.date}
    >
      <Prose type="microblog">
        <MdxContent />
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

const Home: NextPage<Props> & { theme: string } = ({
  currentPosts,
  microBlogs,
}) => {
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
            (post, i) => i < 4 && <MicroBlog post={post} key={post.date} />
          )}
          {currentPosts.map(
            (post, i) =>
              i >= 1 && i < 5 && <CurrentPost post={post} key={post.slug} />
          )}
          {microBlogs.map(
            (post, i) =>
              i >= 4 && i < 15 && <MicroBlog post={post} key={post.date} />
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
  const currentPosts = allPosts.sort((a, b) => {
    return Number(new Date(b.date)) - Number(new Date(a.date))
  })
  const microBlogs = allMicroBlogs.sort((a, b) => {
    return Number(new Date(b.date)) - Number(new Date(a.date))
  })

  return {
    props: { currentPosts, microBlogs },
  }
}

Home.theme = 'dark'

export default Home
