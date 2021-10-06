import matter from 'gray-matter'
import { parseISO, format } from 'date-fns'
import fs from 'fs'
import { join } from 'path'
import Error from 'next/error'

// Add markdown files in `src/content/blog`
const postsDirectory = join(process.cwd(), 'content', 'blog')
const microPostsDirectory = join(process.cwd(), 'content', 'microblog')

export function getPostBySlug(slug) {
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
  } finally {
    ;<Error code={404} />
  }

  const { data, content } = matter(fileContents)
  const date = data.date
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
  }
}

export function getAllPosts() {
  const microSlugs = fs.readdirSync(microPostsDirectory)
  const postSlugs = fs.readdirSync(postsDirectory)

  const slugs = postSlugs.concat(microSlugs)
  const posts = slugs.map((slug) => getPostBySlug(slug))

  return posts
}
