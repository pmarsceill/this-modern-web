import React from "react"

/** @jsx jsx */
import { jsx } from "theme-ui"


export default props => {
  const { location, title, children } = props
  return (
    <div
      sx = {{
        display: ['block', '', 'grid'],
        gridGap: ['', '', 5, 6],
        gridTemplateColumns: [
          '',
          '',
          '180px minmax(0, 1fr)',
          '180px minmax(0, 1fr) 180px',
        ]
      }}
    >
      {children}
    </div>
  )
}
