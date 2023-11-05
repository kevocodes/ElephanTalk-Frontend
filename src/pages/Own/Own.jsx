import { useEffect, useState } from "react";
import {
  getPosts,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";
import { useAuth } from "../../utils/tempUser";
import Post from "../../components/Post/Post";
import PostLoader from "../../components/PostLoader/PostLoader";

function Own() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const { token, user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await getPosts({ token, endpoint: "owned" });
        setPosts(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchPosts();
  }, [setPosts, token]);

  const handleLike = async ({ setLiked, liked, setLikes, postId }) => {
    try {
      // Update the UI first for better UX
      setLiked((v) => !v);

      setLikes((prevLikes) => {
        if (!liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });

      // Send the request to the server
      await toggleLikePost({ token, postId });
    } catch (error) {
      // If the request fails, set the UI to the previous state
      setLiked((v) => !v); // toggle the like state

      setLikes((prevLikes) => {
        // Undo the like
        if (liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });

      console.log(error);
    }
  };

  const handleFavorite = async ({ setFavorited, postId }) => {
    try {
      // Update the UI first for better UX
      setFavorited((v) => !v);

      // Send the request to the server
      await toggleFavoritePost({ token, postId });
    } catch (error) {
      // If the request fails, set the state to the previous value
      setFavorited((v) => !v);
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col gap-4 items-center py-4 md:mb-0 mb-14">
      {loading && <PostLoader quantity={3} />}

      {!loading &&
        posts.map((post) => (
          <Post
            key={post._id}
            info={post}
            setPosts={setPosts}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        ))}
    </main>
  );
}

export default Own;
