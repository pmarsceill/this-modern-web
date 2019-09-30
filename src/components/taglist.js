import React from "react"

/** @jsx jsx */
import { jsx } from "theme-ui";

export function TagList({tags}) {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <ul
      sx = {{
        listStyle: "none",
        pl: 0,
      }}
    >
      {tags.map(tag => (
        <li
          sx = {{
            display: "inlineBlock",
          }}
          key={tag}>
            {tag}
        </li>
      ))}
    </ul>
  )
}
