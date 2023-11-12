import { Input } from "@nextui-org/react";

export default function EmailInput({ onChange, value }) {
  return (
    <Input
      isClearable
      name="username"
      type="text"
      label="Username or Email"
      variant="bordered"
      color="primary-50"
      className="w-full  pt-4 pb-2"
      onChange={onChange}
      value={value}
    />
  );
}
