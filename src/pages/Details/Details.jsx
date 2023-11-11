
import {
  getPosts,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";

import { useAuth } from "../../utils/tempUser";
import { useRef, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import PostDetail from "./components/PostDetail/PostDetail";


function Details() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { token, user } = useAuth();
  const [post, setPost] = useState("");
  const [postLikes, setLikes] = useState();

  const [comments, setComments] = useState([]);

  const { id: postId } = useParams();

  const handleComment = () => {
    inputRef.current.focus();
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
        loading={loading}
        inputRef={inputRef}
        post={post}
        comments={comments}
        setComments={setComments}
        postId={postId}
        handleComment={handleComment}
      ></PostDetail>}
    </main>
  );
}

export default Details;
