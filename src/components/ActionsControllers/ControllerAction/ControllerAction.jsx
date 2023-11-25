import { Button } from "@nextui-org/react";

function ControllerAction({ action, Component }) {
  return (
    <Button
      isIconOnly
      className="text-default-500 data-[hover]:bg-foreground/10"
      radius="full"
      variant="light"
      onPress={() => action()}
    >
      <Component fill="none" />
    </Button>
  );
}

export default ControllerAction;
