import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Textarea,
  Input,
  Divider,
} from "@nextui-org/react";

function PostFormSkeleton() {
  return (
    <Card className="w-[90%] max-w-2xl">
      <CardHeader className="font-bold text-2xl p-4">Update Post</CardHeader>
      <Divider />
      <CardBody>
        <form className="flex flex-col gap-2">
          <Skeleton className="rounded-lg">
            <Input variant="bordered" label="Image URL" />
          </Skeleton>
          <Skeleton className="rounded-lg">
            <Textarea
              label="Description"
              variant="bordered"
              placeholder="Tell what you think about this post"
              maxRows={4}
            />
          </Skeleton>
          <div className="flex flex-col gap-2 py-4">
            <h1 className="text-xl text-left w-full font-bold">Preview:</h1>
            <div className="flex justify-center w-full">
              <Skeleton className="rounded-lg shadow-lg w-full h-48 object-cover" />
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostFormSkeleton;
