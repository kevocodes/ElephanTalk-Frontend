import { Avatar, Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsControllers from "../../../../components/ActionsControllers/ActionsControllers";
import CommentForm from "../../../../components/CommentForm/CommentForm";
import InteractionsDetails from "../../../../components/InteractionsDetails/InteractionsDetails";
import OptionsDropdown from "../../../../components/OptionsDropdown/OptionsDropdown";
import PostDetails from "../../../../components/PostDetails/PostDetails";
import { deletePost, hidePost } from "../../../../services/posts.service";
import { useAuthStore } from "../../../../store/auth.store";
import { showAlert } from "../../../../utils/toastify.util";
import CommentSection from "../CommentSection/CommentSection";
import EmptyPlaceholder from "../../../../components/EmptyPlaceholder/EmptyPlaceholder";
import { generateReport } from "../../../../services/toxicity-reports.service";
import { ResponseError } from "../../../../models/ResponseError";

function PostDetail({
  post,
  comments,
  setComments,
  postId,
  onLike,
  onFavorite,
}) {
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const commentInputRef = useRef(null);
  const commentScrollRef = useRef(null);

  const {
    description,
    image,
    user,
    likes,
    isLiked,
    isFavorite,
    active,
    manualReviewed,
  } = post;

  const [postLikes, setLikes] = useState(likes);
  const [isActive, setIsActive] = useState(active);

  // Scroll to top when the comments change
  useEffect(() => {
    if (commentScrollRef.current) {
      commentScrollRef.current.scrollTop = 0;
    }
  }, [comments]);

  const handleLike = async ({ setLiked, liked }) => {
    await onLike({ setLiked, liked, setLikes, postId });
  };

  const handleFavorite = async ({ setFavorited }) => {
    await onFavorite({ setFavorited, postId });
  };

  const handleComment = () => {
    commentInputRef.current.focus();
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
      showAlert("Oops try again later...", "error");
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
      showAlert("Oops try again later...", "error");
      setLoading(false);
      onClose();
    }
  };

  const handleReport = async (data, setLoading, onClose) => {
    try {
      setLoading(true);
      await generateReport({
        token,
        reportedElementId: postId,
        tags: data.tags,
      });
      showAlert("Report sent successfully", "success");
    } catch (error) {
      if (error instanceof ResponseError) {
        return showAlert(error.message, "error");
      }

      showAlert("Oops try again later...", "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Card className="lg:w-10/12 lg:h-full lg:my-5 w-full h-full">
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onHide={handleHide}
            onReport={handleReport}
            userId={user._id}
          />
        )}
      </CardHeader>
      <CardBody className="flex flex-col w-full lg:max-h-full py-4 lg:py-0 items-center lg:px-0 lg:items-start lg:gap-2 lg:flex-row">
        <div className="w-full lg:w-1/2 flex h-full items-center justify-center">
          <Image
            alt="Card background"
            className="w-full"
            classNames={{
              wrapper: "min-w-full min-h-full w-full h-full",
              img: "object-contain w-full h-full",
            }}
            src={image}
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
          <PostDetails description={description} />
          <InteractionsDetails
            onComment={handleComment}
            likes={postLikes}
            comments={comments.length}
          />
          <div className="w-full lg:order-5">
            <CommentForm
              inputRef={commentInputRef}
              setPostsComments={setComments}
              postId={postId}
            />
          </div>
          <div
            className="flex flex-col lg:h-full lg:overflow-auto gap-3 lg:p-2 rounded-lg"
            ref={commentScrollRef}
          >
            {comments?.length > 0 && (
              <CommentSection comments={comments} setComments={setComments} />
            )}
            {comments?.length === 0 && (
              <EmptyPlaceholder
                icon="iconamoon:comment-fill"
                text="No comments yet"
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PostDetail;
