import { Input } from '@nextui-org/react'

export default function EmailInput({ onChange, value }) {
  return (
    <Input
      isClearable
      type="email"
      label="Username or Email"
      variant="bordered"
      color="primary-50"
      onClear={() => console.log('input cleared')}
      className="w-full text-primary-50 pt-4 pb-2"
      onChange={onChange}
      value={value}
    />
  )
}
