import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

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
