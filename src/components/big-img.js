/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

const BigImage = ({ ...props }) => {
  const styles = {
    width: theme => ["", "", `calc(100% + ${theme.space[7]}px)`],
    height: theme => ["", "", `calc(100% + ${theme.space[7]}px)`],
    marginLeft: theme => ["", "", `-${theme.space[7] / 2}px !important`],
    marginRight: theme => ["", "", `-${theme.space[7] / 2}px !important`],
    fontSize: [1],
    my: 2,
    color: "secondary",
  }

  return <div sx={styles}>{props.children}</div>
}

export default BigImage
