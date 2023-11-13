import React from "react";
import CommentCard from "../CommentCard/CommentCard";
import ActionsControllers from "../../../../components/ActionsControllers/ActionsControllers";
import InteractionsDetails from "../../../../components/InteractionsDetails/InteractionsDetails";
import CommentForm from "../../../../components/CommentForm/CommentForm";
import PostDetails from "../../../../components/PostDetails/PostDetails";

function CommentSection() {
  return (
    <div className="lg:w-1/2 flex flex-col gap-3 lg:overflow-y-scroll lg:px-2">
      <ActionsControllers />
      <PostDetails />
      <InteractionsDetails />
      <CommentForm />
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
  );
}

export default CommentSection;
