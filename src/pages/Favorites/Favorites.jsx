import { useEffect, useState } from "react";
import {
  getPosts,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";
import { useAuth } from "../../utils/tempUser";
import Post from "../Home/components/Post/Post";

function Favorites() {
  const [posts, setPosts] = useState([]);

  const { token, user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts({ token, endpoint: "favorites" });
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [setPosts, token]);

  const handleLike = async ({ setLiked, liked, setLikes, postId }) => {
    try {
      // Update the UI first for better UX
      setLiked(false);

      setLikes((prevLikes) => {
        if (!liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });

      // Send the request to the server
      await toggleLikePost({ token, postId });
    } catch (error) {
      // If the request fails, set the UI to the previous state
      setLiked(true); // toggle the like state

      setLikes((prevLikes) => {
        // Undo the like
        if (liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });

      console.log(error);
    }
  };

  const handleFavorite = async ({ setFavorited, postId }) => {
    const currentPost = posts.find((post) => post._id === postId);

    try {
      // Update the UI first for better UX
      setFavorited((v) => !v);

      // [OWN COMPONENT LOGIC] Update the favorites posts
      setPosts((prevPosts) => {
        return prevPosts.filter((post) => post._id !== postId);
      });

      // Send the request to the server
      await toggleFavoritePost({ token, postId });
    } catch (error) {
      // If the request fails, set the state to the previous value
      setFavorited((v) => !v);

      // [OWN COMPONENT LOGIC] Undo the favorites posts
      setPosts((prevPosts) => {
        return [...prevPosts, currentPost];
      });

      console.log(error);
    }
  };

  return (
    <main className="flex flex-col gap-4 items-center py-4">
      {posts.map((post) => (
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

export default Favorites;
