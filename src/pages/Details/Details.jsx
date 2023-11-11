
import {
  getPosts,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";

import { useAuth } from "../../utils/tempUser";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import PostDetail from "./components/PostDetail/PostDetail";


function Details() {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();
  const [post, setPost] = useState("");

  const [comments, setComments] = useState([]);

  const { id: postId } = useParams();

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

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        console.log(postId);
        let response = await getPosts({ token, endpoint: postId });
        if (response) {
          console.log(response);
          setPost(response.data);
          setComments(response.data.comments);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <main className="flex-1 absolute top-0 py-14 lg:pb-0 flex flex-col justify-center items-center w-full h-screen">
      {!loading && <PostDetail
        post={post}
        comments={comments}
        setComments={setComments}
        postId={postId}
        onLike={handleLike}
        onFavorite={handleFavorite}
      ></PostDetail>}
    </main>
  );
}

export default Details;
