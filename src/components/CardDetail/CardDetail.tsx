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
  console.log(card);

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <div className={styles.cardDetail}>
        <div className={styles.cardDetail_header}>
          <h2>새로운 일정 관리</h2>
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
              <div className={styles.cardDetail_mobile_profile}>C</div>
              <p>윤병현</p>
            </div>
          </div>
          <div>
            <label className={styles.cardDetail_mobile_label}>마감일</label>
            <p className={styles.cardDetail_mibile_date}>2022.12.30 19:00</p>
          </div>
        </div>
        <div className={styles.cardDetail_main}>
          <div className={styles.cardDetail_content}>
            <div className={styles.cardDetail_labels}>
              <div className={styles.cardDetail_columnName}>To do</div>
              <div className={styles.cardDetail_tags}>
                <Tag TagName="test" />
              </div>
            </div>
            <div className={styles.cardDetail_text}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
                Cras mattis, nulla non laoreet porttitor, diam justo laoreet
                eros, vel aliquet diam elit at leo.
              </p>
            </div>
            <div className={styles.cardDetail_img}>
              <img src="/Image/todoImg.svg" alt="content_image" />
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
                <div className={styles.cardDetail_coment_profile}>C</div>
                <p>윤병현</p>
              </div>
            </div>
            <div>
              <label className={styles.cardDetail_sidebar_label}>마감일</label>
              <p className={styles.cardDetail_sidebar_date}>2022.12.30 19:00</p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default CardDetail;
