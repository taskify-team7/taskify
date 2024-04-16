import React, { ChangeEvent, useState } from "react";
import ModalContainer from "./ModalContainer";
import CommonModalLayout from "./CommonModalLayout";
import styles from "./DashBoardCreateModal.module.css";
import { createDashboard } from "../../api/dashboard";
import CommonInput from "./CommonInput";
import ColorSelector from "./ColorSelector";

interface DashBoardCreateModalProps {
  handleModalClose: () => void;
}

function DashBoardCreateModal({ handleModalClose }: DashBoardCreateModalProps) {
  const [apiBodyValue, setApiBodyValue] = useState({
    title: "",
    color: "",
  });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const onCreate = () => {
    createDashboard(apiBodyValue.title, apiBodyValue.color);
    setApiBodyValue({
      title: "",
      color: "",
    });
    handleModalClose();
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
