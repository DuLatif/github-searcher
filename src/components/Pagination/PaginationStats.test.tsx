import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PaginationStats from "./PaginationStats";

// Mock the formatNumber utility function
vi.mock("@/utils/formatNumber", () => ({
  formatNumber: (num: number) => num.toString(), // Mock the formatNumber function to return the number as string
}));

describe("PaginationStats Component", () => {
  const defaultProps = {
    start: 1,
    end: 10,
    total: 100,
  };

  const renderComponent = (props = {}) =>
    render(<PaginationStats {...defaultProps} {...props} />);

  it("should render the correct pagination stats", () => {
    const { getByText } = renderComponent();
    expect(getByText("Showing 1 to 10 of 100 total items")).toBeInTheDocument();
  });

  it("should format the total number correctly", () => {
    const { getByText } = renderComponent({ total: 1000 });
    expect(
      getByText("Showing 1 to 10 of 1000 total items")
    ).toBeInTheDocument();
  });

  it("should display correct start and end values", () => {
    const { getByText } = renderComponent({ start: 11, end: 20 });
    expect(
      getByText("Showing 11 to 20 of 100 total items")
    ).toBeInTheDocument();
  });
});
