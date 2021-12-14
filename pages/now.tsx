import { parseISO } from 'date-fns'
import format from 'date-fns/format'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect } from 'react'
import useSWR from 'swr'
import GlobalLayout from '../components/global/global-layout'
import MdxImage from '../components/mdx-image'
import Nav from '../components/nav'
import Box from '../components/primitives/box'
import Heading from '../components/primitives/heading'
import Prose from '../components/primitives/prose'
import Text from '../components/primitives/text'
import TwoColLayout from '../components/two-col-layout'
import { TrackType } from '../lib/types'
import ghProjectsBeta from '../public/assets/now/gh-projects-beta.png'
import homeImage from '../public/assets/now/home.jpg'

const NowWorkingOn = () => {
  // const [colorMode, setColorMode] = useColorMode()
  // setColorMode('dark')

  return (
    <Prose type="longform">
      <p>
        In December of 2020, after five years of managing teams of product
        designers, I reevaluated what I wanted to get out of my work. I&apos;ve
        always been most driven by making things and after spending this last
        chunk of my career managing other designers I found myself very far away
        from what I&apos;m most passionate about. It was time to go back to
        being an individual contributor. It was a little scary but absolutely
        the right choice for me. I changed teams, changed titles, and shifted to
        another area of GitHub that needed help.
      </p>
      <p>
        The first assignment I was handed as Staff Designer at GitHub was to
        reimagine our project managment tools and what they could be. From
        December until October of 2021, I worked with a team of product
        managers, designers, engineers, and researchers, to build what is now
        the{' '}
        <a href="https://github.com/features/issues">
          GitHub Issues &amp; Projects beta
        </a>
        .
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
        Today, my role on this team is to lead the design direction and
        execution across our planning and tracking products. I spend a good
        amount of my time synthesizing the output of our research team, weekly
        executive leadership meetings, early customer feedback, and internal
        usage data to create actionable design decisions. The product design
        team works extensively to create Figma prototypes, we write a large
        portion of the front-end UI in our React codebase, and work with the
        Design Systems team to extend and create patterns in our React component
        library.
      </p>
    </Prose>
  )
}

const NowHome = () => {
  return (
    <Prose type="longform">
      <p>
        The house of my dreams was built in 1830 and sits proudly a few miles
        from the Hudson river in Upstate New York. After seeing it pop up
        through a random Zillow search in late August of 2020, my family visited
        it a few times, and then we couldn&apos;t stop thinking about it. Two
        days before Christmas eve in 2020, we were living here.
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

const NowPlaying = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/recently-played', fetcher)

  if (error)
    return (
      <Text>
        <em>Failed to load recently played tracks.</em>
      </Text>
    )

  const tracks = data?.tracks

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
                  </Box>
                </Box>
                <Heading
                  as="h3"
                  css={{
                    fontSize: '$4',
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

const Now: NextPage = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

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
              <em>Updated Novermber 7, 2021 from Hudson, NY</em>
            </p>
            <h2>
              <Text css={{ color: '$secondary' }}>3.1 —</Text> working on
            </h2>
            <NowWorkingOn />
            <h2>
              <Text css={{ color: '$secondary' }}>3.2 —</Text> home
            </h2>
            <NowHome />
          </Prose>
          <Prose type="longform">
            <h2>
              <Text css={{ color: '$secondary' }}>3.3 —</Text> playing
            </h2>
            <p>
              The latest plays from my Spotify account, automatically updated...
            </p>{' '}
            <NowPlaying />
          </Prose>
        </Box>
      </TwoColLayout>
    </GlobalLayout>
  )
}

export default Now
