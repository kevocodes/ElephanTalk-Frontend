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

function Post({ image }) {
  return (
    <Card className="max-w-[468px]">
      <CardHeader className="justify-between px-5">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <p className="text-small font-semibold leading-none">Zoey Lang</p>
            <p className="text-small tracking-tight">@zoeylang</p>
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

        <ActionsControllers />

        <InteractionsDetails
          likes={[
            {
              picture: "https://i.pravatar.cc/150?u=34sdfs3",
              id: 4,
            },
            {
              picture: "https://i.pravatar.cc/150?u=232323434",
              id: 5,
            },
            {
              picture: "https://i.pravatar.cc/150?u=fsdf3445",
              id: 6,
            },
            {
              picture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              id: 1,
            },
          ]}
          comments={3}
          postId={"2323232232"}
        />
        <PostDetails
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quae, ex quos praesentium nobis placeat? Similique excepturi porro quasi ipsam sit magni fugiat eos perspiciatis reprehenderit nobis saepe, cumque minima!"
          }
        />
      </CardBody>

      <CardFooter className="gap-3 px-5">
        <CommentForm />
      </CardFooter>
    </Card>
  );
}

export default Post;
