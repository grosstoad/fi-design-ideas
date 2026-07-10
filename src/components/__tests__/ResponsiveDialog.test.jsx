import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResponsiveDialog } from "../ResponsiveDialog";

function Harness({ onClose = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        How we worked this out
      </button>
      <ResponsiveDialog
        isOpen={isOpen}
        title="How we worked this out"
        description="The assumptions used for this estimate."
        onClose={(reason) => {
          onClose(reason);
          setIsOpen(false);
        }}
      >
        <p>Calculation details</p>
      </ResponsiveDialog>
    </>
  );
}

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
  };
});

afterEach(() => {
  document.body.style.overflow = "";
  cleanup();
});

describe("ResponsiveDialog", () => {
  it("opens with an accessible name and description, locks scroll, and focuses the close button", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "How we worked this out" }));

    const dialog = screen.getByRole("dialog", { name: "How we worked this out" });
    expect(dialog.getAttribute("aria-describedby")).toBeTruthy();
    expect(screen.getByText("The assumptions used for this estimate.")).toBeTruthy();
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Close dialog" })).toBe(document.activeElement);
  });

  it("has no automated accessibility violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);

    await user.click(screen.getByRole("button", { name: "How we worked this out" }));

    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("closes with Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    const trigger = screen.getByRole("button", { name: "How we worked this out" });
    await user.click(trigger);
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: false, cancelable: true }));

    await waitFor(() => expect(onClose).toHaveBeenCalledWith("escape"));
    expect(trigger).toBe(document.activeElement);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes from the close button and the scrim, but not from content clicks", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    const trigger = screen.getByRole("button", { name: "How we worked this out" });
    await user.click(trigger);
    await user.click(screen.getByText("Calculation details"));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenLastCalledWith("button");

    await user.click(trigger);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenLastCalledWith("scrim");
  });
});
