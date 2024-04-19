import React from "react";
import styles from "./InviteModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import { useForm } from "react-hook-form";
import { dashboardInvite } from "../../api/dashboard";

interface InviteModalProps {
  handleModalClose: () => void;
  dashboardId: number;
}

function InviteModal({ handleModalClose, dashboardId }: InviteModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const emailValidation = register("email", {
    required: {
      value: true,
      message: "이메일을 입력해 주세요",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await dashboardInvite(data.email, dashboardId);
    handleModalClose();
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="초대하기">
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            label="이메일"
            name="email"
            placeholder="이메일을 입력해 주세요"
            type="email"
            validation={emailValidation}
            errors={errors}
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
