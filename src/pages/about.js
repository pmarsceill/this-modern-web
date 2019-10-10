import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from 'theme-ui'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Image from "gatsby-image"
import aboutGif from '../../content/assets/patrick-marsceill.gif'


export default props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const [colorMode, setColorMode] = useColorMode()

  setColorMode('light')
  return (
    <Layout
      location={props.location}
      title={siteTitle}
      >
        <div
          sx = {{
            display: ['block', '', 'grid'],
            gridGap: ['', '', 5],
            gridTemplateColumns: [
              '',
              '',
              '180px minmax(0, 1fr) 180px',
            ]
          }}
        >
          <Nav />
          <div
	    sx = {{
	      display: ['block', '', 'grid'],
	      gridGap: ['', '', 5],
	      gridTemplateColumns: [
	      '',
	      '',
	      '2fr 2fr',
	      ]
	    }}
	  >
            <img src={aboutGif} alt="Patrick Marsceill"
              sx = {{
                width: ['100%', '', 'auto'],
                maxWidth: '400px',
              }}
	    />
            <div>
	      <h1
                sx = {{
                  fontFamily: 'heading',
                  fontSize: 4,
		  letterSpacing: 'heading',
		}}
              >
                Getting there...
              </h1>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query SiteQuery {
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
