import React from "react";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import styles from "./ColumnCreatemodal.module.css";

interface olumnCreateModalProps {
  handleModalClose: () => void;
}

function ColumnCreateModal({ handleModalClose }: olumnCreateModalProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="새 컬럼 생성">
        <form className={styles.contents}>
          <CommonInput label="이름" placeholder="새로운 프로젝트" />
          <div className={styles.modal_buttons}>
            <button className={styles.a_button}>생성</button>
            <button className={styles.c_button} onClick={handleModalClose}>
              취소
            </button>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default ColumnCreateModal;
