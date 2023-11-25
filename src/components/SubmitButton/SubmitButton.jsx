import { Button } from "@nextui-org/react";

export default function SubmitButton({ loading, text }) {
  return (
    <Button
      isLoading={loading}
      color="primary"
      className="w-full mb-2 font-bold text-base"
      type="submit"
    >
      {text}
    </Button>
  );
}
