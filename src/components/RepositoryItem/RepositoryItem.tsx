import { IRepository } from "@/interfaces/repository.interface";
import React from "react";
import styles from "./RepositoryItem.module.scss";
import { formatNumber } from "@/utils/formatNumber";
import { combineClasses } from "@/utils/styles";

export interface IRepositoryItemProps {
  repository: IRepository;
}
const RepositoryItem = ({ repository }: IRepositoryItemProps) => {
  return (
    <div
      key={repository.id}
      className={styles.Repository}
      onClick={() => window.open(repository.html_url, "_blank")}
    >
      <div className={styles.Info}>
        <div className={styles.Star}>
          <span>{formatNumber(repository.stargazers_count)}</span>
          <img src="https://cdn-icons-png.freepik.com/256/1828/1828884.png?semt=ais_hybrid" />
        </div>
        <h6>{repository.name}</h6>
        <p className={styles.Description}>{repository.description}</p>
      </div>
      <div className={styles.Footer}>
        <div className={styles.Owner}>
          <div
            className={styles.Avatar}
            style={{ backgroundImage: `url(${repository.owner.avatar_url})` }}
          ></div>
          <p>{repository.owner.login}</p>
        </div>
        <p className={styles.Language}>{repository.language}</p>
      </div>
    </div>
  );
};

const RepositoryItemSkeleton: React.FC = () => {
  return (
    <div className={combineClasses([styles.Repository, styles.Skeleton])}>
      <div className={styles.Info}>
        <div className={styles.Star}></div>
        <h6></h6>
        <p className={styles.Description}></p>
      </div>
      <div className={styles.Footer}>
        <div className={styles.Owner}>
          <div className={styles.Avatar}></div>
          <p></p>
        </div>
        <p className={styles.Language}></p>
      </div>
    </div>
  );
};

RepositoryItem.Skeleton = RepositoryItemSkeleton;
export default RepositoryItem;
