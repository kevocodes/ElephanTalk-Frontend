import { Avatar, AvatarGroup } from "@nextui-org/react";

function LikesDetails({ likes = [] }) {
  // Get the 3 most recent likes
  const last3Likes = likes.slice(-3).reverse();

  return (
    <div className="flex items-center justify-start">
      {likes.length === 0 && (
        <p className="text-small font-semibold">0 likes</p>
      )}

      {likes.length > 0 && (
        <AvatarGroup
          isBordered
          max={3}
          total={likes.length}
          className="flex gap-1"
          renderCount={(count) => (
            <p className="text-small font-semibold ml-2">{count} likes</p>
          )}
        >
          {last3Likes.map((like, index) => (
            <Avatar
              key={index}
              src={like.picture}
              classNames={{
                base: "h-5 w-5 data-[hover=true]:-translate-x-0 transition-transform data-[focus-visible=true]:-translate-x-0",
              }}
            />
          ))}
        </AvatarGroup>
      )}
    </div>
  );
}

export default LikesDetails;
