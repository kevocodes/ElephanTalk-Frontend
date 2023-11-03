import { useEffect, useState } from "react";
import Post from "./components/Post/Post";
import { getAvailablePosts } from "../../services/posts.service";
import { useAuth } from "../../utils/tempUser";

function Home() {
  const [posts, setPosts] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getAvailablePosts({ token });
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [setPosts, token]);

  return (
    <main className="flex flex-col gap-4 items-center py-4">
      {posts.map((post) => (
        <Post key={post._id} info={post} setPosts={setPosts}/>
      ))}
    </main>
  );
}

export default Home;
