type PostType = {
  slug: string
  title?: string
  month: string
  year: string
  day: string
  description?: string
  tags?: [string]
  content: string
  date: string
  frontmatter: {
    [key: string]: any
  }
}

export default PostType
