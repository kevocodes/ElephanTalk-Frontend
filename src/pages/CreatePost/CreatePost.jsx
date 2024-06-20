import PostForm from "../../components/PostForm/PostForm";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/posts.service";
import { showAlert } from "../../utils/toastify.util";
import { useTitle } from "../../hooks/useTitle";
import { ResponseError } from "../../models/ResponseError";
import getToxicityTags from "../../utils/getToxicityTag";

function CreatePost() {
  useTitle("Create Post | Elephantalk");
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  async function actionCreatePost(body, setError) {
    try {
      await createPost({ token, body });
      showAlert("Post created successfully");
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
      <PostForm action={actionCreatePost} />
    </main>
  );
}

export default CreatePost;
