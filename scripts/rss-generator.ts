import { Feed } from 'feed'
import fs from 'fs'
import { PostType } from '../lib/types'

const generateRSSFeed = (posts: { post: PostType; html: string }[]) => {
  const baseUrl = 'https://thismodernweb.com'
  const author = {
    name: 'Patrick Marsceill',
    email: 'patrick@thismodernweb.com',
    link: 'https://thismodernweb.com',
  }

  const feed = new Feed({
    title: 'This Modern Web',
    description: 'The personal website of Patrick Marsceill',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} - Patrick Marsceill`,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  })

  const microblogFeed = new Feed({
    title: 'This Modern Web',
    description: 'The personal website of Patrick Marsceill',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} - Patrick Marsceill`,
    feedLinks: {
      rss2: `${baseUrl}/microblog.xml`,
      JSON: `${baseUrl}/microblog.json`,
    },
    author,
  })

  posts.forEach(async (item) => {
    const { title, utcDate, date, description, year, month, day, slug, tags } =
      item.post
    const url = `${baseUrl}/${year}/${month}/${day}/${slug}`
    const html = item.html
    const hasTitle = title && utcDate !== title

    feed.addItem({
      title: hasTitle ? title : '',
      id: url,
      link: url,
      description: description || '',
      content: html,
      author: [{ name: author.name }],
      date: new Date(date),
    })

    if (tags && tags.includes('microblog')) {
      microblogFeed.addItem({
        title: '',
        id: url,
        link: url,
        description: description || '',
        content: html,
        author: [{ name: author.name }],
        date: new Date(date),
      })
    }
  })

  fs.writeFileSync(`public/rss.xml`, feed.rss2())
  fs.writeFileSync(`public/feed.json`, feed.json1())
  fs.writeFileSync(`public/microblog.xml`, microblogFeed.rss2())
}

export default generateRSSFeed
