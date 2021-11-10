/** @jsxImportSource theme-ui */

import { Styled, Themed } from '@theme-ui/mdx'

import AboutGif from '../public/patrick-marsceill.gif'
import GlobalLayout from '../components/global/global-layout'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/nav'
import { NextSeo } from 'next-seo'
import TwoColLayout from '../components/two-col-layout'
import { useColorMode } from 'theme-ui'

const About = () => {
  const [colorMode, setColorMode] = useColorMode()
  setColorMode('light')

  const yearsAtGitHub = new Date().getFullYear() - 2015

  return (
    <GlobalLayout>
      <NextSeo title="About Patrick Marsceill — This Modern Web" />
      <TwoColLayout>
        <Nav />
        <div
          sx={{
            display: ['grid'],
            columnGap: ['', '', 5, 6],
            gridTemplateColumns: ['', '2fr 1fr 1fr', '', '3.25fr 1fr 1fr'],
            gridTemplateAreas: [
              '"intro" "image" "details" "more"',
              '"intro image image" "details details details" "more more more"',
              '"intro image image" "details details details" "more more more"',
              '"intro image image" "details image image" "more more x"',
            ],
          }}
        >
          <div sx={{ gridArea: 'intro' }}>
            <h1
              sx={{
                fontFamily: 'heading',
                fontSize: [5, 6, 7],
                letterSpacing: 'heading',
                lineHeight: 'heading',
                width: ['', '150%'],
              }}
            >
              Patrick Marsceill is a product designer at GitHub
              <span
                sx={{
                  color: 'secondary',
                  ml: '0.2em',
                }}
              >
                You&apos;ve found his home on the internet —
              </span>
            </h1>
          </div>
          <div sx={{ gridArea: 'details' }} className="prose">
            <Themed.p>
              My earliest post here was in 2012, so you could say that is the
              year that I established this site. Back then though, it was under
              my own namesake over at <em>patrickmarsceill.com</em> (which now
              redirects over here). I{' '}
              <Link href="/2020/02/17/new-site-who-dis/" passHref>
                <a>wrote a post</a>
              </Link>{' '}
              with some context as to the name change and more about what
              I&apos;m trying to do here. In the past, I never kept up a regular
              writing schedule, but these days I try to get something new up at
              least twice a week.
            </Themed.p>
            <Themed.p>
              I tend to write about design + tech, my own life, and occasionally
              music and film. If you&apos;re curious about what I&apos;m
              currently watching, listening to, or reading, check out my{' '}
              <Link href="/now" passHref>
                <a>Now</a>
              </Link>{' '}
              page.
            </Themed.p>
          </div>
          <div
            sx={{
              gridArea: 'image',
              mb: ['', '', 4],
              position: 'relative',
            }}
          >
            <Image
              src={AboutGif}
              alt="Patrick Marsceill"
              layout="responsive"
              sx={{
                mt: [4, 6, ''],
              }}
            />
          </div>
          <div sx={{ gridArea: 'more' }} className="prose">
            <Themed.h2>My work</Themed.h2>
            <Themed.p>
              I have been a designer in some capacity at GitHub for about{' '}
              {yearsAtGitHub} years. In my time at GitHub, I have worked on
              almost every part of the product. I have managed product design
              teams and led design efforts on many core features like{' '}
              <em>GitHub actions</em>, <em>pull requests</em>,{' '}
              <em>code review</em>, <em>security</em>, <em>ecosystem / api</em>,{' '}
              <em>marketing / top-of-funnel</em>, and{' '}
              <em>new user experience</em>. Currently, I am a Staff Designer
              working on building{' '}
              <a href="https://github.com/features/issues">
                GitHub issues and projects
              </a>
              .
            </Themed.p>
            <Themed.p>
              My working style is hands-on and I enjoy writing code as much I
              like thinking about problems, designing interfaces, and
              collaborating with my team. Inevitably one of these things will
              lead to another.
            </Themed.p>
            <Themed.p>
              Before joining GitHub in 2015, I led design teams at{' '}
              <a href="https://www.happycog.com">Happy Cog</a> and Empathy Lab
              working with Fortune 500 industry leaders, scrappy start-ups, and
              mission-driven non-profits to build digital products for screens
              of all sizes.
            </Themed.p>
            <Themed.h2>Personal projects</Themed.h2>
            <Themed.p>
              I&apos;ve loved the internet since I first logged on as a pre-teen
              in the early 90&apos;s. From the start, I was hooked on the
              ability to create for this medium. Over the years I have designed
              + built many personal side projects — the remnants of my first
              (from 2001) still lives on at{' '}
              <a href="https://web.archive.org/web/20011028025427/http://pat.rocks.it/">
                archive.org
              </a>
              .
            </Themed.p>
            <Themed.ul>
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
            </Themed.ul>
            <Themed.h2>About this website</Themed.h2>
            <Themed.p>
              I wrote this website in TypeScript using the Next.js framework.
              The source code is on GitHub and is under a{' '}
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by-nc/4.0/"
              >
                Creative Commons Attribution-NonCommercial 4.0 International
                License
              </a>
              . This website is hosted on{' '}
              <a href="https://vercel.com">Vercel</a>.
            </Themed.p>
            <Themed.p>
              The logotype is set in <em>Optician Sans</em> (
              <a href="https://github.com/anewtypeofinterference/Optician-Sans">
                Open Source on GitHub
              </a>
              ), the body copy is set in <em>Freight Text Pro</em> and the rest
              of the site uses system-safe font stacks:
            </Themed.p>
            <Themed.ul>
              <li>
                Headings:{' '}
                <Themed.code>
                  -apple-system, BlinkMacSystemFont, Helvetica, Arial,
                  sans-serif
                </Themed.code>
              </li>
              <li>
                Monospace:{' '}
                <Themed.code>
                  SFMono-Regular, Consolas, Menlo, Andale, monospace
                </Themed.code>
              </li>
            </Themed.ul>
          </div>
        </div>
      </TwoColLayout>
    </GlobalLayout>
  )
}

export default About
