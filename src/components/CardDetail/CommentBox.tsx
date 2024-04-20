import React from "react";
import styles from "./CommentBox.module.css";
import { CommentsType } from "../../interface/CardType";
import { formatDate } from "../../utils/FormatDateUtil";

interface CommentBoxType {
  comment: CommentsType;
}

function CommentBox({ comment }: CommentBoxType) {
  const formattedDate = formatDate(comment.updatedAt);

  return (
    <div className={styles.cardDetail_coment}>
      <div className={styles.cardDetail_coment_profile}>
        {comment.author.profileImageUrl ? (
          <img src={comment.author.profileImageUrl} alt="profile" />
        ) : (
          comment.author.nickname[0]
        )}
      </div>
      <div className={styles.cardDetail_coment_main}>
        <div className={styles.cardDetail_coment_user}>
          <p>{comment.author.nickname}</p>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.cardDetail_coment_text}>
          <p>{comment.content}</p>
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
