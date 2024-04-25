import React, { useState } from "react";
import styles from "./CommentBox.module.css";
import { CommentsType } from "../../interface/CardType";
import { formatDate } from "../../utils/FormatDateUtil";
import { deleteComment, updateComment } from "../../api/comment";
import CommonInput from "../Input/CommonInput";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ProfileCircle from "../ProfileCircle/ProfileCircle";

interface CommentBoxType {
  comment: CommentsType;
  cardId: number;
}

function CommentBox({ comment, cardId }: CommentBoxType) {
  const commentQueryClient = useQueryClient();
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
    await commentQueryClient.invalidateQueries({
      queryKey: ["comments", cardId],
    });
  };

  const handleEditComment = async (e: any) => {
    const res = await updateComment(comment.id, e.editComment);
    await commentQueryClient.invalidateQueries({
      queryKey: ["comments", cardId],
    });
    setIsEditInputState(false);
  };

  return (
    <div className={styles.cardDetail_coment}>
      <ProfileCircle
        profileImageUrl={comment.author.profileImageUrl}
        nickname={comment.author.nickname}
      />
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
