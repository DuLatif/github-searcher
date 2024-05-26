import Alert from "@/components/Alert";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import PaginationStats from "@/components/Pagination/PaginationStats";
import RepositoryItem from "@/components/RepositoryItem";
import Select from "@/components/Select";
import UserItem from "@/components/UserItem";
import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import {
  ERepositorySort,
  IGetRepositoriesParams,
} from "@/interfaces/repository.interface";
import { EUserSort, IGetUsersParams } from "@/interfaces/user.interface";
import { fetchRepositoryList } from "@/redux/repositoriesReducer";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUserList } from "@/redux/usersReducer";
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

  const userListState = useSelector((state: RootState) => state.userList);
  const repositoryListState = useSelector(
    (state: RootState) => state.repositoryList
  );

  const userResponsePagination = useSelector((state: RootState) => {
    const resultEntry = Object.entries(state.userList.results).find(
      (item) => item[0] === state.userList.cacheKey
    );
    if (!!resultEntry) {
      const result = resultEntry[1];
      return {
        start_item: (getUsersParams.page - 1) * getUsersParams.per_page + 1,
        end_item: Math.min(
          getUsersParams.page * getUsersParams.per_page,
          result.total_page
        ),
        total_page: result.total_page,
        total_data: result.total_count,
      };
    }
    return { start_item: 0, end_item: 0, total_page: 0, total_data: 0 };
  });
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
          result.total_page
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
    if (getUsersParams.q.length > 3) {
      dispatch(fetchUserList(getUsersParams));
    }
  }, [getUsersParams, dispatch]);
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
      {searchKeyword.length <= 3 && (
        <div className={styles.EmptyState}>
          <img
            src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-260.png"
            alt="search icon"
          />
          <p>Search for GitHub users or repositories to see the results here</p>
        </div>
      )}

      {/* ------ To display list users --------- */}
      {searchCategory === ESearchCategory.USERS && searchKeyword.length > 3 && (
        <div>
          {userListState.loading && <p>Loading...</p>}
          {userListState.error && (
            <Alert color="danger" message={userListState.error} />
          )}
          {userListState.results && (
            <>
              <PaginationStats
                start={userResponsePagination.start_item}
                end={userResponsePagination.end_item}
                total={userResponsePagination.total_data}
              />
              <div className={styles.ListUser}>
                {!userListState.loading &&
                  Object.entries(userListState.results).map(
                    ([cacheKey, resultSet]) => {
                      if (cacheKey === userListState.cacheKey)
                        return resultSet.items.map((user) => (
                          <UserItem key={user.id} user={user} />
                        ));
                      return null;
                    }
                  )}
              </div>
              <Pagination
                currentPage={getUsersParams.page}
                totalPages={userResponsePagination.total_page}
                onPageChange={(page) => {
                  window.scrollTo(0, 0);
                  setGetUsersParams((prev) => ({ ...prev, page }));
                }}
              />
            </>
          )}
        </div>
      )}

      {/* ------ To display list repository --------- */}
      {searchCategory === ESearchCategory.REPOSITORIES &&
        searchKeyword.length > 3 && (
          <div>
            {repositoryListState.loading && <p>Loading...</p>}
            {repositoryListState.error && (
              <Alert color="danger" message={repositoryListState.error} />
            )}
            {repositoryListState.results && (
              <>
                <PaginationStats
                  start={repositoryResponsePagination.start_item}
                  end={repositoryResponsePagination.end_item}
                  total={repositoryResponsePagination.total_data}
                />
                <div className={styles.ListUser}>
                  {!repositoryListState.loading &&
                    Object.entries(repositoryListState.results).map(
                      ([cacheKey, resultSet]) => {
                        if (cacheKey === repositoryListState.cacheKey)
                          return resultSet.items.map((repo) => (
                            <RepositoryItem key={repo.id} repository={repo} />
                          ));
                        return null;
                      }
                    )}
                </div>
                <Pagination
                  currentPage={getRepositoriesParams.page}
                  totalPages={userResponsePagination.total_page}
                  onPageChange={(page) => {
                    window.scrollTo(0, 0);
                    setGetRepositoriesParams((prev) => ({ ...prev, page }));
                  }}
                />
              </>
            )}
          </div>
        )}
    </main>
  );
};

export default HomePage;
