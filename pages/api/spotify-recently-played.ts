import TrackType from '../../types/track'
import querystring from 'querystring'
const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

type RecentlyPlayedType = {
  track: TrackType
  played_at: string
}

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken()

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const recentlyPlayed = async (_: any, res: any) => {
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

  return res.status(200).json({
    tracks: items.map(({ track, played_at }: RecentlyPlayedType) => ({
      track: {
        name: track.name,
        id: track.id,
        played_at: played_at,
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
