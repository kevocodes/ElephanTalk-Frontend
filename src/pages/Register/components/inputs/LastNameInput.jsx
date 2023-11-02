import { Input } from "@nextui-org/react"
export default function LastNameInput({ onChange, value }) {
  return (
    <Input
      isClearable
      type="input"
      label="Last Name"
      variant="bordered"
      color="primary-50"
      onClear={() => console.log('input cleared')}
      className="w-full pt-2"
      onChange={onChange}
      value={value}
    />
  )
}