/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const Button = ({ variant = "primary", block = "false", ...props }) => {
  const styles = {
    appearance: "none",
    display: block == "true" ? "block" : "inline-block",
    textAlign: "center",
    lineHeight: "inherit",
    textDecoration: "none",
    fontSize: "inherit",
    fontWeight: "bold",
    fontFamily: "body",
    m: 0,
    px: 3,
    py: 2,
    border: 0,
    borderRadius: 4,
    // pass variant prop to sx
    variant: `buttons.${variant}`,
  }

  if (props.href) {
    return <a {...props} href={props.href} sx={styles} />
  } else if (props.to) {
    return <Link {...props} to={props.to} sx={styles} />
  } else {
    return <button {...props} sx={styles} />
  }
}

export default Button
