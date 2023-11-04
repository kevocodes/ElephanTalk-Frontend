import React from 'react'
import CommentCard from '../CommentCard/CommentCard'
import ActionsControllers from "../../../Home/components/Post/ActionsControllers/ActionsControllers";
import InteractionsDetails from "../../../Home/components/Post/InteractionsDetails/InteractionsDetails";
import CommentForm from "../../../Home/components/Post/CommentForm/CommentForm";
import PostDetails from "../../../Home/components/Post/PostDetails/PostDetails";

function CommentSection() {
  return (
    <div className="lg:w-1/2 flex flex-col gap-3 lg:overflow-y-scroll lg:px-2">
          <ActionsControllers />
            <PostDetails  />
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
  )
}

export default CommentSection