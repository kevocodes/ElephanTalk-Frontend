import { Avatar, AvatarGroup } from "@nextui-org/react";

function LikesDetails({ likes = [] }) {
  return (
    <div className="flex items-center justify-start">
      <AvatarGroup
        isBordered
        max={3}
        total={likes.length}
        className="flex gap-1"
        renderCount={(count) => (
          <p className="text-small font-semibold ml-2">
            {count} likes
          </p>
        )}
      >
        {likes.map((like) => (
          <Avatar
            key={like.id}
            src={like.picture}
            classNames={{
              base: "h-5 w-5 data-[hover=true]:-translate-x-0 transition-transform data-[focus-visible=true]:-translate-x-0",
            }}
          />
        ))}
      </AvatarGroup>
    </div>
  );
}

export default LikesDetails;
