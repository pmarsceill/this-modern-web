import convert from 'xml-js'

const OKU_RSS = 'https://oku.club/rss/collection/dQhax'

const getReadBooks = () => {
  return fetch(OKU_RSS, {})
}

const getBookImage = async (url: string) => {
  const res = await fetch(url, {})

  const html = await res.text()
}

const ReadBooks = async (_: any, res: any) => {
  const response = await getReadBooks()

  if (response.status === 401) {
    return res.status(401).json({
      response,
    })
  } else if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ items: { error: 'No read books' } })
  }

  const responseXml = await response.text()

  const responseJson = JSON.parse(
    convert.xml2json(responseXml, {
      compact: true,
      spaces: 2,
    })
  )

  return res.status(200).json({
    books: [
      ...responseJson.rss.channel.item.map((item: any) => {
        getBookImage(item.link._text)
        return {
          title: item.title._text,
          link: item.link._text,
          description: item.description._text,
          pubDate: item.pubDate._text,
          author: item['dc:creator']._text,
          imageUrl: '',
        }
      }),
    ],
    items: responseJson.rss.channel.item,
  })
}

export default ReadBooks
