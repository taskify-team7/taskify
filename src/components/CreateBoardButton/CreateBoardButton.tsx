import styles from "./CreateBoardButton.module.css";
import { useModal } from "../../hooks/useModal";
import { createPortal } from "react-dom";
import ModalContainer from "../Modal/ModalContainer";
import NewDashboard from "../Modal/NewDashboard";
import CommonModalLayout from "../Modal/CommonModalLayout";

function CreateBoardButton() {
  const { openModal, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      {createPortal(
        openModal && (
          <ModalContainer handleModalClose={handleModalClose}>
            <CommonModalLayout title="새로운 대시보드">
              <NewDashboard />
              <div className={styles.modal_buttons}>
                <button className={styles.a_button}>생성</button>
                <button className={styles.c_button} onClick={handleModalClose}>
                  취소
                </button>
              </div>
            </CommonModalLayout>
          </ModalContainer>
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
