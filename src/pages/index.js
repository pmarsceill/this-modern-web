import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from 'theme-ui'
import { Styled } from 'theme-ui'
import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from "moment"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
    return !tags.includes("microblog") && !tags.includes("legacy")
  })

  const [colorMode, setColorMode] = useColorMode()

  setColorMode('default')

  function currentBlogLayout(title, tags, description, date, slug) {
    return (
      <article
        key = {slug}
        sx = {{
          mb: '4',
          pb: '4',
          borderBottom: '1px solid',
          borderColor: 'muted',
        }}
      >
        <Link
          to = {slug}
          sx = {{
            color: 'primary',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          <h3
            sx = {{
              display: 'inline',
              fontFamily: 'heading',
              fontSize: 6,
            }}
          >
              {title}
          </h3>
          <p
            sx = {{
              fontFamily: 'heading',
              display: 'inline',
              fontSize: 6,
              color: 'secondary',
              fontWeight: 'bold',
              ml: 2,
            }}
          >
            {description}
          </p>
        </Link>
        <small
          sx = {{
            fontFamily: 'body',
            display: 'block',
            fontSize: 1,
            color: 'greyLt0',
            mt: 3,
          }}
        >
          {date}
        </small>
      </article>
    )
  }

  function microBlogLayout(body, timeAgo, permalink, id, slug) {return (
    <article
      key = {slug}
      sx = {{
        mb: '4',
          pb: '4',
          borderBottom: '1px solid',
          borderColor: 'muted',
      }}
      id = {id}
    >
    <div
      sx = {{
        color: 'primary',
        textDecoration: 'none',
        fontSize: 'body',
      }}
    >
      <Styled.root
        sx = {{
          fontFamily: 'monospace',
          fontSize: 1,
        }}
      >
        <MDXRenderer>
          {body}
        </MDXRenderer>
      </Styled.root>
    </div>

    <small
      sx = {{
        fontFamily: 'monospace',
        display: 'block',
        fontSize: 0,
        mt: 3,
      }}
    >
      <Link
        to = {permalink}
        sx = {{
          textDecoration: 'none',
          color: 'secondary',
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
      <div
        sx = {{
          display: ['block', '', 'grid'],
          gridGap: 5,
          gridTemplateColumns: [
            '',
            '',
            '180px 1fr',
            '320px 1fr',
          ]
        }}
      >
        <nav>
          <ul
            sx = {{
              display: ['flex', '', 'block'],
              listStyle: 'none',
              my: [4, '', 0],
              pl: 0,
              pb: [4, '', 0],
              justifyContent: 'space-between',
              borderBottom: ['1px solid', '', 'none'],
              borderColor: 'muted',
            }}
          >
            <li
              sx = {{
                display: 'block',
                mt: [0, '', 2],
              }}
            >
              <Link
                to = "/"
                sx = {{
                  color: 'primary',
                  textDecoration: 'none',
                  fontFamily: 'body',
                  fontSize: [3, '', '', 4],
                }}
              >
                <span
                  sx = {{
                    fontFamily: 'monospace',
                      mr: 3,
                  }}
                >
                  1.0
                </span>
                Feed
              </Link>
            </li>
            <li
              sx = {{
                display: 'block',
                mt: [0, '', 6],
              }}
            >
              <Link
                to = "/"
                sx = {{
                  color: 'secondary',
                  textDecoration: 'none',
                  fontFamily: 'body',
                  fontSize: [3, '', '', 4],
                }}
              >
              <span
                sx = {{
                  fontFamily: 'monospace',
                  mr: 3,
                }}
              >
              1.1
              </span>
              About
              </Link>
            </li>
            <li
              sx = {{
                display: 'block',
                mt: [0, '', 6],
              }}
            >
              <Link
                to = "/"
                sx = {{
                  color: 'secondary',
                  textDecoration: 'none',
                  fontFamily: 'body',
                  fontSize: [3, '', '', 4],
                }}
              >
              <span
                sx = {{
                  fontFamily: 'monospace',
                  mr: 3,
                }}
              >
              1.2
              </span>
              Page
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <SEO title="All posts" />

          {currentBlogs.map(({node}, index) => {
            const title = node.frontmatter.title || node.fields.slug
            const tags = node.frontmatter.tags || []
            const description = node.frontmatter.description || ""
            const date = node.frontmatter.date
            const slug = node.fields.slug

            if (index < 2) {
              return (
                currentBlogLayout(title, tags, description, date, slug)
              )
            }
          })}

          {microBlogs.map(({ node }, index) => {
            const body = node.body || node.fields.title || node.fields.slug
            const timeAgo = moment(node.frontmatter.date).fromNow()
            const permalink = `#${node.id}`
            const id = node.id
            const slug = node.fields.slug

            if (index < 4) {
              return (
                microBlogLayout(body, timeAgo, permalink, id, slug)
              )
            }
          })}
          {currentBlogs.map(({node}, index) => {
            const title = node.frontmatter.title || node.fields.slug
            const tags = node.frontmatter.tags || []
            const description = node.frontmatter.description || ""
            const date = node.frontmatter.date
            const slug = node.fields.slug

            if (index >= 2 && index <= 4) {
              return (
                currentBlogLayout(title, tags, description, date, slug)
              )
            }
          })}
          {microBlogs.map(({ node }, index) => {
            const body = node.body || node.fields.title || node.fields.slug
            const timeAgo = moment(node.frontmatter.date).fromNow()
            const permalink = `#${node.id}`
            const id = node.id
            const slug = node.fields.slug

            if (index >= 4) {
              return (
                microBlogLayout(body, timeAgo, permalink, id, slug)
              )
            }
            })}
        </div>
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
