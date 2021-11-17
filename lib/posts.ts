import { format, parseISO } from 'date-fns'

import PostType from '../types/post'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

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

  // Offset the date because it's stored as UTC
  const realDate = new Date(
    parseISO(date).getTime() - parseISO(date).getTimezoneOffset() * 60000
  )
  const realDateString = realDate.toISOString()

  const title = data.title || null
  const tags = data.tags
  const description = data.description || null
  const postYear = format(realDate, 'yyyy')
  const postMonth = format(realDate, 'MM')
  const postDay = format(realDate, 'dd')
  const colorMode = data.colorMode || 'light'

  return {
    slug: realSlug,
    content,
    title,
    year: postYear,
    month: postMonth,
    day: postDay,
    description,
    date: realDateString,
    utcDate: date,
    tags,
    frontmatter: data,
    colorMode,
  }
}

export function getAllPosts(
  sort = 'desc' || 'asc' || undefined,
  limit?: number
) {
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

  if (limit) {
    return postsByDate.slice(0, limit)
  }

  return postsByDate
}

export function getPostsByType(type = 'current' || 'microblog' || 'legacy') {
  const posts = getAllPosts('desc')

  if (type === 'current') {
    const currentBlogPosts = posts.filter((post) => {
      return !post.tags.includes('legacy') && !post.tags.includes('microblog')
    })
    return currentBlogPosts
  } else if (type === 'microblog') {
    const microBlogPosts = posts.filter((post) => {
      return post.tags.includes('microblog')
    })
    return microBlogPosts
  } else if (type === 'legacy') {
    const legacyBlogPosts = posts.filter((post) => {
      return post.tags.includes('legacy')
    })
    return legacyBlogPosts
  } else {
    return null
  }
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
