import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";

function PostSkeleton() {
  return (
    <Card className="max-w-[468px] w-full">
      <CardHeader className="px-5">
        <div className="max-w-[300px] w-full h-10 flex items-center gap-3">
          <div className="relative -left-1">
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
        </div>
      </CardHeader>
      <CardBody className="py-2">
        <Skeleton className="rounded-lg">
          <div className="h-60 rounded-lg bg-secondary max-w-lg"></div>
        </Skeleton>
      </CardBody>
      <CardFooter />
    </Card>
  );
}

export default PostSkeleton;
