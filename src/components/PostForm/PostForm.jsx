/* eslint no-unused-vars: "warn"*/
import { useForm } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import ImagePreview from "./ImagePreview/ImagePreview";
import { useState } from "react";

function PostForm({
  title = "Create New Post",
  description = "",
  image = "",
  action,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      description: description,
      image: image,
    },
  });

  const watchImage = watch("image");

  // The submit function will receive the form data if all validations pass
  const onSubmit = async (data) => {
    setIsLoading(true);
    // Here the action will be executed with form data
    await action(data);
    setIsLoading(false);
  };

  return (
    <Card className="w-[90%] max-w-2xl">
      <CardHeader className="font-bold text-2xl p-4">{title}</CardHeader>
      <Divider />
      <CardBody>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            variant="bordered"
            label="Image URL"
            placeholder="Enter the image URL for your post."
            {...register("image", {
              required: "Image URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Please enter a valid image URL",
              },
            })}
            isInvalid={errors.image}
            errorMessage={errors.image?.message}
          />
          <Textarea
            label="Description"
            variant="bordered"
            placeholder="Tell what you think about this post"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 8,
                message: "Description must be at least 8 characters",
              },
            })}
            isInvalid={errors.description}
            errorMessage={errors.description?.message}
            maxRows={4}
          />
          <ImagePreview image={watchImage} />
          <Button
            isLoading={isLoading}
            className="font-extrabold"
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;
