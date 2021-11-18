export type PostType = {
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

export type TrackType = {
  album: {
    name: string
    images: [
      {
        url: string
        height: number
        width: number
      }
    ]
  }
  artists: [
    {
      name: string
    }
  ]
  name: string
  id: string
  playedAt: string
}
