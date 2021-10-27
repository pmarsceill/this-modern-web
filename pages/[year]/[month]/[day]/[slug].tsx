/** @jsxImportSource theme-ui */

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import MdxImage, {
  ImageRow,
  LargeImage,
  SmallImage,
} from '../../../../components/mdx-image'
import { format, parseISO } from 'date-fns'
import {
  getAllPosts,
  getNextPost,
  getPostBySlug,
  getPreviousPost,
} from '../../../../lib/posts'

import AncillaryNav from '../../../../components/ancillary-nav'
import Button from '../../../../components/button'
import GlobalLayout from '../../../../components/global/global-layout'
import { NextPage } from 'next'
import PostNav from '../../../../components/post-nav'
import PostType from '../../../../types/post'
import { Themed } from '@theme-ui/mdx'
import TwoColLayout from '../../../../components/two-col-layout'
import Video from '../../../../components/video'
import imageMetadata from '../../../../lib/image-metadata'
import mdxPrism from 'mdx-prism'
import remarkUnwrapImages from 'remark-unwrap-images'
import { serialize } from 'next-mdx-remote/serialize'
import { useColorMode } from '@theme-ui/color-modes'
import { useState } from 'react'

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
  const postColorMode = post.colorMode || 'light'

  setColorMode(postColorMode)

  const [showSideTitle, setShowSideTitle] = useState(false)
  const currentYear = new Date().getFullYear()
  const postYear = parseInt(post.year)

  if (post.tags?.includes('microblog')) {
    return (
      <>
        <MDXRemote {...content} />
      </>
    )
  } else {
    return (
      <GlobalLayout>
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
            <section sx={{ pt: ['', 4, 0, 0] }}>
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
      rehypePlugins: [mdxPrism, imageMetadata],
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
