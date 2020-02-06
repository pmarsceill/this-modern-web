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
    return !tags.includes("microblog") && !tags.includes("legacy") && !tags.includes("inbox")
  })

  const [colorMode, setColorMode] = useColorMode()

  setColorMode("dark")

  function currentBlogLayout(node) {
    const title = node.frontmatter.title || node.fields.slug
    const tags = node.frontmatter.tags || []
    const description = node.frontmatter.description || ""
    const date = moment
    .utc(node.frontmatter.date)
      .format("MMMM D, YYYY")
    const slug = node.fields.slug
    const featuredImage = node.frontmatter.featuredImage || ""
    const imageData = featuredImage
      ? featuredImage.childImageSharp.fluid
      : ""

    const image = imageData ? (
      <Img
        fluid={imageData}
        sx={{
          borderRadius: "6px",
          ml: [3, 4, 5],
          width: ["100px", "140px", "160px", "180px"],
          backgroundColor: "muted",
        }}
        alt=""
      ></Img>
    ) : (
      ""
    )

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
                fontSize: [4, 5, 6],
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
                fontSize: [4, 5, 6],
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
    const permalink = `#${node.id}`
    const id = node.id
    const slug = node.fields.slug
    return (
      <article
        key={slug}
        sx={{
          mb: "5",
          pb: "5",
          borderBottom: "1px solid",
          borderColor: "muted",
        }}
        id={id}
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
          <a
            href={permalink}
            sx={{
              textDecoration: "none",
              color: "secondary",
            }}
          >
            ⌘ {timeAgo}
          </a>
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
            <SEO title="Feed | Latest posts" />

            {currentBlogs.map(({ node }, index) => {
              if (index < 2) {
                return currentBlogLayout(node)
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
              Archive
            </Button>
          </div>
          <div>
            <ul
	      sx = {{
		listStyle: "none",
		pl: 0,
	      }}
            >
	      <li>
		<a
		  href = "/feed.xml"
		  sx = {{
		    fontFamily: "monospace",
		    display: "block",
		    fontSize: 0,
		    mt: 3,
                    backgroundImage: "none",
		  }}
		>
		  RSS
		</a>
	      </li>
	      <li>
                <Link
		  to = "archive"
		>
                  Everything Archive
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
