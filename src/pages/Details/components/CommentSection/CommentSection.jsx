import CommentCard from "../CommentCard/CommentCard";

function CommentSection({ comments, setComments }) {
  return comments
    .map((comment) => (
      <CommentCard key={comment._id} info={comment} setComments={setComments} />
    ))
    .reverse();
}

export default CommentSection;
