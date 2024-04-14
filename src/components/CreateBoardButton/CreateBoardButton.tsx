import React from "react";
import styles from "./CreateBoardButton.module.css";

function CreateBoardButton() {
  return (
    <div className={styles.container}>
      <p className={styles.font}>새로운 대시보드</p>
      <img src="/Icons/large.svg" alt="add_dashboard" />
    </div>
  );
}

export default CreateBoardButton;
