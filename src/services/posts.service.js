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

  const data = await response.json();

  return data;
};