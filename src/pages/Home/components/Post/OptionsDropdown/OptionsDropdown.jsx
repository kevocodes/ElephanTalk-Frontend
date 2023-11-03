import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost, hidePost } from "../../../../../services/posts.service";
import { useAuth } from "../../../../../utils/tempUser";
import ConfirmationModal from "../../../../../components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";

function OptionsDropdown({ isActive, setIsActive, postId, setPosts }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

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

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePost({ token, postId });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setLoading(false);
      onCloseDelete();
    } catch (error) {
      console.log(error);
      setLoading(false);
      onCloseDelete();
    }
  };

  const handleHide = async () => {
    try {
      setLoading(true);
      await hidePost({ token, postId });
      setIsActive((v) => !v);
      
      // If the user is not in the own page, remove the post from the feed
      if (location.pathname !== "/own") {
        setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
        );
      }   
      
      setLoading(false);
      onCloseHide();
    } catch (error) {
      console.log(error);
      setLoading(false);
      onCloseHide();
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
        } from the feed, but you can ${!isActive ? "hide" : "unhide"} it later.`}
        loading={loading}
      />
    </>
  );
}

export default OptionsDropdown;
