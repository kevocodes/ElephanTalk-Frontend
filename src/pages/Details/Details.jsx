import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { useRef } from "react";
import CommentCard from "./components/CommentCard/CommentCard";
import ActionsControllers from "../../components/ActionsControllers/ActionsControllers";
import InteractionsDetails from "../../components/InteractionsDetails/InteractionsDetails";
import CommentForm from "../../components/CommentForm/CommentForm";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentSection from "./components/CommentSection/CommentSection";

function Details() {
  const inputRef = useRef(null);

  const handleComment = () => {
    inputRef.current.focus();
  };

  return (
    <main className="flex-1 absolute top-0 py-14 lg:pb-0 flex flex-col justify-center items-center w-full h-screen">
      <Card className="lg:w-10/12 lg:h-full lg:my-5 w-full h-full ">
        <CardHeader className="justify-between px-5 mt-2">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <p className="text-small font-semibold leading-none">Hola</p>
              <p className="text-small tracking-tight">@Hola</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col w-full max-h-full py-0 items-center lg:px-0 lg:items-start lg:gap-2 lg:flex-row ">
          <div className="lg:w-1/2 lg:flex lg:h-full lg:items-center lg:justify-center">
            <Image
              alt="Card background "
              className="object-cover rounded-xl w-full"
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col h-full lg:overflow-hidden lg:mt-0 mt-2 gap-3 lg:px-2 lg:pb-2">
            <ActionsControllers onComment={handleComment} />
            <PostDetails description="Descripcion default para pruebas" />
            <InteractionsDetails />
            <div className="w-full lg:order-5">
              <CommentForm inputRef={inputRef} />
            </div>
            <div className="flex flex-col lg:h-full lg:overflow-auto gap-3 lg:p-2 rounded-lg">
              <CommentCard />

              <CommentCard />

              <CommentCard />

              <CommentCard />
              <CommentCard />

              <CommentCard />

              <CommentCard />
              <CommentCard />

              <CommentCard />

              <CommentCard />
            </div>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}

export default Details;
