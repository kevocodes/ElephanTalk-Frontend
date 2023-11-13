import { NavbarContent } from "@nextui-org/react";
import { ThemeSwitcher } from "../../../ThemeSwitcher/ThemeSwitcher";
import ActionButton from "./ActionButton/ActionButton";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../../../../store/auth.store";

function ActionsSection() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <NavbarContent as="div" justify="end" className="gap-1 sm:gap-4">
      <ThemeSwitcher />

      <ActionButton onPress={handleLogout} variant="light" color="primary">
        <Icon icon="tabler:logout" fontSize={28} />
      </ActionButton>
    </NavbarContent>
  );
}

export default ActionsSection;
