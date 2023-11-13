import { Button } from "@nextui-org/react";

function ActionButton({ children, ...props }) {
  return (
    <Button isIconOnly size="lg" {...props}>
      {children}
    </Button>
  );
}

export default ActionButton;
