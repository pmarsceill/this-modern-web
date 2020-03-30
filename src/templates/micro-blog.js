import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TwoCol from "../components/two-col"
import Nav from "../components/nav"
import AncillaryNav from "../components/ancillary-nav"
import PostPagination from "../components/post-pagination"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Styled } from "theme-ui"
import { useColorMode } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { InView } from "react-intersection-observer"
import Img from "gatsby-image"
import moment from "moment"

class MicroBlogPage extends React.Component {
  SetColor() {
    const [colorMode, setColorMode] = useColorMode()

    setColorMode("dark")
    return null
  }

  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const date = moment.utc(post.frontmatter.date)
    const localTime = moment(date)
      .local()
      .format("MMMM D, YYYY ∙ HH:mm A")
    const { previous, next } = this.props.pageContext
    const pageTitle = `Patrick Marsceill: ${post.excerpt}`

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        pageTitle={"Microblog"}
      >
        <this.SetColor />

        <SEO title={pageTitle} />

        <TwoCol>
          <div
            sx={{
              color: "secondary",
              mt: [5, "", "", 2],
              mb: [4, "", "", 0]
            }}
          >
            <Link
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontFamily: "body",
                fontSize: [1, "", "", 2],
                "&.active": {
                  color: "primary",
                },
              }}
            >
              ⤴︎ Feed
            </Link>
          </div>
          <article
            sx={{
              fontFamily: "monospace",
              fontSize: [1, "", "", "", ""],
              lineHeight: "body",
              minHeight: ["", "", "25vh"],
            }}
          >
            <div
              className="postBody"
              sx={{
                mt: [0, "", "", 2],
              }}
            >
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
            <small
              sx={{
                fontFamily: "monospace",
                display: "block",
                fontSize: 0,
                mt: 3,
              }}
            >
              <span
                sx={{
                  textDecoration: "none",
                  color: "secondary",
                }}
              >
                ⌘ {localTime}
              </span>
            </small>
          </article>
          <AncillaryNav />
        </TwoCol>
        <Styled.root>
          <div
            sx={{
              fontFamily: "monospace",
              fontSize: 0,
              lineHeight: "body",
              borderTop: "1px solid",
              borderColor: "muted",
              marginTop: 6,
            }}
          >
            <PostPagination previous={previous} next={next} />
          </div>
        </Styled.root>
      </Layout>
    )
  }
}

export default MicroBlogPage

export const pageQuery = graphql`
  query MicroBlogBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date
        description
      }
    }
  }
`
