import React from "react"
import { Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from 'theme-ui'
import { Styled } from 'theme-ui'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import TwoCol from "../components/two-col"
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
        <TwoCol extended = 'true'>
          <Nav />
          <div
	    sx = {{
	      display: 'grid',
	      gridGap: ['', 5, '', 6],
	      gridTemplateColumns: [
	      '',
	      '1fr 1fr',
	      ]
	    }}
	  >
            <div
            >
	      <h1
                sx = {{
                  fontFamily: 'heading',
                  fontSize: [5, '', '', 6],
		  letterSpacing: 'heading',
                  lineHeight: 'heading',
                  mt: 0,
                  width: ['', '160%']
		}}
              >
                Patrick Marsceill
		<span
		  sx = {{
		    color: 'secondary',
                    ml: '0.2em',
		  }}
		>
		  is a product design manager at GitHub leading teams that build planet-scale products for 40 million developers.
		</span>
              </h1>
	      <div
                sx = {{
                  fontFamily: 'body',
                  lineHeight: 'body',
                  fontSize: [1, '', '' ,3],
                  color: 'medium',
                }}
              >
		<p>
		  At GitHub, I manage the product design teams that comprise the core workflows that developers use daily:
		</p>
		<Styled.ul>
		  <li>GitHub Actions</li>
		  <li>GitHub Packages</li>
		  <li>Pull Requests</li>
		  <li>Code Review</li>
		  <li>Repositories</li>
		</Styled.ul>
		<p>
		  Before joining GitHub in 2015, I worked in client services partnering with Fortune 500 industry leaders, scrappy start-ups, and mission-driven non-profits to build digital products for screens of all sizes.
		</p>
	      </div>
            </div>
	    <img src={aboutGif} alt="Patrick Marsceill"
	      sx = {{
		width: '100%',
		mt: [4, 6, '']
	      }}
	    />
          </div>
        </TwoCol>
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
