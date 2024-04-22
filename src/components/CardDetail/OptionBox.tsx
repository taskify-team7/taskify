import React from "react";
import styles from "./OptionBox.module.css";

interface OptionBoxProps {
  handleModalClose: () => void;
  ConfirmModalOpenHandler: () => void;
}

function OptionBox({
  handleModalClose,
  ConfirmModalOpenHandler,
}: OptionBoxProps) {
  const handleAlertModalOpen = () => {
    // 이전 모달 닫아주는 함수
    handleModalClose();
    // Alert 모달 열어주는 함수
    ConfirmModalOpenHandler();
  };
  return (
    <div className={styles.optionbox}>
      <div className={styles.optionbox_item}>수정하기</div>
      <div className={styles.optionbox_item} onClick={handleAlertModalOpen}>
        삭제하기
      </div>
    </div>
  );
}

export default OptionBox;
