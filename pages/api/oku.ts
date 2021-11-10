import convert from 'xml-js'
import sharp from 'sharp'

const OKU_RSS = 'https://oku.club/rss/collection/dQhax'
const OPEN_LIBRARY_SEARCH_ENDPOINT = 'https://openlibrary.org/search.json'
const OPEN_LIBRARY_COVER_IMAGE_ENDPOINT = 'https://covers.openlibrary.org/b/id/'

const getReadBooks = () => {
  return fetch(OKU_RSS, {})
}

const getBookImage = async (title: string, author: string) => {
  console.log('author match', author)
  const searchQuery = `${OPEN_LIBRARY_SEARCH_ENDPOINT}?title=${encodeURIComponent(
    title
  )}&author=${encodeURIComponent(author)}&limit=4`
  const searchResults = await fetch(searchQuery, {})

  if (searchResults.status != 200) {
    return ''
  }

  const searchResultsJson = await searchResults.json()
  if (!searchResultsJson.docs) return ''

  const coverImageUrl = `${OPEN_LIBRARY_COVER_IMAGE_ENDPOINT}${
    searchResultsJson.docs[2]?.cover_i || searchResultsJson.docs[0]?.cover_i
  }.jpg`

  return coverImageUrl
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

  const books = responseJson.rss.channel.item.map(async (item: any) => {
    const title = item.title._text
    const author = item['dc:creator']._text
    const description = item.description._text
    const readDate = item.pubDate._text
    const link = item.link._text
    const coverImageUrl = (await getBookImage(title, author)) || ''

    return {
      title,
      link,
      coverImageUrl,
      author,
      readDate,
      description,
    }
  })

  const booksWithCoverImages = await Promise.all(books)

  return res.status(200).json({
    books: booksWithCoverImages,
    items: responseJson.rss.channel.item,
  })
}

export default ReadBooks
