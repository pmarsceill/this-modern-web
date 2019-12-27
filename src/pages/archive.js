import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from 'theme-ui'
import { Styled } from 'theme-ui'
import moment from "moment"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title + ` / Archive`
  const [colorMode, setColorMode] = useColorMode()

  setColorMode('dark')

  const posts = data.allMdx.edges
  const reversePosts = [...new Set(posts)].reverse()

  function spreadYears() {
    const years = []

    posts.map(({node}, index) => {
      const year = moment.utc(node.frontmatter.date).format('YYYY')
      years.push(year)
    })
    const uniqYears = [...new Set(years)].reverse()

    return(
      uniqYears.map((year, index) => {
        const yearlyPosts = []

	return (
          <div>
	    <Styled.h2>{year}</Styled.h2>
	      {reversePosts.map(({node}, index) => {
		const postYear = moment.utc(node.frontmatter.date).format('YYYY')
                const microblog = (node.frontmatter.date == node.frontmatter.title ? true : false)

		if (postYear == year) {
                  if (microblog == true) {

		    const timeAgo = moment.utc(node.frontmatter.date).fromNow()

                    return (
                      <article>
		      <div
		      sx = {{
			color: 'primary',
			  textDecoration: 'none',
			  fontSize: 'body',
		      }}
		      >
		      <Styled.root>
			<div
		      sx = {{
			fontFamily: 'monospace',
			  fontSize: [1, '', '', '', ''],
			  lineHeight: 'body',
		      }}
		      >
		      <MDXRenderer>
			{node.body}
		      </MDXRenderer>
		      </div>
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
			<a
			  href = {node.fields.slug}
			  sx = {{
			    textDecoration: 'none',
			    color: 'secondary',
			  }}
			>
			  ⌘ {timeAgo}
			</a>
		      </small>
                      </article>
                    )
                  } else {
		    return(
                      <article>
			<Link to={node.fields.slug}><Styled.h3>{node.frontmatter.title}</Styled.h3>{node.frontmatter.description}</Link>
                      </article>
		    )
                  }
		}
	      })}
          </div>
	)
      })
    )
  }

  return (
    <Layout
    location={props.location}
    title={siteTitle}
    >
      <Styled.h1>Archive</Styled.h1>

      {spreadYears()}

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
    allMdx(sort: { fields: [frontmatter___date], order: DESC}) {
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

