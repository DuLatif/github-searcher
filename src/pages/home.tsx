import Header from "@/components/Header";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import {
  ERepositorySort,
  IGetRepositoriesParams,
} from "@/interfaces/repository.interface";
import { EUserSort, IGetUsersParams } from "@/interfaces/user.interface";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUserList } from "@/redux/usersReducer";
import { getRepositories } from "@/services/repositories.service";
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
      (async () => {
        const data = await getRepositories(getRepositoriesParams);
        console.log("🚀 ~ data:", data);
      })();
    }
  }, [getRepositoriesParams]);

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
      {searchCategory === ESearchCategory.USERS && searchKeyword.length > 3 && (
        <div>
          {userListState.loading && <p>Loading...</p>}
          {userListState.error && <p>Error: {userListState.error}</p>}
          <div className={styles.ListUser}>
            {userListState.results &&
              !userListState.loading &&
              Object.entries(userListState.results).map(
                ([cacheKey, resultSet]) => {
                  if (cacheKey === userListState.cacheKey)
                    return resultSet.items.map((result) => (
                      <div key={result.id}>
                        <img
                          src={result.avatar_url}
                          alt={result.login}
                          width={50}
                        />
                        <p>{result.login}</p>
                      </div>
                    ));
                  return null;
                }
              )}
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
