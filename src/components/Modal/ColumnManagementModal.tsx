import React from "react";
import styles from "./ColumnManagementModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";

interface ColumnManagementModalProps {
  handleModalClose: () => void;
}

function ColumnManagementModal({
  handleModalClose,
}: ColumnManagementModalProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="컬럼 관리">
        <form className={styles.contents}>
          <CommonInput
            label="이름"
            placeholder="칼럼 이름을 입력하세요"
            value={"test"}
          />
          <div className={styles.modal_buttons}>
            <button className={styles.d_button}>삭제하기</button>
            <div>
              <button className={styles.c_button} onClick={handleModalClose}>
                취소
              </button>
              <button className={styles.a_button}>변경</button>
            </div>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default ColumnManagementModal;
