import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input, { IInputProps } from "./Input";
import styles from "./Input.module.scss";

describe("Input Component", () => {
  const renderComponent = (props: IInputProps) => render(<Input {...props} />);

  it("should render an input element", () => {
    const { getByRole } = renderComponent({});
    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should apply the correct class", () => {
    const { getByRole } = renderComponent({});
    const inputElement = getByRole("textbox");
    expect(inputElement).toHaveClass(styles.Input);
  });

  it("should append additional classes", () => {
    const additionalClass = "custom-class";
    const { getByRole } = renderComponent({ className: additionalClass });
    const inputElement = getByRole("textbox");
    expect(inputElement).toHaveClass(styles.Input, additionalClass);
  });

  it("should pass other props to the input element", () => {
    const placeholderText = "Enter text";
    const { getByPlaceholderText } = renderComponent({
      placeholder: placeholderText,
    });
    const inputElement = getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", placeholderText);
  });

  it("should call onChange handler when input value changes", () => {
    const handleChange = vi.fn();
    const { getByRole } = renderComponent({ onChange: handleChange });
    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
