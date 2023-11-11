import { Button } from "@nextui-org/react";
import { useEffect } from "react";

function ControllerToggle({ state, action, Component }) {

  useEffect(() => {
    console.log(state);
  }, []);
  
  return (
    <Button
      isIconOnly
      className="text-default-500 data-[hover]:bg-foreground/10"
      radius="full"
      variant="light"
      onPress={() => action()}
    >
      <Component
        className={state ? "[&>path]:stroke-transparent" : ""}
        fill={state ? "currentColor" : "none"}
      />
    </Button>
  );
}

export default ControllerToggle;
