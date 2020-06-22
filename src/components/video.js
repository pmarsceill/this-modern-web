/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

const Video = ({ ...props }) => {
  const src = props.src

  if (props.alt) {
    const alt = props.alt

    return (
      <figure className="gatsby-resp-image-figure">
        <video
          autoplay="true"
          controls
          loop
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "default",
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support this video type.
        </video>
        <figcaption className="gatsby-resp-image-figcaption">{alt}</figcaption>
      </figure>
    )
  }

  return (
    <video
      autoplay="true"
      controls
      loop
      sx={{
        width: "100%",
        height: "auto",
        borderRadius: "default",
        my: 5,
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support this video type.
    </video>
  )
}
export default Video
