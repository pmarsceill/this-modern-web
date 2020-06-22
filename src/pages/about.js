import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { Styled } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import TwoCol from "../components/two-col"
import Image from "gatsby-image"
import aboutGif from "../../content/assets/patrick-marsceill.gif"

export default props => {
  const { data } = props
  const [colorMode, setColorMode] = useColorMode()

  setColorMode("light")

  return (
    <Layout location={props.location}>
      <SEO title="About Patrick Marsceill" />
      <TwoCol extended="true" title="true">
        <Nav />
        <div
          sx={{
            display: ["grid"],
            columnGap: ["", "", 5, 6],
            gridTemplateColumns: ["", "2fr 1fr 1fr", "", "3.25fr 1fr 1fr"],
            gridTemplateAreas: [
              '"intro" "image" "details" "more"',
              '"intro image image" "details details details" "more more more"',
              '"intro image image" "details details details" "more more more"',
              '"intro image image" "details image image" "more more x"',
            ],
          }}
        >
          <div
            sx={{
              gridArea: "intro",
            }}
          >
            <h1
              sx={{
                fontFamily: "heading",
                fontSize: [5, 6, 7],
                letterSpacing: "heading",
                lineHeight: "heading",
                mt: 0,
                width: ["", "150%"],
              }}
            >
              Patrick Marsceill is a product design manager at GitHub
              <span
                sx={{
                  color: "secondary",
                  ml: "0.2em",
                }}
              >
                You've found his home on the internet —
              </span>
            </h1>
          </div>

          <div
            sx={{
              gridArea: "details",
            }}
          >
            <Styled.root>
              <p>
                My earliest post here was in 2012, so you could say that is the
                year that I established this site. Back then though, it was
                under my own namesake over at <em>patrickmarsceill.com</em>{" "}
                (which now redirects over here). I recently{" "}
                <Link to="/2020/02/17/new-site-who-dis/">wrote a post</Link>{" "}
                with some context as to the name change and more about what I'm
                trying to do here. In the past, I never kept up a regular
                writing schedule, but these days I try to get something new up
                at least twice a week.
              </p>
              <p>
                I tend to write about design + tech, my own life, and
                occasionally music and film. If you're curious about what I'm
                currently watching, listening to, or reading, check out the{" "}
                <Link to="/inbox">Inbox</Link>.
              </p>
            </Styled.root>
          </div>
          <div
            sx={{
              gridArea: "image",
              mb: ["", "", 4],
            }}
          >
            <img
              src={aboutGif}
              alt="Patrick Marsceill"
              sx={{
                width: "100%",
                mt: [4, 6, ""],
                borderRadius: "default",
              }}
            />
          </div>

          <div
            sx={{
              gridArea: "more",
            }}
          >
            <Styled.root>
              <Styled.h2>Personal projects</Styled.h2>
              <p>
                I've loved the internet since I first logged on as a pre-teen in
                the early 90's. From the start, I was hooked on the ability to
                create for this medium. Over the years, I have designed + built
                many personal side projects — the remnants of my first (from
                2001) still lives on at{" "}
                <a href="https://web.archive.org/web/20011028025427/http://pat.rocks.it/">
                  archive.org
                </a>
                . Here are a few others that I'm most proud of:
              </p>
              <Styled.ul>
                <li>
                  <a href="https://pmarsceill.github.io/just-the-docs">
                    Just the Docs
                  </a>{" "}
                  - A "best in class" Jekyll theme for documentation with
                  built-in search.
                </li>
                <li>
                  <a href="https://awaremac.com/">Aware</a> - A simple menubar
                  app for OSX and macOS that tracks how long you've been
                  actively using your computer.
                </li>
                <li>
                  <a href="https://web.archive.org/web/20150305170045/https://tablab.io/">
                    Tab Lab
                  </a>{" "}
                  - <em>(archived link, project shut down)</em>. Publish guitar
                  tablature and music notation with an abstract markdown-like
                  language.
                </li>
                <li>
                  GeoCities.dev - <em>coming soon...</em>
                </li>
              </Styled.ul>
              <Styled.h2>My Work</Styled.h2>
              <p>
                I manage the <em>Code to Cloud</em> Product Design team at
                GitHub. We're responsible for making tools that allow developers
                to build, test, run, publish, deploy, and scale their work. If
                you're a GitHub user, you may have seen our efforts in{" "}
                <em>GitHub Actions</em>, <em>GitHub Packages</em>, and{" "}
                <em>GitHub Pages</em>.
              </p>
              <p>
                In my time at GitHub, I have worked on almost every part of the
                product. I have managed teams or led design efforts on many core
                features like <em>pull requests</em>, <em>code review</em>,{" "}
                <em>security</em>, <em>ecosystem / api</em>,{" "}
                <em>marketing / top-of-funnel</em>, and{" "}
                <em>new user experience</em>.
              </p>
              <p>
                Before joining GitHub in 2015, I led design teams at{" "}
                <a href="https://www.happycog.com">Happy Cog</a> and Empathy Lab
                working with Fortune 500 industry leaders, scrappy start-ups,
                and mission-driven non-profits to build digital products for
                screens of all sizes.
              </p>
              <Styled.h2>About this website</Styled.h2>
              <p>
                This website is powered by a custom theme that I designed and
                built for <a href="https://gatsbyjs.org">GatsbyJS</a>, a very
                nice framework for React. You can find{" "}
                <a href="https://github.com/pmarsceill/this-modern-web">
                  the source code is available on GitHub
                </a>{" "}
                and hosting is provided by{" "}
                <a href="https://netlify.com">Netlify</a>.
              </p>
              <p>
                The logotype is set in Optician Sans (
                <a href="https://github.com/anewtypeofinterference/Optician-Sans">
                  Open Source on GitHub
                </a>
                ), the body copy is set in Freight Text Pro and the rest of the
                site uses system-safe font stacks:
              </p>
              <Styled.ul>
                <li>
                  Headings:{" "}
                  <Styled.code className="language-text">
                    -apple-system, BlinkMacSystemFont, Helvetica, Arial,
                    sans-serif
                  </Styled.code>
                </li>
                <li>
                  Monospace:{" "}
                  <Styled.code className="language-text">
                    SFMono-Regular, Consolas, Menlo, Andale, monospace
                  </Styled.code>
                </li>
              </Styled.ul>
            </Styled.root>
          </div>
        </div>
      </TwoCol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
  }
`
