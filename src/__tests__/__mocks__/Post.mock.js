export const mockedCurrentUser = {
  _id: "6552826cd8efed74a5dc77ca",
  username: "username",
  name: "name",
  lastname: "lastname",
  picture: "https://via.placeholder.com/150",
};

export const mockedPost = ({
  isLiked = false,
  isFavorite = false,
  active = false,
}) => {
  return {
    description: "Description",
    image: "https://via.placeholder.com/150",
    user: mockedCurrentUser,
    likes: [
      {
        _id: "6554215dd8efed74a5dc79b1",
        username: "nelsoncastro21",
        name: "Nelson",
        lastname: "Castro",
        picture: "https://i.pravatar.cc/150?u=nelsoncastro21",
      },
      {
        _id: "65507616e5d6012f4c6b1104",
        username: "rockevinche",
        name: "kevin",
        lastname: "escobar",
        picture: "https://i.pravatar.cc/150?u=rockevinche",
      },
    ],
    comments: [
      {
        content: "Buen post",
        user: {
          _id: "6544274e9fabd592957bbadc",
          username: "kevocodes",
          name: "Kevin",
          lastname: "Escobar",
          picture: "https://i.pravatar.cc/150?u=kevocodes",
        },
        createdAt: "2023-11-13T20:22:36.124Z",
      },
    ],
    _id: "6552826cd8efed74a5dc77ca",
    isLiked,
    isFavorite,
    active,
  };
};
