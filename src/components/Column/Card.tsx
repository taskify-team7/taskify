import styles from "./Card.module.css";
import { CardType } from "../../interface/DashboardType";
import { useModal, ModalType } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import CardDetail from "../CardDetail/CardDetail";
import Tag from "../CardDetail/Tag";

export default function Card({ card }: { card: CardType }) {
  const { isModalOpen, handleModalOpen, handleModalClose }: ModalType =
    useModal();

  return (
    <>
      {createPortal(
        isModalOpen && (
          <CardDetail handleModalClose={handleModalClose} card={card} />
        ),
        document.body
      )}
      <div className={styles.container} onClick={() => handleModalOpen()}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}>{card.title}</div>
            <div className={styles.Tags}>
              {card?.tags.map((tag, i) => (
                <Tag key={i} TagName={tag} />
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardDueDateWrapper}>
              <img
                className={styles.calendarImg}
                src="/Icons/calendar.svg"
                alt="calendar.svg"
              />
              <div className={styles.cardDueDate}>{card.dueDate}</div>
            </div>
            <div className={styles.cardProfileImageUrl}>
              {card.assignee.profileImageUrl}
            </div>
          </div>
        </div>

        {/* <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div>
      <div>와</div> */}
      </div>
    </>
  );
}
