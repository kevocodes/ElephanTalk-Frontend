import { useEffect } from "react";
import Post from "./components/Post/Post";
import { getAvailablePosts } from "../../services/posts.service";
import usePosts from "../../hooks/usePosts";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTQ0Mjc0ZTlmYWJkNTkyOTU3YmJhZGMiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5ODk4MTU4MSwiZXhwIjoxNjk5NTg2MzgxfQ.9oRcePGwqbAhe_5GX8pTfUCL7dfxsnYF-Tih3W11hnk";

function Home() {
  const { posts, updatePosts } = usePosts();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: posts } = await getAvailablePosts({ token });
        updatePosts(posts);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col gap-4 items-center py-4">
      {posts.map((post) => (
        <Post key={post._id} info={post} />
      ))}
    </main>
  );
}

export default Home;
