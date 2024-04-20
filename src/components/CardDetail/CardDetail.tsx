import React from "react";
import ModalContainer from "../Modal/ModalContainer";
import styles from "./CardDetail.module.css";
import ComentInput from "../Input/ComentInput";
import CommentBox from "./CommentBox";
import Tag from "./Tag";
import { CardType } from "../../interface/DashboardType";

interface CardDetailProps {
  handleModalClose: () => void;
  card: CardType;
}

function CardDetail({ handleModalClose, card }: CardDetailProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <div className={styles.cardDetail}>
        <div className={styles.cardDetail_header}>
          <h2>{card.title}</h2>
          <div className={styles.cardDetail_header_option}>
            <img src="/Icons/kebab.svg" alt="menu" />
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
                {card.assignee.profileImageUrl
                  ? card.assignee.profileImageUrl
                  : card.assignee.nickname[0]}
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
            <form>
              <ComentInput />
            </form>
            <div className={styles.cardDetail_coments}>
              <CommentBox />
            </div>
          </div>
          <div className={styles.cardDetail_sidebar}>
            <div>
              <label className={styles.cardDetail_sidebar_label}>담당자</label>
              <div className={styles.cardDetail_sidebar_user}>
                <div className={styles.cardDetail_coment_profile}>
                  {card.assignee.profileImageUrl
                    ? card.assignee.profileImageUrl
                    : card.assignee.nickname[0]}
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
