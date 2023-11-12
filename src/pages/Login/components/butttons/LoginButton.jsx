import { Button } from "@nextui-org/react";

export default function LoginButton({ loading }) {  
  return (
    <Button
      isLoading={loading}
      color="primary"
      className="w-full mb-2 font-bold text-base"
      type="submit"
    >
      Log in
    </Button>
  );
}
