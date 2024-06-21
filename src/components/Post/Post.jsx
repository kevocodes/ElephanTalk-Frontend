import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionsControllers from "../ActionsControllers/ActionsControllers";
import CommentForm from "../CommentForm/CommentForm";
import InteractionsDetails from "../InteractionsDetails/InteractionsDetails";
import OptionsDropdown from "../OptionsDropdown/OptionsDropdown";
import PostDetails from "../PostDetails/PostDetails";
import { useAuthStore } from "../../store/auth.store";

function Post({
  info,
  onLike,
  onFavorite,
  onDelete,
  onHide,
  onReport,
  measureRef,
}) {
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.user);

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
    manualReviewed,
  } = info;

  const [postLikes, setLikes] = useState(likes);
  const [postComments, setPostsComments] = useState(comments);
  const [isActive, setIsActive] = useState(active);

  const handleLike = async ({ setLiked, liked }) => {
    await onLike({ setLiked, liked, setLikes, postId });
  };

  const handleComment = () => {
    navigate(`/post/${postId}`);
  };

  const handleFavorite = async ({ setFavorited }) => {
    await onFavorite({ setFavorited, postId });
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async (setLoading, onClose) => {
    await onDelete({ setLoading, onClose, postId });
  };

  const handleHide = async (setLoading, onClose) => {
    await onHide({ setLoading, onClose, postId, setIsActive });
  };

  const handleReport = async (data, setLoading, onClose) => {
    await onReport({ data, setLoading, onClose, postId });
  };

  return (
    <Card data-testid="post" className="max-w-[468px]" ref={measureRef}>
      <CardHeader className="justify-between px-5">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={user.picture} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <p className="text-small font-semibold leading-none">
              {`${user.name} ${user.lastname}`}
            </p>
            <p className="text-small tracking-tight">{`@${user.username}`}</p>
          </div>
        </div>

        {(!manualReviewed || currentUser._id === user._id) && (
          <OptionsDropdown
            isActive={isActive}
            setIsActive={setIsActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onHide={handleHide}
            onReport={handleReport}
            userId={user._id}
          />
        )}
      </CardHeader>
      <CardBody className="py-2 gap-3">
        <Link to={`/post/${postId}`}>
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
            width={480}
            height={360}
          />
        </Link>

        <ActionsControllers
          postId={postId}
          isLiked={isLiked}
          isFavorite={isFavorite}
          isActive={isActive}
          onLike={handleLike}
          onFavorite={handleFavorite}
          onComment={handleComment}
        />

        <InteractionsDetails
          likes={postLikes}
          comments={postComments?.length}
          onComment={handleComment}
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
