import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserItem, { IUserItemPros } from "./UserItem";

describe("UserItem Component", () => {
  const user: IUserItemPros = {
    user: {
      id: 1,
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/testuser",
      type: "user",
      score: 100,
    },
  };

  const renderComponent = (props: IUserItemPros = user) =>
    render(<UserItem {...props} />);

  it("should render the user item correctly", () => {
    const { getByText } = renderComponent();

    expect(getByText(user.user.login)).toBeTruthy();
    expect(getByText(user.user.type)).toBeTruthy();
  });
});
