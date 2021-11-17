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
  utcDate: string
  frontmatter: {
    [key: string]: any
  }
  colorMode?: string
}

export default PostType
