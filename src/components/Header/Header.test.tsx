import { RenderResult, render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Header from "./Header";
import styles from "./Header.module.scss";

describe("Header Component", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Header />);
  });

  it("should render the Github icon", () => {
    const { getByAltText } = component;
    const imgElement = getByAltText("github icon");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/25/25231.png"
    );
  });

  it("should render the title with correct class", () => {
    const { getByText } = component;
    const titleElement = getByText("Github Searcher");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(styles.Title);
  });

  it("should render the description", () => {
    const { getByText } = component;
    const descriptionElement = getByText("Search users or repositories below");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("should render the container with correct class", () => {
    const { container } = component;
    expect(container.firstChild).toHaveClass(styles.Container);
  });
});
