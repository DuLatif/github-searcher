import { IRepository } from "@/interfaces/repository.interface";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RepositoryItem, { IRepositoryItemProps } from "./RepositoryItem";
import index from "./index";
import styles from "./RepositoryItem.module.scss";

describe("RepositoryItem Components", () => {
  const repository: IRepository = {
    id: 12,
    name: "Test Repository",
    stargazers_count: 100,
    html_url: "https://github.com/test/test-repo",
    description: "A test repository",
    owner: {
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
    },
    language: "JavaScript",
  };

  const defaultProps: IRepositoryItemProps = {
    repository,
  };

  const renderComponent = (props: IRepositoryItemProps = defaultProps) =>
    render(<RepositoryItem {...props} />);

  it("should render the repository item correctly", () => {
    const { getByText, getByTestId } = renderComponent();

    expect(getByText(repository.name)).toBeInTheDocument();
    expect(getByText(repository.description)).toBeInTheDocument();
    expect(getByText(repository.language)).toBeInTheDocument();
    expect(
      getByText(repository.stargazers_count.toString())
    ).toBeInTheDocument();
    expect(getByTestId("repository avatar")).toBeInTheDocument();
  });

  it("should render the repository item skeleton correctly", () => {
    const { container } = render(<RepositoryItem.Skeleton />);
    const repositoryItem = container.firstChild as HTMLElement;

    expect(repositoryItem).toHaveClass(styles.Repository, styles.Skeleton);
  });

  it("should export the RepositoryItem component", () => {
    expect(index).toBeDefined();
  });
});
