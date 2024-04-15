import React, { ReactNode } from "react";
import styles from "./ModalContainer.module.css";

interface ModalContainerProps {
  children: ReactNode;
  title: string;
  handleModalClose: () => void;
}

function ModalContainer({
  children,
  title,
  handleModalClose,
}: ModalContainerProps) {
  return (
    <div className={styles.background}>
      <div className={styles.modal_container}>
        <h2 className={styles.modal_title}>{title}</h2>
        {children}
        <div className={styles.modal_buttons}>
          <button className={styles.a_button}>생성</button>
          <button className={styles.c_button} onClick={handleModalClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
