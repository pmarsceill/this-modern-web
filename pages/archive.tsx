import { GetStaticProps, NextPage } from 'next'
import { format, parseISO } from 'date-fns'

import Link from 'next/link'
import PostType from '../types/post'
import { getAllPosts } from '../lib/posts'

type Props = {
  posts: PostType[]
}

const Archive = ({ posts }: Props) => {
  return (
    <div>
      <h1>Archive</h1>
      {posts.map((post) => (
        <article key={post.slug} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date), 'MMMM dd, yyyy')}
          </p>
          <h1 className="mb-2 text-xl">
            <Link
              as={`/${post.year}/${post.month}/${post.day}/${post.slug}`}
              href={`/[year]/[month]/[day]/[slug]`}
            >
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h1>
          <p className="mb-3">{post.description}</p>
        </article>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts('asc')

  return {
    props: { posts },
  }
}

export default Archive
