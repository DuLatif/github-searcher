import Alert from "@/components/Alert";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ListUser from "@/components/ListUser";
import Pagination from "@/components/Pagination";
import PaginationStats from "@/components/Pagination/PaginationStats";
import Render from "@/components/Render";
import RepositoryItem from "@/components/RepositoryItem";
import Select from "@/components/Select";
import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import {
  ERepositorySort,
  IGetRepositoriesParams,
} from "@/interfaces/repository.interface";
import { EUserSort, IGetUsersParams } from "@/interfaces/user.interface";
import { fetchRepositoryList } from "@/redux/repositoriesReducer";
import { AppDispatch, RootState } from "@/redux/store";
import styles from "@/styles/Home.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const searchOptions: { label: string; value: ESearchCategory }[] = [
  {
    label: "Users",
    value: ESearchCategory.USERS,
  },
  {
    label: "Repositories",
    value: ESearchCategory.REPOSITORIES,
  },
];

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCategory, setSearchCategory] = useState<ESearchCategory>(
    ESearchCategory.USERS
  );
  const [getUsersParams, setGetUsersParams] = useState<IGetUsersParams>({
    q: "",
    sort: EUserSort.FOLLOWERS,
    page: 1,
    per_page: 9,
    order: EOrder.DESC,
  });
  const [getRepositoriesParams, setGetRepositoriesParams] =
    useState<IGetRepositoriesParams>({
      q: "",
      sort: ERepositorySort.STARTS,
      page: 1,
      per_page: 9,
      order: EOrder.DESC,
    });

  const repositoryListState = useSelector(
    (state: RootState) => state.repositoryList
  );

  const repositoryResponsePagination = useSelector((state: RootState) => {
    const resultEntry = Object.entries(state.repositoryList.results).find(
      (item) => item[0] === state.repositoryList.cacheKey
    );
    if (!!resultEntry) {
      const result = resultEntry[1];
      return {
        start_item:
          (getRepositoriesParams.page - 1) * getRepositoriesParams.per_page + 1,
        end_item: Math.min(
          getRepositoriesParams.page * getRepositoriesParams.per_page,
          result.total_count
        ),
        total_page: result.total_page,
        total_data: result.total_count,
      };
    }
    return { start_item: 0, end_item: 0, total_page: 0, total_data: 0 };
  });

  useEffect(() => {
    const timeoutSearch = setTimeout(() => {
      if (searchCategory === ESearchCategory.USERS) {
        setGetUsersParams((prev) => ({ ...prev, q: searchKeyword }));
      } else {
        setGetRepositoriesParams((prev) => ({ ...prev, q: searchKeyword }));
      }
    }, 200);

    return () => clearTimeout(timeoutSearch);
  }, [searchCategory, searchKeyword]);

  useEffect(() => {
    if (getRepositoriesParams.q.length > 3) {
      dispatch(fetchRepositoryList(getRepositoriesParams));
    }
  }, [getRepositoriesParams, dispatch]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value as ESearchCategory);
  };

  return (
    <main className={styles.Container}>
      <Header />
      <div className={styles.Form}>
        <Input
          placeholder="Typing to search users or repositories"
          onChange={handleSearchInput}
        />
        <Select onChange={handleSearchSelect}>
          {searchOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      {/* ------ If still not searching yet --------- */}
      <Render in={searchKeyword.length <= 3}>
        <div className={styles.EmptyState}>
          <img
            src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-260.png"
            alt="search icon"
          />
          <p>Search for GitHub users or repositories to see the results here</p>
        </div>
      </Render>

      {/* ------ To display list users --------- */}
      <ListUser
        getUsersParams={getUsersParams}
        searchCategory={searchCategory}
        searchKeyword={searchKeyword}
        setGetUsersParams={setGetUsersParams}
      />

      {/* ------ To display list repository --------- */}
      <Render
        in={
          searchCategory === ESearchCategory.REPOSITORIES &&
          searchKeyword.length > 3
        }
      >
        <div>
          <Render
            in={repositoryListState.loading && !repositoryListState.results}
          >
            <div className={styles.ListUser}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <RepositoryItem.Skeleton key={item} />
              ))}
            </div>
          </Render>
          <Render in={!!repositoryListState.error}>
            <Alert color="danger" message={repositoryListState.error || ""} />
          </Render>
          <Render in={!!repositoryListState.results}>
            <PaginationStats
              start={repositoryResponsePagination.start_item}
              end={repositoryResponsePagination.end_item}
              total={repositoryResponsePagination.total_data}
            />
            <div className={styles.ListUser}>
              <Render in={!repositoryListState.loading}>
                {Object.entries(repositoryListState.results).map(
                  ([cacheKey, resultSet]) => {
                    if (cacheKey === repositoryListState.cacheKey)
                      return resultSet.items.map((repo) => (
                        <RepositoryItem key={repo.id} repository={repo} />
                      ));
                    return null;
                  }
                )}
              </Render>
              <Render in={repositoryListState.loading}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <RepositoryItem.Skeleton key={item} />
                ))}
              </Render>
            </div>
            <Pagination
              currentPage={getRepositoriesParams.page}
              totalPages={repositoryResponsePagination.total_page}
              onPageChange={(page) => {
                window.scrollTo(0, 0);
                setGetRepositoriesParams((prev) => ({ ...prev, page }));
              }}
            />
          </Render>
        </div>
      </Render>
    </main>
  );
};

export default HomePage;
