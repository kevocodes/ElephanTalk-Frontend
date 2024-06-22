import { useCallback, useEffect, useState } from "react";
import {
  deletePost,
  getPosts,
  hidePost,
  toggleFavoritePost,
  toggleLikePost,
} from "../../services/posts.service";
import PostLoader from "../../components/PostLoader/PostLoader";
import PostList from "../../components/PostList/PostList";
import { useAuthStore } from "../../store/auth.store";
import { showAlert } from "../../utils/toastify.util";
import EmptyPlaceholder from "../../components/EmptyPlaceholder/EmptyPlaceholder";
import { useTitle } from "../../hooks/useTitle";
import { generateReport } from "../../services/toxicity-reports.service";
import { ResponseError } from "../../models/ResponseError";

function Favorites() {
  useTitle("Favorites | Elephantalk");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Boolean flag to check if the component is mounted.
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, pagination } = await getPosts({
          token,
          endpoint: "favorites",
          query: `page=${page}&limit=${import.meta.env.VITE_POSTS_PER_PAGE}`,
        });

        // If the component is unmounted, don't update the state.
        if (isMounted) {
          setPosts((prevPosts) => [...prevPosts, ...data]);
          setHasMorePosts(pagination.page < pagination.pages);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        showAlert("Oops try again later...", "error");
      }
    };

    fetchPosts();
    // Cleanup function to set the isMounted flag to false.
    return () => {
      isMounted = false;
    };
  }, [token, page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

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
      showAlert("Oops try again later...", "error");
      // If the request fails, set the UI to the previous state
      setLiked((v) => !v); // toggle the like state

      setLikes((prevLikes) => {
        // Undo the like
        if (liked) return [...prevLikes, user];

        return prevLikes.filter((like) => like._id !== user._id);
      });
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
      showAlert("Oops try again later...", "error");
      // If the request fails, set the state to the previous value
      setFavorited((v) => !v);
      // [OWN COMPONENT LOGIC] Undo the favorites posts
      setPosts((prevPosts) => {
        return [...prevPosts, currentPost];
      });
    }
  };

  const handleDelete = async ({ setLoading, onClose, postId }) => {
    try {
      setLoading(true);
      await deletePost({ token, postId });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setLoading(false);
      onClose();
    } catch (error) {
      showAlert("Oops try again later...", "error");
      setLoading(false);
      onClose();
    }
  };

  const handleHide = async ({ setLoading, onClose, postId, setIsActive }) => {
    try {
      setLoading(true);
      await hidePost({ token, postId });
      setIsActive((v) => !v);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setLoading(false);
      onClose();
    } catch (error) {
      showAlert("Oops try again later...", "error");
      setLoading(false);
      onClose();
    }
  };

  const handleReport = async ({ data, setLoading, onClose, postId }) => {
    try {
      setLoading(true);
      await generateReport({
        token,
        reportedElementId: postId,
        tags: data.tags,
      });
      showAlert("Report sent successfully", "success");
    } catch (error) {
      if (error instanceof ResponseError) {
        return showAlert(error.message, "error");
      }

      showAlert("Oops try again later...", "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <main className="flex-1 flex flex-col gap-4 items-center py-4 md:mb-0 mb-14">
      {posts.length > 0 && (
        <PostList
          hasMorePosts={hasMorePosts}
          loadMore={loadMore}
          posts={posts}
          onLike={handleLike}
          onFavorite={handleFavorite}
          onDelete={handleDelete}
          onHide={handleHide}
          onReport={handleReport}
        />
      )}

      {isLoading && <PostLoader />}
      {posts.length === 0 && !isLoading && (
        <EmptyPlaceholder
          icon="material-symbols-light:bookmark"
          text="No favorites posts yet"
        />
      )}
    </main>
  );
}

export default Favorites;
