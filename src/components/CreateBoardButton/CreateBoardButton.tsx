import React from "react";
import styles from "./CreateBoardButton.module.css";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import ModalContainer from "../Modal/ModalContainer";
import NewDashboard from "../Modal/NewDashboard";

function CreateBoardButton() {
  const { openModal, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      {createPortal(
        openModal && (
          <ModalContainer
            title="새로운 대시보드"
            handleModalClose={handleModalClose}
          >
            <NewDashboard />
          </ModalContainer>
        ),
        document.body
      )}
      <div className={styles.container} onClick={handleModalOpen}>
        <p className={styles.font}>새로운 대시보드</p>
        <img src="/Icons/large.svg" alt="add_dashboard" />
      </div>
    </>
  );
}

export default CreateBoardButton;
