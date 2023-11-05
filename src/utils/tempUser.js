export const useAuth = () => {
  return {
    token: import.meta.env.VITE_TEMP_USER_TOKEN,
    user: {
      _id: "6544274e9fabd592957bbadc",
      username: "kevocodes",
      picture: "https://i.pravatar.cc/150?u=kevocodes",
    },
  };
};
