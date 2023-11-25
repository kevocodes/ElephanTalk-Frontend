import { Image, NavbarBrand, NavbarContent } from "@nextui-org/react";
import logo from "../../../../assets/logo-letters.webp";
import { useNavigate } from "react-router-dom";

function BrandSection() {
  const navigate = useNavigate();

  return (
    <NavbarContent>
      <NavbarBrand>
        <Image
          src={logo}
          height={100}
          width={145}
          className="cursor-pointer"
          radius="none"
          onClick={() => navigate("/")}
        />
      </NavbarBrand>
    </NavbarContent>
  );
}

export default BrandSection;
