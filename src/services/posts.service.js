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

  return true;
};

export const toggleFavoritePost = async ({ token, postId }) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/favorite`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error adding post to favorites");
  }
  
  return true;
};

export const commentPost = async ({ token, postId, content }) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Error commenting on post");
  }

  return true;
};

export const deletePost = async ({ token, postId }) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error deleting post");
  }

  return true;
};

export const hidePost = async ({ token, postId }) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/active`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error hiding post");
  }

  return true;
}