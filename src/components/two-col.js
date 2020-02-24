import React from "react"

/** @jsx jsx */
import { jsx } from "theme-ui"

export default props => {
  const { children, extended } = props

  if (extended == "true") {
    return (
      <div
        sx={{
          display: ["block", "", "grid"],
          gridGap: ["", "", 3, "", 6],
          gridTemplateColumns: ["", "", "", "172px minmax(0, 1fr)"],
        }}
      >
        {children}
      </div>
    )
  } else {
    return (
      <div
        sx={{
          display: ["block", "", "grid"],
          gridGap: ["", "", 5, "", 6],
          gridTemplateColumns: ["", "", "", "172px minmax(0, 1fr) 172px"],
        }}
      >
        {children}
      </div>
    )
  }
}
