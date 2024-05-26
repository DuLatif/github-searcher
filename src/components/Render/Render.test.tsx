import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Render from "./Render";

describe("Render Component", () => {
  it("should render children if 'in' prop is true", () => {
    const { container } = render(<Render in={true}>Hello World</Render>);
    expect(container.textContent).toContain("Hello World");
  });

  it("should not render children if 'in' prop is false", () => {
    const { container } = render(<Render in={false}>Hello World</Render>);
    expect(container.textContent).toBe("");
  });
});
