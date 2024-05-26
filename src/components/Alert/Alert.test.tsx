import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Alert, { IAlertProps } from "./Alert";
import styles from "./Alert.module.scss";

vi.mock("@/utils/styles", () => ({
  combineClasses: (
    classes: (CSSModuleClasses | string | boolean | undefined)[]
  ) => classes.join(" "),
}));

describe("Alert Component", () => {
  const renderComponent = (props: IAlertProps) => render(<Alert {...props} />);

  it("should render the message", () => {
    const message = "This is an alert message";
    const { getByText } = renderComponent({ color: "primary", message });
    expect(getByText(message)).toBeInTheDocument();
  });

  it("should have the correct color class", () => {
    const message = "This is an alert message";
    const color = "success";
    const { container } = renderComponent({ color, message });
    expect(container.firstChild).toHaveClass(color);
  });

  it("should combine the classes correctly", () => {
    const message = "This is an alert message";
    const color = "danger";
    const { container } = renderComponent({ color, message });
    expect(container.firstChild).toHaveClass(styles.Alert, color);
  });
});
