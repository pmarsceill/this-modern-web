/** @jsx jsx */
import React from 'react'
import { jsx } from "theme-ui"

const BigImage = ({...props}) => {
  const styles = {
    width: theme => ["", "", `calc(100% + ${theme.space[6]}px)`],
    height: theme => ["", "", `calc(100% + ${theme.space[6]}px)`],
    marginLeft: theme => ["", "", `-${theme.space[6] / 2}px !important`],
    marginRight: theme => ["", "", `-${theme.space[3] / 2}px !important`],
    fontSize: [1],
    my: 2,
    color: "secondary",
  }

  return (
    <div sx = {styles}>
      {props.children}
    </div>
  )
}

export default BigImage

