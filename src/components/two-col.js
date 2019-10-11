import React from "react"

/** @jsx jsx */
import { jsx } from "theme-ui"

export default props => {
  const { children, extended } = props
  console.log('extended: ' + extended)

  if (extended == 'true') {
    return (
      <div
	sx = {{
	  display: ['block', '', 'grid'],
	    gridGap: ['', '', 4, 6],
	    gridTemplateColumns: [
	    '',
	    '',
	    '160px minmax(0, 1fr)',
	    '180px minmax(0, 1fr)',
	]
	}}
      >
	{children}
      </div>
    )
  } else {
    return (
      <div
	sx = {{
	  display: ['block', '', 'grid'],
	  gridGap: ['', '', 4, 6],
	  gridTemplateColumns: [
	    '',
	    '',
	    '160px minmax(0, 1fr)',
	    '180px minmax(0, 1fr) 180px',
	  ]
	}}
      >
	{children}
      </div>
    )
  }
}
