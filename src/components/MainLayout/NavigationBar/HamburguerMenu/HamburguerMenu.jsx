import { NavbarMenu } from "@nextui-org/react";
import HamburguerLink from "./HamburguerLink/HamburguerLink";
import HamburguerLogout from "./HamburguerLogout/HamburguerLogout";

function HamburguerMenu({ setIsMenuOpen }) {
  return (
    <NavbarMenu className="items-center">
      <HamburguerLink setIsMenuOpen={setIsMenuOpen} to="/" name="Home" />

      <HamburguerLink
        setIsMenuOpen={setIsMenuOpen}
        to="/favorites"
        name="Favorites"
      />

      <HamburguerLink setIsMenuOpen={setIsMenuOpen} to="/own" name="Own" />

      <HamburguerLogout setIsMenuOpen={setIsMenuOpen} />
    </NavbarMenu>
  );
}

export default HamburguerMenu;
