/** @jsxImportSource theme-ui */

import { ThemeUIStyleObject } from '@theme-ui/css'

type ButtonTypes = HTMLAnchorElement | HTMLButtonElement
interface Props<T extends ButtonTypes>
  extends React.ButtonHTMLAttributes<T>,
    React.AnchorHTMLAttributes<T> {
  variant?: string
  block?: boolean
  size?: string
  as?: 'button' | 'a'
  children?: React.ReactNode
  sx?: ThemeUIStyleObject
  type?: 'submit' | 'reset' | 'button'
}
const Button = <T extends ButtonTypes>({
  variant = 'primary',
  block = false,
  size = 'inherit',
  as = 'button',
  sx,
  children,
  ...props
}: Props<T>) => {
  const styles: ThemeUIStyleObject = {
    appearance: 'none',
    display: block ? 'block' : 'inline-block',
    textAlign: 'center',
    lineHeight: 'inherit',
    textDecoration: 'none',
    fontSize: size,
    fontWeight: 'bold',
    letterSpacing: '-0.02em',
    fontFamily: 'body',
    backgroundImage: 'none !important',
    m: 0,
    px: 3,
    py: 2,
    border: 0,
    borderRadius: 2,
    // pass variant prop to sx
    variant: `buttons.${variant}`,
  }

  if (as === 'a') {
    return (
      <a
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        sx={{ ...styles, ...sx }}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        sx={{ ...styles, ...sx }}
      >
        {children}
      </button>
    )
  }
}

export default Button
