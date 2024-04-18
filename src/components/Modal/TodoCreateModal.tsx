import React, { useState } from "react";
import styles from "./TodoCreateModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import DateInput from "../Input/DateInput";
import TagInput from "../Input/TagInput";
import ImageInput from "../Input/ImageInput";
import UserInput from "../Input/UserInput";
import { useForm } from "react-hook-form";

interface TagListType {
  color: string;
  text: string;
}

interface TodoCreateModalProps {
  handleModalClose: () => void;
  dashboardId?: number;
  columnId?: number;
}

function TodoCreateModal({
  handleModalClose,
  dashboardId,
  columnId,
}: TodoCreateModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const titleValidation = register("title", {
    required: {
      value: true,
      message: "제목을 입력해 주세요",
    },
  });

  const descriptionValidation = register("description", {
    required: {
      value: true,
      message: "설명을 입력해 주세요",
    },
  });

  const onSubmit = async (e: any) => {
    console.log(e);
    console.log("test");
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="할 일 생성">
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <UserInput label="담당자" placeholder="이름을 입력해 주세요" />
          <CommonInput
            label="제목"
            name="title"
            placeholder="제목을 입력해 주세요"
            required
            validation={titleValidation}
            errors={errors}
          />
          <CommonInput
            label="설명"
            name="description"
            placeholder="설명을 입력해 주세요"
            required
            validation={descriptionValidation}
            errors={errors}
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
