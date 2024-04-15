import React from "react";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import NewDashboard from "./NewDashboard";
import styles from "./DashBoardCreateModal.module.css";

interface DashBoardCreateModalProps {
  handleModalClose: () => void;
}

function DashBoardCreateModal({ handleModalClose }: DashBoardCreateModalProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="새로운 대시보드">
        <NewDashboard />
        <div className={styles.modal_buttons}>
          <button className={styles.a_button}>생성</button>
          <button className={styles.c_button} onClick={handleModalClose}>
            취소
          </button>
        </div>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default DashBoardCreateModal;
