import { NavbarContent } from "@nextui-org/react";
import { ThemeSwitcher } from "../../../ThemeSwitcher/ThemeSwitcher";
import ActionButton from "./ActionButton/ActionButton";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function ActionsSection() {
  return (
    <NavbarContent as="div" justify="end" className="gap-1 sm:gap-4">
      <ThemeSwitcher />

      <ActionButton as={Link} to="/login" variant="light" color="primary">
        <Icon icon="tabler:logout" fontSize={28} />
      </ActionButton>
    </NavbarContent>
  );
}

export default ActionsSection;
