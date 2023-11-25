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
    if (response.status === 401) {
      throw new Error("Invalid credentials");
    }

    throw new Error("Can't signing in");
  }

  const { access_token } = await response.json();

  return access_token;
};

export const signUp = async ({ username, name, lastname, email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ username, name, lastname, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      const { message } = await response.json();
      throw new Error(message.join(" "));
    }

    throw new Error("[ERROR] Can't signing up");
  }

  const { data } = await response.json();

  return data;
};

export const validateSession = async ({ token }) => {
  const response = await fetch(`${BASE_URL}/auth/whoami`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Can't validate session");
  }

  const { data } = await response.json();

  return data;
};
