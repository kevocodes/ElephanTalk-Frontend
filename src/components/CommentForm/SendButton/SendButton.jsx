import { Button } from "@nextui-org/react";
import SendIcon from "../SendIcon/SendIcon";

function SendButton({ inputValue, loading }) {
  return (
    <Button
      isIconOnly
      type="submit"
      className={`text-default-500 data-[hover]:bg-foreground/10 mb-1 ${
        inputValue.length === 0 && "hidden"
      }`}
      radius="full"
      variant="light"
      isLoading={loading}
      disabled={loading || inputValue.length === 0}
    >
      {!loading && <SendIcon />}
    </Button>
  );
}

export default SendButton;
