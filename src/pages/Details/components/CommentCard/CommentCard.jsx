import { Card, CardHeader, Avatar } from "@nextui-org/react";
import CommentOptions from "./components/CommentOptions/CommentOptions";
import { useAuthStore } from "../../../../store/auth.store";

export default function CommentCard({ info, setComments }) {
  const { content, user, _id, manualReviewed } = info;

  const currentUser = useAuthStore((state) => state.user);

  return (
    <div className="flex items-center justify-between w-full">
      <Card className="w-full min-h-fit ">
        <CardHeader className="flex gap-3">
          <Avatar
            className="rounded-full"
            alt="nextui logo"
            height={40}
            radius="sm"
            src={user ? user.picture : ""}
            width={40}
          />
          <div className="flex flex-col min-h-fit w-10/12 flex-1">
            <div className="flex justify-between">
              <p className="text-md flex-1">
                {user ? `${user.name} ${user.lastname}` : ""}
              </p>

              {(!manualReviewed || currentUser._id === user._id) && (
                <CommentOptions
                  commentId={_id}
                  userId={user._id}
                  setComments={setComments}
                />
              )}
            </div>
            <p className="text-small text-default-500">
              {content ? content : ""}
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
