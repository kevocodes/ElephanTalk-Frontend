import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import CommentCard from "../CommentCard/CommentCard";
import ActionsControllers from "../../../../components/ActionsControllers/ActionsControllers";
import InteractionsDetails from "../../../../components/InteractionsDetails/InteractionsDetails";
import PostDetails from "../../../../components/PostDetails/PostDetails";
import CommentForm from "../../../../components/CommentForm/CommentForm";
import { useEffect } from "react";

function PostDetail({loading, inputRef, post, comments, setComments, postId, handleComment }) {
  const {
    description,
    image,
    user,
    likes,
    isLiked,
    isFavorite,
    active,
  } = post;

useEffect(() => { 
  console.log(isLiked);
}, [post]);

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
          />
          <PostDetails description={post ? description : ""} />
          <InteractionsDetails
            onComment={handleComment}
            likes={likes}
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
            {!loading &&
              comments.length > 0 &&
              comments.map((comment) => (
                <CommentCard key={comment._id} info={comment} />
              ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PostDetail;
