import React from "react";
import styles from "./CommentInput.module.css";
import BaseButton from "../BaseButton/BaseButton";

function ComentInput() {
  return (
    <>
      <label className={styles.cardDetail_comentForm_label}>댓글</label>
      <div className={styles.cardDetail_comentForm_input}>
        <input type="text" placeholder="댓글 작성하기" />
        <BaseButton
          text="입력"
          onClick={() => console.log()}
          styleType="refuse"
        />
      </div>
    </>
  );
}

export default ComentInput;
