import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { Styled } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"

export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const [colorMode, setColorMode] = useColorMode()

  setColorMode("light")
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Inbox" />
      <div
        sx={{
          display: ["block", "", "grid"],
          gridGap: ["", "", 5],
          gridTemplateColumns: ["", "", "180px minmax(0, 1fr) 180px"],
        }}
      >
        <Nav />
        <div>
            <h1
              sx={{
                fontFamily: "heading",
                fontSize: [5, "", 6, 7],
                letterSpacing: "heading",
                lineHeight: "heading",
                mt: 0,
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
        </div>
      </div>
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
  }
`
