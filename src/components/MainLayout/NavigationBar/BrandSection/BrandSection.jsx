import { Image, NavbarBrand, NavbarContent } from "@nextui-org/react";
import logo from "../../../../assets/logo-letters.webp";

function BrandSection() {
  return (
    <NavbarContent>
      <NavbarBrand>
        <Image src={logo} height={100} width={145} radius="none" />
      </NavbarBrand>
    </NavbarContent>
  );
}

export default BrandSection;
