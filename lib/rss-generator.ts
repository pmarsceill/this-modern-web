import { Feed } from 'feed'
import PostType from '../types/post'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

const generateRSSFeed = (posts: { post: PostType; html: string }[]) => {
  const baseUrl = 'https://thismodernweb.com'
  const author = {
    name: 'Patrick Marsceill',
    email: 'patrick@thismodernweb.com',
    link: 'https://twitter.com/pmarsceill',
  }

  // Construct a new Feed object
  const feed = new Feed({
    title: 'All posts',
    description: 'All posts from thismodernweb.com',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    copyright: `${new Date().getFullYear()} - Patrick Marsceill`,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  })

  // Add each article to the feed
  posts.forEach((item) => {
    const { title, date, description, year, month, day, slug } = item.post
    const url = `${baseUrl}/${year}/${month}/${day}/${slug}`
    const html = item.html

    feed.addItem({
      title: title || '',
      id: url,
      link: url,
      description: description || '',
      content: html,
      author: [author],
      date: new Date(date),
    })
  })

  // Write the RSS output to a public file
  fs.writeFileSync('public/rss.xml', feed.rss2())
}

export default generateRSSFeed
