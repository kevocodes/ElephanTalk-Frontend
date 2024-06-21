import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import ReportModal from "../ReportModal/ReportModal";

function OptionsDropdown({
  isActive,
  onEdit,
  onDelete,
  onHide,
  onReport,
  userId,
}) {
  const currentUser = useAuthStore((state) => state.user);

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

  const {
    isOpen: isOpenReport,
    onOpen: onOpenReport,
    onOpenChange: onOpenChangeReport,
    onClose: onCloseReport,
  } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const handleEdit = () => onEdit();

  const handleDelete = async () => onDelete(setLoading, onCloseDelete);

  const handleHide = async () => onHide(setLoading, onCloseHide);

  const handleReport = (data) => onReport( data, setLoading, onCloseReport);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Icon
            data-testid="options-button"
            icon="mi:options-horizontal"
            fontSize={25}
            className="hover:cursor-pointer text-default-500"
          />
        </DropdownTrigger>
        <DropdownMenu
          data-testid="options-menu"
          variant="flat"
          aria-label="Dropdown menu with icons"
        >
          {currentUser._id === userId && (
            <DropdownItem key="edit" onClick={handleEdit}>
              Edit post
            </DropdownItem>
          )}

          {currentUser._id === userId && (
            <DropdownItem key="hide" onClick={onOpenHide}>
              {isActive ? "Hide post" : "Unhide post"}
            </DropdownItem>
          )}

          {currentUser._id === userId && (
            <DropdownItem
              data-testid="delete-button"
              key="delete"
              className="text-danger"
              color="danger"
              onClick={onOpenDelete}
            >
              Delete post
            </DropdownItem>
          )}

          {currentUser._id !== userId && (
            <DropdownItem
              key="report"
              color="danger"
              className="text-danger"
              onClick={onOpenReport}
            >
              Report post
            </DropdownItem>
          )}
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

      <ReportModal
        isOpen={isOpenReport}
        onOpenChange={onOpenChangeReport}
        actionText={"Report"}
        title={"Report post"}
        description="What's wrong with this post?"
        action={handleReport}
      />
    </>
  );
}

export default OptionsDropdown;
