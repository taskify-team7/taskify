import styles from "./Card.module.css";
import { CardType } from "../../interface/DashboardType";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import CardDetail from "../CardDetail/CardDetail";
import ConfirmModal from "../Modal/ConfirmModal";
import TodoModal from "../Modal/TodoModal";

interface CardProps {
  card: CardType;
  columnTitle: string;
}

export default function Card({ card, columnTitle }: CardProps) {
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
            columnId={card.columnId}
            type="할 일 수정"
          />
        ),
        document.body
      )}

      <div className={styles.container} onClick={() => handleModalOpen()}>
        <div>{card.title}</div>
        <div>{card.assignee.nickname}</div>
        <div>{card.dueDate}</div>
        <div>{card.tags}</div>
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
