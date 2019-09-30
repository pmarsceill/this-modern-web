import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Styled } from 'theme-ui'
import { useColorMode } from 'theme-ui'
import { MDXRenderer } from "gatsby-plugin-mdx"


export default props => {

    const post = props.data.mdx
    const siteTitle = props.data.site.siteMetadata.title
    const { previous, next } = props.pageContext
    const [colorMode, setColorMode] = useColorMode()

    setColorMode('light')

    return (
      <Layout location={props.location} title={siteTitle}>

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <article
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
          <header>
            <h1
              sx = {{
                fontFamily: 'heading',
                fontSize: 5,
                display: 'inline',
                color: 'secondary',
                mr: 2,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <h2
              sx = {{
                fontFamily: 'heading',
                fontSize: 5,
                fontWeight: 'bold',
                color: 'primary',
                display: 'inline',
              }}
            >
              {post.frontmatter.description}
            </h2>
            <p
              sx = {{
                  fontFamily: 'body',
                  display: 'block',
                  fontSize: 1,
                  color: 'secondary',
                  mt: 3,
                }}
              >
              {post.frontmatter.date}
            </p>
          </header>
          <section>
            <Styled.root>
              <MDXRenderer>{post.body}</MDXRenderer>
            </Styled.root>
          </section>
          <hr
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
