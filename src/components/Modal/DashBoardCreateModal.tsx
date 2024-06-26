import React, { ChangeEvent, useState } from "react";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import styles from "./DashBoardCreateModal.module.css";
import { createDashboard } from "../../api/dashboard";

import CommonInput from "../Input/CommonInput";
import ColorSelector from "./ColorSelector";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "../Button/BaseButton/BaseButton";

interface DashBoardCreateModalProps {
  handleModalClose: () => void;
}

function DashBoardCreateModal({ handleModalClose }: DashBoardCreateModalProps) {
  const queryClient = useQueryClient();
  const [apiBodyValue, setApiBodyValue] = useState({
    title: "",
    color: "#7AC555",
  });
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    "#7AC555"
  );

  const { mutate } = useMutation({
    mutationFn: () => createDashboard(apiBodyValue.title, apiBodyValue.color),
    onSettled: () => {
      return (
        queryClient.invalidateQueries({ queryKey: ["dashboardList", 1] }),
        queryClient.invalidateQueries({ queryKey: ["dashboards", 1] })
      );
    },
  });

  const onCreate = () => {
    try {
      mutate();
      toast.success("대시보드가 생성되었습니다.");
      setApiBodyValue({
        title: "",
        color: "#7AC555",
      });

      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const selectColor = (color: string) => {
    setSelectedColor(color);

    // API body의 색상 값 업데이트
    setApiBodyValue((prev: any) => ({
      ...prev,
      color: color,
    }));
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setApiBodyValue((prev) => ({
      ...prev,
      title: value,
    }));
  };

  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout title="새로운 대시보드">
        <form className={styles.contents}>
          <CommonInput
            label="대시보드 이름"
            placeholder="뉴프로젝트"
            inputOnChange={inputOnChange}
          />
          <ColorSelector
            selectedColor={selectedColor}
            selectColor={selectColor}
          />
          <div className={styles.modal_buttons}>
            <Button.ModalColor type="button" onClick={onCreate}>
              생성
            </Button.ModalColor>
            <Button.ModalCancel type="button" onClick={handleModalClose}>
              취소
            </Button.ModalCancel>
          </div>
        </form>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default DashBoardCreateModal;
