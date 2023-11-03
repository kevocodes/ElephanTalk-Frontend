const BASE_URL = "https://postsapi.kevo.codes";

export const getAvailablePosts = async ({ token }) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching posts");
  }

  return await response.json();
};

export const toggleLikePost = async ({ token, postId }) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error liking post");
  }

  return await response.json();
};
