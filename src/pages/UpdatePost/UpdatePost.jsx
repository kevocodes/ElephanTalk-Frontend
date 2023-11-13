import PostForm from "../../components/PostForm/PostForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store"

function UpdatePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    console.log(id);
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <PostForm
          title="Update Post"
          description="dummy description"
          image="dummy image"
        />
      )}
    </>
  );
}

export default UpdatePost;
