import { NextApiRequest, NextApiResponse } from 'next'
import { getRecentlyPlayed } from '../../lib/spotify'
import { TrackType } from '../../lib/types'

type RecentlyPlayedType = {
  track: TrackType
  played_at: string
}

const recentlyPlayed = async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await getRecentlyPlayed()

  if (response.status === 401) {
    return res.status(401).json({
      response,
    })
  } else if (response.status === 204 || response.status > 400) {
    return res
      .status(200)
      .json({ items: { error: 'No recently played tracks' } })
  }

  const { items } = await response.json()

  // Filter out duplicates tracks
  function uniqBy(a: [], key: any) {
    let seen = new Set()
    return a.filter((item) => {
      let k = key(item)
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const uniqueItems = uniqBy(
    items,
    (item: any) => item.track.id
  ) as RecentlyPlayedType[]

  return res.status(200).json({
    tracks: uniqueItems.map(({ track, played_at }: RecentlyPlayedType) => ({
      track: {
        name: track.name,
        id: track.id,
        playedAt: played_at,
        album: {
          name: track.album.name,
          images: track.album.images.map(({ url, height, width }) => ({
            url,
            height,
            width,
          })),
        },
        artists: track.artists.map(({ name }) => ({
          name,
        })),
      },
    })),
  })
}

export default recentlyPlayed
