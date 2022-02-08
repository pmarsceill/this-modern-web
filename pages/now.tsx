import { RefObject, useRef } from 'react'

import Box from '../components/primitives/box'
import GlobalLayout from '../components/global/global-layout'
import Heading from '../components/primitives/heading'
import Image from 'next/image'
import MdxImage from '../components/mdx-image'
import Nav from '../components/nav'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Prose from '../components/primitives/prose'
import Spinner from '../components/spinner'
import Text from '../components/primitives/text'
import { TrackType } from '../lib/types'
import TwoColLayout from '../components/two-col-layout'
import format from 'date-fns/format'
import ghProjectsBeta from '../public/assets/now/gh-projects-beta.png'
import homeImage from '../public/assets/now/home.jpg'
import { parseISO } from 'date-fns'
import useSWR from 'swr'

const NowWorkingOn = () => {
  return (
    <Prose type="longform">
      <p>
        I spent all 2021 designing and building the new GitHub Projects product.
        This was an incredibly fulfilling and fun way to spend my last year at
        GitHub. I got to do a little bit of everything from product
        management/strategy, product design, front-end engineering, and user
        research.
      </p>
      <MdxImage
        src={ghProjectsBeta}
        width={1366}
        height={834}
        alt="GitHub Projects Beta UI showing a table view grouped by iterations"
        placeholder="blur"
        shadow
        rounded
      />
      <p>
        In early 2022, I left GitHub after spending six-and-a-half years on the
        Product Design team. GitHub is an amazing company (and product) — truly
        the best job I've had. Ultimately though, I was longing for the energy
        of a start-up. On January 10th, I joined the team at{' '}
        <a href="https://workos.com">WorkOS</a> and can't wait to share more of
        what we've already started building together.
      </p>
    </Prose>
  )
}

const NowHome = () => {
  return (
    <Prose type="longform">
      <p>
        The house of my dreams was built in 1830 and sits proudly a few miles
        from the Hudson river in Upstate New York. After seeing it pop-up on a
        random Zillow search in late August of 2020, my family decided to visit.
        We couldn&apos;t stop thinking about it and two days before Christmas
        eve that year, we were living here.
      </p>
      <MdxImage
        src={homeImage}
        width={3893}
        height={2190}
        alt="Our house in Upstate New York"
        placeholder="blur"
        shadow
        rounded
      />
    </Prose>
  )
}

type NowPlayingProps = {
  spinnerRef: RefObject<HTMLSpanElement>
}

const NowPlaying = ({ spinnerRef }: NowPlayingProps) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/recently-played', fetcher)

  if (error)
    return (
      <Text>
        <em>Failed to load recently played tracks.</em>
      </Text>
    )

  if (!data)
    return (
      <Box
        as="span"
        css={{
          position: 'relative',
          backgroundColor: '$inset',
          p: '$5',
          borderRadius: '$2',
          display: 'block',
        }}
      >
        <Spinner />
        <Text
          as="p"
          css={{
            fontFamily: '$monospace',
            fontSize: '$0',
            color: '$secondary',
            mt: '$3',
            mb: '$0',
            textAlign: 'center',
          }}
        >
          Fetching recently played tracks...
        </Text>
      </Box>
    )

  const tracks = data?.tracks

  const handleImageLoad = () => {
    if (spinnerRef.current) {
      spinnerRef.current.style.display = 'none'
    }
  }
  return (
    <>
      <Box
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '$5',

          '@1': {
            gridTemplateColumns: '1fr 1fr 1fr',
          },
          '@3': {
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          },
        }}
      >
        {tracks &&
          tracks.map((item: { track: TrackType }, index: number) => {
            const track = item.track as TrackType
            return (
              <Box
                key={track.id}
                css={{ mb: '$0', '@1': { mb: '$4' }, '@2': { mb: '$6' } }}
              >
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '60vw',
                    maxHeight: '300px',
                    justifyContent: 'flex-end',
                    overflow: 'visible',

                    '@1': {
                      height: '25vw',
                    },
                    '@3': {
                      height: '223px',
                    },
                  }}
                >
                  <Box
                    css={{
                      borderRadius: '$1',
                      overflow: 'hidden',
                      bg: 'muted',
                      boxShadow: 'default',
                      position: 'relative',
                    }}
                  >
                    <Box
                      ref={spinnerRef}
                      as="span"
                      css={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Spinner />
                    </Box>
                    <Image
                      src={track.album.images[0].url}
                      alt=""
                      objectFit="cover"
                      layout="responsive"
                      objectPosition="center"
                      width={300}
                      height={300}
                      onLoadingComplete={() => handleImageLoad()}
                    />
                  </Box>
                </Box>
                <Heading
                  as="h3"
                  css={{
                    fontSize: '$3',
                    color: '$primary',
                    mt: '$3',
                    mb: '$2',
                  }}
                >
                  {track.name}
                  <Text css={{ color: '$secondary' }}>
                    {' '}
                    by {track.artists.map((artist) => artist.name).join(', ')}
                  </Text>
                </Heading>
                <Text
                  as="p"
                  css={{
                    mt: '$0',
                    fontSize: '$0',
                    color: '$secondary',
                    fontFamily: '$body',
                  }}
                >
                  Played {format(parseISO(track.playedAt), 'PPp')}
                </Text>
              </Box>
            )
          })}
      </Box>
    </>
  )
}

const Now: NextPage & { theme: string } = () => {
  const spinnerRef = useRef<HTMLSpanElement>(null)

  return (
    <GlobalLayout>
      <NextSeo title="Now — This Modern Web" />
      <TwoColLayout>
        <Nav />
        <Box>
          <Heading context="pageHeading">Now</Heading>
          <Prose
            css={{
              maxWidth: '759px',
            }}
            type="longform"
          >
            <p>
              <em>Updated January 15, 2022 from Hudson, NY</em>
            </p>
            <h2>
              <Text
                css={{
                  color: '$secondary',
                  fontFamily: '$monospace',
                  fontWeight: '$body',
                  fontSize: '$1',
                  mr: '$3',
                }}
              >
                3.1
              </Text>
              Working on
            </h2>
            <NowWorkingOn />
            <h2>
              <Text
                css={{
                  color: '$secondary',
                  fontFamily: '$monospace',
                  fontWeight: '$body',
                  fontSize: '$1',
                  mr: '$3',
                }}
              >
                3.2
              </Text>
              Home
            </h2>
            <NowHome />
          </Prose>
          <Box>
            <Prose type="longform">
              <h2>
                <Text
                  css={{
                    color: '$secondary',
                    fontFamily: '$monospace',
                    fontWeight: '$body',
                    fontSize: '$1',
                    mr: '$3',
                  }}
                >
                  3.3
                </Text>
                Playing
              </h2>
              <p>
                The latest plays from my Spotify account, automatically
                updated...
              </p>{' '}
            </Prose>
            <NowPlaying spinnerRef={spinnerRef} />
          </Box>
        </Box>
      </TwoColLayout>
    </GlobalLayout>
  )
}

Now.theme = 'dark'

export default Now
