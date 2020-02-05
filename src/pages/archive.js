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
  const reversePosts = [...new Set(posts)].reverse()

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
            width: ["", "", "280px"],
            pr: ["", "", "5"],
            flexShrink: "0",
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

            if (postYear == year) {
              if (microblog == true) {
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
                      <Link
                        to={node.fields.slug}
                        sx={{
                          textDecoration: "none",
                          color: "secondary",
                        }}
                      >
                        {moment.utc(node.frontmatter.date).format("MMMM DD")}
                      </Link>
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
                          fontSize: [3, 4],
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
                          fontSize: [3, 4],
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
      const matrix = document.getElementById('yearsMatrix')
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
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
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
      pageTitle={"Archive"}
      fullWidth={true}
    >
      <YearsMatrix />
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
          }
          body
        }
      }
    }
  }
`
