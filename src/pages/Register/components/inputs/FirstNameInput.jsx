import { Input } from "@nextui-org/react"
export default function LastNameInput({ onChange, value }) {
  return (
    <Input
      type="text"
      label="First Name"
      variant="bordered"
      color="primary-50"
      className="w-full"
      onChange={onChange}
      value={value}
    />
  )
}
