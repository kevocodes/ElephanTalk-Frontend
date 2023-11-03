/* eslint no-unused-vars: "warn"*/
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";

function PostForm({
  title = "Create New Post",
  description = "",
  image = "",
  action,
}) {
  const [formValues, setFormValues] = useState(() => {
    // The function returns the initial state value
    return {
      description: description,
      image: image,
    };
  });

  return (
    <Card className="mx-auto mt-4 max-w-[80%]">
      <CardHeader className="font-oswald text-3xl">{title}</CardHeader>
      <Divider />
      <CardBody className="flex gap-4">
        <Input
          name="description"
          value={formValues.description}
          label="Descripcion"
          isRequired={true}
        />
        <Input
          name="image"
          value={formValues.image}
          label="URL de la imagen"
          isRequired={true}
        />
      </CardBody>
    </Card>
  );
}

export default PostForm;
