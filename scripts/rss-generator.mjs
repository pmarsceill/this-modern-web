import * as runtime from 'react/jsx-runtime.js'

import { compile, run } from '@mdx-js/mdx'

import { Feed } from 'feed'
import React from 'react'
import ReactDOMServer from 'react-dom/server.js'
import { allDocuments } from '.contentlayer/data'
import fs from 'fs'
import { rssComponents } from '../components/js-components/mdx-components.mjs'

const generateRSSFeed = (posts) => {
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
    const { title, date, year, month, day, slug } = item
    const url = `${baseUrl}/${year}/${month}/${day}/${slug}`
    const description = item.type === 'Post' ? item.description || null : null

    // TODO convert item.body.code to html
    // const html = <MDXProvider>{item.body.raw}</MDXProvider>

    async function mdxToHtml(mdx) {
      const code = String(await compile(mdx, { outputFormat: 'function-body' }))
      console.log(code)
      const { default: Content } = await run(code, runtime)

      return ReactDOMServer.renderToStaticMarkup(
        React.createElement(Content, { components: rssComponents })
      )
    }

    const test = await mdxToHtml(item.body.raw)

    console.log(test)

    const html = ''

    feed.addItem({
      title: title || '',
      id: url,
      link: url,
      description: description || '',
      content: html,
      author: [{ name: author.name }],
      date: new Date(date),
    })

    if (item.type === 'MicroBlog') {
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

const allItems = allDocuments.sort((a, b) => {
  return Number(new Date(b.date)) - Number(new Date(a.date))
})

generateRSSFeed(allItems)
