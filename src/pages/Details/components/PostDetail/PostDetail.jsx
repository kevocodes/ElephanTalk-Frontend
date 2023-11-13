import { Avatar, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import CommentCard from "../CommentCard/CommentCard";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsControllers from "../../../../components/ActionsControllers/ActionsControllers";
import CommentForm from "../../../../components/CommentForm/CommentForm";
import InteractionsDetails from "../../../../components/InteractionsDetails/InteractionsDetails";
import OptionsDropdown from "../../../../components/OptionsDropdown/OptionsDropdown";
import PostDetails from "../../../../components/PostDetails/PostDetails";
import { deletePost, hidePost } from "../../../../services/posts.service";
import { useAuthStore } from "../../../../store/auth.store";

function PostDetail({
  post,
  comments,
  setComments,
  postId,
  onLike,
  onFavorite,
}) {
  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { description, image, user, likes, isLiked, isFavorite, active } = post;
  const [postLikes, setLikes] = useState(likes);

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(active);

  const handleLike = async ({ setLiked, liked }) => {
    await onLike({ setLiked, liked, setLikes, postId });
  };

  const handleFavorite = async ({ setFavorited }) => {
    await onFavorite({ setFavorited, postId });
    console.log(currentUser._id);
    console.log(user._id);
  };

  const inputRef = useRef(null);

  const handleComment = () => {
    inputRef.current.focus();
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async (setLoading, onClose) => {
    try {
      setLoading(true);
      await deletePost({ token, postId });
      setLoading(false);
      onClose();
      navigate(`/`);
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

      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      onClose();
    }
  };

  return (
    <Card className="lg:w-10/12 lg:h-full lg:my-5 w-full h-full ">
      <CardHeader className="justify-between px-5 mt-2">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={post ? user.picture : ""}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <p className="text-small font-semibold leading-none">
              {post ? `${user.name} ${user.lastname}` : ""}
            </p>
            <p className="text-small tracking-tight">
              {post ? `@${user.username}` : ""}
            </p>
          </div>
        </div>
        {post && currentUser._id === user._id && (
          <OptionsDropdown
            isActive={active}
            setIsActive={isActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onHide={handleHide}
          />
        )}
      </CardHeader>
      <CardBody className="flex flex-col  w-full max-h-full py-0 items-center lg:px-0 lg:items-start lg:gap-2 lg:flex-row ">
        <div className="lg:w-1/2 lg:flex overflow-hidden lg:h-full lg:items-center lg:justify-center">
          <Image
            alt="Card background "
            className="object-cover rounded-xl"
            src={post ? image : ""}
            width={600}
          />
        </div>
        <div className="lg:w-1/2 w-full flex flex-col h-full lg:overflow-hidden lg:mt-0 mt-2 gap-3 lg:px-2 lg:pb-2">
          <ActionsControllers
            onComment={handleComment}
            isLiked={isLiked}
            isFavorite={isFavorite}
            isActive={isActive}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
          <PostDetails description={post ? description : ""} />
          <InteractionsDetails
            onComment={handleComment}
            likes={postLikes}
            comments={post ? comments.length : ""}
          />
          <div className="w-full lg:order-5">
            <CommentForm
              inputRef={inputRef}
              setPostsComments={setComments}
              postId={postId}
            />
          </div>
          <div className="flex flex-col lg:h-full lg:overflow-auto gap-3 lg:p-2 rounded-lg">
            {comments.map((comment) => (
              <CommentCard key={comment._id} info={comment} />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PostDetail;
