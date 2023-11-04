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
  Textarea,
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

  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  function validateImage(url) {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
    // This checks if the url is valid and stores the result
    const result = pattern.test(url);
    setIsValidUrl(result);
    return result;
  }

  function validateDescription(description) {
    const result = description.length >= 8;
    setIsDescriptionValid(result);
    return result;
  }

  function isFormValid() {
    return (
      validateImage(formValues.image) &&
      validateDescription(formValues.description)
    );
  }

  return (
    <Card className="mx-auto mt-4 max-w-[80%]">
      <CardHeader className="font-oswald text-3xl p-4">{title}</CardHeader>
      <Divider />
      <CardBody>
        <form className="flex flex-col gap-2">
          <Textarea
            name="description"
            value={formValues.description}
            label="Description"
            errorMessage={
              !isValidUrl
                ? "Please enter a description of at least 8 characters."
                : ""
            }
            variant="bordered"
            isRequired={true}
            isInvalid={!isDescriptionValid}
            onChange={handleChange}
          />
          <Input
            variant="bordered"
            name="image"
            value={formValues.image}
            label="Image URL"
            placeholder="Enter the image URL for your post."
            isRequired={true}
            onChange={handleChange}
            isInvalid={!isValidUrl}
            errorMessage={!isValidUrl ? "Please enter a valid image URL." : ""}
          />
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;
