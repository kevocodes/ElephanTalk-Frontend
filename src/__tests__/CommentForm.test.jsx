import { describe, test, vi, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentForm from "../components/CommentForm/CommentForm";

describe("<CommentForm />", () => {
  // Renders a form with an input field and a send button
  test("should render a form with an input field and a send button", () => {
    render(<CommentForm />);

    const formElement = screen.getByTestId("comment-form");
    const inputElement = screen.getByRole("textbox");
    const sendButtonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(sendButtonElement).toBeInTheDocument();
  });

  // Allows the user to type a comment in the input field
  test("should allow the user to type a comment in the input field", () => {
    render(<CommentForm />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test comment" } });

    expect(inputElement.value).toBe("Test comment");
  });

  // Sends a comment when the user clicks the send button
  it("should call the onSend prop when the user clicks the send button", async () => {
    const onSend = vi.fn();
    render(<CommentForm onSend={onSend} />);

    const form = screen.getByTestId("comment-form");
    form.onsubmit = onSend;

    const inputElement = screen.getByRole("textbox");
    const sendButtonElement = screen.getByRole("button");

    fireEvent.change(inputElement, { target: { value: "Test comment" } });
    
    await waitFor(() => {
      fireEvent.click(sendButtonElement);
    });
    
    expect(onSend).toHaveBeenCalledTimes(1);
  });
});
