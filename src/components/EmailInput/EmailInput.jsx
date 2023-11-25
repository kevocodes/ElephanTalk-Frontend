import { Input } from "@nextui-org/react";
import { forwardRef } from "react";
//import { MailIcon } from "./Icons/MailIcon";

export default forwardRef(function EmailInput({ ...props }, ref) {
  return (
    <Input
      ref={ref}
      label="Email"
      variant="bordered"
      color="primary-50"
      className="w-full"
      {...props}
    />
  );
});
