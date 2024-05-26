import React from "react";
import styles from "./EmptyState.module.scss";

const EmptyState: React.FC = () => {
  return (
    <div className={styles.EmptyState}>
      <img
        src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-260.png"
        alt="search icon"
      />
      <p>Search for GitHub users or repositories to see the results here</p>
    </div>
  );
};

export default EmptyState;
