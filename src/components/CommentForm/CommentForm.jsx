import { Input } from "@nextui-org/react";
import SendButton from "./SendButton/SendButton";
import { useState } from "react";
import { commentPost } from "../../services/posts.service";
import { useAuthStore } from "../../store/auth.store";

function CommentForm({ setPostsComments, postId, inputRef = null }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await commentPost({ content: value, token, postId });
      setValue("");
      setPostsComments((prev) => [
        ...prev,
        { content: value, user, _id: crypto.randomUUID() },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSend}>
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
