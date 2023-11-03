import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../../../services/posts.service";
import { useAuth } from "../../../../../utils/tempUser";
import DeleteConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";

function OptionsDropdown({ isActive, postId, setPosts }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${postId}1`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePost({ token, postId });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Icon
            icon="mi:options-horizontal"
            fontSize={25}
            className="hover:cursor-pointer text-default-500"
          />
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
          <DropdownItem key="edit" startContent={""} onClick={handleEdit}>
            Edit post
          </DropdownItem>
          <DropdownItem key="hide" startContent={""}>
            Hide post
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={onOpen}
          >
            Delete post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        actionText="Delete"
        action={handleDelete}
        title="Delete post?"
        description="it cannot be undone and will be permanently removed along with comments, likes, and any other interactions."
        loading={loading}
      />
    </>
  );
}

export default OptionsDropdown;
