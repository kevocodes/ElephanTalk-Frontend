import { Input } from "@nextui-org/react"
import { MailIcon } from "../icons/MailIcon"
export default function EmailInput({ onChange, value}) {
  return (
    <Input
      isClearable
      type="email"
      label="Email"
      variant="bordered"
      color="primary-50"
      onClear={() => console.log('input cleared')}
      className="w-full pt-2 pb-2"
      onChange={onChange}
      value={value}
      startContent={
        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  )
}