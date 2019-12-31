import React from "react"

/** @jsx jsx */
import { jsx } from "theme-ui"

export default props => {
  const { children, extended } = props
  console.log("extended: " + extended)

  if (extended == "true") {
    return (
      <div
        sx={{
          display: ["block", "", "grid"],
          gridGap: ["", "", 4, 5],
          gridTemplateColumns: [
            "",
            "",
            "156px minmax(0, 1fr)",
            "172px minmax(0, 1fr)",
          ],
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
          gridGap: ["", "", 4, 5],
          gridTemplateColumns: [
            "",
            "",
            "156px minmax(0, 1fr)",
            "172px minmax(0, 1fr) 172px",
          ],
        }}
      >
        {children}
      </div>
    )
  }
}
