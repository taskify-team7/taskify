import styles from "./Card.module.css";
import { CardType } from "../../interface/DashboardType";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import CardDetail from "../CardDetail/CardDetail";
import ConfirmModal from "../Modal/ConfirmModal";

export default function Card({ card }: { card: CardType }) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const {
    isModalOpen: isConfirmModalOpen,
    handleModalOpen: ConfirmModalOpenHandler,
    handleModalClose: ConfirmModalCloseHandler,
  } = useModal();

  return (
    <>
      {createPortal(
        isModalOpen && (
          <CardDetail
            handleModalClose={handleModalClose}
            card={card}
            ConfirmModalOpenHandler={ConfirmModalOpenHandler}
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
