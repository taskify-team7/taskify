import React from "react";
import styles from "./InviteModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import CommonInput from "../Input/CommonInput";
import { useForm } from "react-hook-form";
import { dashboardInvite } from "../../api/dashboard";
import { toast } from "react-toastify";
import Button from "../Button/BaseButton/BaseButton";

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
    const response = await dashboardInvite(data.email, dashboardId);
    if (typeof response === "string") {
      toast.error(response);
    } else {
      toast.success("초대가 완료되었습니다.");
      handleModalClose();
    }
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="초대하기">
        <form className={styles.contents} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            validation={emailValidation}
            errors={errors}
          />
          <div className={styles.modal_buttons}>
            <Button.ModalColor type="submit">초대</Button.ModalColor>
            <Button.ModalCancel type="button" onClick={handleModalClose}>
              취소
            </Button.ModalCancel>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default InviteModal;
