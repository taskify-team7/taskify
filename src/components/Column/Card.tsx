import styles from "./Card.module.css";
import { CardType } from "../../interface/DashboardType";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import CardDetail from "../CardDetail/CardDetail";
import ConfirmModal from "../Modal/ConfirmModal";
import TodoModal from "../Modal/TodoModal";
import Tag from "../CardDetail/Tag";
import ProfileCircle from "../ProfileCircle/ProfileCircle";

interface CardProps {
  card: CardType;
  columnTitle: string;
  columnId: number;
}

export default function Card({ card, columnId, columnTitle }: CardProps) {
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
            columnTitle={columnTitle}
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
            columnId={columnId}
            cardId={card.id}
          />
        ),
        document.body
      )}
      {createPortal(
        isTodoEditModalOpen && (
          <TodoModal
            handleModalClose={toEditModalCloseHandler}
            columnId={columnId}
            cardData={card}
            type="할 일 수정"
          />
        ),
        document.body
      )}

      <div className={styles.container} onClick={() => handleModalOpen()}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardHead}>
            {card.imageUrl && (
              <img
                className={styles.imageCover}
                src={card.imageUrl}
                alt="card_image"
              />
            )}
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
            <ProfileCircle
              profileImageUrl={card.assignee.profileImageUrl}
              nickname={card.assignee.nickname}
              type="card"
            />
          </div>
        </div>
      </div>
    </>
  );
}
