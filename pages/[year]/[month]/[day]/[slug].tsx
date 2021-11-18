/** @jsxImportSource theme-ui */

import { useColorMode } from '@theme-ui/color-modes'
import { Themed } from '@theme-ui/mdx'
import { format, parseISO } from 'date-fns'
import { NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import rehypePrism from 'rehype-prism-plus'
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
      <p sx={{ mt: 0, mb: '1em' }}>
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
      </p>
      <p sx={{ m: 0 }}>
        <em>
          Thanks,
          <br />
          Patrick
        </em>
      </p>
      <Themed.hr />
    </>
  )
}

const Post: NextPage<PostProps> = ({
  post,
  content,
  nextPost,
  previousPost,
}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [showSideTitle, setShowSideTitle] = useState(false)
  const currentYear = new Date().getFullYear()
  const postYear = parseInt(post.year)
  const contentString = removeMd(post.content)
  const exerpt = contentString.substring(0, Math.min(contentString.length, 160))

  if (post.tags?.includes('microblog')) {
    const postColorMode = 'dark'
    setColorMode(postColorMode)
    return (
      <GlobalLayout>
        <NextSeo
          title={`Patrick Marsceill: ${exerpt}`}
          description={`posted on ${format(parseISO(post.date), 'PPP')}`}
          openGraph={{
            title: post.title,
            description: post.description,
          }}
        />
        <article>
          <TwoColLayout isExtended>
            <div>
              <span
                sx={{
                  display: ['inline-block', '', '', 'block'],
                  fontSize: [0, '', '', 3],
                  mr: [3, '', '', 0],
                  ml: [1, '', '', 0],
                }}
              >
                ⌘
              </span>
              <time
                sx={{
                  fontSize: 0,
                  color: 'secondary',
                  fontFamily: 'body',
                  mt: 1,
                  mb: 3,
                  display: ['inline-block', '', '', 'block'],
                }}
              >
                {format(parseISO(post.date), 'PP')}
                <span
                  sx={{
                    display: ['', '', '', 'block'],
                    fontFamily: 'monospace',
                    ml: [1, '', '', 0],
                  }}
                >
                  {format(parseISO(post.date), 'p')}
                </span>
              </time>
            </div>
            <div
              sx={{
                backgroundColor: 'inset',
                px: [5, '', '', 6],
                py: [3, '', '', 5],
                borderRadius: 3,
                fontFamily: 'monospace',
                fontSize: 1,
              }}
              className="prose"
            >
              <MDXRemote {...content} />
            </div>
            <AncillaryNav />
          </TwoColLayout>
          <footer sx={{ mt: 6, borderTop: '1px solid', borderColor: 'muted' }}>
            <PostNav next={nextPost} previous={previousPost} />
          </footer>
        </article>
      </GlobalLayout>
    )
  } else {
    const postColorMode = post.colorMode || 'light'
    setColorMode(postColorMode)
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
          <header
            sx={{
              mb: [5, '', 6],
              maxWidth: ['420px', '100%', '720px'],
              pr: ['', 5, 0, 0],
            }}
          >
            {post.title ? (
              <h1
                sx={{
                  fontFamily: 'heading',
                  fontSize: [5, 6, 7],
                  display: 'inline',
                  color: 'primary',
                  letterSpacing: 'heading',
                  lineHeight: 'heading',
                  mr: 2,
                }}
              >
                {post.title}
              </h1>
            ) : null}
            {post.description ? (
              <h2
                sx={{
                  fontFamily: 'heading',
                  fontSize: [5, 6, 7],
                  fontWeight: 'bold',
                  color: 'secondary',
                  display: 'inline',
                  letterSpacing: 'heading',
                  lineHeight: 'heading',
                }}
              >
                {post.description}
              </h2>
            ) : null}
          </header>
          <TwoColLayout isExtended>
            <div>
              <time
                sx={{
                  fontSize: 0,
                  color: 'secondary',
                  fontFamily: 'body',
                  mt: 1,
                }}
              >
                {format(parseISO(post.date), 'PPP')}
              </time>
            </div>
            <section
              sx={{
                pt: [4, '', '', 0],
              }}
            >
              <div sx={{ '> p:first-of-type': { mt: 0 } }} className="prose">
                {currentYear - postYear >= 3 && (
                  <TimeWarning currentYear={currentYear} postYear={postYear} />
                )}
                <MDXRemote {...content} components={components} />
              </div>
            </section>
            <aside>
              <AncillaryNav />
            </aside>
          </TwoColLayout>
          <footer sx={{ mt: 6, borderTop: '1px solid', borderColor: 'muted' }}>
            <PostNav next={nextPost} previous={previousPost} />
          </footer>
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
      remarkPlugins: [remarkUnwrapImages],
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
