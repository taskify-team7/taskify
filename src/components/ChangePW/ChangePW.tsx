import React, { useState } from 'react';
import CommonInput from '../Input/CommonInput';
import BaseButton from '../BaseButton/BaseButton';
import style from './ChangePW.module.css';
import { useForm } from 'react-hook-form';
import { logIn } from '../../api/auth';
import PasswordErrorModal from '../Modal/PasswordErrorModal';

interface FormValues {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function ChangePW() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newPassword = watch('newPassword');
  const newPasswordConfirmation = watch('newPasswordConfirmation');

  let userEmail = '';
  const userString = localStorage.getItem('user');
  if (userString) {
    const userObject = JSON.parse(userString);
    userEmail = userObject.email;
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const LoginData = {
      email: userEmail,
      password: data.password,
    };

    try {
      await logIn(LoginData);
    } catch (error) {
      console.log(error.response.data.message);
      setIsModalOpen(true);
    }

    if (newPassword !== newPasswordConfirmation) {
      setError('newPasswordConfirmation', {
        type: 'manual',
        message: '새 비밀번호가 일치하지 않습니다.',
      });
      return;
    }
    clearErrors('newPasswordConfirmation');
    const submissionData = {
      password: data.password,
      newPassword: data.newPassword,
    };
    console.log(submissionData);
  };

  return (
    <>
      {isModalOpen && (
        <PasswordErrorModal handleModalClose={handleModalClose} />
      )}
      <div className={style.containor}>
        <h2 className={style.mainText}>비밀번호 변경</h2>
        <form className={style.formContainor} onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            label="비밀번호"
            placeholder="현재 비밀번호 입력"
            type="password"
            name="password"
            validation={register('password', {
              required: '비밀번호는 필수 입력 사항입니다.',
            })}
            errors={errors}
          />
          <CommonInput
            label="새 비밀번호"
            placeholder="새 비밀번호 입력"
            type="password"
            name="newPassword"
            validation={register('newPassword', {
              required: '비밀번호는 필수 입력 사항입니다.',
            })}
            errors={errors}
          />
          <CommonInput
            label="새 비밀번호 확인"
            placeholder="새 비밀번호 입력"
            type="password"
            name="newPasswordConfirmation"
            validation={register('newPasswordConfirmation', {
              required: '비밀번호는 필수 입력 사항입니다.',
            })}
            errors={errors}
          />
          <div className={style.buttonContainor}>
            <BaseButton text="변경" styleType="accept" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
