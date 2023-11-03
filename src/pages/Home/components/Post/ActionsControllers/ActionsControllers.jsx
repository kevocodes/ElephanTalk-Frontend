import { useState } from "react";
import HeartIcon from "./HeartIcon/HeartIcon";
import FavoriteIcon from "./FavoriteIcon/FavoriteIcon";
import CommentIcon from "./CommentIcon/CommentIcon";
import ControllerToggle from "./ControllerToggle/ControllerToggle";
import ControllerAction from "./ControllerAction/ControllerAction";
import { useNavigate } from "react-router-dom";

function ActionsControllers({ postId }) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-[2px]">
        <ControllerToggle
          state={liked}
          action={() => setLiked((v) => !v)}
          Component={HeartIcon}
        />

        <ControllerAction
          Component={CommentIcon}
          action={() => navigate(`/post/${postId}`)}
        />
      </div>

      <ControllerToggle
        state={favorited}
        action={() => setFavorited((v) => !v)}
        Component={FavoriteIcon}
      />
    </div>
  );
}

export default ActionsControllers;
