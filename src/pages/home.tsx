import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ListRepository from "@/components/ListRepository";
import ListUser from "@/components/ListUser";
import Render from "@/components/Render";
import Select from "@/components/Select";
import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import {
  ERepositorySort,
  IGetRepositoriesParams,
} from "@/interfaces/repository.interface";
import { EUserSort, IGetUsersParams } from "@/interfaces/user.interface";
import styles from "@/styles/Home.module.scss";
import React, { useEffect, useRef, useState } from "react";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
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
    setSearchKeyword("");
    if (inputRef.current) inputRef.current.focus();
  }, [searchCategory]);

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
          value={searchKeyword}
          onChange={handleSearchInput}
          ref={inputRef}
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
        <EmptyState />
      </Render>

      {/* ------ To display list users --------- */}
      <ListUser
        getUsersParams={getUsersParams}
        searchCategory={searchCategory}
        searchKeyword={searchKeyword}
        setGetUsersParams={setGetUsersParams}
      />

      {/* ------ To display list repository --------- */}
      <ListRepository
        getRepositoriesParams={getRepositoriesParams}
        searchCategory={searchCategory}
        searchKeyword={searchKeyword}
        setGetRepositoriesParams={setGetRepositoriesParams}
      />
    </main>
  );
};

export default HomePage;
