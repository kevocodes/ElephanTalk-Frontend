/* eslint no-unused-vars: "warn"*/
import { Controller, useForm } from "react-hook-form";

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
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
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
    await action(data, setError);
    
    setIsLoading(false);
  };

  return (
    <Card className="w-[90%] max-w-2xl">
      <CardHeader className="font-bold text-2xl p-4">{title}</CardHeader>
      <Divider />
      <CardBody>
        <form
          data-testid="create-form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="image"
            control={control}
            rules={{
              required: "Image URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Please enter a valid image URL",
              },
            }}
            render={({ field }) => (
              <Input
                variant="bordered"
                label="Image URL"
                placeholder="Enter the image URL for your post."
                errorMessage={errors.image?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
              minLength: {
                value: 8,
                message: "Description must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <Textarea
                label="Description"
                variant="bordered"
                placeholder="Tell what you think about this post"
                errorMessage={errors.description?.message}
                {...field}
              />
            )}
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

          <div>

          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;
