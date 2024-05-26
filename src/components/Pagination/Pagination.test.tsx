import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";
import styles from "./Pagination.module.scss";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<Pagination {...defaultProps} {...props} />);

  it("should render the pagination component", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toHaveClass(styles.Pagination);
  });

  it("should render the correct number of buttons and ellipsis", () => {
    const { getAllByRole, getByText } = renderComponent();
    const buttons = getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0); // should render page buttons
    expect(getByText("...")).toBeInTheDocument(); // should render ellipsis if applicable
  });

  it("should call onPageChange with the correct page number when a page button is clicked", () => {
    const { getByText } = renderComponent();
    const pageButton = getByText("2");
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with the correct page number when next button is clicked", () => {
    const { getByText } = renderComponent({ currentPage: 5 });
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(6);
  });

  it("should call onPageChange with the correct page number when previous button is clicked", () => {
    const { getByText } = renderComponent({ currentPage: 5 });
    const prevButton = getByText("Previous");
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("should apply the correct class to the current page button", () => {
    const { getByText } = renderComponent({ currentPage: 5 });
    const currentPageButton = getByText("5");
    expect(currentPageButton).toHaveClass(styles.CurrentPage);
  });
});
