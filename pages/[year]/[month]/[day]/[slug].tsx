import { format, parseISO } from 'date-fns'
import { NextPage } from 'next'
import { remark } from 'remark'
import html from 'remark-html'
import { getPostBySlug, getAllPosts } from '../../../../lib/posts'
import PostType from '../../../../types/post'

type Props = { post: PostType }

export default function Post({ post }: Props) {
  if (post.tags?.includes('microblog')) {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </>
    )
  } else {
    return (
      <>
        {post.title ? <h1>{post.title}</h1> : null}
        {post.description ? <span>{post.description}</span> : null}
        <time>{format(parseISO(post.date), 'PPP')}</time>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </>
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
  const markdown = await remark()
    .use(html)
    .process(post.content || '')
  const content = markdown.toString()

  return {
    props: {
      post: {
        ...post,
        content,
      },
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
