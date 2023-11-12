import { Input } from "@nextui-org/react"
export default function UsernameInput({ onChange, value }) {
  return (
    <Input
      type="text"
      label="Username"
      variant="bordered"
      color="primary-50"
      className="w-full"
      onChange={onChange}
      value={value}
    />
  )
}