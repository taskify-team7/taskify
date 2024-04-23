import styles from "./Card.module.css";
import { CardType } from "../../interface/DashboardType";
import { useModal, ModalType } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import CardDetail from "../CardDetail/CardDetail";
import ConfirmModal from "../Modal/ConfirmModal";
import TodoModal from "../Modal/TodoModal";
import Tag from "../CardDetail/Tag";

export default function Card({ card }: { card: CardType }) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const {
    isModalOpen: isConfirmModalOpen,
    handleModalOpen: ConfirmModalOpenHandler,
    handleModalClose: ConfirmModalCloseHandler,
  } = useModal();
  const {
    isModalOpen: isTodoEditModalOpen,
    handleModalOpen: todoEditModalOpenHandler,
    handleModalClose: toEditModalCloseHandler,
  } = useModal();

  return (
    <>
      {createPortal(
        isModalOpen && (
          <CardDetail
            handleModalClose={handleModalClose}
            card={card}
            ConfirmModalOpenHandler={ConfirmModalOpenHandler}
            todoEditModalOpenHandler={todoEditModalOpenHandler}
          />
        ),
        document.body
      )}
      {createPortal(
        isConfirmModalOpen && (
          <ConfirmModal
            handleModalClose={ConfirmModalCloseHandler}
            cardId={card.id}
          />
        ),
        document.body
      )}
      {createPortal(
        isTodoEditModalOpen && (
          <TodoModal
            handleModalClose={toEditModalCloseHandler}
            cardData={card}
            type="할 일 수정"
          />
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
            <div className={styles.cardDetailProfile}>
              {card.assignee.profileImageUrl ? (
                <img src={card.assignee.profileImageUrl} alt="profile" />
              ) : (
                card.assignee.nickname[0]
              )}
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
