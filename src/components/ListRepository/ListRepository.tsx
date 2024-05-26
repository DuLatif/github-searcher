import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import {
  ERepositorySort,
  IGetRepositoriesParams,
} from "@/interfaces/repository.interface";
import { fetchRepositoryList } from "@/redux/repositoriesReducer";
import { AppDispatch, RootState } from "@/redux/store";
import styles from "@/styles/Home.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert";
import Pagination from "../Pagination";
import PaginationStats from "../Pagination/PaginationStats";
import Render from "../Render";
import RepositoryItem from "../RepositoryItem";
import Select from "../Select";
import { orderOptions, repoSortingOptions } from "@/constants/options";

export interface IListRepositoryProps {
  getRepositoriesParams: IGetRepositoriesParams;
  searchCategory: string;
  searchKeyword: string;
  setGetRepositoriesParams: React.Dispatch<
    React.SetStateAction<IGetRepositoriesParams>
  >;
}
const ListRepository: React.FC<IListRepositoryProps> = (props) => {
  const {
    getRepositoriesParams,
    searchCategory,
    searchKeyword,
    setGetRepositoriesParams,
  } = props;

  const dispatch: AppDispatch = useDispatch();
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
    if (getRepositoriesParams.q.length > 3) {
      dispatch(fetchRepositoryList(getRepositoriesParams));
    }
  }, [getRepositoriesParams, dispatch]);

  return (
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
            <Render.Skeleton Component={RepositoryItem.Skeleton} items={9} />
          </div>
        </Render>
        <Render in={!!repositoryListState.error}>
          <Alert color="danger" message={repositoryListState.error || ""} />
        </Render>
        <Render in={!!repositoryListState.results}>
          <div className={styles.TopBar}>
            <PaginationStats
              start={repositoryResponsePagination.start_item}
              end={repositoryResponsePagination.end_item}
              total={repositoryResponsePagination.total_data}
            />
            <div className={styles.SortBy}>
              <p>Sort by: </p>
              <Select
                onChange={(e) =>
                  setGetRepositoriesParams((prev) => ({
                    ...prev,
                    order: e.target.value as EOrder,
                  }))
                }
              >
                {orderOptions.map((item) => (
                  <option
                    selected={item.value === getRepositoriesParams.order}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
              <Select
                onChange={(e) =>
                  setGetRepositoriesParams((prev) => ({
                    ...prev,
                    sort: e.target.value as ERepositorySort,
                  }))
                }
              >
                {repoSortingOptions.map((item) => (
                  <option
                    selected={item.value === getRepositoriesParams.sort}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
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
              <Render.Skeleton Component={RepositoryItem.Skeleton} items={9} />
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
  );
};

export default ListRepository;
