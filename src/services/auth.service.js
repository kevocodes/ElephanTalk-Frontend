const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const signIn = async ({ username, password }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Can't signing in");
  }

  const data = await response.json();

  return data.access_token; 
};
