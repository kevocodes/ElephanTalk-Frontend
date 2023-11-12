import { Input } from "@nextui-org/react";
import { forwardRef } from "react";
import { MailIcon } from "./Icons/MailIcon";

export default forwardRef(function EmailInput({ ...props }, ref) {
  return (
    <Input
      ref={ref}
      label="Email"
      variant="bordered"
      color="primary-50"
      className="w-full"
      startContent={
        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      {...props}
    />
  );
});
