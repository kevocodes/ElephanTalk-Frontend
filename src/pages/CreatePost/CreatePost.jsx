import PostForm from "../../components/PostForm/PostForm"
import { useAuthStore } from "../../store/auth.store"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../services/posts.service";

function CreatePost() {

  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  async function actionCreatePost(body) {
    try {
      await createPost({ token, body });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PostForm action={actionCreatePost} />
  )
}

export default CreatePost