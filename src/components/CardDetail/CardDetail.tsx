import React, { useState } from "react";
import ModalContainer from "../Modal/ModalContainer";
import styles from "./CardDetail.module.css";
import CommentInput from "../Input/CommentInput";
import CommentBox from "./CommentBox";
import Tag from "./Tag";
import { CardType } from "../../interface/DashboardType";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { CommentRequestType } from "../../interface/CardType";
import { createComment, getComments } from "../../api/card";
import OptionBox from "./OptionBox";

interface CardDetailProps {
  handleModalClose: () => void;
  ConfirmModalOpenHandler: () => void;
  card: CardType;
}

function CardDetail({
  handleModalClose,
  card,
  ConfirmModalOpenHandler,
}: CardDetailProps) {
  //옵션을 열고 닫는 상태를 관리하는 useState
  const [isOptionBoxState, setIsOptionBoxState] = useState(false);

  const { data: commentsData } = useQuery<CommentRequestType>({
    queryKey: ["comments", card.id],
    queryFn: () => getComments(10, null, card.columnId, card.id),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const comentValidation = register("comment", {
    required: {
      value: true,
      message: "댓글을 입력해 주세요",
    },
  });

  const onSubmit = async (e: any) => {
    const { id: cardId, dashboardId, columnId } = card;
    console.log(e);
    const res = await createComment(e.comment, cardId, columnId, dashboardId);
    console.log(res);
    setValue("comment", "");
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <div className={styles.cardDetail}>
        <div className={styles.cardDetail_header}>
          <h2>{card.title}</h2>
          <div className={styles.cardDetail_header_option}>
            {isOptionBoxState && (
              <OptionBox
                handleModalClose={handleModalClose}
                ConfirmModalOpenHandler={ConfirmModalOpenHandler}
              />
            )}
            <img
              src="/Icons/kebab.svg"
              alt="menu"
              onClick={() => setIsOptionBoxState((prev) => !prev)}
            />
            <img
              src="/Icons/modal_close.svg"
              alt="close"
              onClick={() => handleModalClose()}
            />
          </div>
        </div>
        <div className={styles.cardDetail_mobile_userBox}>
          <div>
            <label className={styles.cardDetail_mobile_label}>담당자</label>
            <div className={styles.cardDetail_mobile_user}>
              <div className={styles.cardDetail_mobile_profile}>
                {card.assignee.profileImageUrl ? (
                  <img src={card.assignee.profileImageUrl} alt="profile" />
                ) : (
                  card.assignee.nickname[0]
                )}
              </div>
              <p>{card.assignee.nickname}</p>
            </div>
          </div>
          <div>
            <label className={styles.cardDetail_mobile_label}>마감일</label>
            <p className={styles.cardDetail_mibile_date}>{card.dueDate}</p>
          </div>
        </div>
        <div className={styles.cardDetail_main}>
          <div className={styles.cardDetail_content}>
            <div className={styles.cardDetail_labels}>
              {/**이부분 컬럼 이름도 변경되게 해야함*/}
              <div className={styles.cardDetail_columnName}>To do</div>
              <div className={styles.cardDetail_tags}>
                {card?.tags.map((tag, i) => (
                  <Tag key={i} TagName={tag} />
                ))}
              </div>
            </div>
            <div className={styles.cardDetail_text}>
              <p>{card.description}</p>
            </div>
            <div className={styles.cardDetail_img}>
              <img src={card.imageUrl} alt="content_image" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CommentInput validation={comentValidation} errors={errors} />
            </form>
            <div className={styles.cardDetail_coments}>
              {commentsData?.comments.map((comment) => (
                <CommentBox key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
          <div className={styles.cardDetail_sidebar}>
            <div>
              <label className={styles.cardDetail_sidebar_label}>담당자</label>
              <div className={styles.cardDetail_sidebar_user}>
                <div className={styles.cardDetail_coment_profile}>
                  {card.assignee.profileImageUrl ? (
                    <img src={card.assignee.profileImageUrl} alt="profile" />
                  ) : (
                    card.assignee.nickname[0]
                  )}
                </div>
                <p>{card.assignee.nickname}</p>
              </div>
            </div>
            <div>
              <label className={styles.cardDetail_sidebar_label}>마감일</label>
              <p className={styles.cardDetail_sidebar_date}>{card.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default CardDetail;
