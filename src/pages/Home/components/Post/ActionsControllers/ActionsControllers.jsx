import { useState } from "react";
import HeartIcon from "./HeartIcon/HeartIcon";
import FavoriteIcon from "./FavoriteIcon/FavoriteIcon";
import CommentIcon from "./CommentIcon/CommentIcon";
import ControllerToggle from "./ControllerToggle/ControllerToggle";
import ControllerAction from "./ControllerAction/ControllerAction";
import { useNavigate } from "react-router-dom";
import { Chip } from "@nextui-org/react";

function ActionsControllers({ postId, isLiked, isFavorite, isActive, onLike, onFavorite }) {
  const navigate = useNavigate();

  const [favorited, setFavorited] = useState(isFavorite);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    await onLike({ setLiked, liked });
  };

  const handleFavorite = async () => {
    await onFavorite({ setFavorited });
  }

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
      <div className="flex justify-between items-center gap-1">
        {!isActive && (
          <Chip color="primary" variant="flat" size="small">
            Hidden
          </Chip>
        )}

        <ControllerToggle
          state={favorited}
          action={handleFavorite}
          Component={FavoriteIcon}
        />
      </div>
    </div>
  );
}

export default ActionsControllers;
