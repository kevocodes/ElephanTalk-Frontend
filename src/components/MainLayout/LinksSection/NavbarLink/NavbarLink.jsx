import { Link, NavbarItem } from "@nextui-org/react";
import { NavLink, useLocation } from "react-router-dom";

function NavbarLink({ to, icon }) {
  const location = useLocation();

  return (
    <NavbarItem isActive={location.pathname === to} className="p-4">
      <Link
        as={NavLink}
        color={location.pathname === to ? "primary" : "foreground"}
        to={to}
      >
        {icon}
      </Link>
    </NavbarItem>
  );
}

export default NavbarLink;
