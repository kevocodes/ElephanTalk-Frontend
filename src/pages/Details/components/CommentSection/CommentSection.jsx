import CommentCard  from "../CommentCard/CommentCard";

function CommentSection({ comments }) {
  return comments
    .map((comment) => <CommentCard key={comment._id} info={comment} />)
    .reverse();
}

export default CommentSection;
