import { forwardRef } from "react";
import { Input } from "@nextui-org/react";

export default forwardRef(function EmailInput({ ...props }, ref) {
  return (
    <Input
      ref={ref}
      type="text"
      label="Username or Email"
      variant="bordered"
      color="primary-50"
      className="w-full  pt-4 pb-2"
      {...props}
    />
  );
});
