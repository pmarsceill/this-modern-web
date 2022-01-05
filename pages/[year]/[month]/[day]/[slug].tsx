import { format, parseISO } from 'date-fns'
import { NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import rehypePrism from 'rehype-prism-plus'
import remarkSmartypants from 'remark-smartypants'
import remarkUnwrapImages from 'remark-unwrap-images'
import removeMd from 'remove-markdown'
import AncillaryNav from '../../../../components/ancillary-nav'
import Button from '../../../../components/button'
import GlobalLayout from '../../../../components/global/global-layout'
import MdxImage, {
  ImageRow,
  LargeImage,
  SmallImage,
} from '../../../../components/mdx-image'
import PostNav from '../../../../components/post-nav'
import Box from '../../../../components/primitives/box'
import Heading from '../../../../components/primitives/heading'
import Prose from '../../../../components/primitives/prose'
import Text from '../../../../components/primitives/text'
import TwoColLayout from '../../../../components/two-col-layout'
import Video from '../../../../components/video'
import { imageMetadata } from '../../../../lib/images'
import {
  getAllPosts,
  getNextPost,
  getPostBySlug,
  getPreviousPost,
} from '../../../../lib/posts'
import { PostType } from '../../../../lib/types'

type PostProps = {
  post: PostType
  content: MDXRemoteSerializeResult
  nextPost: PostType
  previousPost: PostType
}

type TimeWarningProps = {
  currentYear: number
  postYear: number
}

const components = {
  Button: Button,
  ImageRow: ImageRow,
  SmallImage: SmallImage,
  LargeImage: LargeImage,
  img: MdxImage,
  Video: Video,
}

export const rssComponents = {
  Button: Button,
  ImageRow: ImageRow,
  SmallImage: SmallImage,
  LargeImage: LargeImage,
  Video: Video,
}

const TimeWarning = ({ postYear, currentYear }: TimeWarningProps) => {
  return (
    <>
      <Text as="p" css={{ mt: '$0', mb: '1em' }}>
        👋{' '}
        <em>
          Hello reader, this blog post has aged {currentYear - postYear} years
          since I originally wrote it in {postYear}. That&apos;s about{' '}
          {(currentYear - postYear) * 7} &ldquo;internet years&rdquo; you know,
          so it&apos;s probably quite stale by now and may not reflect my
          current thinking. I am happy to keep it here for archival purposes,
          but please{' '}
          <a href="mailto:patrick@thismodernweb.com">reach out to me</a> if
          something feels off or if you&apos;re relying on it for any serious
          purpose.{' '}
        </em>
      </Text>
      <Text as="p" css={{ m: '$0' }}>
        <em>
          Thanks,
          <br />
          Patrick
        </em>
      </Text>
      <hr />
    </>
  )
}

const Post: NextPage<PostProps> = ({
  post,
  content,
  nextPost,
  previousPost,
}) => {
  const { setTheme } = useTheme()
  // const [showSideTitle, setShowSideTitle] = useState(false)
  const currentYear = new Date().getFullYear()
  const postYear = parseInt(post.year)
  const contentString = removeMd(post.content)
  const excerpt = contentString.substring(
    0,
    Math.min(contentString.length, 160)
  )
  const isMicroBlog = post.tags?.includes('microblog')
  const colorMode = isMicroBlog ? 'dark' : post.colorMode || 'theme'

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode, setTheme])

  if (isMicroBlog) {
    return (
      <GlobalLayout>
        <NextSeo
          title={`Patrick Marsceill: ${excerpt}`}
          description={`posted on ${format(parseISO(post.date), 'PPP')}`}
          openGraph={{
            title: post.title,
            description: post.description,
          }}
        />
        <article>
          <TwoColLayout isExtended>
            <Box>
              <Text
                css={{
                  display: 'inline-block',
                  fontSize: '$0',
                  mr: '$3',
                  ml: '$0',

                  '@3': {
                    display: 'block',
                    fontSize: '$3',
                    mr: '$0',
                    ml: '$0',
                  },
                }}
              >
                ⌘
              </Text>
              <Text
                as="time"
                css={{
                  fontSize: '$0',
                  color: '$secondary',
                  fontFamily: '$body',
                  mt: '$1',
                  mb: '$3',
                  display: 'inline-block',

                  '@3': {
                    display: 'block',
                  },
                }}
              >
                {format(parseISO(post.date), 'PP')}
                <Text
                  as="span"
                  css={{
                    fontFamily: '$monospace',
                    ml: '$1',

                    '@3': {
                      display: 'block',
                      ml: '$0',
                    },
                  }}
                >
                  {format(parseISO(post.date), 'p')}
                </Text>
              </Text>
            </Box>
            <Prose
              css={{
                backgroundColor: '$inset',
                px: '$5',
                py: '$3',
                borderRadius: '$3',

                '@3': {
                  px: '$6',
                  py: '$5',
                },
              }}
              type="microblog"
            >
              <MDXRemote {...content} />
            </Prose>
            <AncillaryNav />
          </TwoColLayout>
          <Box
            as="footer"
            css={{ mt: '$6', borderTop: '1px solid', borderColor: '$muted' }}
          >
            <PostNav next={nextPost} previous={previousPost} />
          </Box>
        </article>
      </GlobalLayout>
    )
  } else {
    return (
      <GlobalLayout>
        {post.frontmatter.featuredImage ? (
          <NextSeo
            title={`${post.title} — This Modern Web`}
            description={
              post.description || 'the personal website of Patrick Marsceill'
            }
            openGraph={{
              title: post.title,
              description: post.description,
              images: [
                {
                  url: `https://thismodernweb.com${post.frontmatter.featuredImage}`,
                  alt: post.title,
                },
              ],
            }}
          />
        ) : (
          <NextSeo
            title={`${post.title} — This Modern Web`}
            description={
              post.description || 'the personal website of Patrick Marsceill'
            }
            openGraph={{
              title: post.title,
              description: post.description,
            }}
          />
        )}
        <article>
          <Box
            as="header"
            css={{
              mb: '$3',
              maxWidth: '420px',
              lineHeight: '$heading',

              '@1': {
                maxWidth: '640px',
                pr: '$5',
              },
              '@3': {
                maxWidth: '720px',
                mb: '$6',
                pr: '$0',
              },
            }}
          >
            {post.title ? (
              <Heading
                as="h1"
                css={{
                  fontSize: '$5',
                  display: 'inline',
                  color: '$primary',
                  fontWeight: '$heading',
                  mr: '$2',

                  '@1': {
                    fontSize: '$6',
                  },
                  '@2': {
                    fontSize: '$7',
                  },
                }}
              >
                {post.title}
              </Heading>
            ) : null}
            {post.description ? (
              <Heading
                as="h2"
                css={{
                  fontSize: '$5',
                  color: '$secondary',
                  display: 'inline',
                  fontWeight: '$heading',

                  '@1': {
                    fontSize: '$6',
                  },
                  '@2': {
                    fontSize: '$7',
                  },
                }}
              >
                {post.description}
              </Heading>
            ) : null}
          </Box>
          <TwoColLayout isExtended>
            <Box>
              <Text
                as="time"
                css={{
                  fontSize: '$0',
                  color: '$secondary',
                  fontFamily: '$body',
                  mt: '$1',
                }}
              >
                {format(parseISO(post.date), 'PPP')}
              </Text>
            </Box>
            <Box
              as="section"
              css={{
                pt: '$5',

                '@3': {
                  pt: '$0',
                },
              }}
            >
              <Prose type="longform">
                {currentYear - postYear >= 3 && (
                  <TimeWarning currentYear={currentYear} postYear={postYear} />
                )}
                <MDXRemote {...content} components={components} />
              </Prose>
            </Box>
            <Box as="aside">
              <AncillaryNav />
            </Box>
          </TwoColLayout>
          <Box
            as="footer"
            css={{ mt: '$6', borderTop: '1px solid', borderColor: '$muted' }}
          >
            <PostNav next={nextPost} previous={previousPost} />
          </Box>
        </article>
      </GlobalLayout>
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
    mdxOptions: {
      remarkPlugins: [remarkUnwrapImages, remarkSmartypants],
      rehypePlugins: [rehypePrism, imageMetadata as any],
    },
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
