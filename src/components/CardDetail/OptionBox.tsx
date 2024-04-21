import React from "react";
import styles from "./OptionBox.module.css";

function OptionBox() {
  return (
    <div className={styles.optionbox}>
      <div className={styles.optionbox_item}>수정하기</div>
      <div className={styles.optionbox_item}>삭제하기</div>
    </div>
  );
}

export default OptionBox;
