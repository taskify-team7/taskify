import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.body}>
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
        <div id="loadingText" className={styles.loadingText}>
          Loading
        </div>
      </div>
    </div>
  );
};

export default Loading;
