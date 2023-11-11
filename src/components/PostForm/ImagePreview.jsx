import { Image } from "@nextui-org/react"
import noPreview from "../../assets/no-preview.png"
import { useState, useEffect } from "react";

function ImagePreview({ image }) {
  
  const [isImageValid, setIsImageValid] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  return (
    <div className="flex flex-col gap-2 py-4">
      <h1 className="text-xl text-left w-full font-bold">Preview:</h1>
      <div className="flex justify-center w-full">
        <Image
          className="rounded-md shadow-lg max-h-48"
          src={image || noPreview}
          alt="Image preview"
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default ImagePreview