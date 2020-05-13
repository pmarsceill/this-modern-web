/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

const SmallImage = ({ ...props }) => {
  const styles = {
    maxWidth: theme => ["", `420px`],
    height: theme => ["", `auto`],
    fontSize: [1],
    my: 2,
    mx: "auto",
    color: "secondary",
  }

  return <div sx={styles}>{props.children}</div>
}

export default SmallImage
