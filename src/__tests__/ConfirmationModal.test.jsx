import { describe, test, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";

describe("<ConfirmationModal />", () => {
  test("should render with the correct information", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onOpenChange={() => {}}
        action={() => {}}
        actionText="Confirm"
        title="Confirmation"
        description="Are you sure?"
        loading={false}
      />
    );

    screen.getByText("Confirmation");
    screen.getByText("Are you sure?");
    screen.getByText("Confirm");
    screen.getByText("Close");
  });

  test("should render with the correct information when loading", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onOpenChange={() => {}}
        action={() => {}}
        actionText="Confirm"
        title="Confirmation"
        description="Are you sure?"
        loading={true}
      />
    );

    screen.getByLabelText("Loading");
    screen.getByText("Confirmation");
    screen.getByText("Are you sure?");
    screen.getByText("Confirm");
    screen.getByText("Close");
  });

  test("should call the action when the confirm button is clicked", () => {
    const action = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        onOpenChange={() => {}}
        action={action}
        actionText="Confirm"
        title="Confirmation"
        description="Are you sure?"
        loading={false}
      />
    );

    const button = screen.getByText("Confirm");
    fireEvent.click(button);

    expect(action).toHaveBeenCalledTimes(1);
  });

  test("should call the onOpenChange when the close button is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        onOpenChange={onOpenChange}
        action={() => {}}
        actionText="Confirm"
        title="Confirmation"
        description="Are you sure?"
        loading={false}
      />
    );

    const button = screen.getByText("Close");
    fireEvent.click(button);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  test("should not call the action when the confirm button is clicked and is loading", () => {
    const action = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        onOpenChange={() => {}}
        action={action}
        actionText="Confirm"
        title="Confirmation"
        description="Are you sure?"
        loading={true}
      />
    );

    const button = screen.getByText("Confirm");
    fireEvent.click(button);

    expect(action).toHaveBeenCalledTimes(0);
  });
});
