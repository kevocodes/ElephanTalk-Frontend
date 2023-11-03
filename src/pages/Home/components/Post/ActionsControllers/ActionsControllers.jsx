import { useState } from "react";
import HeartIcon from "./HeartIcon/HeartIcon";
import FavoriteIcon from "./FavoriteIcon/FavoriteIcon";
import CommentIcon from "./CommentIcon/CommentIcon";
import ControllerToggle from "./ControllerToggle/ControllerToggle";
import ControllerAction from "./ControllerAction/ControllerAction";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../utils/tempUser";
import {
  toggleFavoritePost,
  toggleLikePost,
} from "../../../../../services/posts.service";

function ActionsControllers({ postId, isLiked, isFavorite, setLikes }) {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [favorited, setFavorited] = useState(isFavorite);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      // Update the UI first for better UX
      setLiked((v) => !v);

      setLikes((prevLikes) => {
        if (!liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });

      // Send the request to the server
      await toggleLikePost({ token, postId });
    } catch (error) {
      // If the request fails, set the UI to the previous state
      setLiked((v) => !v); // toggle the like state

      setLikes((prevLikes) => { // Undo the like
        if (liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });

      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      // Update the UI first for better UX
      setFavorited((v) => !v);

      await toggleFavoritePost({ token, postId });
    } catch (error) {
      // If the request fails, set the state to the previous value
      setFavorited((v) => !v);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-[2px]">
        <ControllerToggle
          state={liked}
          action={handleLike}
          Component={HeartIcon}
        />

        <ControllerAction
          Component={CommentIcon}
          action={() => navigate(`/post/${postId}`)}
        />
      </div>

      <ControllerToggle
        state={favorited}
        action={handleFavorite}
        Component={FavoriteIcon}
      />
    </div>
  );
}

export default ActionsControllers;
