import { Image } from "@nextui-org/react";
import NoPreviewImage from "../../../assets/no-preview.png";
import { useState, useEffect } from "react";

function ImagePreview({ image }) {
  const [isImageValid, setIsImageValid] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  // For every time the image changes, this effect is called
  // It always set it to true, but if the image is not valid
  // the onError of the Image will handle it
  useEffect(() => {
    setImageSrc(image);
    setIsImageValid(true);
  }, [image]);

  // So this will be triggered when the onError of the Image is called
  const handleImageError = () => {
    setIsImageValid(false);
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <h1 className="text-xl text-left w-full font-bold">Preview:</h1>
      <div className="flex justify-center w-full">
        <Image
          className="rounded-md shadow-lg max-h-48 object-cover"
          src={isImageValid && imageSrc ? imageSrc : NoPreviewImage}
          alt="Image preview"
          onError={handleImageError}
        />
      </div>
    </div>
  );
}

export default ImagePreview;
