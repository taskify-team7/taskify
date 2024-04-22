import React from 'react';
import style from './PasswordErrorModal.module.css';
import BaseButton from '../BaseButton/BaseButton';
import CommonModalLayout from './CommonModalLayout';
import ModalContainer from './ModalContainer';

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
            <BaseButton
              text="확인"
              type="submit"
              styleType="accept"
              onClick={() => {
                handleModalClose();
              }}
            />
          </div>
        </div>
      </CommonModalLayout>
    </ModalContainer>
  );
}

export default PasswordErrorModal;

/*
    
*/
