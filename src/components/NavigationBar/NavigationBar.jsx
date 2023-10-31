import { useState } from "react";
import { Navbar } from "@nextui-org/react";
import { Outlet } from "react-router-dom";
import BrandSection from "./BrandSection/BrandSection";
import LinksSection from "./LinksSection/LinksSection";
import ActionsSection from "./ActionsSection/ActionsSection";
import HamburguerMenu from "./HamburguerMenu/HamburguerMenu";

const navBarClassNames = {
  item: [
    "flex",
    "relative",
    "h-full",
    "items-center",
    "data-[active=true]:after:content-['']",
    "data-[active=true]:after:absolute",
    "data-[active=true]:after:bottom-0",
    "data-[active=true]:after:left-0",
    "data-[active=true]:after:right-0",
    "data-[active=true]:after:h-[2px]",
    "data-[active=true]:after:rounded-[2px]",
    "data-[active=true]:after:bg-primary",
  ],
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        isBlurred={false}
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        classNames={navBarClassNames}
      >
        <BrandSection />

        <LinksSection />

        <ActionsSection setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

        <HamburguerMenu setIsMenuOpen={setIsMenuOpen} />
      </Navbar>

      <Outlet />
    </>
  );
}
