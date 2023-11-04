import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import OptionsDropdown from "./OptionsDropdown/OptionsDropdown";
import PostDetails from "./PostDetails/PostDetails";
import ActionsControllers from "./ActionsControllers/ActionsControllers";
import InteractionsDetails from "./InteractionsDetails/InteractionsDetails";
import CommentForm from "./CommentForm/CommentForm";
import { useState } from "react";
import { useAuth } from "../../../../utils/tempUser";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost, hidePost } from "../../../../services/posts.service";

function Post({ info, setPosts }) {
  const {
    description,
    image,
    user,
    likes,
    comments,
    _id: postId,
    isLiked,
    isFavorite,
    active,
  } = info;
  const location = useLocation();
  const navigate = useNavigate();

  const { user: currentUser, token } = useAuth();

  const [postLikes, setLikes] = useState(likes);
  const [postComments, setPostsComments] = useState(comments);
  const [isActive, setIsActive] = useState(active);

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async (setLoading, onClose) => {
    try {
      setLoading(true);
      await deletePost({ token, postId });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      onClose();
    }
  };

  const handleHide = async (setLoading, onClose) => {
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
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      onClose();
    }
  };

  return (
    <Card className="max-w-[468px]">
      <CardHeader className="justify-between px-5">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={user.picture} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <p className="text-small font-semibold leading-none">
              {user.name} {user.lastname}
            </p>
            <p className="text-small tracking-tight">@{user.username}</p>
          </div>
        </div>

        {currentUser._id === user._id && (
          <OptionsDropdown
            isActive={isActive}
            setIsActive={setIsActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onHide={handleHide}
          />
        )}
      </CardHeader>
      <CardBody className="py-2 gap-3">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={480}
          height={360}
        />

        <ActionsControllers
          postId={postId}
          isLiked={isLiked}
          isFavorite={isFavorite}
          setLikes={setLikes}
          isActive={isActive}
        />

        <InteractionsDetails
          likes={postLikes}
          comments={postComments.length}
          postId={postId}
        />

        <PostDetails description={description} />
      </CardBody>

      <CardFooter className="gap-3 px-5">
        <CommentForm setPostsComments={setPostsComments} postId={postId} />
      </CardFooter>
    </Card>
  );
}

export default Post;
