import React from "react";
import styles from "./OptionBox.module.css";

interface OptionBoxProps {
  handleModalClose: () => void;
  ConfirmModalOpenHandler: () => void;
  todoEditModalOpenHandler: () => void;
}

function OptionBox({
  handleModalClose,
  ConfirmModalOpenHandler,
  todoEditModalOpenHandler,
}: OptionBoxProps) {
  const handletModalOpen = (type: string) => {
    // 이전 모달 닫아주는 함수
    handleModalClose();

    if (type === "delete") {
      // Alert 모달 열어주는 함수
      ConfirmModalOpenHandler();
    } else {
      todoEditModalOpenHandler();
    }
  };
  return (
    <div className={styles.optionbox}>
      <div
        className={styles.optionbox_item}
        onClick={() => handletModalOpen("edit")}
      >
        수정하기
      </div>
      <div
        className={styles.optionbox_item}
        onClick={() => handletModalOpen("delete")}
      >
        삭제하기
      </div>
    </div>
  );
}

export default OptionBox;
