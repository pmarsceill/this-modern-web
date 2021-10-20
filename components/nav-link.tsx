import Link, { LinkProps } from 'next/link'

import React from 'react'
import { useRouter } from 'next/router'

export interface NavLinkProps extends LinkProps {
  children: React.ReactElement
}

const NavLink = ({ children, href, ...props }: NavLinkProps) => {
  const router = useRouter()
  return (
    <Link href={href} {...props}>
      {router.pathname === href
        ? React.cloneElement(children, { className: 'active' })
        : children}
    </Link>
  )
}

export default NavLink
