import React from "react";
import styles from "./ConfirmModal.module.css";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import BaseButton from "../BaseButton/BaseButton";
import { deleteCard } from "../../api/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ConfirmModalProps {
  handleModalClose: () => void;
  columnId: number;
  cardId: number;
}

function ConfirmModal({
  handleModalClose,
  columnId,
  cardId,
}: ConfirmModalProps) {
  const queryClient = useQueryClient();
  const handleDeleteCard = async () => {
    const response = await deleteCard(cardId);
    if (typeof response === "string") {
      toast.error(response);
    } else {
      toast.success("할 일이 삭제되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: ["column", columnId + ""],
      });
      handleModalClose();
    }
  };
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout>
        <p className={styles.modal_text}>
          할 일에 대한 모든 정보가 삭제 됩니다.
        </p>
        <div className={styles.modal_buttons}>
          <BaseButton
            onClick={handleDeleteCard}
            text="삭제"
            styleType="accept"
          />
          <BaseButton
            onClick={handleModalClose}
            text="취소"
            styleType="refuse"
          />
        </div>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default ConfirmModal;
