import React from "react";
import styles from "./CommentInput.module.css";
import { CommonInputType } from "../../interface/Input";
import Button from "../Button/BaseButton/BaseButton";

function CommentInput({ validation, errors }: CommonInputType) {
  const error = errors?.[validation?.name || ""];
  return (
    <>
      <label className={styles.cardDetail_comentForm_label}>댓글</label>
      <div className={styles.cardDetail_comentForm_input}>
        <input type="text" placeholder="댓글 작성하기" {...validation} />
        {errors && (
          <p className={styles.errorMesage}>{error?.message?.toString()}</p>
        )}
        <Button>입력</Button>
      </div>
    </>
  );
}

export default CommentInput;
