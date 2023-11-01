import { Button, NavbarMenuItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

function HamburguerLogout({ setIsMenuOpen }) {
  return (
    <NavbarMenuItem>
      <Button
        as={NavLink}
        variant="light"
        color="danger"
        to="/login"
        className="w-full"
        onClick={() => setIsMenuOpen(false)}
      >
        Log out
      </Button>
    </NavbarMenuItem>
  );
}

export default HamburguerLogout;
