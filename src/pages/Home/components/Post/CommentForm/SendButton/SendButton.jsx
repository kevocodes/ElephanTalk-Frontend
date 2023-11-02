import { Button } from "@nextui-org/react"
import SendIcon from "../SendIcon/SendIcon"

function SendButton({ action }) {
  return (
    <Button
    isIconOnly
    className="text-default-500 data-[hover]:bg-foreground/10 mb-1"
    radius="full"
    variant="light"
    onPress={() => action()}
  >
    <SendIcon
      fill="none"
    />
  </Button>
  )
}

export default SendButton