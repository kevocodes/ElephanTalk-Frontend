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
import ImagePreview from "./ImagePreview";

function PostForm({
  title = "Create New Post",
  description = "",
  image = "",
  action,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      description: description,
      image: image,
    },
  });

  const watchImage = watch("image");

  // The submit function will receive the form data if all validations pass
  const onSubmit = (data) => {
    // Here the action will be executed with form data
    console.log(data);
    action(data);
  };

  return (
    <Card className="mx-auto mt-8 mb-20 md:mb-8 max-w-[80%] md:max-w-xl lg:max-w-2xl font-monserrat">
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
            description="Minimum 8 characters"
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
          <Button className="font-extrabold" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;
