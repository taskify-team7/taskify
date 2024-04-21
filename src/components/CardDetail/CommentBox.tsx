import React from "react";
import styles from "./CommentBox.module.css";

function CommentBox() {
  return (
    <div className={styles.cardDetail_coment}>
      <div className={styles.cardDetail_coment_profile}>C</div>
      <div className={styles.cardDetail_coment_main}>
        <div className={styles.cardDetail_coment_user}>
          <p>정만철</p>
          <p>2022.12.27 14:00</p>
        </div>
        <div className={styles.cardDetail_coment_text}>
          <p>오늘안에 CCC까지 만들 수 있을까요?오늘안에 CCC까지 만들 수</p>
        </div>
        <div className={styles.cardDetail_coment_btns}>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
