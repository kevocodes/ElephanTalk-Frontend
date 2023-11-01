import { NavbarMenuItem, Link } from "@nextui-org/react";
import { NavLink, useLocation } from "react-router-dom";

const activeStyles =
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-[2px] after:bg-primary font-bold";

function HamburguerLink({ setIsMenuOpen, to, name }) {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <NavbarMenuItem>
      <Link
        as={NavLink}
        color={active ? "primary" : "foreground"}
        to={to}
        className={`w-full ${active && activeStyles}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {name}
      </Link>
    </NavbarMenuItem>
  );
}

export default HamburguerLink;
