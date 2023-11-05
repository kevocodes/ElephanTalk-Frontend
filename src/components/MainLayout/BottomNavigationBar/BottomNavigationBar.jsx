import { Navbar } from "@nextui-org/react";
import { useState } from "react";
import { bottomNavBarClassNames } from "../../../constants/navbar";
import LinksSection from "../LinksSection/LinksSection";

function BottomNavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBlurred={false}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      height="3.5rem"
      classNames={bottomNavBarClassNames}
    >
      <LinksSection classNames="md:hidden flex" />
    </Navbar>
  );
}

export default BottomNavigationBar;
