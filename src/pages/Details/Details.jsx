import {
  getPosts,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import PostDetail from "./components/PostDetail/PostDetail";
import { useAuthStore } from "../../store/auth.store";
import { showAlert } from "../../utils/toastify.util";
import PostSkeleton from "../../components/PostLoader/PostSkeleton/PostSkeleton";
import { useTitle } from "../../hooks/useTitle";
import elephantNotFound from "../../assets/elephant.webp";

function Details() {
  useTitle("Post details | Elephantalk");
  const { id: postId } = useParams();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(undefined);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await getPosts({ token, endpoint: postId });
        setPost(data);
        setComments(data.comments);
        setLoading(false);
      } catch (error) {
        showAlert("Oops try again later...", "error");
        setLoading(false);
      }
    };

    getData();
  }, [postId, token]);

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

      showAlert("Oops try again later...", "error");
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
      showAlert("Oops try again later...", "error");
    }
  };

  return (
    <main className="flex-1 absolute top-0 py-16 md:pb-4 lg:pb-0 flex flex-col justify-center items-center w-full lg:h-screen">
      {!loading && post && (
        <PostDetail
          post={post}
          comments={comments}
          setComments={setComments}
          postId={postId}
          onLike={handleLike}
          onFavorite={handleFavorite}
        />
      )}

      {!post && !loading && (
        <div className="text-center p-4 flex flex-col gap-4">
          <img src={elephantNotFound} alt="Not found image"/>
          <h1 className="text-5xl font-bold text-foreground">
            ERROR <span className="text-primary">404</span>
          </h1>
        </div>
      )}

      {loading && <PostSkeleton />}
    </main>
  );
}

export default Details;
