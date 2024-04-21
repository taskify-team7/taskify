import React, { useState } from "react";
import styles from "./CommentBox.module.css";
import { CommentsType } from "../../interface/CardType";
import { formatDate } from "../../utils/FormatDateUtil";
import { deleteComment, updateComment } from "../../api/card";
import CommonInput from "../Input/CommonInput";
import { useForm } from "react-hook-form";

interface CommentBoxType {
  comment: CommentsType;
}

function CommentBox({ comment }: CommentBoxType) {
  const [isEditInputState, setIsEditInputState] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const editComentValidation = register("editComment", {
    required: {
      value: true,
      message: "댓글을 입력해 주세요",
    },
  });

  const formattedDate = formatDate(comment.updatedAt);

  const handleEditInputOpen = () => {
    setValue("editComment", comment.content);
    setIsEditInputState(true);
  };

  const handleDeleteComment = async () => {
    const res = await deleteComment(comment.id);
  };

  const handleEditComment = async (e: any) => {
    const res = await updateComment(comment.id, e.editComment);
    console.log(res);
  };

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
        {isEditInputState ? (
          <div className={styles.comment_edit}>
            <form onSubmit={handleSubmit(handleEditComment)}>
              <CommonInput validation={editComentValidation} errors={errors} />
              <div className={styles.comment_edit_btns}>
                <button type="submit">수정</button>
                <button
                  type="button"
                  onClick={() => setIsEditInputState(false)}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className={styles.cardDetail_coment_text}>
              <p>{comment.content}</p>
            </div>
            <div className={styles.cardDetail_coment_btns}>
              <button type="button" onClick={handleEditInputOpen}>
                수정
              </button>
              <button type="button" onClick={() => handleDeleteComment()}>
                삭제
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CommentBox;