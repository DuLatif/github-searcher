import Header from "@/components/Header";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";
import Select from "@/components/Select";
import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import { EUserSort, IGetUsersParams } from "@/interfaces/user.interface";
import {
  ERepositorySort,
  IGetRepositoriesParams,
} from "@/interfaces/repository.interface";

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
            <option value={item.value}>{item.label}</option>
          ))}
        </Select>
      </div>
    </main>
  );
};

export default HomePage;
