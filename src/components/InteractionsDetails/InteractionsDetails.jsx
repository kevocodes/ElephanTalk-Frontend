import LikesDetails from "./LikesDetails/LikesDetails";

function InteractionsDetails({ likes = [], comments = 0, onComment }) {
  return (
    <div className="flex items-center justify-between w-full">
      <LikesDetails likes={likes} />

      <p
        className="text-small hover:cursor-pointer font-semibold"
        onClick={onComment}
      >
        {comments} comments
      </p>
    </div>
  );
}

export default InteractionsDetails;
