import React from "react";
import styles from "./TodoCreateModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import DateInput from "../Input/DateInput";
import TagInput from "../Input/TagInput";
import ImageInput from "../Input/ImageInput";
import UserInput from "../Input/UserInput";

interface TodoCreateModalProps {
  handleModalClose: () => void;
}

function TodoCreateModal({ handleModalClose }: TodoCreateModalProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="할 일 생성">
        <form className={styles.contents}>
          <UserInput label="담당자" placeholder="이름을 입력해 주세요" />
          <CommonInput
            label="제목"
            placeholder="제목을 입력해 주세요"
            required
          />
          <CommonInput
            label="설명"
            placeholder="설명을 입력해 주세요"
            required
          />
          <DateInput label="마감일" placeholder="날짜를 입력해 주세요" />
          <TagInput label="태그" placeholder="입력 후 Enter" />
          <ImageInput label="이미지" />
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

export default TodoCreateModal;
