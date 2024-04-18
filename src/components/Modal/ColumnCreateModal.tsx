import React from "react";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import styles from "./ColumnCreatemodal.module.css";
import { useForm } from "react-hook-form";
import { createColumn } from "../../api/dashboard";

interface olumnCreateModalProps {
  handleModalClose: () => void;
  dashboardId: number;
}

function ColumnCreateModal({
  handleModalClose,
  dashboardId,
}: olumnCreateModalProps) {
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

  const onSubmit = async (e: any) => {
    console.log(e);
    const result = await createColumn(e.title, dashboardId);
    handleModalClose();
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="새 컬럼 생성">
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            label="이름"
            name="title"
            placeholder="새로운 프로젝트"
            validation={titleValidation}
            errors={errors}
          />
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
