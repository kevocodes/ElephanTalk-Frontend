import PostForm from "../../components/PostForm/PostForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getPosts, updatePost } from "../../services/posts.service";
import { showAlert } from "../../utils/toastify.util";

function UpdatePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPosts({ token: token, endpoint: id });
        if (response) {
          setDescription(response.data.description);
          setImage(response.data.image);
        }
      } catch (error) {
        showAlert("Oops try again later...", "error");
      } finally {
        // Either it was successful or not
        // We want to stop the loading process
        setIsLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      {!isLoading && (
        <PostForm
          title="Update Post"
          description={description}
          image={image}
        />
      )}
    </>
  );
}

export default UpdatePost;
