import { format, parseISO } from 'date-fns'

import PostType from '../types/post'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// Add markdown files in `src/content/blog`
const postsDirectory = join(process.cwd(), 'content', 'blog')
const microPostsDirectory = join(process.cwd(), 'content', 'microblog')

export function getPostBySlug(slug: string) {
  const filename = `${slug.replace(/\.md$/, '')}`
  const filenameArray = slug.replace(/\.md$/, '').split('-')

  filenameArray.splice(0, 3)

  const realSlug = filenameArray.join('-')

  const blogPath = join(postsDirectory, `${filename}.md`)
  const microblogPath = join(microPostsDirectory, `${filename}.md`)

  let fileContents
  try {
    fileContents = fs.readFileSync(blogPath, 'utf-8')
  } catch {
    fileContents = fs.readFileSync(microblogPath, 'utf-8')
  }

  const { data, content } = matter(fileContents)
  const date = data.date as string
  const title = data.title || null
  const tags = data.tags
  const description = data.description || null
  const postYear = format(parseISO(date), 'yyyy')
  const postMonth = format(parseISO(date), 'MM')
  const postDay = format(parseISO(date), 'dd')

  return {
    slug: realSlug,
    content,
    title,
    year: postYear,
    month: postMonth,
    day: postDay,
    description,
    date: date,
    tags,
    frontmatter: data,
  }
}

export function getAllPosts(sort = 'desc' || 'asc' || undefined) {
  const microSlugs = fs.readdirSync(microPostsDirectory)
  const postSlugs = fs.readdirSync(postsDirectory)

  const slugs = postSlugs.concat(microSlugs)
  const posts = slugs.map((slug) => getPostBySlug(slug))

  const postsByDate = posts.slice().sort((a: PostType, b: PostType) => {
    if (sort === 'desc') {
      return parseISO(b.date).getTime() - parseISO(a.date).getTime()
    } else {
      return parseISO(a.date).getTime() - parseISO(b.date).getTime()
    }
  })

  return postsByDate
}

export function getNextPost(slug: string) {
  const posts = getAllPosts('asc')
  const currentPostIndex = posts.findIndex((post) => post.slug === slug)
  const nextPost = posts[currentPostIndex + 1]

  if (nextPost) {
    return nextPost
  } else {
    return null
  }
}

export function getPreviousPost(slug: string) {
  const posts = getAllPosts('asc')
  const currentPostIndex = posts.findIndex((post) => post.slug === slug)
  const previousPost = posts[currentPostIndex - 1]

  if (previousPost) {
    return previousPost
  } else {
    return null
  }
}
