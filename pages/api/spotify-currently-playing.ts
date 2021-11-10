import TrackType from '../../types/track'
import querystring from 'querystring'
const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const CURRENTLY_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
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

const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const currentlyPlaying = async (_: any, res: any) => {
  const response = await getCurrentlyPlaying()

  if (response.status === 401) {
    return res.status(401).json({
      error: 'Unauthorized',
    })
  } else if (response.status === 204 || response.status > 400) {
    return res.status(200).json({
      is_playing: false,
    })
  }

  const data = await response.json()

  return res.status(200).json({
    is_playing: true,
    track: data.item,
  })
}

export default currentlyPlaying
