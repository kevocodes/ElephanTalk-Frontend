import PostForm from "../../components/PostForm/PostForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getPosts, updatePost } from "../../services/posts.service";
import { showAlert } from "../../utils/toastify.util";
import { useNavigate } from "react-router-dom";
import PostFormSkeleton from "../../components/PostForm/PostFormSkeleton/PostFormSkeleton";
import { useTitle } from "../../hooks/useTitle";
import { ResponseError } from "../../models/ResponseError";
import getToxicityTags from "../../utils/getToxicityTag";

function UpdatePost() {
  useTitle("Edit Post | Elephantalk");
  // States:
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Hooks:
  const { id } = useParams();
  const navigate = useNavigate();
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
  }, [id, token]);

  async function actionUpdatePost(body, setError) {
    try {
      await updatePost({ token: token, postId: id, body: body });
      showAlert("Post updated successfully");
      navigate(-1);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.status === 406) {
          return setError("description", {
            type: "manual",
            message: `This post is considered ${getToxicityTags(
              JSON.parse(error.message)
            ).toLowerCase()}`,
          });
        }

        return showAlert(error.message, "error");
      }

      showAlert("Oops try again later...", "error");
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center py-4 md:mb-0 mb-14">
      {!isLoading && (
        <PostForm
          title="Update Post"
          description={description}
          image={image}
          action={actionUpdatePost}
        />
      )}
      {isLoading && <PostFormSkeleton />}
    </main>
  );
}

export default UpdatePost;
