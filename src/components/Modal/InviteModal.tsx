import React from "react";
import styles from "./InviteModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";

interface InviteModalProps {
  handleModalClose: () => void;
}

function InviteModal({ handleModalClose }: InviteModalProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="초대하기">
        <form className={styles.contents}>
          <CommonInput
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
          />
          <div className={styles.modal_buttons}>
            <button className={styles.a_button}>초대</button>
            <button className={styles.c_button} onClick={handleModalClose}>
              취소
            </button>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default InviteModal;
