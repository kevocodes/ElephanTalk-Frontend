import { useState } from "react";
import HeartIcon from "./HeartIcon/HeartIcon";
import FavoriteIcon from "./FavoriteIcon/FavoriteIcon";
import CommentIcon from "./CommentIcon/CommentIcon";
import ControllerToggle from "./ControllerToggle/ControllerToggle";
import ControllerAction from "./ControllerAction/ControllerAction";
import { Chip } from "@nextui-org/react";

function ActionsControllers({
  isLiked,
  isFavorite,
  isActive,
  onLike,
  onFavorite,
  onComment,
}) {
  const [favorited, setFavorited] = useState(isFavorite);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    await onLike({ setLiked, liked });
  };

  const handleFavorite = async () => {
    await onFavorite({ setFavorited });
  };

  const handleComment = () => {
    onComment();
  };

  return (
    <div
      data-testid="actions-controllers"
      className="flex items-center justify-between w-full"
    >
      <div className="flex items-center gap-[2px]">
        <ControllerToggle
          state={liked}
          action={handleLike}
          Component={HeartIcon}
          data-testid="like-button"
        />

        <ControllerAction Component={CommentIcon} action={handleComment} />
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
          data-testid="favorite-button"
        />
      </div>
    </div>
  );
}

export default ActionsControllers;
