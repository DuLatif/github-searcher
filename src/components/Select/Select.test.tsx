import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select, { ISelectProps } from "./Select";
import styles from "./Select.module.scss";

describe("Select Component", () => {
  const defaultProps: ISelectProps = {
    className: "custom-select",
    id: "example-select",
  };

  const renderComponent = (props: ISelectProps = defaultProps) =>
    render(<Select {...props} />);

  it("should render the select element with correct props", () => {
    const { container } = renderComponent();
    const selectElement = container.firstChild as HTMLSelectElement;

    expect(selectElement.tagName).toBe("SELECT");
    expect(selectElement).toHaveClass(styles.Select, "custom-select");
    expect(selectElement).toHaveAttribute("id", "example-select");
  });

  it("should pass onChange prop to select element", () => {
    const handleChange = vi.fn();
    const { container } = renderComponent({ onChange: handleChange });
    const selectElement = container.firstChild as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
