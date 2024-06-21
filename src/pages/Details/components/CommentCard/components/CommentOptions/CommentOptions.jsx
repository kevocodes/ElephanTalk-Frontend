import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useAuthStore } from "../../../../../../store/auth.store";
import ConfirmationModal from "../../../../../../components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import ReportModal from "../../../../../../components/ReportModal/ReportModal";
import { ResponseError } from "../../../../../../models/ResponseError";
import { showAlert } from "../../../../../../utils/toastify.util";
import { deleteComment } from "../../../../../../services/posts.service";
import { generateReport } from "../../../../../../services/toxicity-reports.service";

function CommentOptions({ userId, commentId, setComments }) {
  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenReport,
    onOpen: onOpenReport,
    onOpenChange: onOpenChangeReport,
    onClose: onCloseReport,
  } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteComment({ commentId, token });
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== commentId)
      );
    } catch (error) {
      if (error instanceof ResponseError)
        return showAlert(error.message, "error");

      showAlert("Oops try again later...", "error");
    } finally {
      setLoading(false);
      onCloseDelete();
    }
  };

  const handleReport = async (data) => {
    try {
      setLoading(true);

      await generateReport({
        token,
        reportedElementId: commentId,
        tags: data.tags,
        type: "comment",
      });

      showAlert("Report sent successfully", "success");
    } catch (error) {
      if (error instanceof ResponseError)
        return showAlert(error.message, "error");

      showAlert("Oops try again later...", "error");
    } finally {
      setLoading(false);
      onCloseReport();
    }
  };

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
            <DropdownItem
              data-testid="delete-button"
              key="delete"
              className="text-danger"
              color="danger"
              onClick={onOpenDelete}
            >
              Delete comment
            </DropdownItem>
          )}

          {currentUser._id !== userId && (
            <DropdownItem
              key="report"
              color="danger"
              className="text-danger"
              onClick={onOpenReport}
            >
              Report comment
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>

      <ConfirmationModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        actionText="Delete"
        action={handleDelete}
        title="Delete comment?"
        description="it cannot be undone and will be permanently removed."
        loading={loading}
      />

      <ReportModal
        isOpen={isOpenReport}
        onOpenChange={onOpenChangeReport}
        actionText={"Report"}
        title={"Report modal"}
        description="What's wrong with this comment?"
        action={handleReport}
      />
    </>
  );
}

export default CommentOptions;
