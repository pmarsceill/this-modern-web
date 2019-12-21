import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Micropub() {
  return (
    <Helmet>
      <link rel="authorization_endpoint" href="https://github-indieauth.herokuapp.com/auth" />
      <link rel="token_endpoint" href="https://github-indieauth.herokuapp.com/token" />
      <link rel="micropub" href="https://tmw-mp-enpoint.glitch.me/micropub" />
    </Helmet>
  )
}

export default Micropub
