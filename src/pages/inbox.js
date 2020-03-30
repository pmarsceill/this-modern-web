import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { Styled } from "theme-ui"
import Img from "gatsby-image"
import moment from "moment"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import TwoCol from "../components/two-col"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const [colorMode, setColorMode] = useColorMode()
  const inboxItems = data.allMdx.edges

  setColorMode("light")

  function SpreadYears() {
    const years = []

    inboxItems.map(({ node }, index) => {
      const year = moment.utc(node.frontmatter.date).format("YYYY")
      years.push(year)
    })

    const uniqYears = [...new Set(years)]

    return uniqYears.map((year, index) => {
      const yearlyPosts = []
      return (
        <div
          key={year}
          sx={{
            mb: 6,
          }}
        >
          <Styled.h2
            sx={{
              fontSize: 1,
              borderBottom: "2px solid",
              borderColor: "muted",
              pb: 2,
              mb: 5,
            }}
          >
            {year}
          </Styled.h2>
          <div
            sx={{
              display: "grid",
              gridTemplateColumns: ["1fr 1fr", "1fr 1fr 1fr 1fr"],
              gridGap: 5,
            }}
          >
            {inboxItems.map(({ node }, index) => {
              const postYear = moment.utc(node.frontmatter.date).format("YYYY")
              const slug = node.fields.slug
              if (postYear == year) {
                return (
                  <div key={slug} id={slug.replace(/\//g, "")}>
                    <div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: ["60vw", "25vw"],
                        maxHeight: ["350px"],
                        justifyContent: "flex-end",
                        overflow: "visible",
                        mb: 4,
                      }}
                    >
                      <Img
                        sx={{}}
                        fluid={node.frontmatter.cover.childImageSharp.fluid}
                      />
                    </div>
                    <Styled.h3
                      sx={{
                        m: 0,
                      }}
                    >
                      {node.frontmatter.title}
                    </Styled.h3>
                    <p
                      sx={{
                        fontSize: theme => `${theme.styles.h3.fontSize}`,
                        fontFamily: "heading",
                        fontWeight: "heading",
                        lineHeight: "heading",
                        letterSpacing: "heading",
                        color: "secondary",
                        mt: 0,
                        mb: 2,
                      }}
                    >
                      {node.frontmatter.artist}
                    </p>
                    <p
                      sx={{
                        fontFamily: "body",
                        fontSize: [0],
                        mt: 0,
                        mb: 1,
                        color: "secondary",
                      }}
                    >
                      Added {moment.utc(node.frontmatter.date).format("MMMM")}
                    </p>
                    <p
                      sx={{
                        fontFamily: "body",
                        fontSize: [0],
                        m: 0,
                        color: "secondary",
                      }}
                    >
                      {node.frontmatter.status}
                    </p>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )
    })
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Inbox" />
      <TwoCol extended="true">
        <Nav />
        <div>
          <h1
            sx={{
              fontFamily: "heading",
              fontSize: [5, 6, 7],
              letterSpacing: "heading",
              lineHeight: "heading",
              mt: 0,
              maxWidth: "660px",
              mb: 6,
            }}
          >
            Inbox
            <span
              sx={{
                color: "secondary",
                ml: "0.2em",
              }}
            >
              — what Iʼm reading, watching, or listening to...
            </span>
          </h1>
          <SpreadYears />
        </div>
      </TwoCol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query InboxQuery {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
    allMdx(
      filter: { frontmatter: { tags: { in: "inbox" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            artist
            date
            cover {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            status
          }
        }
      }
    }
  }
`
