import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

function OptionsDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Icon
          icon="mi:options-horizontal"
          fontSize={25}
          className="hover:cursor-pointer text-default-500"
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
        <DropdownItem key="edit" startContent={""}>
          Edit post
        </DropdownItem>
        <DropdownItem key="hide" startContent={""}>
          Hide post
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default OptionsDropdown;
