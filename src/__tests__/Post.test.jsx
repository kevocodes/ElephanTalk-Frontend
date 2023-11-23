import { describe, test, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../components/Post/Post";
import { mockedCurrentUser, mockedPost } from "./__mocks__/Post.mock";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }) => children,
}));

vi.mock("../store/auth.store", () => ({
  useAuthStore: () => ({
    user: mockedCurrentUser,
  }),
}));

describe("<Post />", () => {
  test("should render with the correct information", () => {
    const post = mockedPost({ active: true });

    render(
      <Post
        info={post}
        onLike={() => {}}
        onFavorite={() => {}}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );

    screen.getByText(`${post.user.name} ${post.user.lastname}`);
    screen.getByText(`@${post.user.username}`);
    screen.getByText(post.description);
    screen.getByText(`${post.likes.length} likes`);
    screen.getByText(`${post.comments.length} comments`);
  });

  test("should render the image", () => {
    const post = mockedPost({ active: true });

    render(
      <Post
        info={post}
        onLike={() => {}}
        onFavorite={() => {}}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );

    screen.getByAltText("Card background");
  });

  test("should render the actions controllers", () => {
    const post = mockedPost({ active: true });

    render(
      <Post
        info={post}
        onLike={() => {}}
        onFavorite={() => {}}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );

    screen.getByTestId("actions-controllers");
  });

  test("should render the chip 'hidden' when the post is hidden", () => {
    const post = mockedPost({ active: false });

    render(
      <Post
        info={post}
        onLike={() => {}}
        onFavorite={() => {}}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );

    screen.getByText("Hidden");
  });

  test("should not render the chip 'hidden' when the post is hidden", () => {
    const post = mockedPost({ active: false });

    render(
      <Post
        info={post}
        onLike={() => {}}
        onFavorite={() => {}}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );
  });

  test("should call the onLike function when the like button is clicked", () => {
    const post = mockedPost({ active: true });
    const onLike = vi.fn();

    render(
      <Post
        info={post}
        onLike={onLike}
        onFavorite={() => {}}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );

    fireEvent.click(screen.getByTestId("like-button"));

    expect(onLike).toHaveBeenCalledTimes(1);
  });

  test("should call the onFavorite function when the favorite button is clicked", () => {
    const post = mockedPost({ active: true });
    const onFavorite = vi.fn();

    render(
      <Post
        info={post}
        onLike={() => {}}
        onFavorite={onFavorite}
        onDelete={() => {}}
        onHide={() => {}}
        measureRef={undefined}
      />
    );

    fireEvent.click(screen.getByTestId("favorite-button"));

    expect(onFavorite).toHaveBeenCalledTimes(1);
  });
});
