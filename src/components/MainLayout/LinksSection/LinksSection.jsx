import { NavbarContent } from "@nextui-org/react";
import NavbarLink from "./NavbarLink/NavbarLink";
import { Icon } from "@iconify/react";

function LinksSection({ classNames }) {
  return (
    <NavbarContent
      data-testid="navlinks"
      className={`gap-4 xs:gap-8 ${classNames}`}
      justify="center"
    >
      <NavbarLink
        to="/"
        icon={<Icon icon="material-symbols:home" fontSize={30} />}
      />
      <NavbarLink
        to="/favorites"
        icon={<Icon icon="material-symbols:bookmark" fontSize={30} />}
      />
      <NavbarLink
        data-testid="create"
        to="/create"
        icon={<Icon icon="material-symbols:add-box-rounded" fontSize={30} />}
      />
      <NavbarLink to="/own" icon={<Icon icon="mdi:account" fontSize={30} />} />
    </NavbarContent>
  );
}

export default LinksSection;
