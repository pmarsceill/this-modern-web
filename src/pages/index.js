import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx, useColorMode, Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from "moment"
import Img from "gatsby-image"

import TwoCol from "../components/two-col"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import AncillaryNav from "../components/ancillary-nav"
import Button from "../components/button"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  const microBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return tags.includes("microblog")
  })

  const legacyBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return tags.includes("legacy")
  })

  const currentBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return (
      !tags.includes("microblog") &&
      !tags.includes("legacy") &&
      !tags.includes("inbox")
    )
  })

  const [colorMode, setColorMode] = useColorMode()

  setColorMode("dark")

  function currentBlogLayout(node, index) {
    const title = node.frontmatter.title || node.fields.slug
    const tags = node.frontmatter.tags || []
    const description = node.frontmatter.description || ""
    const date = moment.utc(node.frontmatter.date).format("MMMM D, YYYY")
    const slug = node.fields.slug
    const featuredImage = node.frontmatter.featuredImage || ""
    const imageData = featuredImage ? featuredImage.childImageSharp.fluid : ""
    const excerpt = node.excerpt

    const image = imageData ? (
      <Img
        fluid={imageData}
        sx={{
          borderRadius: "6px",
          ml: [3, 4, 5],
          width: ["100px", "140px", "160px", "160px", "180px"],
          backgroundColor: "muted",
        }}
        alt=""
      ></Img>
    ) : (
      ""
    )

    const first = index === 0

    return (
      <article
        key={slug}
        sx={{
          mb: "5",
          pb: "5",
          borderBottom: "1px solid",
          borderColor: "muted",
        }}
      >
        <Link
          to={slug}
          sx={{
            color: "primary",
            textDecoration: "none",
            display: "flex",
            "&:hover": {
              color: "accent",
            },
          }}
        >
          <div
            sx={{
              maxWidth: "660px",
            }}
          >
            <h3
              sx={{
                display: "inline",
                fontFamily: "heading",
                fontSize: first ? [4, 5, 7] : [4, 5],
                letterSpacing: "heading",
                lineHeight: "heading",
              }}
            >
              {title}
            </h3>
            <p
              sx={{
                fontFamily: "heading",
                display: "inline",
                fontSize: first ? [4, 5, 7] : [4, 5],
                color: "secondary",
                fontWeight: "bold",
                letterSpacing: "heading",
                lineHeight: "heading",
                hyphens: "auto",
                ml: 2,
              }}
            >
              {description}
            </p>
            {function() {
              if (first == true) {
                return <p>{excerpt}</p>
              } else {
                return
              }
            }}
            <small
              sx={{
                fontFamily: "body",
                display: "block",
                fontSize: [0],
                color: "secondary",
                mt: 3,
              }}
            >
              {date}
            </small>
          </div>
          <div>{image}</div>
        </Link>
      </article>
    )
  }

  function microBlogLayout(node) {
    const body = node.body || node.fields.title || node.fields.slug
    const timeAgo = moment.utc(node.frontmatter.date).fromNow()
    const slug = node.fields.slug.replace(/\//g, "")
    const permalink = `/archive#${slug}`

    return (
      <article
        key={slug}
        sx={{
          mb: "5",
          pb: "5",
          borderBottom: "1px solid",
          borderColor: "muted",
        }}
        id={slug}
      >
        <div
          sx={{
            color: "primary",
            textDecoration: "none",
            fontSize: "body",
          }}
        >
          <div
            sx={{
              fontFamily: "monospace",
              fontSize: [1, "", "", "", ""],
              lineHeight: "body",
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>

        <small
          sx={{
            fontFamily: "monospace",
            display: "block",
            fontSize: 0,
            mt: 3,
          }}
        >
          <Link
            to={slug}
            sx={{
              textDecoration: "none",
              color: "secondary",
            }}
          >
            ⌘ {timeAgo}
          </Link>
        </small>
      </article>
    )
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <div>
        <TwoCol>
          <Nav />
          <div>
            <SEO title="Patrick Marsceill" />

            {currentBlogs.map(({ node }, index) => {
              if (index < 2) {
                return currentBlogLayout(node, index)
              }
            })}

            {microBlogs.map(({ node }, index) => {
              if (index < 4) {
                return microBlogLayout(node)
              }
            })}

            {currentBlogs.map(({ node }, index) => {
              if (index >= 2 && index <= 4) {
                return currentBlogLayout(node)
              }
            })}

            {microBlogs.map(({ node }, index) => {
              if (index >= 4) {
                return microBlogLayout(node)
              }
            })}

            <Button variant="outline" to="archive" block="true">
              Everything Archive
            </Button>
          </div>
          <div
            sx={{
              mt: [6, "", 0],
            }}
          >
            <ul
              sx={{
                listStyle: "none",
                pl: 0,
                m: 0,
              }}
            >
              <li
                sx={{
                  mt: 2,
                  mb: 2,
                }}
              >
                <a
                  href="/rss.xml"
                  sx={{
                    fontFamily: "body",
                    fontSize: 0,
                    color: "secondary",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      color: "accent",
                    },
                  }}
                >
                  <RssIcon sx={{ mr: 1 }} /> RSS
                </a>
              </li>
              <li>
                <Link
                  to="archive"
                  sx={{
                    fontFamily: "body",
                    fontSize: 0,
                    color: "secondary",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      color: "accent",
                    },
                  }}
                >
                  <ArchiveIcon sx={{ mr: 1 }} /> Everything Archive
                </Link>
              </li>
            </ul>
          </div>
        </TwoCol>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query allPosts {
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
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 180, maxHeight: 180) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          body
        }
      }
    }
  }
`
