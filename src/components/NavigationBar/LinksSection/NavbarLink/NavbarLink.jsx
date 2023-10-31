import { Link, NavbarItem } from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'

function NavbarLink({ to, name }) {
  const location = useLocation()

  return (
    <NavbarItem isActive={location.pathname === to}>
    <Link
      as={NavLink}
      color={location.pathname === to ? "primary" : "foreground"}
      to={to}
    >
      { name }
    </Link>
  </NavbarItem>
  )
}

export default NavbarLink