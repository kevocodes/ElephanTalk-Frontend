import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";

function OptionsDropdown({ isActive, onEdit, onDelete, onHide }) {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenHide,
    onOpen: onOpenHide,
    onOpenChange: onOpenChangeHide,
    onClose: onCloseHide,
  } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const handleEdit = () => onEdit();

  const handleDelete = async () => onDelete(setLoading, onCloseDelete);

  const handleHide = async () => onHide(setLoading, onCloseHide);

  return (``   <>
      <Dropdown>
        <DropdownTrigger>
          <Icon
            icon="mi:options-horizontal"
            fontSize={25}
            className="hover:cursor-pointer text-default-500"
          />
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
          <DropdownItem key="edit" onClick={handleEdit}>
            Edit post
          </DropdownItem>
          <DropdownItem key="hide" onClick={onOpenHide}>
            {isActive ? "Hide post" : "Unhide post"}
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={onOpenDelete}
          >
            Delete post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ConfirmationModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        actionText="Delete"
        action={handleDelete}
        title="Delete post?"
        description="it cannot be undone and will be permanently removed along with comments, likes, and any other interactions."
        loading={loading}
      />
      <ConfirmationModal
        isOpen={isOpenHide}
        onOpenChange={onOpenChangeHide}
        actionText={isActive ? "Hide" : "Unhide"}
        action={handleHide}
        title={`${isActive ? "Hide" : "Unhide"} post?`}
        description={`It will be temporarily ${
          isActive ? "hidden" : "unhidden"
        } from the feed, but you can ${
          !isActive ? "hide" : "unhide"
        } it later.`}
        loading={loading}
      />
    </>
  );
}

export default OptionsDropdown;
