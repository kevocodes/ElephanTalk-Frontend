import PostForm from "../../components/PostForm/PostForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getPosts, updatePost } from "../../services/posts.service";
import { showAlert } from "../../utils/toastify.util";
import { useNavigate } from "react-router-dom"
import PostFormSkeleton from "../../components/PostForm/PostFormSkeleton/PostFormSkeleton";

function UpdatePost() {
  // States:
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  // Hooks:
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if(!isLoading) return;

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

  async function actionUpdatePost(body) {
    try {
      await updatePost({ token: token, postId: id, body: body });
      showAlert("Post updated successfully");
      navigate(-1);
    } catch (error) {
      showAlert("Oops try again later...", "error");
    }
  }

  return (
    <>
      {!isLoading && (
        <PostForm
          title="Update Post"
          description={description}
          image={image}
          action={actionUpdatePost}
        />
      )}
      {isLoading && <PostFormSkeleton />}
    </>
  );
}

export default UpdatePost;
