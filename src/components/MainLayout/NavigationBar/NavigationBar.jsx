import { Navbar } from "@nextui-org/react";
import { navBarClassNames } from "../../../constants/navbar";
import BrandSection from "./BrandSection/BrandSection";
import LinksSection from "../LinksSection/LinksSection";
import ActionsSection from "./ActionsSection/ActionsSection";

function NavigationBar() {
  return (
    <Navbar
      isBlurred={false}
      shouldHideOnScroll
      isBordered
      maxWidth="full"
      height="3.5rem"
      classNames={navBarClassNames}
    >
      <BrandSection />

      <LinksSection classNames="hidden md:flex" />

      <ActionsSection />
    </Navbar>
  );
}

export default NavigationBar;
