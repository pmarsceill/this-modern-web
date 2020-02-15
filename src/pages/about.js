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
  const siteTitle = data.site.siteMetadata.title
  const [colorMode, setColorMode] = useColorMode()

  setColorMode("light")

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="About Patrick Marsceill" />
      <TwoCol extended="true">
        <Nav />
        <div
          sx={{
            display: ["grid"],
            columnGap: ["", 5, 6],
            gridTemplateColumns: ["", "", "3.5fr 1fr 1fr"],
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
                fontSize: [5, 6, 6, 6],
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
                designing &amp; building
                tools used by over 40 million developers.
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
                At GitHub, I manage the <em>Code to Cloud</em> Product Design
                team, which enables developers to build, test, run, publish, and
                deploy their code on GitHub. If you're a GitHub user, you may
                have seen our work in these products:
              </p>
              <Styled.ul sx={{ color: "text" }}>
                <li>GitHub Actions</li>
                <li>GitHub Packages</li>
                <li>GitHub Pages</li>
              </Styled.ul>
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
                borderRadius: "6px",
              }}
            />
          </div>

          <div
            sx={{
              gridArea: "more",
            }}
          >
            <Styled.root>
              <p>
                Previously, I managed the product design teams that comprise the
                core workflows that developers use daily including:
              </p>
              <Styled.ul>
                <li>Pull Requests</li>
                <li>Code Review</li>
                <li>Repositories</li>
                <li>Ecosystem / API powering third-party apps</li>
              </Styled.ul>
              <p>
                Before joining GitHub in 2015, I led design teams at{" "}
                <a href="https://www.happycog.com">Happy Cog</a> and Empathy Lab
                working with Fortune 500 industry leaders, scrappy start-ups,
                and mission-driven non-profits to build digital products for
                screens of all sizes.
              </p>
              <Styled.h2>Personal projects</Styled.h2>
              <p>
                I've loved the internet since I first logged on as a pre-teen in
                the early 90's. Since the beginning I've been fascinated by
                creating for this medium. I've designed built a bunch of
                personal side projects, some have stood the test of time and
                some have been abandoned for more insteresting persuits. Here's
                a select few that I'm most proud of:
              </p>
              <Styled.ul>
                <li>
                  <a href="https://pmarsceill.github.io/just-the-docs">
                    Just the Docs
                  </a>{" "}
                  - Jekyll theme for documentation with built-in search out of
                  the box.
                </li>
                <li>
                  <a href="https://awaremac.com/">Aware</a> - A simple menubar
                  app for OSX and macOS that tracks how long you've been
                  actively using your computer.
                </li>
                <li>
                  GeoCities.dev - <em>coming soon...</em>
                </li>
                <li>
                  <a href="https://web.archive.org/web/20150305170045/https://tablab.io/">
                    Tab Lab
                  </a>{" "}
                  - <em>(archived link, project shut down)</em>. Publish guitar
                  tablature and music notation with an abstract markdown-like
                  language.
                </li>
              </Styled.ul>
              <Styled.h2>About this website</Styled.h2>
              <p>
                This website is powered by a custom theme that I wrote for{" "}
                <a href="https://gatsbyjs.org">GatsbyJS</a>, a very nice
                framework for React. You can find{" "}
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
                ), the rest of the site uses system-safe font stacks:
              </p>
              <Styled.ul>
                <li>
                  Headings:{" "}
                  <code class="language-text">
                    -apple-system, BlinkMacSystemFont, Helvetica, Arial,
                    sans-serif
                  </code>
                </li>
                <li>
                  Body content:{" "}
                  <code class="language-text">
                    Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua,
                    Georgia,serif
                  </code>
                </li>
                <li>
                  Monospace:{" "}
                  <code class="language-text">
                    SFMono-Regular, Consolas, Menlo, Andale,monospace
                  </code>
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
