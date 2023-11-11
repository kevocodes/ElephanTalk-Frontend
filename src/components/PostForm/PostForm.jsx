/* eslint no-unused-vars: "warn"*/
import { useState, useEffect } from "react";
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
  const [formValues, setFormValues] = useState(() => {
    // The function returns the initial state value
    return {
      description: description,
      image: image,
    };
  });

  const [isImageValid, setIsImageValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  // This will be passed as a callback to the ImagePreview component
  // So it will manage if it can be rendered or not
  function validateImage(isValid) {
    setIsImageValid(isValid);
  }

  function validateDescription(description) {
    const result = description.length >= 8;
    setIsDescriptionValid(result);
    return result;
  }

  // This function is called when the form is submitted
  // it checks if the form is valid
  function isFormValid() {
    return (
      validateImage(formValues.image) &&
      validateDescription(formValues.description)
    );
  }

  return (
    <Card className="mx-auto my-8 max-w-[80%] md:max-w-xl lg:max-w-2xl font-monserrat">
      <CardHeader className="font-bold text-2xl p-4">{title}</CardHeader>
      <Divider />
      <CardBody>
        <form className="flex flex-col gap-2">
          <Input
            variant="bordered"
            name="image"
            value={formValues.image}
            label="Image URL"
            placeholder="Enter the image URL for your post."
            isRequired={true}
            onChange={handleChange}
            isInvalid={!isImageValid}
            errorMessage={
              !isImageValid ? "Please enter a valid image URL." : ""
            }
          />
          <Textarea
            name="description"
            value={formValues.description}
            label="Description"
            placeholder="Tell what you think about this post"
            errorMessage={
              !isDescriptionValid
                ? "Please enter a description of at least 8 characters."
                : ""
            }
            variant="bordered"
            isRequired={true}
            isInvalid={!isDescriptionValid}
            onChange={handleChange}
            maxRows={4}
          />
          {formValues.image && (
            <ImagePreview
              image={formValues.image}
              onValidityChange={validateImage}
            />
          )}
          <Button className="font-extrabold" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;
