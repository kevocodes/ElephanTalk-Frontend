import { Link } from "react-router-dom";
import LikesDetails from "./LikesDetails/LikesDetails";

function InteractionsDetails({ likes = [], comments = 0, postId }) {
  return (
    <div className="flex items-center justify-between w-full">
      <LikesDetails likes={likes} />

      <Link to={`/post/${postId}`} className="text-small font-semibold">
        <p className="text-small font-semibold ml-2">{comments} comments</p>
      </Link>
    </div>
  );
}

export default InteractionsDetails;
