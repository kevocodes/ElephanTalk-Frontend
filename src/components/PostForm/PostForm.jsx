/* eslint no-unused-vars: "warn"*/

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input
} from "@nextui-org/react";

function PostForm({ title = "Create New Post", data = {}, action }) {
  return (
    <Card className="mx-auto mt-4 max-w-[80%]">
      <CardHeader className="font-oswald text-3xl">{title}</CardHeader>
      <Divider />
      <CardBody className="flex gap-4">
        <Input name="description" label="Descripcion" isRequired={true} />
        <Input name="image" label="URL de la imagen" isRequired={true} />
      </CardBody>
    </Card>
  );
}

export default PostForm;
