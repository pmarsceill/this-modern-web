import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { Styled } from "theme-ui"
import moment from "moment"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const [colorMode, setColorMode] = useColorMode()

  setColorMode("dark")

  const posts = data.allMdx.edges
  const reversePosts = [...new Set(posts)]

  function SpreadYears() {
    const years = []

    posts.map(({ node }, index) => {
      const year = moment.utc(node.frontmatter.date).format("YYYY")
      years.push(year)
    })
    const uniqYears = [...new Set(years)].reverse()

    return uniqYears.map((year, index) => {
      const yearlyPosts = []
      return (
        <div
          sx={{
            width: ["", "", "334px"],
            flexShrink: "0",
            "& + div": {
              pl: [0, 0, 5],
            },
          }}
          id={"archive-" + year}
        >
          <h2
            sx={{
              fontFamily: "heading",
              letterSpacing: "heading",
              fontSize: "1",
              color: "secondary",
              borderBottom: "2px solid",
              borderColor: "muted",
              py: "3",
              mb: [5, "", 4],
            }}
          >
            {year}
          </h2>
          {reversePosts.map(({ node }, index) => {
            const postYear = moment.utc(node.frontmatter.date).format("YYYY")
            const microblog =
              node.frontmatter.tags &&
              node.frontmatter.tags.includes("microblog")
                ? true
                : false
            const inbox =
              node.frontmatter.tags && node.frontmatter.tags.includes("inbox")

            if (postYear == year) {
              if (inbox == true) {
                return (
                  <article
                    key={node.fields.slug}
                    sx={{
                      mb: ["5", "", "4"],
                      pb: ["5", "", "4"],
                      borderBottom: "1px solid",
                      borderColor: "muted",
                    }}
                  >
                    <h3
                      sx={{
                        fontFamily: "heading",
                        fontSize: [2],
                        letterSpacing: "heading",
                        lineHeight: "heading",
                        fontWeight: "body",
                        m: 0,
                      }}
                    >
                      {node.frontmatter.title}
                    </h3>
                    <p
                      sx={{
                        fontFamily: "heading",
                        fontSize: [2],
                        letterSpacing: "heading",
                        lineHeight: "heading",
                        color: "secondary",
                        fontWeight: "body",
                        m: 0,
                      }}
                    >
                      {node.frontmatter.artist}
                    </p>
                    <small
                      sx={{
                        fontFamily: "body",
                        display: "block",
                        fontSize: [0],
                        color: "secondary",
                        mt: 3,
                      }}
                    >
                      {moment.utc(node.frontmatter.date).format("MMMM DD")} —{" "}
                      <em>{node.frontmatter.status}</em>
                    </small>
                  </article>
                )
              } else if (microblog == true) {
                const permalink = `#${node.fields.slug.replace(/\//g, "")}`
                return (
                  <article
                    key={node.fields.slug}
                    sx={{
                      mb: ["5", "", "4"],
                      pb: ["5", "", "4"],
                      borderBottom: "1px solid",
                      borderColor: "muted",
                    }}
                    id={node.fields.slug.replace(/\//g, "")}
                  >
                    <div
                      sx={{
                        color: "primary",
                        textDecoration: "none",
                        fontSize: "body",
                      }}
                    >
                      <Styled.root>
                        <div
                          sx={{
                            fontFamily: "monospace",
                            fontSize: [1, "", "", "", ""],
                            lineHeight: "body",
                          }}
                        >
                          <MDXRenderer>{node.body}</MDXRenderer>
                        </div>
                      </Styled.root>
                    </div>

                    <small
                      sx={{
                        fontFamily: "body",
                        display: "block",
                        fontSize: 0,
                        mt: 3,
                      }}
                    >
                      <a
                        href={permalink}
                        sx={{
                          textDecoration: "none",
                          color: "secondary",
                        }}
                      >
                        {moment.utc(node.frontmatter.date).format("MMMM DD")}
                      </a>
                    </small>
                  </article>
                )
              } else {
                return (
                  <article
                    key={node.fields.slug}
                    sx={{
                      mb: ["5", "", "4"],
                      pb: ["5", "", "4"],
                      borderBottom: "1px solid",
                      borderColor: "muted",
                    }}
                  >
                    <Link
                      to={node.fields.slug}
                      sx={{
                        color: "primary",
                        textDecoration: "none",
                        "&:hover": {
                          color: "accent",
                        },
                      }}
                    >
                      <h3
                        sx={{
                          display: "inline",
                          fontFamily: "heading",
                          fontSize: [4],
                          letterSpacing: "heading",
                          lineHeight: "heading",
                        }}
                      >
                        {node.frontmatter.title}
                      </h3>
                      <p
                        sx={{
                          fontFamily: "heading",
                          display: "inline",
                          fontSize: [4],
                          color: "secondary",
                          fontWeight: "bold",
                          letterSpacing: "heading",
                          lineHeight: "heading",
                          ml: 2,
                        }}
                      >
                        {node.frontmatter.description}
                      </p>
                      <small
                        sx={{
                          fontFamily: "body",
                          display: "block",
                          fontSize: [0],
                          color: "secondary",
                          mt: 3,
                        }}
                      >
                        {moment.utc(node.frontmatter.date).format("MMMM DD")}
                      </small>
                    </Link>
                  </article>
                )
              }
            }
          })}
        </div>
      )
    })
  }

  class YearsMatrix extends React.Component {
    componentDidMount() {
      const matrix = document.getElementById("yearsMatrix")
      const width = matrix.scrollWidth
      matrix.scrollTo(width, 0)
    }

    render() {
      return (
        <div
          id="yearsMatrix"
          sx={{
            position: "relative",
            minHeight: "100%",
            overflowX: ["hidden", "", "auto"],
            overflowY: "hidden",
            display: ["", "", "flex"],
            flexDirection: "column",
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: ["column-reverse", "", "row"],
              left: "0",
            }}
          >
            <SpreadYears />
          </div>
        </div>
      )
    }
  }

  return (
    <Layout
      location={props.location}
      title={siteTitle}
      pageTitle={"Everything* Archive"}
      fullWidth={true}
    >
      <YearsMatrix />

      <div
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: [4, 6, 7, 5],
        }}
      >
        <p sx={{ fontSize: 0, fontFamily: "serif", color: "secondaty" }}>
          *Not really everything
        </p>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query archive {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            tags
            artist
            status
          }
          body
        }
      }
    }
  }
`
