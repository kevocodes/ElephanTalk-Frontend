import { createContext, useState } from "react";

export const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  
  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };


  return (
    <PostsContext.Provider value={{posts, updatePosts}}>
      {children}
    </PostsContext.Provider>
  );
}