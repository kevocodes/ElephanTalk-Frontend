import PostSkeleton from "./PostSkeleton/PostSkeleton";

function PostLoader({ quantity = 3 }) {
  return (
    <>
      {[...Array(quantity)].map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </>
  );
}

export default PostLoader;
