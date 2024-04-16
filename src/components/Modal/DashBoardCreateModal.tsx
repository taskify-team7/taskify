import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import NewDashboard from "./NewDashboard";
import styles from "./DashBoardCreateModal.module.css";
import { createDashboard } from "../../api/dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DashBoardCreateModalProps {
  handleModalClose: () => void;
}

type apiBodyValueType = {
  title: string;
  color: string;
};

function DashBoardCreateModal({ handleModalClose }: DashBoardCreateModalProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => createDashboard(apiBodyValue.title, apiBodyValue.color),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });

  const [apiBodyValue, setApiBodyValue] = useState<apiBodyValueType>({
    title: "",
    color: "",
  });

  const onCreate = () => {
    try {
      mutate();
      setApiBodyValue({
        title: "",
        color: "",
      });
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="새로운 대시보드">
        <NewDashboard setApiBodyValue={setApiBodyValue} />
        <div className={styles.modal_buttons}>
          <button className={styles.a_button} onClick={onCreate}>
            생성
          </button>
          <button className={styles.c_button} onClick={handleModalClose}>
            취소
          </button>
        </div>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default DashBoardCreateModal;
