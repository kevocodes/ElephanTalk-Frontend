import Post from "../Post/Post";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function PostList({
  hasMorePosts,
  loadMore,
  posts,
  setPosts,
  onLike,
  onFavorite,
}) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts) {
      loadMore();
    }
  }, [inView, hasMorePosts, loadMore]);

  return (
    <>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <Post
              measureRef={ref}
              key={post._id}
              info={post}
              setPosts={setPosts}
              onLike={onLike}
              onFavorite={onFavorite}
            />
          );
        }

        return (
          <Post
            key={post._id}
            info={post}
            setPosts={setPosts}
            onLike={onLike}
            onFavorite={onFavorite}
          />
        );
      })}
    </>
  );
}

export default PostList;
