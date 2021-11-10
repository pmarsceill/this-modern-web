/** @jsxImportSource theme-ui */

import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { createRef, useEffect } from 'react'
import { format, parseISO } from 'date-fns'

import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import PostType from '../types/post'
import { alpha } from '@theme-ui/color'
import { getPostsByType } from '../lib/posts'
import { serialize } from 'next-mdx-remote/serialize'
import smoothscroll from 'smoothscroll-polyfill'
import { useColorMode } from 'theme-ui'

type PostsByMonthPerYearProps = {
  currentPosts: PostType[]
  legacyPosts: PostType[]
  microBlogs: PostWithContentType[]
  scrollRef: React.RefObject<HTMLDivElement>
}

interface PostWithContentType extends PostType {
  mdxContent?: MDXRemoteSerializeResult
}

type Props = {
  currentPosts: PostType[]
  legacyPosts: PostType[]
  microBlogs: PostWithContentType[]
}

const scrollContainer = createRef<HTMLDivElement>()

const scroll = (direction: 'left' | 'right' | 'today') => {
  console.log('scroll', direction)
  if (scrollContainer.current) {
    if (direction === 'left') {
      scrollContainer.current.scrollBy({
        top: 0,
        left: -300,
        behavior: 'smooth',
      })
    } else if (direction === 'right') {
      scrollContainer.current.scrollBy({
        top: 0,
        left: +300,
        behavior: 'smooth',
      })
    } else if (direction === 'today') {
      scrollContainer.current.scrollTo({
        top: 0,
        left: +999999,
        behavior: 'smooth',
      })
    }
  }
}

const PostsByMonthsPerYear = ({
  currentPosts,
  legacyPosts,
  microBlogs,
  scrollRef,
}: PostsByMonthPerYearProps) => {
  const postsByYear: any[] = []

  const posts = [
    ...microBlogs,
    ...legacyPosts,
    ...currentPosts,
  ] as PostWithContentType[]

  posts.sort((a, b) => {
    return parseISO(b.date).getTime() - parseISO(a.date).getTime()
  })

  posts.forEach((post) => {
    const year = parseInt(format(parseISO(post.date), 'yyyy'))
    const month = format(parseISO(post.date), 'MMMM')

    if (!postsByYear[year]) {
      postsByYear[year] = []
    }

    if (!postsByYear[year].includes(month)) {
      postsByYear[year].push(month)
    }
  })

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: ['column-reverse', 'column-reverse', 'row'],
        overflowX: 'scroll',
        scrollSnapType: ['', '', 'x mandatory'],
        scrollBehavior: 'smooth',
        borderBottom: ['', '', '1px solid'],
        borderColor: ['', '', 'muted'],
      }}
      ref={scrollRef}
    >
      {postsByYear.map((months, year) => (
        <div key={year} sx={{ mx: ['', '', '4'] }}>
          <h2
            sx={{
              fontFamily: 'heading',
              letterSpacing: 'heading',
              fontSize: '1',
              color: 'secondary',
              mb: [5, '', 4],
              px: ['', '', 3],
            }}
          >
            {year}
          </h2>
          <ul
            sx={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: ['column-reverse', 'column-reverse', 'row'],
            }}
          >
            {months.reverse().map((month: string) => (
              <li
                key={year + month}
                sx={{
                  width: ['', '', '320px'],
                  flexShrink: 0,
                  px: ['', '', 3],
                  scrollSnapAlign: ['', '', 'start'],
                }}
              >
                <h3
                  sx={{
                    fontFamily: 'heading',
                    letterSpacing: 'heading',
                    fontSize: '1',
                    color: 'secondary',
                    borderBottom: '2px solid',
                    borderColor: 'muted',
                    py: '3',
                    mb: [5, '', 4],
                    fontWeight: 'normal',
                    display: ['none', '', 'block'],
                  }}
                >
                  {month}
                </h3>
                <ul sx={{ listStyle: 'none' }}>
                  {posts.map((post) =>
                    post.year === year.toString() &&
                    format(parseISO(post.date), 'MMMM') === month ? (
                      <li
                        key={post.slug}
                        sx={{
                          mb: ['5', '', '4'],
                          pb: ['5', '', '4'],
                          borderBottom: '1px solid',
                          borderColor: 'muted',
                        }}
                      >
                        {post.mdxContent ? (
                          <div
                            sx={{
                              fontFamily: 'monospace',
                              fontSize: 0,
                              lineHeight: 'content',
                            }}
                          >
                            <MDXRemote {...post.mdxContent} />
                            <time
                              sx={{
                                display: 'block',
                                fontSize: 0,
                                color: 'secondary',
                                fontFamily: 'body',
                                mt: 2,
                              }}
                            >
                              {format(parseISO(post.date), 'MMMM dd')}
                            </time>
                          </div>
                        ) : (
                          <>
                            <Link
                              href={`${post.year}/${post.month}/${post.day}/${post.slug}`}
                              passHref
                            >
                              <a
                                sx={{
                                  display: 'inline',
                                  fontFamily: 'heading',
                                  fontSize: [4],
                                  letterSpacing: 'heading',
                                  lineHeight: 'heading',
                                  fontWeight: 'heading',
                                }}
                              >
                                {post.title}
                                {post.description && (
                                  <span
                                    sx={{
                                      fontFamily: 'heading',
                                      display: 'inline',
                                      fontSize: [4],
                                      color: 'secondary',
                                      fontWeight: 'bold',
                                      letterSpacing: 'heading',
                                      lineHeight: 'heading',
                                      ml: 2,
                                    }}
                                  >
                                    {post.description}
                                  </span>
                                )}
                              </a>
                            </Link>
                            <time
                              sx={{
                                display: 'block',
                                fontSize: 0,
                                color: 'secondary',
                                fontFamily: 'body',
                                mt: 2,
                              }}
                            >
                              {format(parseISO(post.date), 'MMMM dd')}
                            </time>
                          </>
                        )}
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const Archive: NextPage<Props> = ({
  currentPosts,
  legacyPosts,
  microBlogs,
}) => {
  const [colorMode, setColorMode] = useColorMode()
  setColorMode('dark')

  useEffect(() => {
    scroll('today')
    smoothscroll.polyfill()
  }, [])

  return (
    <GlobalLayout fullWidth>
      <NextSeo title="Everything Archive — This Modern Web" />
      <div
        sx={{
          position: ['static', 'static', 'sticky'],
          top: 0,
          py: 3,
          background: () => `${alpha('background', 0.55)}`,
          backgroundBlendMode: 'overlay',
          backdropFilter: 'blur(10px)',
          zIndex: 3,
          mb: [5, '', 6],
        }}
      >
        <div
          sx={{
            maxWidth: 'container',
            mx: 'auto',
            px: ['', '', 7, 5],
            display: 'flex',
          }}
        >
          <h1
            sx={{
              fontSize: [6, 7],
              letterSpacing: 'heading',
              lineHeight: 'heading',
              flex: 'auto',
              fontWeight: 'normal',
              fontStyle: 'italic',
            }}
          >
            Everything archive
          </h1>
          <div
            sx={{
              display: ['none', 'none', 'flex'],
              flexItems: 'center',
              flexGrow: 0,
            }}
          >
            <Button
              variant="outline"
              onClick={() => {
                scroll('left')
              }}
              sx={{ mr: 2, flexGrow: 0, cursor: 'pointer' }}
            >
              ←
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                scroll('right')
              }}
              sx={{ flexGrow: 0, cursor: 'pointer' }}
            >
              →
            </Button>
          </div>
        </div>
      </div>
      <PostsByMonthsPerYear
        currentPosts={currentPosts}
        legacyPosts={legacyPosts}
        microBlogs={microBlogs}
        scrollRef={scrollContainer}
      />
    </GlobalLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const currentPosts = getPostsByType('current')
  const legacyPosts = getPostsByType('legacy')
  const microBlogs = getPostsByType('microblog') || []

  const microBlogsWithContent = microBlogs.map(async (post) => {
    const mdxContent = await serialize(post.content)
    return { mdxContent: mdxContent, ...post }
  })

  const microBlogsWithContentResolved = await Promise.all(microBlogsWithContent)

  return {
    props: {
      microBlogs: microBlogsWithContentResolved,
      currentPosts,
      legacyPosts,
    },
  }
}

export default Archive
