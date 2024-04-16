import { KeyboardEvent, ReactNode } from "react";
import styles from "./ModalContainer.module.css";

interface ModalContainerProps {
  children: ReactNode;
  handleModalClose: () => void;
}

function ModalContainer({ children, handleModalClose }: ModalContainerProps) {
  const escCloseModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleModalClose();
    } else {
      return;
    }
  };

  return (
    <div className={styles.background} onKeyDown={escCloseModal} tabIndex={0}>
      {children}
    </div>
  );
}

export default ModalContainer;
