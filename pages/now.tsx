/** @jsxImportSource theme-ui */

import AncillaryNav from '../components/ancillary-nav'
import GlobalLayout from '../components/global/global-layout'
import Image from 'next/image'
import Nav from '../components/nav'
import { NextPage } from 'next'
import { Themed } from '@theme-ui/mdx'
import TrackType from '../types/track'
import TwoColLayout from '../components/two-col-layout'
import format from 'date-fns/format'
import { parseISO } from 'date-fns'
import useSWR from 'swr'

const RecentlyPlayedTracks = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/spotify-recently-played', fetcher)

  if (error) return <div>Failed to load recently played tracks.</div>

  const tracks = data?.tracks

  return (
    <>
      <h2>Recently played on Spotify</h2>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: [
            '1fr 1fr',
            '1fr 1fr 1fr',
            '',
            '1fr 1fr 1fr 1fr',
          ],
          gridGap: 5,
        }}
      >
        {tracks &&
          tracks.map((item: { track: TrackType }, index: number) => {
            const track = item.track as TrackType

            return (
              <div key={track.id}>
                <div
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: ['60vw', '', '', '20vw'],
                    maxHeight: ['300px'],
                    justifyContent: 'flex-end',
                    overflow: 'visible',
                  }}
                >
                  <div
                    sx={{
                      borderRadius: '2px',
                      overflow: 'hidden',
                      bg: 'muted',
                      boxShadow:
                        '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
                    }}
                  >
                    <Image
                      src={track.album.images[0].url}
                      alt=""
                      objectFit="cover"
                      layout="responsive"
                      objectPosition="center"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
                <Themed.h3 sx={{ mt: 3, mb: 2 }}>
                  {track.name}
                  <span sx={{ color: 'secondary' }}>
                    {' '}
                    by {track.artists.map((artist) => artist.name).join(', ')}
                  </span>
                </Themed.h3>
                <p
                  sx={{
                    mt: 0,
                    fontSize: 0,
                    color: 'secondary',
                    fontFamily: 'body',
                  }}
                >
                  Played {format(parseISO(track.played_at), 'PPpp')}
                </p>
              </div>
            )
          })}
      </div>
    </>
  )
}

const CurrentlyPlayingTrack = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/spotify-currently-playing', fetcher)

  if (error) return <div>Failed to load currently playing. {error}</div>

  return (
    <>
      <h2>Now playing on Spotify</h2>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: [
            '1fr 1fr',
            '1fr 1fr 1fr',
            '',
            '1fr 1fr 1fr 1fr',
          ],
          gridGap: 5,
        }}
      >
        {/* {data &&
          data.map((item) => {
            const track = item

            return (
              <div key={track.id}>
                <div
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: ['60vw', '', '', '20vw'],
                    maxHeight: ['300px'],
                    justifyContent: 'flex-end',
                    overflow: 'visible',
                  }}
                >
                  <div
                    sx={{
                      borderRadius: '2px',
                      overflow: 'hidden',
                      boxShadow:
                        '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)',
                    }}
                  >
                    <Image
                      src={track.album.images[0].url}
                      alt=""
                      objectFit="cover"
                      layout="responsive"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
                <Themed.h3 sx={{ mt: 3, mb: 2 }}>
                  {track.name} by{' '}
                  <span sx={{ color: 'secondary' }}>
                    {track.artists.map((artist) => artist.name).join(', ')}
                  </span>
                </Themed.h3>
                <p
                  sx={{
                    mt: 0,
                    fontSize: 0,
                    color: 'secondary',
                    fontFamily: 'body',
                  }}
                >
                  Played {format(parseISO(track.played_at), 'PPpp')}
                </p>
              </div>
            )
          })} */}
        <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
      </div>
    </>
  )
}

const RecentlyReadBooks = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/oku', fetcher)

  const books = data?.books

  return (
    <>
      <h2>Recently read books</h2>
      {books &&
        books.map((book: { title: string; author: string }, index: number) => {
          const isFirst = index === 0

          return (
            <div key={book.title}>
              {book.title} by {book.author}
            </div>
          )
        })}
      {/* <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div> */}
    </>
  )
}

const Now: NextPage = () => {
  return (
    <GlobalLayout>
      <TwoColLayout>
        <Nav />
        <div>
          <h1>Now</h1>
          <CurrentlyPlayingTrack />
          <RecentlyReadBooks />
          <RecentlyPlayedTracks />
        </div>
      </TwoColLayout>
    </GlobalLayout>
  )
}

export default Now
