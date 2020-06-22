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

  function CurrentBlogLayout(props) {
    const title = props.node.frontmatter.title || props.node.fields.slug
    const tags = props.node.frontmatter.tags || []
    const description = props.node.frontmatter.description || ""
    const date = moment.utc(props.node.frontmatter.date).format("MMMM D, YYYY")
    const featuredImage = props.node.frontmatter.featuredImage || ""
    const imageData = featuredImage ? featuredImage.childImageSharp.fluid : ""
    const excerpt = props.node.excerpt
    const slug = props.node.fields.slug

    const image = imageData ? (
      <Img
        fluid={imageData}
        sx={{
          borderRadius: "12px",
          ml: [3, 4, 5],
          width: ["100px", "140px", "160px", "160px", "180px"],
          backgroundColor: "muted",
        }}
        alt=""
      ></Img>
    ) : (
      ""
    )

    const first = props.index === 0

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

  function MicroBlogLayout(props) {
    const body =
      props.node.body || props.node.fields.title || props.node.fields.slug
    const timeAgo = moment.utc(props.node.frontmatter.date).fromNow()
    const slug = props.node.fields.slug

    return (
      <article
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
    <Layout location={props.location}>
      <div>
        <TwoCol>
          <Nav />
          <div>
            <SEO title="Patrick Marsceill" />

            {currentBlogs.map(({ node }, index) => {
              const slug = node.fields.slug
              if (index < 2) {
                return (
                  <CurrentBlogLayout node={node} index={index} key={slug} />
                )
              }
            })}

            {microBlogs.map(({ node }, index) => {
              const slug = node.fields.slug

              if (index < 4) {
                return <MicroBlogLayout node={node} key={slug} />
              }
            })}

            {currentBlogs.map(({ node }, index) => {
              const slug = node.fields.slug

              if (index >= 2 && index <= 4) {
                return <CurrentBlogLayout node={node} key={slug} />
              }
            })}

            {microBlogs.map(({ node }, index) => {
              const slug = node.fields.slug

              if (index >= 4) {
                return <MicroBlogLayout node={node} key={slug} />
              }
            })}

            <Button variant="outline" to="archive" block="true">
              Everything Archive
            </Button>
          </div>
          <AncillaryNav />
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
