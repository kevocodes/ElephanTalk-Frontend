import { Input } from '@nextui-org/react'
export default function PasswordConfirmInput({ onChange, value }) {

  return (
    <Input
      label="Confirm password"
      variant="bordered"
      color="primary-50"
      className="w-full  "
      onChange={onChange}
      value={value}
    />
  )
}