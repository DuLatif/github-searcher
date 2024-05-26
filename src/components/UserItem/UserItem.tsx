import React from "react";
import { IUser } from "@/interfaces/user.interface";
import styles from "./UserItem.module.scss";

export interface IUserItemPros {
  user: IUser;
}
const UserItem: React.FC<IUserItemPros> = ({ user }) => {
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

export default UserItem;
