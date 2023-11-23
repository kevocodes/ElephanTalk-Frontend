import PostForm from "../../components/PostForm/PostForm";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/posts.service";
import { showAlert } from "../../utils/toastify.util";

function CreatePost() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  async function actionCreatePost(body) {
    try {
      await createPost({ token, body });
      showAlert("Post created successfully");
      navigate(-1);
    } catch (error) {
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
