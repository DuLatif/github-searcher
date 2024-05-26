import React from "react";
import { IUser } from "@/interfaces/user.interface";
import styles from "./UserItem.module.scss";
import { combineClasses } from "@/utils/styles";

export interface IUserItemPros {
  user: IUser;
}
const UserItem = ({ user }: IUserItemPros) => {
  return (
    <div
      key={user.id}
      className={styles.User}
      onClick={() => window.open(user.html_url, "_blank")}
    >
      <div
        className={styles.Avatar}
        style={{ backgroundImage: `url(${user.avatar_url})` }}
      ></div>
      <div className={styles.Info}>
        <div className={styles.Profile}>
          <p className={styles.Name}>{user.login}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={styles.Type}>{user.type}</p>
            <p className={styles.Score}>{user.score} Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserItemSkeleton: React.FC = () => {
  return (
    <div className={combineClasses([styles.User, styles.Skeleton])}>
      <div className={styles.Avatar}></div>
      <div className={styles.Info}>
        <div className={styles.Profile}>
          <p className={styles.Name}></p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={styles.Type}></p>
            <p className={styles.Score}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

UserItem.Skeleton = UserItemSkeleton;
export default UserItem;
