import { Button } from "@nextui-org/react";

function ControllerToggle({ state, action, Component, ...props }) {
  return (
    <Button
      isIconOnly
      className="text-default-500 data-[hover]:bg-foreground/10"
      radius="full"
      variant="light"
      onPress={() => action()}
      {...props}
    >
      <Component
        className={state ? "[&>path]:stroke-transparent" : ""}
        fill={state ? "currentColor" : "none"}
      />
    </Button>
  );
}

export default ControllerToggle;
