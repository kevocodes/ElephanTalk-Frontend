import { Input } from "@nextui-org/react";
import SendButton from "./SendButton/SendButton";
import { useState } from "react";
import { commentPost } from "../../services/posts.service";
import { useAuthStore } from "../../store/auth.store";
import { showAlert } from "../../utils/toastify.util";
import getToxicityTags from "../../utils/getToxicityTag";
import { ResponseError } from "../../models/ResponseError";

function CommentForm({ setPostsComments, postId, inputRef = null }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newCommentId = await commentPost({ content: value, token, postId });
      setValue("");
      setPostsComments((prev) => [
        ...prev,
        { content: value, user, _id: newCommentId },
      ]);
      setLoading(false);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.status === 406) {
          return showAlert(
            `This comment is considered ${getToxicityTags(
              JSON.parse(error.message)
            ).toLowerCase()}`,
            "error"
          );
        }
      }

      showAlert("Oops try again later...", "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form data-testid="comment-form" className="w-full" onSubmit={handleSend}>
      <Input
        ref={inputRef}
        value={value}
        onValueChange={setValue}
        name="comment"
        type="text"
        variant="underlined"
        radius="full"
        placeholder="Add your comment..."
        endContent={<SendButton inputValue={value} loading={loading} />}
      />
    </form>
  );
}

export default CommentForm;
