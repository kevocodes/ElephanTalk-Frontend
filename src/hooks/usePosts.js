import { useContext } from "react";
import { PostsContext } from "../context/postsContext";

const usePosts = () => {
  const postsContexts = useContext(PostsContext);

  return postsContexts;
}

export default usePosts;