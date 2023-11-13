import PostForm from "../../components/PostForm/PostForm";

function UpdatePost() {
  // Here the logic will change due to the fact we are updating the post
  // Like getting the id and stuff
  return (
    <PostForm
      title="Update Post"
      description="dummy description"
      image="dummy image"
    />
  );
}

export default UpdatePost;