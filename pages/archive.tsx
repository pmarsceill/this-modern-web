import { format, parseISO } from 'date-fns'
import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { createRef, useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Box from '../components/primitives/box'
import Heading from '../components/primitives/heading'
import Prose from '../components/primitives/prose'
import Text from '../components/primitives/text'
import { getPostsByType } from '../lib/posts'
import { PostType } from '../lib/types'

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
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowX: 'scroll',
        scrollBehavior: 'smooth',

        '@2': {
          flexDirection: 'row',
          scrollSnapType: 'x mandatory',
          borderBottom: '1px solid',
          borderColor: '$muted',
        },
      }}
      ref={scrollRef}
    >
      {postsByYear.map((months, year) => (
        <Box key={year} css={{ mx: '$0', '@2': { mx: '$4' } }}>
          <Heading
            as="h2"
            css={{
              fontFamily: '$heading',
              letterSpacing: '$heading',
              fontSize: '$1',
              color: '$secondary',
              mb: '$5',

              '@2': {
                mb: '$4',
                px: '$3',
              },
            }}
          >
            {year}
          </Heading>
          <Box
            as="ul"
            css={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column-reverse',

              '@2': {
                flexDirection: 'row',
              },
            }}
          >
            {months.reverse().map((month: string) => (
              <Box
                as="li"
                key={year + month}
                css={{
                  flexShrink: '0',

                  '@2': {
                    width: '320px',
                    px: '$3',
                    scrollSnapAlign: 'start',
                  },
                }}
              >
                <Heading
                  css={{
                    fontSize: '$1',
                    color: '$secondary',
                    borderBottom: '2px solid',
                    borderColor: '$muted',
                    py: '$3',
                    mb: '$4',
                    fontWeight: 'normal',
                    display: 'none',

                    '@2': {
                      display: 'block',
                    },
                  }}
                >
                  {month}
                </Heading>
                <Box as="ul" css={{ listStyle: 'none' }}>
                  {posts.map((post) =>
                    post.year === year.toString() &&
                    format(parseISO(post.date), 'MMMM') === month ? (
                      <Box
                        as="li"
                        key={post.slug}
                        css={{
                          mb: '$5',
                          pb: '$5',
                          borderBottom: '1px solid',
                          borderColor: '$muted',

                          '@2': {
                            mb: '$4',
                            pb: '$4',
                          },
                        }}
                      >
                        {post.mdxContent ? (
                          <Prose
                            css={{
                              fontFamily: 'monospace',
                              fontSize: '$1',

                              '@2': {
                                fontSize: '$0',
                              },
                            }}
                          >
                            <MDXRemote {...post.mdxContent} />
                            <Text
                              as="time"
                              css={{
                                display: 'block',
                                fontSize: 0,
                                color: '$secondary',
                                fontFamily: '$body',
                                mt: '$2',
                              }}
                            >
                              {format(parseISO(post.date), 'MMMM dd')}
                            </Text>
                          </Prose>
                        ) : (
                          <>
                            <Link
                              href={`${post.year}/${post.month}/${post.day}/${post.slug}`}
                              passHref
                            >
                              <Heading
                                as="a"
                                css={{
                                  color: '$primary',
                                  display: 'inline',
                                  fontSize: '$4',
                                }}
                              >
                                {post.title}
                                {post.description && (
                                  <Text
                                    css={{
                                      color: '$secondary',
                                      ml: '$2',
                                    }}
                                  >
                                    {post.description}
                                  </Text>
                                )}
                              </Heading>
                            </Link>
                            <Text
                              as="time"
                              css={{
                                display: 'block',
                                fontSize: '$0',
                                color: '$secondary',
                                fontFamily: '$body',
                                mt: '$2',
                              }}
                            >
                              {format(parseISO(post.date), 'MMMM dd')}
                            </Text>
                          </>
                        )}
                      </Box>
                    ) : null
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const Archive: NextPage<Props> = ({
  currentPosts,
  legacyPosts,
  microBlogs,
}) => {
  useEffect(() => {
    scroll('today')
    smoothscroll.polyfill()
  }, [])

  return (
    <GlobalLayout fullWidth>
      <NextSeo title="Everything Archive — This Modern Web" />
      <Box
        css={{
          position: 'static',
          top: '0px',
          py: '$3',
          backgroundBlendMode: 'overlay',
          backdropFilter: 'blur(10px)',
          zIndex: '$3',
          mb: '$5',

          '@2': {
            position: 'sticky',
            mb: '$6',
          },
        }}
      >
        <Box
          css={{
            maxWidth: '$container',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',

            '@2': {
              px: '$7',
            },
            '@3': {
              px: '$5',
            },
          }}
        >
          <Heading context="pageHeading" css={{ flex: 'auto', mb: '$0' }}>
            Everything archive
          </Heading>
          <Box
            css={{
              display: 'none',
              flexItems: 'center',
              flexGrow: 0,

              '@2': {
                display: 'flex',
              },
            }}
          >
            <Button
              variant="outline"
              onClick={() => {
                scroll('left')
              }}
              css={{ mr: '$2', py: '$3', flexGrow: '0', cursor: 'pointer' }}
            >
              ←
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                scroll('right')
              }}
              css={{ py: '$3', flexGrow: '0', cursor: 'pointer' }}
            >
              →
            </Button>
          </Box>
        </Box>
      </Box>
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
