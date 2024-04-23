import React from "react";
import styles from "./CommentInput.module.css";
import BaseButton from "../BaseButton/BaseButton";
import { CommonInputType } from "../../interface/Input";

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
        <BaseButton text="입력" styleType="refuse" />
      </div>
    </>
  );
}

export default CommentInput;
