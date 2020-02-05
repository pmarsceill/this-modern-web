/** @jsx jsx */
import React from 'react'
import { jsx } from "theme-ui"

const ImageRow = ({...props}) => {
  const styles = {
    width: theme => ["", "", `calc(100% + ${theme.space[6]}px)`],
    height: theme => ["", "", `calc(100% + ${theme.space[6]}px)`],
    marginLeft: theme => ["", "", `-${(theme.space[6] / 2)}px !important`],
    marginRight: theme => ["", "", `-${(theme.space[6] / 2)}px !important`],
    display: ["","flex"],
    "> *": {
      flexGrow: 1,
      width: ["", "200px"],
    },
    "> * + *": {
      ml: theme => [`${theme.space[2]}px !important`],
    },
  }

  return (
    <div sx = {styles}>
      {props.children}
    </div>
  )
}

export default ImageRow
