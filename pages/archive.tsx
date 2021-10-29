/** @jsxImportSource theme-ui */

import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { format, parseISO } from 'date-fns'
import { getAllPosts, getPostsByType } from '../lib/posts'

import GlobalLayout from '../components/global/global-layout'
import Link from 'next/link'
import PostType from '../types/post'
import { serialize } from 'next-mdx-remote/serialize'

type PostsByMonthPerYearProps = {
  currentPosts: PostType[]
  legacyPosts: PostType[]
  microBlogs: PostWithContentType[]
}

interface PostWithContentType extends PostType {
  mdxContent?: MDXRemoteSerializeResult
}

type Props = {
  currentPosts: PostType[]
  legacyPosts: PostType[]
  microBlogs: PostWithContentType[]
}

const PostsByMonthsPerYear = ({
  currentPosts,
  legacyPosts,
  microBlogs,
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
    <div sx={{ display: ['', '', 'flex'], overflowX: 'scroll' }}>
      {postsByYear.map((months, year) => (
        <div key={year} sx={{ mx: ['', '', '4'] }}>
          <h2
            sx={{
              fontFamily: 'heading',
              letterSpacing: 'heading',
              fontSize: '1',
              color: 'secondary',
              mb: [5, '', 4],
              mx: ['', '', 3],
            }}
          >
            {year}
          </h2>
          <ul sx={{ listStyle: 'none', display: ['', '', 'flex'] }}>
            {months.reverse().map((month: string) => (
              <li
                key={year + month}
                sx={{
                  width: ['', '', '320px'],
                  flexShrink: 0,
                  mx: ['', '', 3],
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
  return (
    <GlobalLayout fullWidth>
      <div
        sx={{
          maxWidth: 'container',
          mx: 'auto',
          px: ['', '', 7, 5],
        }}
      >
        <h1
          sx={{
            fontFamily: 'heading',
            fontSize: [5, 6, 7],
            letterSpacing: 'heading',
            lineHeight: 'heading',
            mb: [5, '', 6],
          }}
        >
          Everything archive
        </h1>
      </div>
      <PostsByMonthsPerYear
        currentPosts={currentPosts}
        legacyPosts={legacyPosts}
        microBlogs={microBlogs}
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
