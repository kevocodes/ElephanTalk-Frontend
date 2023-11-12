import { Input } from "@nextui-org/react"
import { MailIcon } from "../icons/MailIcon"

export default function EmailInput({ onChange, value}) {
  return (
    <Input
      type="email"
      label="Email"
      variant="bordered"
      color="primary-50"
      className="w-full"
      onChange={onChange}
      value={value}
      startContent={
        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  )
}