/** @jsxImportSource theme-ui */

import { Themed } from '@theme-ui/mdx'
import { parseISO } from 'date-fns'
import format from 'date-fns/format'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import useSWR from 'swr'
import GlobalLayout from '../components/global/global-layout'
import MdxImage from '../components/mdx-image'
import Nav from '../components/nav'
import TwoColLayout from '../components/two-col-layout'
import { TrackType } from '../lib/types'
import ghProjectsBeta from '../public/assets/now/gh-projects-beta.png'
import homeImage from '../public/assets/now/home.jpg'

const NowWorkingOn = () => {
  return (
    <>
      <Themed.p>
        In December of 2020, after five years of managing teams of product
        designers, I reevaluated what I wanted to get out of my work. I&apos;ve
        always been most driven by making things and after spending this last
        chunk of my career managing other designers I found myself very far away
        from what I&apos;m most passionate about. It was time to go back to
        being an individual contributor. It was a little scary but absolutely
        the right choice for me. I changed teams, changed titles, and shifted to
        another area of GitHub that needed help.
      </Themed.p>
      <Themed.p>
        The first assignment I was handed as Staff Designer at GitHub was to
        reimagine our project managment tools and what they could be. From
        December until October of 2021, I worked with a team of product
        managers, designers, engineers, and researchers, to build what is now
        the{' '}
        <a href="https://github.com/features/issues">
          GitHub Issues &amp; Projects beta
        </a>
        .
      </Themed.p>
      <MdxImage
        src={ghProjectsBeta}
        width={1366}
        height={834}
        alt="GitHub Projects Beta UI showing a table view grouped by iterations"
        placeholder="blur"
        shadow
        rounded
      />
      <Themed.p>
        Today, my role on this team is to lead the design direction and
        execution across our planning and tracking products. I spend a good
        amount of my time synthesizing the output of our research team, weekly
        executive leadership meetings, early customer feedback, and internal
        usage data to create actionable design decisions. The product design
        team works extensively to create Figma prototypes, we write a large
        portion of the front-end UI in our React codebase, and work with the
        Design Systems team to extend and create patterns in our React component
        library.
      </Themed.p>
    </>
  )
}

const NowHome = () => {
  return (
    <>
      <Themed.p>
        The house of my dreams was built in 1830 and sits proudly a few miles
        from the Hudson river in Upstate New York. After seeing it pop up
        through a random Zillow search in late August of 2020, my family visited
        it a few times, and then we couldn&apos;t stop thinking about it. Two
        days before Christmas eve in 2020, we were living here.
      </Themed.p>
      <MdxImage
        src={homeImage}
        width={3893}
        height={2190}
        alt="Our house in Upstate New York"
        placeholder="blur"
        shadow
        rounded
      />
    </>
  )
}

const NowPlaying = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/spotify-recently-played', fetcher)

  if (error)
    return (
      <div>
        <em>Failed to load recently played tracks.</em>
      </div>
    )

  const tracks = data?.tracks

  return (
    <>
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
              <div key={track.id} sx={{ mb: ['', 4, 6] }}>
                <div
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: ['60vw', '25vw', '', '223px'],
                    maxHeight: ['300px'],
                    justifyContent: 'flex-end',
                    overflow: 'visible',
                  }}
                >
                  <div
                    sx={{
                      borderRadius: 1,
                      overflow: 'hidden',
                      bg: 'muted',
                      boxShadow: 'default',
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

const NowPlayingLive = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())

  // TODO Hook up API credentials so this doesn't 402
  const { data, error } = useSWR('/api/spotify-currently-playing', fetcher)

  if (error) return <div>Failed to load currently playing.</div>

  return (
    <>
      <Themed.h2>Now playing on Spotify</Themed.h2>
    </>
  )
}

const NowReading = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/oku', fetcher)

  if (error) return <div>Failed to load recently read books.</div>

  const books = data?.books

  // TODO figure out a more reliable source for book cover images. Open Library isn't good enough.
  return (
    <>
      <h2>Recently read books</h2>
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
        {books &&
          books.map(
            (book: {
              title: string
              author: string
              coverImageUrl: string
              coverImageMetadata: { width: number; height: number }
              readDate: string
            }) => {
              const date = parse(
                book.readDate,
                'EEE, dd LLL y 00:00:00 +0000',
                new Date()
              )
              console.log('date', date)
              return (
                <div key={book.title}>
                  <div
                    sx={{
                      position: 'relative',
                      height: '320px',
                      borderRadius: 1,
                      overflow: 'hidden',
                      bg: 'muted',
                      boxShadow: 'default',
                    }}
                  >
                    <Image
                      src={book.coverImageUrl}
                      alt=""
                      objectFit="cover"
                      layout="fill"
                      objectPosition="center"
                    />
                  </div>
                  <Themed.h3 sx={{ mt: 3, mb: 2 }}>
                    {book.title}{' '}
                    <span sx={{ color: 'secondary' }}> by {book.author}</span>
                  </Themed.h3>
                  <p
                    sx={{
                      mt: 0,
                      fontSize: 0,
                      color: 'secondary',
                      fontFamily: 'body',
                    }}
                  >
                    Read {format(date, 'PP')}
                  </p>
                </div>
              )
            }
          )}
      </div>
    </>
  )
}

const Now: NextPage = () => {
  return (
    <GlobalLayout>
      <NextSeo title="Now — This Modern Web" />
      <TwoColLayout>
        <Nav />
        <div>
          <h1
            sx={{
              variant: 'text.pageHeading',
            }}
          >
            Now
          </h1>
          <div
            sx={{
              maxWidth: '759px',
            }}
            className="prose"
          >
            <Themed.p>
              <em>Updated Novermber 7, 2021 from Hudson, NY</em>
            </Themed.p>
            <Themed.h2>
              <span sx={{ color: 'secondary' }}>3.1 —</span> working on
            </Themed.h2>
            <NowWorkingOn />
            <Themed.h2>
              <span sx={{ color: 'secondary' }}>3.2 —</span> home
            </Themed.h2>
            <NowHome />
          </div>
          <div className="prose">
            <Themed.h2>
              <span sx={{ color: 'secondary' }}>3.3 —</span> playing
            </Themed.h2>
            <Themed.p>
              The latest plays from my Spotify account, automatically updated...
            </Themed.p>{' '}
            <NowPlaying />
          </div>
        </div>
      </TwoColLayout>
    </GlobalLayout>
  )
}

export default Now
