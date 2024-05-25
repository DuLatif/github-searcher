import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.Container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        alt="github icon"
      />
      <div>
        <h6 className={styles.Title}>Github Searcher</h6>
        <p>Search users or repositories below</p>
      </div>
    </div>
  );
};

export default Header;
