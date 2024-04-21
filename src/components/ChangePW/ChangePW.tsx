import React, { FormEvent, useEffect, useState } from 'react';
import CommonInput from '../Input/CommonInput';
import BaseButton from '../BaseButton/BaseButton';
import style from './ChangePW.module.css';

export default function ChangePW() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordMismatch, setIsPasswordMismatch] = useState<boolean>(false);

  // 비밀번호 변경 요청 함수
  const handlePasswordChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기서 현재 비밀번호 검증 로직 구현
    // 비밀번호가 틀린 경우 모달 표시 로직 추가
  };

  // 새 비밀번호와 비밀번호 확인의 일치 여부 확인
  useEffect(() => {
    setIsPasswordMismatch(newPassword !== confirmPassword);
  }, [newPassword, confirmPassword]);

  return (
    <div className={style.containor}>
      <h2>비밀번호 변경</h2>
      <form className={style.formContainor} onSubmit={handlePasswordChange}>
        <CommonInput
          label="현재 비밀번호"
          value={currentPassword}
          type="password"
          inputOnChange={(e) => setCurrentPassword(e.target.value)}
        />
        <CommonInput
          label="새 비밀번호"
          value={newPassword}
          type="password"
          inputOnChange={(e) => setNewPassword(e.target.value)}
        />
        <CommonInput
          label="새 비밀번호 확인"
          value={confirmPassword}
          type="password"
          inputOnChange={(e) => setConfirmPassword(e.target.value)}
        />
        {isPasswordMismatch && (
          <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
        )}
        <BaseButton text="변경" styleType="accept" type="submit" />
      </form>
    </div>
  );
}
