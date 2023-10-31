import { NavbarContent } from "@nextui-org/react";
import NavbarLink from "./NavbarLink/NavbarLink";

function LinksSection() {
  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarLink to="/" name="Home" />
      <NavbarLink to="/favorites" name="Favorites" />
      <NavbarLink to="/own" name="Own" />
    </NavbarContent>
  );
}

export default LinksSection;
