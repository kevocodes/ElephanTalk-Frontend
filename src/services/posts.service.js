import { ResponseError } from "../models/ResponseError";

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
    throw new ResponseError("Error fetching posts", response.status);
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
    throw new ResponseError("Error liking post", response.status);
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
    throw new ResponseError("Error adding post to favorites", response.status);
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
    if (response.status === 406) {
      const { message } = await response.json();
      throw new ResponseError(JSON.stringify(message), response.status);
    }

    throw new ResponseError("Error commenting on post", response.status);
  }

  const { data } = await response.json();
  return data._id;
};

export const deleteComment = async ({ token, commentId }) => {
  const response = await fetch(`${BASE_URL}/posts/${commentId}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ResponseError(
        "Comment has already been deleted",
        response.status
      );
    }

    throw new ResponseError("Error deleting comment", response.status);
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
    if (response.status === 404) {
      throw new ResponseError("Post has already been deleted", response.status);
    }

    throw new ResponseError("Error deleting post", response.status);
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
    throw new ResponseError("Error hiding post", response.status);
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
    if (response.status === 406) {
      const { message } = await response.json();
      throw new ResponseError(JSON.stringify(message), response.status);
    }

    throw new ResponseError("Error creating post", response.status);
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
    if (response.status === 406) {
      const { message } = await response.json();
      throw new ResponseError(JSON.stringify(message), response.status);
    }

    throw new ResponseError("Error updating post", response.status);
  }

  return true;
};
