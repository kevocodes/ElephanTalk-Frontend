/* eslint no-unused-vars: "warn"*/
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Input,
  Textarea,
  Button,
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

  const [isImageValid, setIsImageValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  // This effect is needed to tell the image preview
  // if it can be displayed or not
  useEffect(() => {
    if (formValues.image != "") {
      validateImage(formValues.image);
    }
  }, [formValues.image]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  function validateImage(url) {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
    // This checks if the url is valid and stores the result
    const result = pattern.test(url);
    setIsImageValid(result);
    return result;
  }

  function validateDescription(description) {
    const result = description.length >= 8;
    setIsDescriptionValid(result);
    return result;
  }

  // This function is called when the form is submitted
  // it checks if the form is valid
  // it does not need to execute validateImage again because the effect makes it right away it changes
  function isFormValid() {
    return isImageValid && validateDescription(formValues.description);
  }

  return (
    <Card className="mx-auto mt-8 max-w-[80%] md:max-w-xl lg:max-w-2xl font-monserrat">
      <CardHeader className="font-bold text-2xl p-4">{title}</CardHeader>
      <Divider />
      <CardBody>
        <form className="flex flex-col gap-2">
          <Textarea
            name="description"
            value={formValues.description}
            label="Description"
            errorMessage={
              !isDescriptionValid
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
            isInvalid={!isImageValid}
            errorMessage={
              !isImageValid ? "Please enter a valid image URL." : ""
            }
          />
          <Button className="font-extrabold" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;
