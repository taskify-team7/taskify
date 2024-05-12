import style from "./PasswordErrorModal.module.css";
import CommonModalLayout from "./CommonModalLayout";
import ModalContainer from "./ModalContainer";
import Button from "../Button/BaseButton/BaseButton";

interface PasswordModalProps {
  handleModalClose: () => void;
}

function PasswordErrorModal({ handleModalClose }: PasswordModalProps) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <CommonModalLayout>
        <div className={style.containor}>
          <p className={style.modalText}>현재 비밀번호가 틀렸습니다.</p>
          <div className={style.acceptBtn}>
            <Button.ModalColor type="submit" onClick={handleModalClose}>
              확인
            </Button.ModalColor>
          </div>
        </div>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default PasswordErrorModal;

/*
    
*/
