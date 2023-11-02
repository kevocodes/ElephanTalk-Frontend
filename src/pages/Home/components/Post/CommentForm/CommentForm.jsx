import { Input } from "@nextui-org/react";
import SendButton from "./SendButton/SendButton";
import { useState } from "react";

function CommentForm() {
  const [value, setValue] = useState("");

  const handleSend = () => {
    alert(value);
  }

  return (
    <Input
      value={value}
      onValueChange={setValue}
      type="text"
      variant="underlined"
      radius="full"
      placeholder="Add your comment..."
      endContent={value.length > 0 && <SendButton action={handleSend} />}
    />
  );
}

export default CommentForm;
