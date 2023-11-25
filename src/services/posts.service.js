const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const getPosts = async ({ token, endpoint = "", query = "" }) => {
  const response = await fetch(`${BASE_URL}/posts/${endpoint}?${query}`, {
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
};

export const createPost = async ({ token, body: postData }) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Error creating post");
  }

  return true;
};

export const updatePost = async ({ token, postId, body: postData }) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Error updating post");
  }

  return true;
};
