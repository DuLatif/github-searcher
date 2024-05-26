import React, { useEffect } from "react";
import Render from "../Render";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EUserSort, IGetUsersParams } from "@/interfaces/user.interface";
import { fetchUserList } from "@/redux/usersReducer";
import { EOrder, ESearchCategory } from "@/interfaces/global.interface";
import UserItem from "../UserItem";
import Alert from "../Alert";
import PaginationStats from "../Pagination/PaginationStats";
import Pagination from "../Pagination";
import styles from "@/styles/Home.module.scss";
import Select from "../Select";
import { orderOptions, userSortingOptions } from "@/constants/options";

export interface IListUserProps {
  getUsersParams: IGetUsersParams;
  searchCategory: string;
  searchKeyword: string;
  setGetUsersParams: React.Dispatch<React.SetStateAction<IGetUsersParams>>;
}
const ListUser: React.FC<IListUserProps> = (props) => {
  const { getUsersParams, searchCategory, searchKeyword, setGetUsersParams } =
    props;

  const dispatch: AppDispatch = useDispatch();
  const userListState = useSelector((state: RootState) => state.userList);
  const userResponsePagination = useSelector((state: RootState) => {
    const resultEntry = Object.entries(state.userList.results).find(
      (item) => item[0] === state.userList.cacheKey
    );
    if (!!resultEntry) {
      const result = resultEntry[1];
      return {
        start_item: Math.min(
          result.total_count,
          (getUsersParams.page - 1) * getUsersParams.per_page + 1
        ),
        end_item: Math.min(
          getUsersParams.page * getUsersParams.per_page,
          result.total_count
        ),
        total_page: result.total_page,
        total_data: result.total_count,
      };
    }
    return { start_item: 0, end_item: 0, total_page: 0, total_data: 0 };
  });

  useEffect(() => {
    if (getUsersParams.q.length > 3) {
      dispatch(fetchUserList(getUsersParams));
    }
  }, [getUsersParams, dispatch]);

  return (
    <Render
      in={searchCategory === ESearchCategory.USERS && searchKeyword.length > 3}
    >
      <div>
        <Render in={userListState.loading && !userListState.results}>
          <div className={styles.ListUser}>
            <Render.Skeleton Component={UserItem.Skeleton} items={9} />
          </div>
        </Render>
        <Render in={!!userListState.error}>
          <Alert color="danger" message={userListState.error!} />
        </Render>
        <Render in={!!userListState.results}>
          <div className={styles.TopBar}>
            <PaginationStats
              start={userResponsePagination.start_item}
              end={userResponsePagination.end_item}
              total={userResponsePagination.total_data}
            />
            <div className={styles.SortBy}>
              <p>Sort by: </p>
              <Select
                onChange={(e) =>
                  setGetUsersParams((prev) => ({
                    ...prev,
                    order: e.target.value as EOrder,
                  }))
                }
              >
                {orderOptions.map((item) => (
                  <option
                    selected={item.value === getUsersParams.order}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
              <Select
                onChange={(e) =>
                  setGetUsersParams((prev) => ({
                    ...prev,
                    sort: e.target.value as EUserSort,
                  }))
                }
              >
                {userSortingOptions.map((item) => (
                  <option
                    selected={item.value === getUsersParams.sort}
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
            <Render in={!userListState.loading}>
              {Object.entries(userListState.results).map(
                ([cacheKey, resultSet]) => {
                  if (cacheKey === userListState.cacheKey)
                    return resultSet.items.map((user) => (
                      <UserItem key={user.id} user={user} />
                    ));
                  return null;
                }
              )}
            </Render>
            <Render in={userListState.loading}>
              <Render.Skeleton Component={UserItem.Skeleton} items={9} />
            </Render>
          </div>
          <Pagination
            currentPage={getUsersParams.page}
            totalPages={userResponsePagination.total_page}
            onPageChange={(page) => {
              window.scrollTo(0, 0);
              setGetUsersParams((prev) => ({ ...prev, page }));
            }}
          />
        </Render>
      </div>
    </Render>
  );
};

export default ListUser;
