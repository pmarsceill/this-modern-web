import AboutGif from '../public/patrick-marsceill.gif'
import Box from '../components/primitives/box'
import GlobalLayout from '../components/global/global-layout'
import Heading from '../components/primitives/heading'
import Image from '../components/primitives/image'
import Link from 'next/link'
import Nav from '../components/nav'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Prose from '../components/primitives/prose'
import Spinner from '../components/spinner'
import Text from '../components/primitives/text'
import TwoColLayout from '../components/two-col-layout'
import { useRef } from 'react'

const About: NextPage & { theme: string } = () => {
  const spinnerRef = useRef<HTMLSpanElement>(null)
  const handleImageLoad = () => {
    if (spinnerRef.current) {
      spinnerRef.current.style.display = 'none'
    }
  }

  return (
    <GlobalLayout>
      <NextSeo title="About Patrick Marsceill — This Modern Web" />
      <TwoColLayout>
        <Nav />
        <Box
          css={{
            display: 'grid',
            gridTemplateAreas: '"intro" "image" "details" "more"',

            '@1': {
              gridTemplateColumns: '2fr 1fr 1fr',
              gridTemplateAreas:
                '"intro image image" "details details details" "more more more"',
            },

            '@2': {
              columnGap: '$5',
            },
            '@3': {
              columnGap: '$6',
              gridTemplateColumns: '3.25fr 1fr 1fr',
              gridTemplateAreas:
                '"intro image image" "details image image" "more more x"',
            },
          }}
        >
          <Box css={{ gridArea: 'intro' }}>
            <Heading
              as="h1"
              context="pageHeading"
              css={{
                width: '100%',

                '@1': {
                  width: '145%',
                },
              }}
            >
              Patrick Marsceill is a product designer at WorkOS
              <Text
                css={{
                  color: '$secondary',
                  ml: '0.2em',
                }}
              >
                Youʼve found his home on the internet —
              </Text>
            </Heading>
          </Box>
          <Prose css={{ gridArea: 'details' }} type="longform">
            <p>
              I tend to write about design + tech, my own life, and occasionally
              music and film. If you&apos;re curious about what I&apos;m
              currently watching, listening to, or reading, check out my{' '}
              <Link href="/now" passHref>
                <a>Now</a>
              </Link>{' '}
              page.
            </p>
            <p>
              My earliest post here was in 2012, so you could say that is the
              year that I established this site. Back then though, it was under
              my own namesake, <em>patrickmarsceill.com</em> (which now
              redirects over here). I{' '}
              <Link href="/2020/02/17/new-site-who-dis/" passHref>
                <a>wrote a post</a>
              </Link>{' '}
              with some context as to the name change and more about what
              I&apos;m trying to do here. In the past, I never kept up a regular
              writing schedule, but these days I try to get something new up at
              least twice a week.
            </p>
          </Prose>
          <Box
            css={{
              gridArea: 'image',
              position: 'relative',

              '@2': {
                mb: '$4',
              },
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
              src={AboutGif}
              alt="Patrick Marsceill"
              layout="responsive"
              css={{
                mb: '$5',
                borderRadius: '$3',
                overflow: 'hidden',
              }}
              onLoadingComplete={() => {
                handleImageLoad()
              }}
              priority
            />
          </Box>
          <Prose type="longform" css={{ gridArea: 'more' }}>
            <h2>My work</h2>
            <p>
              In early 2022, I joined the team at{' '}
              <a href="https://workos.com">WorkOS</a> and am now focused on
              designing and building tools for developers integrating
              enterprise-focused features like single sign-on, directory sync,
              HR integrations, and audit trails.
            </p>
            <p>
              Prior to WorkOS, I was a product designer at GitHub for about
              six-and-a-half years. In my time there, I worked on almost every
              part of the product. I managed teams and led design efforts on
              many core features like <em>GitHub actions</em>,{' '}
              <em>pull requests</em>, <em>code review</em>, <em>security</em>,{' '}
              <em>ecosystem / api</em>, <em>marketing / top-of-funnel</em>, and{' '}
              <em>new user experience</em> and was an early contributor to the
              Primer design system. Most recently though, I was a Staff Designer
              working on{' '}
              <a href="https://github.com/features/issues">
                GitHub issues and projects
              </a>
              .
            </p>
            <p>
              My working style is hands-on and I enjoy writing code as much I
              like thinking about problems, designing interfaces, and
              collaborating with my team. Inevitably one of these things will
              lead to another.
            </p>
            <p>
              Before joining GitHub in 2015, I led design teams at{' '}
              <a href="https://www.happycog.com">Happy Cog</a> and Empathy Lab
              working with Fortune 500 industry leaders, scrappy start-ups, and
              mission-driven non-profits to build digital products for screens
              of all sizes.
            </p>
            <h2>Personal projects</h2>
            <p>
              I&apos;ve loved the internet since I first logged on as a pre-teen
              in the early 90&apos;s. From the start, I was hooked on the
              ability to create for this medium. Over the years I have designed
              + built many personal side projects — the remnants of my first
              (from 2001) still lives on at{' '}
              <a href="https://web.archive.org/web/20011028025427/http://pat.rocks.it/">
                archive.org
              </a>
              .
            </p>
            <ul>
              <li>
                <a href="https://pmarsceill.github.io/just-the-docs">
                  Just the Docs
                </a>{' '}
                - A &ldquo;best in class&rdquo; Open Source Jekyll theme for
                documentation with built-in search.
              </li>
              <li>
                <a href="https://awaremac.com/">Aware</a> - A simple menubar app
                for OSX and macOS that tracks how long you&apos;ve been actively
                using your computer.
              </li>
              <li>
                <a href="https://web.archive.org/web/20150305170045/https://tablab.io/">
                  Tab Lab
                </a>{' '}
                - <em>(archived link, project shut down)</em>. Publish guitar
                tablature and music notation with an abstract markdown-like
                language.
              </li>
            </ul>
            <h2>About this website</h2>
            <p>
              I wrote this website in TypeScript using the Next.js framework.{' '}
              <a href="https://github.com/pmarsceill/this-modern-web">
                The source code is on GitHub
              </a>{' '}
              and is under a{' '}
              <a
                rel="license"
                href="https://choosealicense.com/licenses/gpl-3.0/"
              >
                GNU General Public License v3.0
              </a>
              . This website is hosted on{' '}
              <a href="https://vercel.com">Vercel</a>.
            </p>
            <p>
              The logotype is set in <em>Optician Sans</em> (
              <a href="https://github.com/anewtypeofinterference/Optician-Sans">
                Open Source on GitHub
              </a>
              ), the body copy is set in <em>Freight Text Pro</em>, monospace is{' '}
              <em>IBM Plex Mono</em> and the rest of the site uses a system-safe
              font stack:
            </p>
            <pre>
              <code>
                font-family: -apple-system, BlinkMacSystemFont, Helvetica,
                Arial, sans-serif
              </code>
            </pre>
          </Prose>
        </Box>
      </TwoColLayout>
    </GlobalLayout>
  )
}

About.theme = 'light'

export default About
