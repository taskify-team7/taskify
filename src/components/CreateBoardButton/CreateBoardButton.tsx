import styles from "./CreateBoardButton.module.css";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import DashBoardCreateModal from "../Modal/DashBoardCreateModal";
import ColumnCreateModal from "../Modal/ColumnCreateModal";

function CreateBoardButton() {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      {createPortal(
        isModalOpen && (
          <ColumnCreateModal handleModalClose={handleModalClose} />
          // <DashBoardCreateModal />
        ),
        document.body
      )}
      <div className={styles.container} onClick={handleModalOpen}>
        <p className={styles.font}>새로운 대시보드</p>
        <img src="/Icons/large.svg" alt="add_dashboard" />
      </div>
    </>
  );
}

export default CreateBoardButton;
