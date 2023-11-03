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

function Post({ info }) {
  const {
    description,
    image,
    user,
    likes,
    comments,
    _id,
    isLiked,
    isFavorite,
  } = info;

  const [postLikes, setLikes] = useState(likes);

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

        <OptionsDropdown />
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
          postId={_id}
          isLiked={isLiked}
          isFavorite={isFavorite}
          setLikes={setLikes}
        />

        <InteractionsDetails
          likes={postLikes}
          comments={comments.length}
          postId={_id}
        />

        <PostDetails description={description} />
      </CardBody>

      <CardFooter className="gap-3 px-5">
        <CommentForm />
      </CardFooter>
    </Card>
  );
}

export default Post;
